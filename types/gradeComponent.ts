export interface GradeComponentDto {
  id: string;
  subjectId: string;
  name: string;
  weightPercent: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateGradeComponentRequest {
  subjectId: string;
  name: string;
  weightPercent: number;
}

export type UpdateGradeComponentRequest = CreateGradeComponentRequest;

export interface GradeComponentCommandResult {
  success: boolean;
  gradeComponentId?: string;
  errors?: string[];
}


