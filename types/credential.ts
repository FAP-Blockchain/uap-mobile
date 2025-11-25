export interface Credential {
  id: string;
  credentialType: "degree" | "certificate" | "transcript" | "achievement";
  title: string;
  description?: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  issuerId: string;
  issuerName: string;
  issueDate: string;
  expiryDate?: string;
  status: "active" | "revoked" | "expired";
  blockchainHash?: string;
  transactionHash?: string;
  ipfsHash?: string;
  metadata: {
    gpa?: number;
    credits?: number;
    grade?: string;
    course?: string;
    classId?: string;
    className?: string;
    academicYear?: string;
    semester?: string;
  };
  verificationUrl?: string;
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
  revokedAt?: string;
  revokedBy?: string;
  revokedReason?: string;
}

export interface CredentialFormData {
  credentialType: "degree" | "certificate" | "transcript" | "achievement";
  title: string;
  description?: string;
  studentId: string;
  expiryDate?: Date;
  metadata: {
    gpa?: number;
    credits?: number;
    grade?: string;
    course?: string;
    classId?: string;
    academicYear?: string;
    semester?: string;
  };
}

export interface CredentialStats {
  total: number;
  active: number;
  revoked: number;
  expired: number;
  thisMonth: number;
  byType: {
    degree: number;
    certificate: number;
    transcript: number;
    achievement: number;
  };
}

export interface StudentCredentialDto {
  id: string;
  credentialId: string;
  certificateType: string;
  studentName: string | null;
  studentCode: string;
  subjectName: string | null;
  semesterName: string | null;
  roadmapName: string | null;
  issuedDate: string;
  completionDate: string | null;
  finalGrade: number | null;
  letterGrade: string | null;
  classification: string | null;
  status: string;
  fileUrl: string | null;
  shareableUrl: string | null;
  verificationHash: string | null;
  viewCount: number;
  isOnBlockchain: boolean;
  blockchainTransactionHash: string | null;
}

