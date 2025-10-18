import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SalaryPage() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const salaryData = {
    month: "Tháng 11/2024",
    basicSalary: 15000000,
    allowances: 2000000,
    overtime: 1500000,
    bonuses: 1000000,
    deductions: 500000,
    totalSalary: 19000000,
  };

  const salaryDetails = [
    {
      label: "Lương cơ bản",
      amount: salaryData.basicSalary,
      icon: "wallet",
      color: "#4CAF50",
    },
    {
      label: "Phụ cấp",
      amount: salaryData.allowances,
      icon: "plus-circle",
      color: "#2196F3",
    },
    {
      label: "Lương overtime",
      amount: salaryData.overtime,
      icon: "clock-circle",
      color: "#FF9800",
    },
    {
      label: "Thưởng",
      amount: salaryData.bonuses,
      icon: "gift",
      color: "#9C27B0",
    },
    {
      label: "Khấu trừ",
      amount: -salaryData.deductions,
      icon: "minus-circle",
      color: "#F44336",
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(Math.abs(amount));
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      // Simulate API call to refresh salary data
      await new Promise((resolve) => setTimeout(resolve, 2000));

      Alert.alert("Thành công", "Dữ liệu lương đã được cập nhật!");
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải dữ liệu lương. Vui lòng thử lại.");
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
        <Text style={styles.headerTitle}>Header</Text>
        <Text style={styles.headerSubtitle}>Mô tả</Text>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  totalSalaryCard: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  totalSalaryGradient: {
    padding: 25,
    alignItems: "center",
  },
  totalSalaryLabel: {
    fontSize: 16,
    color: "#fff",
    marginTop: 15,
    marginBottom: 10,
  },
  totalSalaryAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  totalSalaryNote: {
    fontSize: 12,
    color: "#fff",
    opacity: 0.8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  salaryDetailCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  salaryDetailIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  salaryDetailContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salaryDetailLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  salaryDetailAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  workingSummary: {
    marginTop: 30,
    marginBottom: 30,
  },
  workingStatsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  workingStatCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workingStatValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  workingStatLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  actionButtons: {
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 8,
    overflow: "hidden",
  },
  actionButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
