import api from "@/config/axios";
import type {
  GetStudentGradesRequest,
  StudentGradeTranscriptDto,
} from "@/types/grade";

const baseUrl = "/students/me/grades";

export const StudentGradeServices = {
  /**
   * Lấy bảng điểm của sinh viên hiện tại
   * Endpoint: GET /api/students/me/grades
   * Query params (tùy chọn): SemesterId, SubjectId, SortBy, SortOrder
   */
  getMyGrades: async (
    params?: GetStudentGradesRequest
  ): Promise<StudentGradeTranscriptDto> => {
    const response = await api.get<StudentGradeTranscriptDto>(baseUrl, {
      params,
    });
    return response.data;
  },
};


