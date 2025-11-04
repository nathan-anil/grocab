import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

type TabIconProps = {
  icon: any;
  color?: string;
  size?: number;
  focused?: boolean;
};

export function TabIcon({ icon, color, size = 24 }: TabIconProps) {
  return (
    <View style={[styles.iconContainer, { width: size, height: size }]}>
      <Image
        source={icon}
        style={styles.icon}
        contentFit="contain"
        tintColor={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "100%",
    height: "100%",
  },
});
