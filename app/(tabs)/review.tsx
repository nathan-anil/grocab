import { ReadingCompletion } from "@/components/reading-completion";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type QuestionType = "mcq" | "sentence";

type Question = {
  id: number;
  type: QuestionType;
  question: string;
  // For MCQ
  options?: string[];
  correctAnswer?: string;
  // For sentence writing
  words?: string[];
  instruction?: string;
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "mcq",
    question: 'Which sentence uses "exemplary" correctly?',
    options: [
      "Her exemplary leadership during the crisis earned widespread respect.",
      "The broken computer was exemplary and needed immediate repair.",
    ],
    correctAnswer:
      "Her exemplary leadership during the crisis earned widespread respect.",
  },
  {
    id: 2,
    type: "mcq",
    question:
      'Which word means "Serving as a desirable model; representing the best of its kind"?',
    options: ["flawed", "exemplary", "mediocre", "ordinary"],
    correctAnswer: "exemplary",
  },
  {
    id: 3,
    type: "sentence",
    question: "Demonstrate your understanding by writing with these words:",
    words: ["esoteric", "exemplary"],
    instruction:
      'Write a sentence about workplace or career situations using both "esoteric" and "exemplary".',
  },
];

export default function ReviewScreen() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [sentenceInput, setSentenceInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCompletion, setShowCompletion] = useState(false);
  const progressWidth = useSharedValue(((0 + 1) / QUESTIONS.length) * 100);

  useEffect(() => {
    progressWidth.value = withTiming(
      ((currentQuestionIndex + 1) / QUESTIONS.length) * 100,
      { duration: 300 }
    );
  }, [currentQuestionIndex, progressWidth]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const currentQuestion = QUESTIONS[currentQuestionIndex];

  const handleMCQSubmit = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      // Correct answer - move to next
      moveToNext();
    } else {
      // Wrong answer - show error
      setShowError(true);
      setErrorMessage("Not quite!");
    }
  };

  const handleSentenceSubmit = () => {
    const words = currentQuestion.words || [];
    const input = sentenceInput.toLowerCase().trim();

    // Check if all words are used
    const allWordsUsed = words.every((word) =>
      input.includes(word.toLowerCase())
    );

    if (!allWordsUsed) {
      setShowError(true);
      setErrorMessage("Almost there!");
    } else {
      moveToNext();
    }
  };

  const moveToNext = () => {
    setShowError(false);
    setSelectedAnswer(null);
    setSentenceInput("");
    setErrorMessage("");

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // All questions completed
      setShowCompletion(true);
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleCompletionContinue = () => {
    setShowCompletion(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with progress */}
        <View style={styles.header}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[styles.progressBarFill, progressBarStyle]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentQuestionIndex + 1} / {QUESTIONS.length}
            </Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Question Container */}
        <MotiView
          key={currentQuestionIndex}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400 }}
          style={styles.questionContainer}
        >
          <Text style={styles.questionTitle}>{currentQuestion.question}</Text>

          {/* MCQ Type */}
          {currentQuestion.type === "mcq" && (
            <>
              <View style={styles.optionsContainer}>
                {currentQuestion.options?.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === option && styles.optionButtonSelected,
                      showError &&
                        selectedAnswer === option &&
                        styles.optionButtonError,
                    ]}
                    onPress={() => {
                      setSelectedAnswer(option);
                      setShowError(false);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedAnswer === option && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {showError && (
                <MotiView
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={styles.errorContainer}
                >
                  <Text style={styles.errorTitle}>{errorMessage}</Text>
                  <Text style={styles.errorSubtitle}>
                    The correct answer is: {currentQuestion.correctAnswer}
                  </Text>
                </MotiView>
              )}

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !selectedAnswer && styles.submitButtonDisabled,
                ]}
                onPress={showError ? moveToNext : handleMCQSubmit}
                disabled={!selectedAnswer}
              >
                <Text style={styles.submitButtonText}>
                  {showError ? "Next →" : "Check"}
                </Text>
              </TouchableOpacity>
            </>
          )}

          {/* Sentence Writing Type */}
          {currentQuestion.type === "sentence" && (
            <>
              <View style={styles.wordsContainer}>
                {currentQuestion.words?.map((word, index) => (
                  <View key={index} style={styles.wordChip}>
                    <Text style={styles.wordChipText}>{word}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.instructionText}>
                {currentQuestion.instruction}
              </Text>

              <TextInput
                style={styles.textInput}
                placeholder="Write your sentence here..."
                value={sentenceInput}
                onChangeText={setSentenceInput}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              {showError && (
                <MotiView
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={styles.errorContainer}
                >
                  <Text style={styles.errorTitle}>{errorMessage}</Text>
                  <Text style={styles.errorQuote}>
                    &ldquo;{sentenceInput}&rdquo;
                  </Text>
                  <Text style={styles.errorSubtitle}>
                    Make sure to use both vocabulary words in your sentence. Try
                    again!
                  </Text>
                </MotiView>
              )}

              <TouchableOpacity
                style={[
                  styles.submitButton,
                  !sentenceInput.trim() && styles.submitButtonDisabled,
                ]}
                onPress={handleSentenceSubmit}
                disabled={!sentenceInput.trim()}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </MotiView>
      </ScrollView>

      {/* Completion Modal */}
      <ReadingCompletion
        visible={showCompletion}
        wordsLearned={4}
        points={10}
        onContinue={handleCompletionContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF4F7",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(52, 177, 255, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#34B1FF",
    borderRadius: 4,
  },
  progressText: {
    color: "#34B1FF",
    fontSize: 14,
    fontWeight: "700",
    minWidth: 40,
  },
  closeButton: {
    backgroundColor: "#333",
    borderRadius: 60,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  questionContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#323253",
    marginBottom: 24,
    lineHeight: 32,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#E5E5EA",
  },
  optionButtonSelected: {
    backgroundColor: "#E6F4FF",
    borderColor: "#1BA8FF",
  },
  optionButtonError: {
    backgroundColor: "#FFE6E6",
    borderColor: "#FF3B30",
  },
  optionText: {
    fontSize: 16,
    color: "#323253",
    lineHeight: 22,
  },
  optionTextSelected: {
    color: "#1BA8FF",
    fontWeight: "600",
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  wordChip: {
    backgroundColor: "#1BA8FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  wordChipText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  instructionText: {
    fontSize: 15,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  textInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 15,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#1BA8FF",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#1BA8FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: "#E5E5EA",
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  errorContainer: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#E5E5EA",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF3B30",
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  errorQuote: {
    fontSize: 16,
    color: "#323253",
    fontStyle: "italic",
    marginVertical: 12,
    textAlign: "center",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 10,
    width: "100%",
  },
});
