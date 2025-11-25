export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface SendOtpRequest {
  email: string;
  purpose?: string;
}

export interface ResetPasswordWithOtpRequest {
  email: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordWithOtpRequest {
  otpCode: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RegisterUserRequest {
  fullName: string;
  email: string;
  password: string;
  roleName: "Student" | "Teacher";
  studentCode?: string;
  enrollmentDate?: string;
  curriculumId?: number;
  teacherCode?: string;
  hireDate?: string;
  specialization?: string;
  phoneNumber?: string;
}

export interface BulkRegisterRequest {
  users: RegisterUserRequest[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  fullName: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  role: string;
  fullName: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message?: string;
}

export interface OtpResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RegisterUserResponse {
  success: boolean;
  message: string;
  userId?: string;
  email: string;
  roleName: string;
  errors?: string[];
  fullName?: string;
  phoneNumber?: string;
  studentCode?: string;
  teacherCode?: string;
  enrollmentDate?: string;
  hireDate?: string;
  specialization?: string;
  curriculumId?: number;
}

export interface BulkRegisterResponse {
  success: boolean;
  message: string;
  statistics: {
    total: number;
    success: number;
    failed: number;
  };
  results: RegisterUserResponse[];
  totalRequested?: number;
  successCount?: number;
  failureCount?: number;
}

export interface UserProfile {
  email: string;
  fullName: string;
  role: string;
  roleCode: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  userProfile: UserProfile | null;
}


