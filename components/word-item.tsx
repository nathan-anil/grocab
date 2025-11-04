import { MotiView } from "moti";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type WordItemProps = {
  word: string;
  index: number;
  onPress: () => void;
};

export function WordItem({ word, index, onPress }: WordItemProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: "timing",
        duration: 400,
        delay: index * 100,
      }}
    >
      <TouchableOpacity
        style={styles.wordItem}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.wordText}>{word}</Text>
      </TouchableOpacity>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  wordItem: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  wordText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#001C2D",
  },
});
