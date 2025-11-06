import { Image } from "expo-image";
import { MotiView } from "moti";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ReadingCompletionProps = {
  visible: boolean;
  wordsLearned: number;
  points: number;
  onContinue: () => void;
};

export function ReadingCompletion({
  visible,
  wordsLearned,
  points,
  onContinue,
}: ReadingCompletionProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Mascot with bounce animation */}
          <MotiView
            from={{ opacity: 0, translateY: -50, scale: 0.5 }}
            animate={{ opacity: 1, translateY: 0, scale: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 150,
              delay: 200,
            }}
          >
            <Image
              source={require("@/assets/images/mascot.svg")}
              style={styles.mascot}
              contentFit="contain"
            />
          </MotiView>

          {/* Title */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 400,
              delay: 400,
            }}
          >
            <Text style={styles.title}>Nice work!</Text>
          </MotiView>

          {/* Subtitle */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 400,
              delay: 600,
            }}
          >
            <Text style={styles.subtitle}>
              You learned {wordsLearned} new words!
            </Text>
          </MotiView>

          {/* Points with sun icons */}
          <MotiView
            from={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              damping: 12,
              delay: 800,
            }}
            style={styles.pointsContainer}
          >
            <Text style={styles.pointsText}>+{points}</Text>
            <View style={styles.sunIconsContainer}>
              {[1, 2, 3].map((i) => (
                <MotiView
                  key={i}
                  from={{ opacity: 0, rotate: "-180deg", scale: 0 }}
                  animate={{ opacity: 1, rotate: "0deg", scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 10,
                    delay: 1000 + i * 100,
                  }}
                >
                  <Image
                    source={require("@/assets/icons/sun-icon.svg")}
                    style={styles.sunIcon}
                    contentFit="contain"
                  />
                </MotiView>
              ))}
            </View>
          </MotiView>

          {/* Continue Button */}
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 400,
              delay: 1400,
            }}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onContinue}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 40,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  mascot: {
    width: 180,
    height: 180,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#323253",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginBottom: 40,
  },
  pointsText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFA500",
  },
  sunIconsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  sunIcon: {
    width: 40,
    height: 40,
  },
  buttonContainer: {
    width: "100%",
  },
  continueButton: {
    backgroundColor: "#1BA8FF",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#1BA8FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});

