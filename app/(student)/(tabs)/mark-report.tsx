import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import BackHeader from "@/components/BackHeader";
import { RoadmapServices } from "@/services/student/roadmapServices";
import type {
  CurriculumRoadmapSummaryDto,
  CurriculumSemesterDto,
  CurriculumRoadmapSubjectDto,
} from "@/types/roadmap";

const { width } = Dimensions.get("window");

export default function MarkReportPage() {
  const [summary, setSummary] = useState<CurriculumRoadmapSummaryDto | null>(
    null
  );
  const [semesterDetails, setSemesterDetails] = useState<
    Record<number, CurriculumSemesterDto>
  >({});
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const semesters = useMemo(() => {
    if (!summary) return [];
    return summary.semesterSummaries;
  }, [summary]);

  const coursesForSelectedSemester: CurriculumRoadmapSubjectDto[] =
    useMemo(() => {
      if (!selectedSemester || !semesterDetails[selectedSemester]) return [];
      const semester = semesterDetails[selectedSemester];
      if (!semester) return [];
      return semester.subjects.filter(
        (s) => s.status === "InProgress" || s.status === "Completed"
      );
    }, [selectedSemester, semesterDetails]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const summaryData =
          await RoadmapServices.getMyCurriculumRoadmapSummary();
        setSummary(summaryData);

        if (summaryData.semesterSummaries.length > 0) {
          const firstSemester = summaryData.semesterSummaries[0].semesterNumber;
          setSelectedSemester(firstSemester);

          await Promise.all(
            summaryData.semesterSummaries.map(async (sem) => {
              try {
                const semesterData =
                  await RoadmapServices.getMyCurriculumSemester(
                    sem.semesterNumber
                  );
                setSemesterDetails((prev) => ({
                  ...prev,
                  [sem.semesterNumber]: semesterData,
                }));
              } catch (err) {
                console.error(
                  "Không thể tải dữ liệu kỳ học:",
                  sem.semesterNumber,
                  err
                );
              }
            })
          );
        }
      } catch (error) {
        console.error("Không thể tải bảng điểm (roadmap):", error);
      } finally {
        setIsLoading(false);
      }
    };

    void loadData();
  }, []);

  const getStatusLabel = (subject: CurriculumRoadmapSubjectDto) => {
    switch (subject.status) {
      case "Completed":
        return "Hoàn thành";
      case "InProgress":
        return "Đang học";
      case "Open":
        return "Chưa học";
      case "Locked":
        return "Đã khóa";
      default:
        return "Đang học";
    }
  };

  const renderCourseCard = (course: CurriculumRoadmapSubjectDto) => {
    const statusLabel = getStatusLabel(course);
    return (
      <TouchableOpacity
        key={course.subjectId}
        style={styles.courseCard}
        activeOpacity={0.8}
        onPress={() =>
          router.push(
            `/(student)/(tabs)/mark-report-detail?subjectId=${course.subjectId}` as any
          )
        }
      >
        <View style={styles.cardContent}>
          {/* Status Icon */}
          <View style={styles.statusIconContainer}>
            <View style={styles.statusIcon}>
              <Text style={styles.statusIconText}>{statusLabel}</Text>
            </View>
          </View>

          {/* Course Info */}
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>
              {course.subjectCode} - {course.subjectName}
            </Text>
            {course.currentClassCode && (
              <Text style={styles.className}>
                Lớp: {course.currentClassCode}
              </Text>
            )}
            <View style={styles.averageContainer}>
              <Text style={styles.averageLabel}>Điểm trung bình: </Text>
              <Text style={styles.averageValue}>
                {course.finalScore !== null && course.finalScore !== undefined
                  ? course.finalScore.toFixed(2)
                  : "-"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const activeSemester = semesters.find(
    (semester) => semester.semesterNumber === selectedSemester
  );

  return (
    <View style={styles.container}>
      <BackHeader
        title="Bảng điểm"
        subtitle={
          activeSemester ? `Học kỳ: ${activeSemester.semesterName}` : undefined
        }
        subtitleSmall={
          summary ? `Tổng môn: ${summary.totalSubjects}` : undefined
        }
        gradientColors={["#3674B5", "#1890ff"]}
        fallbackRoute="/(student)/(tabs)"
      />

      <View style={styles.content}>
        {/* Semester Selection */}
        <View style={styles.semesterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.semesterScroll}
          >
            {semesters.map((semester) => {
              const isActive = semester.semesterNumber === selectedSemester;
              return (
                <TouchableOpacity
                  key={semester.semesterNumber}
                  style={[
                    styles.semesterButton,
                    isActive && styles.activeSemesterButton,
                  ]}
                  onPress={() => setSelectedSemester(semester.semesterNumber)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.semesterButtonText,
                      isActive && styles.activeSemesterButtonText,
                    ]}
                  >
                    {semester.semesterName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Course Reports */}
        <ScrollView
          style={styles.reportsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.reportsContent}
        >
          {isLoading || !summary ? (
            <Text style={styles.emptyText}>Đang tải dữ liệu bảng điểm...</Text>
          ) : coursesForSelectedSemester.length === 0 ? (
            <Text style={styles.emptyText}>Không có môn học trong học kỳ.</Text>
          ) : (
            coursesForSelectedSemester.map((course) => renderCourseCard(course))
          )}
        </ScrollView>
      </View>
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
    paddingHorizontal: 12,
  },
  semesterContainer: {
    marginVertical: 16,
    paddingHorizontal: 4,
  },
  semesterScroll: {
    gap: 8,
    paddingHorizontal: 4,
  },
  semesterButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 8,
  },
  activeSemesterButton: {
    backgroundColor: "#3674B5",
    borderColor: "#3674B5",
    shadowColor: "#3674B5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  semesterButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },
  activeSemesterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reportsContainer: {
    flex: 1,
  },
  reportsContent: {
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 16,
    fontSize: 14,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIconContainer: {
    marginRight: 16,
  },
  statusIcon: {
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
  statusIconText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3674B5",
    marginBottom: 6,
  },
  className: {
    fontSize: 13,
    color: "#333",
    marginBottom: 8,
  },
  averageContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  averageLabel: {
    fontSize: 14,
    color: "#666",
  },
  averageValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#52c41a",
  },
});
