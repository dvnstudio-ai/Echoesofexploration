import { useCallback, useEffect, useRef, useState } from "react";

export type NarrationItem = { chapterIndex: number; segmentIndex: number; text: string; creative: boolean };
export type NarrationMode = "story" | "documentary";

type Delivery = { rate: number; pitch: number; pauseAfter: number };

/**
 * Free cinematic narration using only the visitor's browser/OS Web Speech voices.
 * Story mode is the default. No remote TTS, API key, paid service, or backend request.
 * The installed voice and its expressive range vary by browser/device.
 */
function splitIntoSentences(text: string) {
  return (text.match(/[^.!?]+[.!?]+[”’"')\]]*|[^.!?]+$/g) ?? [text])
    .map((part) => part.trim())
    .filter(Boolean);
}

function getDelivery(sentence: string, creative: boolean, mode: NarrationMode): Delivery {
  const dramatic = mode === "story";
  const hasQuestion = /\?/.test(sentence);
  const hasExclamation = /!/.test(sentence);
  const hasEllipsis = /…|\.\.\./.test(sentence);
  const hasReveal = /\b(remember|silence|alone|darkness|waiting|never|first|last|lost|discovered|finally|unknown|home)\b/i.test(sentence);
  const shortLine = sentence.split(/\s+/).length <= 7;

  if (!dramatic) {
    return { rate: creative ? 0.96 : 1, pitch: creative ? 0.98 : 1, pauseAfter: hasEllipsis ? 650 : 260 };
  }

  let rate = creative ? 0.86 : 0.94;
  let pitch = creative ? 0.91 : 0.98;
  if (hasQuestion) { rate *= 0.96; pitch += 0.04; }
  if (hasExclamation) { rate *= 0.94; pitch += 0.07; }
  if (hasReveal || shortLine) { rate *= 0.92; pitch -= 0.025; }

  return {
    rate: Math.max(0.72, rate),
    pitch: Math.min(1.12, Math.max(0.82, pitch)),
    pauseAfter: hasEllipsis ? 1050 : hasExclamation ? 720 : hasQuestion ? 620 : hasReveal || shortLine ? 520 : 360,
  };
}

export function useNarration(items: NarrationItem[]) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [rate, setRate] = useState(1.2);
  const [mode, setMode] = useState<NarrationMode>("story");
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const indexRef = useRef(0);
  const sentenceRef = useRef(0);
  const playingRef = useRef(false);
  const rateRef = useRef(1.2);
  const modeRef = useRef<NarrationMode>("story");
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const pauseTimerRef = useRef<number | null>(null);
  const runRef = useRef<(itemIndex: number, sentenceIndex: number) => void>(() => undefined);

  const clearPause = useCallback(() => {
    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const chooseVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoices(voices);
      const usEnglish = voices.filter((v) => /^en-US$/i.test(v.lang));
      const english = voices.filter((v) => /^en(-|$)/i.test(v.lang));
      const pool = usEnglish.length ? usEnglish : english;
      // Web Speech does not expose a standard gender field. Prefer common male
      // US voice names, then fall back to the best available en-US voice.
      const maleUs = pool.filter((v) =>
        /\b(david|guy|christopher|eric|brian|andrew|alex|mark|tom|tony|roger|evan|nathan|fred|aaron|daniel)\b/i.test(v.name) &&
        !/samantha|zira|aria|jenny|ana|michelle|susan|karen/i.test(v.name)
      );
      const localMale = maleUs.find((v) => v.localService);
      const chosen = localMale ?? maleUs[0] ??
        usEnglish.find((v) => v.localService && /natural|enhanced/i.test(v.name)) ??
        usEnglish.find((v) => v.default) ??
        usEnglish[0] ??
        english.find((v) => v.default) ??
        english[0] ??
        null;
      voiceRef.current = chosen;
      setVoice(chosen);
    };
    chooseVoice();
    window.speechSynthesis.addEventListener("voiceschanged", chooseVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", chooseVoice);
      clearPause();
      window.speechSynthesis.cancel();
    };
  }, [clearPause]);

  const speakFrom = useCallback((itemIndex: number, sentenceIndex = 0) => {
    const synth = window.speechSynthesis;
    clearPause();
    synth.cancel();

    const item = items[itemIndex];
    if (!item) {
      playingRef.current = false;
      setPlaying(false);
      return;
    }

    const sentences = splitIntoSentences(item.text);
    if (sentenceIndex >= sentences.length) {
      if (itemIndex + 1 < items.length) runRef.current(itemIndex + 1, 0);
      else { playingRef.current = false; setPlaying(false); }
      return;
    }

    indexRef.current = itemIndex;
    sentenceRef.current = sentenceIndex;
    setCurrent(itemIndex);

    const sentence = sentences[sentenceIndex];
    const delivery = getDelivery(sentence, item.creative, modeRef.current);
    const utterance = new SpeechSynthesisUtterance(sentence);
    const selectedVoice = voiceRef.current;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else utterance.lang = "en-US";

    utterance.rate = Math.min(1.5, Math.max(0.65, rateRef.current));
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = () => {
      if (!playingRef.current || indexRef.current !== itemIndex || sentenceRef.current !== sentenceIndex) return;
      pauseTimerRef.current = window.setTimeout(() => {
        pauseTimerRef.current = null;
        runRef.current(itemIndex, sentenceIndex + 1);
      }, delivery.pauseAfter);
    };
    utterance.onerror = (event) => {
      if (event.error !== "canceled" && event.error !== "interrupted") {
        playingRef.current = false;
        setPlaying(false);
      }
    };
    synth.speak(utterance);
  }, [clearPause, items]);

  runRef.current = speakFrom;

  const play = useCallback((from?: number) => {
    if (!supported) return;
    const start = from ?? indexRef.current;
    playingRef.current = true;
    setPlaying(true);
    speakFrom(start, start === indexRef.current ? sentenceRef.current : 0);
  }, [supported, speakFrom]);

  const pause = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    clearPause();
    window.speechSynthesis?.cancel();
  }, [clearPause]);

  const changeVoice = useCallback((voiceName: string) => {
    const chosen = voices.find((v) => v.name === voiceName) ?? null;
    voiceRef.current = chosen;
    setVoice(chosen);
    if (playingRef.current) speakFrom(indexRef.current, sentenceRef.current);
  }, [voices, speakFrom]);

  const previewVoice = useCallback(() => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const sample = new SpeechSynthesisUtterance("Hello. This is a preview of the Echoes of Exploration narration voice.");
    if (voiceRef.current) {
      sample.voice = voiceRef.current;
      sample.lang = voiceRef.current.lang;
    } else sample.lang = "en-US";
    sample.rate = 1.2;
    sample.pitch = 1;
    sample.volume = 1;
    synth.speak(sample);
  }, []);

  const changeRate = useCallback((nextRate: number) => {
    rateRef.current = nextRate;
    setRate(nextRate);
    if (playingRef.current) speakFrom(indexRef.current, sentenceRef.current);
  }, [speakFrom]);

  const changeMode = useCallback((nextMode: NarrationMode) => {
    modeRef.current = nextMode;
    setMode(nextMode);
    if (playingRef.current) speakFrom(indexRef.current, sentenceRef.current);
  }, [speakFrom]);

  const seek = useCallback((nextIndex: number) => {
    indexRef.current = nextIndex;
    sentenceRef.current = 0;
    setCurrent(nextIndex);
    if (playingRef.current) speakFrom(nextIndex, 0);
  }, [speakFrom]);

  return { supported, playing, current, rate, mode, voiceName: voice?.name ?? null, voices, play, pause, seek, changeRate, changeMode, changeVoice, previewVoice };
}
