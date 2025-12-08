import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import BackHeader from "@/components/BackHeader";
import { StudentGradeServices } from "@/services/student/gradeServices";
import type { ComponentGradeDto, SubjectGradeDto } from "@/types/grade";

const { width } = Dimensions.get("window");

export default function MarkReportDetailPage() {
  const { subjectId } = useLocalSearchParams();
  const [subject, setSubject] = useState<SubjectGradeDto | null>(null);
  const [components, setComponents] = useState<ComponentGradeDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSubjectGrades = async () => {
      if (!subjectId || typeof subjectId !== "string") return;
      try {
        setIsLoading(true);
        const data = await StudentGradeServices.getMyGrades({
          SubjectId: subjectId,
        });
        const found =
          data.subjects.find((s) => s.subjectId === subjectId) ||
          data.subjects[0] ||
          null;
        setSubject(found);
        setComponents(found?.componentGrades ?? []);
      } catch (error) {
        console.error("Không thể tải chi tiết điểm môn học:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadSubjectGrades();
  }, [subjectId]);

  const getStatusLabel = () => {
    if (!subject) return "";
    if (!subject.finalLetterGrade) return "Đang học";
    return subject.finalLetterGrade === "F" ? "Rớt" : "Đậu";
  };

  const renderGradeTable = () => {
    return (
      <View style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>Chi tiết điểm thành phần</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderText, { flex: 2 }]}>Thành phần</Text>
          <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Trọng số</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Điểm</Text>
          <Text style={[styles.tableHeaderText, { flex: 1 }]}>Ghi chú</Text>
        </View>

        {/* Table Rows */}
        {components.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2 }]}>
              {item.componentName}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5 }]}>
              {item.componentWeight.toFixed(1)} %
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {item.score !== null ? item.score : "-"}
            </Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>
              {item.letterGrade || "-"}
            </Text>
          </View>
        ))}

        {/* Total Row */}
        <View style={styles.totalRow}>
          <Text style={[styles.totalCell, { flex: 2, fontWeight: "bold" }]}>
            Tổng
          </Text>
          <Text style={[styles.totalCell, { flex: 1.5 }]}>
            {components
              .reduce((sum, c) => sum + c.componentWeight, 0)
              .toFixed(1)}{" "}
            %
          </Text>
          <Text style={[styles.totalCell, { flex: 1 }]}>
            {subject && subject.averageScore !== null
              ? subject.averageScore.toFixed(2)
              : "-"}
          </Text>
          <Text style={[styles.totalCell, { flex: 1 }]}>-</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BackHeader
        title="Chi tiết điểm"
        subtitle={
          subject
            ? `${subject.subjectCode} - ${subject.subjectName}`
            : undefined
        }
        subtitleSmall={subject?.className ? `Lớp: ${subject.className}` : ""}
        gradientColors={["#3674B5", "#1890ff"]}
        fallbackRoute="/(student)/(tabs)/mark-report"
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Course Info Card */}
        <View style={styles.courseCard}>
          <View style={styles.courseHeader}>
            <View style={styles.courseHeaderLeft}>
              <Text style={styles.courseTitle}>
                {subject
                  ? `${subject.subjectCode} - ${subject.subjectName}`
                  : "Đang tải..."}
              </Text>
              {subject?.className && (
                <Text style={styles.className}>Lớp: {subject.className}</Text>
              )}
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{getStatusLabel()}</Text>
            </View>
          </View>

          <View style={styles.averageContainer}>
            <Text style={styles.averageLabel}>Điểm trung bình: </Text>
            <Text style={styles.averageValue}>
              {subject?.averageScore !== null &&
              subject?.averageScore !== undefined
                ? subject.averageScore.toFixed(2)
                : "-"}
            </Text>
          </View>
        </View>

        {/* Grade Categories */}
        <View style={styles.gradeSection}>
          {isLoading ? (
            <Text style={styles.loadingText}>Đang tải chi tiết điểm...</Text>
          ) : components.length === 0 ? (
            <Text style={styles.loadingText}>Không có dữ liệu điểm.</Text>
          ) : (
            renderGradeTable()
          )}
        </View>

        {/* Course Total */}
        <View style={styles.courseTotalCard}>
          <View style={styles.courseTotalHeader}>
            <Text style={styles.courseTotalTitle}>Tổng kết môn học</Text>
          </View>
          <View style={styles.courseTotalContent}>
            <View style={styles.courseTotalRow}>
              <Text style={styles.courseTotalLabel}>Điểm trung bình:</Text>
              <Text style={styles.courseTotalValue}>
                {subject?.averageScore !== null &&
                subject?.averageScore !== undefined
                  ? subject.averageScore.toFixed(2)
                  : "-"}
              </Text>
            </View>
            <View style={styles.courseTotalRow}>
              <Text style={styles.courseTotalLabel}>Trạng thái:</Text>
              <View style={styles.statusIndicator}>
                <Text style={styles.statusIndicatorText}>
                  {getStatusLabel()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  courseHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3674B5",
    marginBottom: 6,
  },
  className: {
    fontSize: 14,
    color: "#333",
  },
  statusBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#52c41a",
    borderWidth: 3,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#52c41a",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  averageContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  averageLabel: {
    fontSize: 16,
    color: "#666",
  },
  averageValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#52c41a",
  },
  gradeSection: {
    gap: 16,
    marginBottom: 16,
  },
  categorySection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#262626",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tableCell: {
    fontSize: 13,
    color: "#333",
    textAlign: "center",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  totalCell: {
    fontSize: 13,
    color: "#262626",
    textAlign: "center",
  },
  courseTotalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseTotalHeader: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  courseTotalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#262626",
  },
  courseTotalContent: {
    gap: 12,
  },
  courseTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseTotalLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  courseTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#262626",
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
    marginTop: 16,
    fontSize: 14,
  },
  statusIndicator: {
    backgroundColor: "#52c41a",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIndicatorText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});
