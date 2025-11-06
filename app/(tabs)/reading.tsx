import { ConfirmLeaveModal } from "@/components/confirm-leave-modal";
import { ReadingCompletion } from "@/components/reading-completion";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useFocusEffect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ReadingText from "@/components/reading-text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const steps = [
  {
    id: 1,
    text: "Every culture has dreamed of dragons, but none agree on what they mean.",
    image: require("@/assets/images/dragon1.svg"),
  },
  {
    id: 2,
    text: "In China, dragons are voluptuous symbols of wisdom and power, bringing good fortune to those who honor them.",
    image: require("@/assets/images/dragon2.svg"),
  },
  {
    id: 3,
    text: "European legends tell of ephemeral beasts that guard treasure in distant castles, breathing fire to protect their hoards.",
    image: require("@/assets/images/dragon3.svg"),
  },
  {
    id: 4,
    text: "The esoteric knowledge of dragon lore has been passed down through generations, hidden in ancient texts and symbols.",
    image: require("@/assets/images/dragon4.svg"),
  },
];

export default function ReadingScreen() {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [key, setKey] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const progressWidth = useSharedValue(((0 + 1) / steps.length) * 100);

  useEffect(() => {
    progressWidth.value = withTiming(
      ((currentStepIndex + 1) / steps.length) * 100,
      {
        duration: 300,
      }
    );
  }, [currentStepIndex, progressWidth]);
  // Reset the ReadingText component when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setKey((prev) => prev + 1);
      setCurrentStepIndex(0); // Reset to first step
      setIsPaused(false); // Reset pause state
      progressWidth.value = withTiming(((0 + 1) / steps.length) * 100, {
        duration: 0,
      }); // Reset progress bar
    }, [progressWidth])
  );

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const handleReadingComplete = useCallback(() => {
    // Move to next step
    setCurrentStepIndex((prev) => {
      if (prev < steps.length - 1) {
        setKey((k) => k + 1); // Force remount to restart animation
        return prev + 1;
      } else {
        // All steps completed - show completion modal
        setShowCompletionModal(true);
        return prev;
      }
    });
  }, []);

  const currentStep = steps[currentStepIndex];

  const handleClosePress = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmLeave = () => {
    setShowConfirmModal(false);
    router.back();
  };

  const handleCancelLeave = () => {
    setShowConfirmModal(false);
  };

  const handleCompletionContinue = () => {
    setShowCompletionModal(false);
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* header */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            width: "95%",
            marginHorizontal: "auto",
            marginBottom: 20,
          }}
        >
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[styles.progressBarFill, progressBarStyle]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentStepIndex + 1} / {steps.length}
            </Text>
          </View>

          <View style={{ width: "10%" }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClosePress}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* text section */}
        <View style={styles.contentContainer}>
          <MotiView
            key={`text-${currentStepIndex}`}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -20 }}
            transition={{
              type: "timing",
              duration: 400,
            }}
          >
            <ReadingText
              key={key}
              sentence={currentStep.text}
              interval={500}
              onComplete={handleReadingComplete}
              isPaused={isPaused}
            />
          </MotiView>
        </View>

        {/* image section */}
        <View style={styles.dragonsContainer}>
          <MotiView
            key={`image-${currentStepIndex}`}
            from={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "timing",
              duration: 500,
            }}
          >
            <Image
              source={currentStep.image}
              style={styles.dragonsImage}
              contentFit="contain"
            />
          </MotiView>
        </View>

        {/* controls section */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[
              styles.controlButton,
              currentStepIndex === 0 && styles.controlButtonDisabled,
            ]}
            onPress={() => {
              if (currentStepIndex > 0) {
                setCurrentStepIndex((prev) => prev - 1);
                setKey((k) => k + 1);
                setIsPaused(false); // Resume when changing steps
              }
            }}
            disabled={currentStepIndex === 0}
          >
            <Ionicons
              name="chevron-back"
              size={20}
              color={currentStepIndex === 0 ? "#ccc" : "#fff"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setIsPaused((prev) => !prev)}
          >
            <Ionicons
              name={isPaused ? "play" : "pause"}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.controlButton,
              currentStepIndex === steps.length - 1 &&
                styles.controlButtonDisabled,
            ]}
            onPress={() => {
              if (currentStepIndex < steps.length - 1) {
                setCurrentStepIndex((prev) => prev + 1);
                setKey((k) => k + 1);
                setIsPaused(false); // Resume when changing steps
              }
            }}
            disabled={currentStepIndex === steps.length - 1}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={currentStepIndex === steps.length - 1 ? "#ccc" : "#fff"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Confirm Leave Modal */}
      <ConfirmLeaveModal
        visible={showConfirmModal}
        onClose={handleCancelLeave}
        onConfirm={handleConfirmLeave}
      />

      {/* Completion Modal */}
      <ReadingCompletion
        visible={showCompletionModal}
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
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 45,
    height: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  content: {
    marginTop: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  dragonsContainer: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    gap: 10,
    flex: 1,
  },
  dragonsImage: {
    width: "100%",
    height: "95%",
    resizeMode: "contain",
  },
  contentContainer: {
    // flex: 1,
    height: "37%",
  },
  closeButton: {
    // position: "absolute",
    // top: -35,
    // right: 0,
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#333",
    // padding: 10,
    borderRadius: 60,
    width: 36,
    height: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "85%",
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
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  controlButton: {
    backgroundColor: "#34B1FF",
    padding: 12,
    borderRadius: 30,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButtonDisabled: {
    backgroundColor: "#E5E5EA",
    opacity: 0.5,
  },
});
