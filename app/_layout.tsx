import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthProvider";
import { Platform } from "react-native";
import { Drawer } from 'expo-router/drawer';
import {useState } from 'react';
import CustomDrawerContent from "../components/customeDrawerContent";

export default function RootLayout() {
  const [drawerItems, setDrawerItems] = useState([
    { name: 'Create exercise', route: `(aux)/createStep/${1234}`, options: {drawerLabel: 'Home',title: 'overview',} },
    { name: 'Exercise', route: '`(aux)/studentExercise/${1234}`', options: {drawerLabel: 'Home',title: 'overview',} },
  ]);
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/login"
          options={{
            title: "",
            headerShown: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: "regular",
          }}
        />
        <Stack.Screen
          name="(auth)/userType"
          options={{
            title: "Please pick a user type.",
            headerShown: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: "regular",
          }}
        />
        <Stack.Screen
          name="other"
          options={{
            title: "",
            headerShown: true,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: "regular",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
