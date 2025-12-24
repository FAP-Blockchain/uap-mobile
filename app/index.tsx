import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { selectAuthLogin } from "../lib/features/loginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const palette = {
  primary: "#3674B5",
};

export default function Index() {
  const auth = useSelector(selectAuthLogin);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Kiểm tra token trong Redux store
        const hasToken = auth?.accessToken && auth.accessToken.length > 0;

        // Kiểm tra token trong AsyncStorage
        const storedToken = await AsyncStorage.getItem("accessToken");
        const storedRole = await AsyncStorage.getItem("role");

        // Nếu có token hợp lệ, điều hướng theo role
        if (hasToken || storedToken) {
          const role = storedRole || auth?.userProfile?.role || "";
          const roleUpper = role.toString().toUpperCase();

          if (roleUpper === "TEACHER") {
            router.replace("/(teacher)" as any);
          } else if (roleUpper === "STUDENT") {
            router.replace("/(student)/(tabs)" as any);
          } else if (roleUpper === "VERIFIER" || roleUpper === "GUEST") {
            router.replace("/public-portal" as any);
          } else {
            // Nếu không xác định được role, về login
            router.replace("/(auth)/login" as any);
          }
        } else {
          // Không có token, điều hướng đến login
          router.replace("/(auth)/login" as any);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        // Nếu có lỗi, điều hướng đến login
        router.replace("/(auth)/login" as any);
      } finally {
        setIsChecking(false);
      }
    };

    void checkAuthAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hiển thị loading trong khi kiểm tra
  if (isChecking) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F1F5FF",
        }}
      >
        <ActivityIndicator size="large" color={palette.primary} />
      </View>
    );
  }

  // Component này sẽ không render gì vì đã redirect
  return null;
}
