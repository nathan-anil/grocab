import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ReadingTextProps {
  sentence: string;
  interval?: number; // milliseconds per word
  onComplete?: () => void; // Callback when all words are shown
  isPaused?: boolean; // Pause/resume the reading animation
}

const ReadingText: React.FC<ReadingTextProps> = ({
  sentence,
  interval = 500,
  onComplete,
  isPaused = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);

  // Parse sentence into words, marking vocab words
  const words = sentence.split(" ").map((word) => {
    const isVocab = word.startsWith("vocab[") && word.endsWith("]");
    if (isVocab) {
      return { text: word.replace(/^vocab\[|\]$/g, ""), vocab: true };
    }
    return { text: word, vocab: false };
  });

  // Handle pause/resume
  useEffect(() => {
    if (isPaused) {
      // Pause: clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    } else {
      // Resume: restart timer from current position
      if (timerRef.current) return; // Already running
      
      if (words.length === 0) return;
      if (currentIndexRef.current >= words.length) return; // Already completed

      let i = currentIndexRef.current;
      timerRef.current = setInterval(() => {
        if (i < words.length) {
          i++;
          currentIndexRef.current = i;
          setCurrentIndex(i);
        } else {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          // Call onComplete callback when all words are shown
          if (onComplete) {
            setTimeout(() => {
              onComplete();
            }, interval);
          }
        }
      }, interval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, interval, words.length, onComplete]);

  useEffect(() => {
    // Reset to start whenever sentence changes or component mounts
    setCurrentIndex(0);
    currentIndexRef.current = 0;

    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Don't start timer if no words or if paused
    if (words.length === 0 || isPaused) return;

    // Start timer from index 0
    let i = 0;
    currentIndexRef.current = 0;
    timerRef.current = setInterval(() => {
      if (i < words.length) {
        i++;
        currentIndexRef.current = i;
        setCurrentIndex(i);
      } else {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        // Call onComplete callback when all words are shown
        if (onComplete) {
          setTimeout(() => {
            onComplete();
          }, interval);
        }
      }
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [sentence, interval, words.length, onComplete, isPaused]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {words.map((w, i) => {
          const isActive = i === currentIndex;
          const color = w.vocab
            ? "#1AE1C9"
            : isActive
            ? "#323253"
            : "#32325333";

          const scale = isActive ? 1.5 : 1;

          return (
            <Text
              key={i}
              style={[
                styles.word,
                { color },
                w.vocab && styles.vocab,
                { transform: [{ scale }] },
              ]}
            >
              {w.text}
              {i !== words.length - 1 ? " " : ""}
            </Text>
          );
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    flexWrap: "wrap",
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 36,
  },
  word: {
    color: "#32325333",
  },
  vocab: {
    textDecorationLine: "underline",
    textDecorationColor: "#1AE1C9",
  },
});

export default ReadingText;
