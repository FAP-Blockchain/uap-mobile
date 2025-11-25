export interface Student {
  id: string;
  studentCode: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  address?: string;
  classIds: string[];
  enrollmentDate: string;
  status: "active" | "inactive" | "graduated" | "suspended";
  walletAddress?: string;
  profileImage?: string;
  gpa?: number;
  totalCredits?: number;
  major: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentFormData {
  studentCode: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  address?: string;
  major: string;
  year: number;
  status: "active" | "inactive" | "graduated" | "suspended";
}

export interface EnrollmentInfo {
  id: string;
  classCode: string;
  subjectName: string;
  teacherName: string;
  registeredAt: string;
  isApproved: boolean;
}

export interface ClassInfo {
  classId: string;
  classCode: string;
  subjectName: string;
  subjectCode: string;
  credits: number;
  teacherName: string;
  joinedAt: string;
}

export interface StudentDetailDto {
  walletAddress: string;
  id: string;
  studentCode: string;
  fullName: string;
  email: string;
  enrollmentDate: string;
  gpa: number;
  isGraduated: boolean;
  graduationDate?: string | null;
  isActive: boolean;
  createdAt: string;
  enrollments: EnrollmentInfo[];
  currentClasses: ClassInfo[];
  totalEnrollments: number;
  approvedEnrollments: number;
  pendingEnrollments: number;
  totalClasses: number;
  totalGrades: number;
  totalAttendances: number;
}

