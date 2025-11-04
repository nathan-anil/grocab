import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomTabButton } from "@/components/custom-tab-button";
import { TabIcon } from "@/components/tab-icon";

// Import SVG icons as assets
const HomeIcon = require("@/assets/icons/home-icon.svg");
const GardenIcon = require("@/assets/icons/garden-icon.svg");
const StoriesIcon = require("@/assets/icons/stories-icon.svg");
const UserIcon = require("@/assets/icons/user-icon.svg");

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#1BA8FF",
        tabBarInactiveTintColor: "#8E8E93",
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: (props) => (
          <CustomTabButton
            {...props}
            label={
              route.name === "dashboard"
                ? "Home"
                : route.name === "garden"
                ? "Garden"
                : route.name === "library"
                ? "Library"
                : "Profile"
            }
            isFocused={props.accessibilityState?.selected || false}
            onPress={props.onPress}
            onLongPress={props.onLongPress ?? undefined}
          >
            {props.children}
          </CustomTabButton>
        ),
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E5EA",
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 4,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={HomeIcon}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          title: "Garden",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={GardenIcon}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={StoriesIcon}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={UserIcon}
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      {/* Hidden tabs - these exist as screens but don't show in tab bar */}
      <Tabs.Screen
        name="reading"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
