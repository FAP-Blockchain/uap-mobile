/**
 * Subject related type definitions.
 */

export interface GetSubjectsRequest {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: string;
  isDescending?: boolean;
}

export interface SubjectDto {
  id: string;
  subjectCode: string;
  subjectName: string;
  description?: string;
  credits: number;
  category?: string;
  department?: string;
  prerequisites?: string;
  totalOfferings?: number;
}

export interface SubjectFormValues {
  subjectCode: string;
  subjectName: string;
  credits: number;
  description?: string;
  category?: string;
  department?: string;
  prerequisites?: string;
}

export interface PagedSubjectsResponse {
  data: SubjectDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

