import api from "@/config/axios";
import {
  ChangePasswordRequest,
  ChangePasswordWithOtpRequest,
  LoginRequest,
  OtpResponse,
  RefreshTokenRequest,
  ResetPasswordWithOtpRequest,
  SendOtpRequest,
} from "@/types/auth/api";

const url = "/Auth";

export const AuthenServices = {
  loginUser: (values: LoginRequest) => {
    // Backend expects Email and Password
    return api.post(`${url}/login`, {
      Email: values.email,
      Password: values.password,
    });
  },
  logout: () => {
    return api.post(`${url}/logout`);
  },
  refreshToken: (request: RefreshTokenRequest) => {
    return api.post(`${url}/refresh-token`, {
      RefreshToken: request.refreshToken,
    });
  },
  sendOtp: (request: SendOtpRequest): Promise<OtpResponse> => {
    return api.post(`${url}/send-otp`, {
      Email: request.email,
      Purpose: request.purpose || "PasswordReset",
    });
  },
  resetPasswordWithOtp: (
    request: ResetPasswordWithOtpRequest
  ): Promise<OtpResponse> => {
    return api.post(`${url}/reset-password-with-otp`, {
      Email: request.email,
      OtpCode: request.otpCode,
      NewPassword: request.newPassword,
      ConfirmPassword: request.confirmPassword,
    });
  },
  changePassword: (request: ChangePasswordRequest) => {
    return api.post(`${url}/change-password`, {
      CurrentPassword: request.currentPassword,
      NewPassword: request.newPassword,
      ConfirmPassword: request.confirmPassword,
    });
  },
  changePasswordWithOtp: (request: ChangePasswordWithOtpRequest) => {
    return api.post(`${url}/change-password-with-otp`, {
      OtpCode: request.otpCode,
      CurrentPassword: request.currentPassword,
      NewPassword: request.newPassword,
      ConfirmPassword: request.confirmPassword,
    });
  },
};
