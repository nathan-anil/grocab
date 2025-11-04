import { Image as ExpoImage } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingScreen() {
  const router = useRouter();

  useEffect(() => {
    // Set the navigation bar color to match the gradient bottom color
    SystemUI.setBackgroundColorAsync("#34B1FF");
  }, []);

  const handleGetStarted = () => {
    router.push("/onboarding");
  };

  return (
    <LinearGradient
      colors={["#8CD3FF", "#68C5FF", "#34B1FF", "#34B1FF", "#34B1FF"]}
      style={styles.container}
    >
      <Image
        source={require("../assets/images/leaf-1.png")}
        style={styles.leafOne}
      />
      <Image
        source={require("../assets/images/leaf-2.png")}
        style={styles.leafTwo}
      />
      <Image
        source={require("../assets/images/cloud-1.png")}
        style={styles.cloudOne}
      />
      <Image
        source={require("../assets/images/cloud-2.png")}
        style={styles.cloudTwo}
      />
      <Image
        source={require("../assets/images/word-1.png")}
        style={styles.wordOne}
      />
      <Image
        source={require("../assets/images/word-2.png")}
        style={styles.wordTwo}
      />
      <View style={styles.content}>
        <StatusBar style="light" />
        <ExpoImage
          source={require("../assets/images/logo-light.svg")}
          style={styles.logo}
        />
        <Text style={styles.title}>
          Learn new words in{"\n"}just{" "}
          <Text style={styles.highlightedText}>5 minutes</Text>
        </Text>
        <Text style={styles.subtitle}>A LEARNING GOAL</Text>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>TRY FREE</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  content: {
    // marginBottom: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 5,
    textAlign: "center",
    color: "#fff",
    lineHeight: 48,
    textTransform: "lowercase",
  },
  highlightedText: {
    color: "#278EFF",
    fontWeight: "900",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 1,
  },
  button: {
    backgroundColor: "#FFAE00",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  leafOne: {
    position: "absolute",
    bottom: -18,
    left: 0,
    width: 100,
    height: "50%",
    resizeMode: "contain",
  },
  leafTwo: {
    position: "absolute",
    bottom: -18,
    right: 0,
    width: 100,
    height: "40%",
    resizeMode: "contain",
  },
  cloudOne: {
    position: "absolute",
    top: 28,
    left: 0,
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  cloudTwo: {
    position: "absolute",
    top: 58,
    right: 0,
    width: 120,
    height: 80,
    resizeMode: "cover",
  },
  logo: {
    width: 290,
    height: 120,
    resizeMode: "contain",
    marginBottom: 10,
  },
  wordOne: {
    position: "absolute",
    bottom: 30,
    left: 60,
    width: 180,
    height: 100,
    resizeMode: "contain",
    opacity: 0.8,
  },
  wordTwo: {
    position: "absolute",
    top: 145,
    right: 0,
    width: 170,
    height: 90,
    resizeMode: "contain",
    opacity: 0.8,
  },
});
