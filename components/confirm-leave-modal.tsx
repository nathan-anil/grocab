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

type ConfirmLeaveModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmLeaveModal({
  visible,
  onClose,
  onConfirm,
}: ConfirmLeaveModalProps) {
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
                <Text style={styles.modalTitle}>
                  Are you sure you want to leave?
                </Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.noButton]}
                    onPress={onClose}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.noButtonText}>No</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.yesButton]}
                    onPress={onConfirm}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.yesButtonText}>Yes</Text>
                  </TouchableOpacity>
                </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#001C2D",
    textAlign: "center",
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  yesButton: {
    backgroundColor: "#1BA8FF",
    borderWidth: 2,
    borderColor: "#1BA8FF",
  },
  yesButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  noButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#8E8E93",
  },
  noButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8E8E93",
  },
});

