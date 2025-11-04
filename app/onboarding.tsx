import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ONBOARDING_STEPS = [
  {
    id: 1,
    question: "How advanced is your vocab?",
    options: [
      "I'm new to learning",
      "Elementary level",
      "Middle level",
      "High school level",
      "College level",
      "Phd level",
    ],
  },
  {
    id: 2,
    question: "What's your learning goal?",
    options: [
      "Advance my career",
      "Academic success",
      "Better reading comprehension",
      "Improve my writing",
      "Daily conversations",
      "Test preparation",
    ],
  },
  {
    id: 3,
    question: "How much time can you dedicate daily?",
    options: [
      "5 minutes",
      "10 minutes",
      "15 minutes",
      "30 minutes",
      "45 minutes",
      "1 hour or more",
    ],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const progressWidth = useSharedValue(33.33);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#7CB342");
  }, []);

  useEffect(() => {
    // Animate progress bar when step changes
    progressWidth.value = withTiming(((currentStep + 1) / 3) * 100, {
      duration: 300,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);

    setTimeout(() => {
      if (currentStep < ONBOARDING_STEPS.length - 1) {
        // Move to next step
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
      } else {
        // Last step - navigate to dashboard
        router.replace("/(tabs)/dashboard");
      }
    }, 500);
  };

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const currentStepData = ONBOARDING_STEPS[currentStep];

  return (
    <ImageBackground
      source={require("../assets/images/onboarding-bg.png")}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar style="light" />

      {/* Logo */}
      <ExpoImage
        source={require("../assets/images/logo-light.svg")}
        style={styles.logo}
      />

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, progressBarStyle]} />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1} / {ONBOARDING_STEPS.length}
        </Text>
      </View>

      {/* Mascot and Speech Bubble */}
      <View style={styles.centerContent}>
        <View style={styles.speechBubbleContainer}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{currentStepData.question}</Text>
          </View>
          <View style={styles.speechBubbleTail} />
        </View>

        <ExpoImage
          source={require("../assets/images/mascot.svg")}
          style={styles.mascot}
        />
      </View>

      {/* Options Grid */}
      <View style={styles.optionsContainer}>
        <View style={styles.optionsGrid}>
          {currentStepData.options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                selectedOption === option && styles.optionButtonSelected,
              ]}
              onPress={() => handleSelectOption(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
    marginBottom: 15,
  },
  progressBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  progressText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    minWidth: 40,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: -10,
  },
  speechBubbleContainer: {
    position: "relative",
    marginBottom: 20,
    marginLeft: 100,
  },
  speechBubble: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
  speechBubbleTail: {
    position: "absolute",
    bottom: -8,
    left: 40,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#fff",
  },
  speechText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  mascot: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },
  optionsContainer: {
    marginBottom: 20,
    height: 255,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  optionButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionButtonSelected: {
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#388E3C",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  optionTextSelected: {
    color: "#fff",
  },
});
