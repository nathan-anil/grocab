import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Make the garden larger than the screen for scrolling
const GARDEN_WIDTH = SCREEN_WIDTH * 2;
const GARDEN_HEIGHT = SCREEN_HEIGHT * 1.5;

// Calculate bounds
const MAX_TRANSLATE_X = 0;
const MIN_TRANSLATE_X = -(GARDEN_WIDTH - SCREEN_WIDTH);
const MAX_TRANSLATE_Y = 0;
const MIN_TRANSLATE_Y = -(GARDEN_HEIGHT - SCREEN_HEIGHT);

export default function GardenScreen() {
  const translateX = useSharedValue(MIN_TRANSLATE_X / 2);
  const translateY = useSharedValue(MIN_TRANSLATE_Y / 2);
  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Update position with bounds
      const newX = contextX.value + event.translationX;
      const newY = contextY.value + event.translationY;

      translateX.value = Math.max(
        MIN_TRANSLATE_X,
        Math.min(MAX_TRANSLATE_X, newX)
      );
      translateY.value = Math.max(
        MIN_TRANSLATE_Y,
        Math.min(MAX_TRANSLATE_Y, newY)
      );
    })
    .onEnd((event) => {
      // Add momentum with decay
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [MIN_TRANSLATE_X, MAX_TRANSLATE_X],
        deceleration: 0.998,
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [MIN_TRANSLATE_Y, MAX_TRANSLATE_Y],
        deceleration: 0.998,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.gardenContainer, animatedStyle]}>
          <Image
            source={require("@/assets/images/garden-bg.svg")}
            style={styles.backgroundImage}
            contentFit="cover"
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A7C59",
    overflow: "hidden",
  },
  gardenContainer: {
    width: GARDEN_WIDTH,
    height: GARDEN_HEIGHT,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
});
