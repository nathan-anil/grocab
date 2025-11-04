import { AnimatePresence, MotiView } from "moti";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type WordActionModalProps = {
  visible: boolean;
  word: string;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export function WordActionModal({
  visible,
  word,
  onClose,
  onEdit,
  onDelete,
}: WordActionModalProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <AnimatePresence>
          {visible && (
            <MotiView
              from={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={styles.modalContent}
            >
              <Pressable onPress={(e) => e.stopPropagation()}>
                <Text style={styles.modalTitle}>{word}</Text>
                <Text style={styles.modalSubtitle}>
                  What would you like to do?
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={onEdit}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.editButtonText}>Change</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={onDelete}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </Pressable>
            </MotiView>
          )}
        </AnimatePresence>
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
    borderRadius: 25,
    padding: 24,
    width: "100%",
    maxWidth: 340,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#001C2D",
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#1BA8FF",
    borderWidth: 2,
    borderColor: "#1BA8FF",
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#FF3B30",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF3B30",
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#8E8E93",
  },
});
