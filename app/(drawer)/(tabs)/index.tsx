import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectAuthLogin } from "../../../lib/features/loginSlice";

export default function HomePage() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const auth = useSelector(selectAuthLogin);

  useEffect(() => {
    console.log("HomePage mounted", auth);

    if (auth?.userProfile) {
      console.log("User from Redux:", auth.userProfile);
    }
  }, [auth]);

  const quickActions = [
    {
      title: "Chấm công",
      icon: "clock-circle",
      color: "#4CAF50",
      onPress: () => router.push("/timesheet" as any),
    },
    {
      title: "Tạo đơn",
      icon: "form",
      color: "#2196F3",
      onPress: () => router.push("/(drawer)/(tabs)/create-form" as any),
    },
    {
      title: "Bảng lương",
      icon: "dollar-circle",
      color: "#FF9800",
      onPress: () => router.push("/(drawer)/(tabs)/salary" as any),
    },
    {
      title: "Thông báo",
      icon: "bell",
      color: "#F44336",
      onPress: () => router.push("/(drawer)/notifications" as any),
    },
  ];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      // Simulate API call to refresh dashboard data
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert("Thành công", "Dữ liệu trang chủ đã được cập nhật!");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#3674B5"]}
          tintColor="#3674B5"
          title="Đang tải..."
          titleColor="#3674B5"
        />
      }
    >
      <LinearGradient colors={["#3674B5", "#2196F3"]} style={styles.header}>
        <Text style={styles.headerTitle}>Header!</Text>
        <Text style={styles.headerSubtitle}>Mô tả</Text>
      </LinearGradient>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 15 }}>
          Trang chủ
        </Text>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 45,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
});
