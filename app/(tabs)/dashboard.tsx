import { WordActionModal } from "@/components/word-action-modal";
import { WordItem } from "@/components/word-item";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Sample word data
const SAMPLE_WORDS = [
  "exemplary",
  "ephemeral",
  "esoteric",
  "salient",
  "ubiquitous",
  "quintessential",
];

const MAX_WORDS = 4;

export default function DashboardScreen() {
  const [words, setWords] = useState(SAMPLE_WORDS.slice(0, MAX_WORDS));
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleWordPress = (word: string) => {
    setSelectedWord(word);
    setModalVisible(true);
  };

  const handleAddWord = () => {
    if (words.length >= MAX_WORDS) {
      // Show error message
      setErrorMessage("Reached word limit");
      // Hide error after 2.5 seconds
      setTimeout(() => setErrorMessage(null), 2500);
      return;
    }

    // Add new word with placeholder
    const newWordNumber = words.length + 1;
    const newWord = `New Word ${newWordNumber}`;
    setWords([...words, newWord]);
  };

  const handleEdit = () => {
    console.log("Edit word:", selectedWord);
    setModalVisible(false);
    // TODO: Implement edit functionality
  };

  const handleDelete = () => {
    if (selectedWord) {
      setWords(words.filter((w) => w !== selectedWord));
    }
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedWord(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.title}>Good Morning!</Text>
            <Text style={styles.subtitle}>Your personal growth dashboard</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.hatIconContainer}>
              <Image
                source={require("@/assets/icons/hat-icon.svg")}
                style={styles.hatIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dailyGoalContainer}>
          <View style={styles.dailyGoalItem}>
            <Image
              source={require("@/assets/icons/sun-icon.svg")}
              style={styles.dailyGoalIcon}
              contentFit="contain"
            />
            <Text style={styles.dailyGoalItemText}>100</Text>
          </View>
          <View style={styles.dailyGoalItem}>
            <Image
              source={require("@/assets/icons/fire-icon.svg")}
              style={styles.dailyGoalIcon}
              contentFit="contain"
            />
            <Text style={styles.dailyGoalItemText}>100</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          {/* header */}
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Your Words</Text>
              <Text style={styles.wordCount}>
                {words.length}/{MAX_WORDS} words
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.hatIconContainer,
                words.length >= MAX_WORDS && styles.addButtonDisabled,
              ]}
              onPress={handleAddWord}
              activeOpacity={0.7}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: words.length >= MAX_WORDS ? "#CCC" : "#001C2D80",
                  lineHeight: 18,
                }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {errorMessage && (
            <MotiView
              from={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              transition={{ type: "timing", duration: 300 }}
              style={styles.errorContainer}
            >
              <Text style={styles.errorText}>{errorMessage}</Text>
            </MotiView>
          )}
          {/* content */}
          <View style={styles.wordsListContainer}>
            {words.map((word, index) => (
              <WordItem
                key={word}
                word={word}
                index={index}
                onPress={() => handleWordPress(word)}
              />
            ))}
          </View>
        </View>

        {/* start reading section */}
        <View style={styles.cardContainer}>
          {/* header */}
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Start Reading</Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#323253",
                  marginTop: 10,
                }}
              >
                The origin of dragons
              </Text>
            </View>
            <View>{/* <View>5 min</View> */}</View>
          </View>

          {/* content */}
          <View style={styles.wordsListContainer}>
            <Image
              source={require("@/assets/images/dragons.svg")}
              style={styles.dragonsImage}
              contentFit="contain"
            />

            <TouchableOpacity
              style={styles.startReadingButton}
              onPress={() => router.push("/reading")}
            >
              <Text style={styles.startReadingButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* quick review section */}
        <View style={styles.cardContainer}>
          {/* header */}
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Quick Review</Text>
              {/* <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  color: "#323253",
                  marginTop: 10,
                }}
              >
                The origin of dragons
              </Text> */}
            </View>
            <View>{/* <View>5 min</View> */}</View>
          </View>

          {/* content */}
          <View style={styles.wordsListContainer}>
            <Image
              source={require("@/assets/images/brain.svg")}
              style={styles.dragonsImage}
              contentFit="contain"
            />

            <TouchableOpacity
              style={styles.startReadingButton}
              onPress={() => router.push("/review")}
            >
              <Text style={styles.startReadingButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Action Modal */}
      <WordActionModal
        visible={modalVisible}
        word={selectedWord || ""}
        onClose={handleCloseModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1BA8FF",
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
  dailyGoalContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  dailyGoalItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    // flex: 1,
    width: "50%",
  },
  dailyGoalIcon: {
    width: 50,
    height: 50,
  },
  dailyGoalItemText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001C2D80",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  hatIconContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  hatIcon: {
    width: 25,
    height: 25,
  },
  cardContainer: {
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // gap: 10,
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#001C2D80",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  wordsListContainer: {
    marginTop: 16,
  },
  wordCount: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 4,
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  errorContainer: {
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  dragonsImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  startReadingButton: {
    backgroundColor: "#1BA8FF",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    boxShadow:
      "0 -6px 4px 0 rgba(0, 78, 126, 0.10) inset, 0 6px 10px 0 #6BC6FF inset",
  },
  startReadingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
