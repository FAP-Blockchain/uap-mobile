export interface GetStudentGradesRequest {
  SemesterId?: string;
  SubjectId?: string;
  SortBy?: string;
  SortOrder?: string;
}

export interface ComponentGradeDto {
  gradeId: string | null;
  gradeComponentId: string;
  componentName: string;
  componentWeight: number;
  score: number | null;
  letterGrade: string | null;
}

export interface SubjectGradeDto {
  subjectId: string;
  subjectCode: string;
  subjectName: string;
  credits: number;
  className: string | null;
  semesterName: string;
  componentGrades: ComponentGradeDto[];
  averageScore: number | null;
  finalLetterGrade: string | null;
}

export interface StudentGradeTranscriptDto {
  studentId: string;
  studentCode: string;
  studentName: string;
  email: string;
  currentGPA: number;
  subjects: SubjectGradeDto[];
}

