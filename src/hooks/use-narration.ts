import { useCallback, useEffect, useRef, useState } from "react";

export type NarrationItem = { chapterIndex: number; segmentIndex: number; text: string; creative: boolean };

/**
 * Free, keyless narration using voices already exposed by the visitor's browser/OS.
 * No HeyGen/ElevenLabs request, API key, server endpoint, or per-listen charge.
 * Voice availability and sound vary by the visitor's device and installed voices.
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
    const pickVoice = () => {
      const englishVoices = window.speechSynthesis
        .getVoices()
        .filter((candidate) => candidate.lang.toLowerCase().startsWith("en"));

      // Prefer an installed/local English voice so narration does not depend on
      // a remote voice service. Fall back to any English voice supplied by the OS.
      const localVoices = englishVoices.filter((candidate) => candidate.localService);
      const candidates = localVoices.length ? localVoices : englishVoices;
      const preferred =
        candidates.find((candidate) => /natural|enhanced|premium/i.test(candidate.name)) ??
        candidates.find((candidate) => /Daniel|Arthur|Aaron|Google.*English|Samantha/i.test(candidate.name)) ??
        candidates.find((candidate) => candidate.default) ??
        candidates[0] ??
        null;

      setVoice(preferred);
    };

    pickVoice();
    window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
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
      const utterance = new SpeechSynthesisUtterance(item.text);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = "en-US";
      }
      utterance.rate = rateRef.current * (item.creative ? 0.92 : 1);
      utterance.pitch = item.creative ? 0.95 : 1;
      utterance.onend = () => {
        if (playingRef.current && indexRef.current === i) speakFrom(i + 1);
      };
      utterance.onerror = (event) => {
        if (event.error !== "canceled" && event.error !== "interrupted" && indexRef.current === i) {
          playingRef.current = false;
          setPlaying(false);
        }
      };
      synth.speak(utterance);
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
    (nextRate: number) => {
      rateRef.current = nextRate;
      setRate(nextRate);
      if (playingRef.current) speakFrom(indexRef.current);
    },
    [speakFrom],
  );

  const seek = useCallback(
    (nextIndex: number) => {
      indexRef.current = nextIndex;
      setCurrent(nextIndex);
      if (playingRef.current) speakFrom(nextIndex);
    },
    [speakFrom],
  );

  return { supported, playing, current, rate, play, pause, seek, changeRate };
}
