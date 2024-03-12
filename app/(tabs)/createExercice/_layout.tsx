import { Stack } from "expo-router";
import { AuthProvider } from "../../../context/AuthProvider";
import { Platform } from "react-native";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}