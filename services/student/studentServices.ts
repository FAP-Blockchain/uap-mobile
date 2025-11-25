import api from "@/config/axios";
import type {
  WeeklyScheduleDto,
  WeeklyScheduleResponse,
} from "@/types/schedule";

const url = "/students";

export const StudentServices = {
  /**
   * Get current student's weekly schedule
   * Endpoint: GET /api/students/me/schedule
   * Query params: weekStartDate (optional ISO string)
   */
  getMyWeeklySchedule: async (
    weekStartDate?: string
  ): Promise<WeeklyScheduleDto> => {
    const params = weekStartDate ? { weekStartDate } : undefined;
    const response = await api.get<WeeklyScheduleResponse>(
      `${url}/me/schedule`,
      { params }
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message || "Không thể lấy thời khóa biểu tuần."
      );
    }

    return response.data.data;
  },
};
