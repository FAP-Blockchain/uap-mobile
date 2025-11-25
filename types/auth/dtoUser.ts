export interface dtoUserInfor {
  id: string;
  code?: string;
  userName: string;
  email?: string;
  role: "STUDENT" | "TEACHER" | "ADMIN" | "GUEST" | "VERIFIER";
  walletAddress?: string;
}
