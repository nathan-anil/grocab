import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

type CustomTabButtonProps = {
  children: React.ReactNode;
  onPress?: (e: any) => void;
  onLongPress?: (e: any) => void;
  isFocused: boolean;
  label: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function CustomTabButton({
  children,
  onPress,
  onLongPress,
  isFocused,
  label,
}: CustomTabButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={handlePress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]}
    >
      <View style={[styles.button, isFocused && styles.activeButton]}>
        <View style={styles.iconContainer}>{children}</View>
        <Text
          style={[
            styles.label,
            isFocused ? styles.activeLabel : styles.inactiveLabel,
          ]}
        >
          {label}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    minWidth: 75,
  },
  activeButton: {
    backgroundColor: "#E6F4FF",
    borderWidth: 3,
    borderColor: "#1BA8FF",
    shadowColor: "#1BA8FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  activeLabel: {
    color: "#1BA8FF",
  },
  inactiveLabel: {
    color: "#8E8E93",
  },
});

