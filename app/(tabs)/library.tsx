import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Library</Text>
        {/* <Text style={styles.subtitle}>Your collection of resources</Text> */}

        <View style={styles.content}>
          <Image
            source={require("@/assets/images/empty-library.svg")}
            style={styles.libraryImage}
          />
          <Text style={styles.contentText}>Check back soon!</Text>
          <Text style={styles.contentTextSubtitle}>
            Words you have mastered will show up here
          </Text>
        </View>
      </ScrollView>
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
    paddingTop: 60,
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
    marginTop: 90,
  },
  contentText: {
    fontSize: 24,
    lineHeight: 24,
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  contentTextSubtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    textAlign: "center",
  },
  libraryImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});
