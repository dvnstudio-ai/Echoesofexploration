import { useCallback, useEffect, useRef, useState } from "react";

export type NarrationItem = { chapterIndex: number; segmentIndex: number; text: string; creative: boolean };

/**
 * Narration via the browser's built-in Web Speech API — no API key needed.
 * Speaks items one by one so captions and the timeline can follow along.
 */
export function useNarration(items: NarrationItem[]) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [rate, setRate] = useState(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const indexRef = useRef(0);
  const playingRef = useRef(false);
  const rateRef = useRef(1);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const pick = () => {
      const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith("en"));
      const preferred =
        voices.find((v) => /Daniel|Google UK English Male|Arthur|Aaron|Samantha/i.test(v.name)) ?? voices[0] ?? null;
      setVoice(preferred);
    };
    pick();
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pick);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakFrom = useCallback(
    (i: number) => {
      const synth = window.speechSynthesis;
      synth.cancel();
      const item = items[i];
      if (!item) {
        playingRef.current = false;
        setPlaying(false);
        return;
      }
      indexRef.current = i;
      setCurrent(i);
      const u = new SpeechSynthesisUtterance(items[i].text);
      if (voice) u.voice = voice;
      u.rate = rateRef.current * (items[i].creative ? 0.92 : 1);
      u.pitch = items[i].creative ? 0.95 : 1;
      u.onend = () => {
        if (playingRef.current && indexRef.current === i) speakFrom(i + 1);
      };
      synth.speak(u);
    },
    [items, voice],
  );

  const play = useCallback(
    (from?: number) => {
      if (!supported) return;
      playingRef.current = true;
      setPlaying(true);
      speakFrom(from ?? indexRef.current);
    },
    [supported, speakFrom],
  );

  const pause = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    window.speechSynthesis?.cancel();
  }, []);

  const changeRate = useCallback(
    (r: number) => {
      rateRef.current = r;
      setRate(r);
      if (playingRef.current) speakFrom(indexRef.current);
    },
    [speakFrom],
  );

  const seek = useCallback(
    (i: number) => {
      indexRef.current = i;
      setCurrent(i);
      if (playingRef.current) speakFrom(i);
    },
    [speakFrom],
  );

  return { supported, playing, current, rate, play, pause, seek, changeRate };
}
