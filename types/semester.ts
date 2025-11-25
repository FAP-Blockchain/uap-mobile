export interface GetSemestersRequest {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  isActive?: boolean;
  isClosed?: boolean;
  sortBy?: string;
  isDescending?: boolean;
}

export interface CreateSemesterRequest {
  name: string;
  startDate: string;
  endDate: string;
}

export type UpdateSemesterRequest = CreateSemesterRequest;

export interface SemesterDto {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalSubjects: number;
  isActive: boolean;
  isClosed: boolean;
}

export interface PagedSemestersResponse {
  data: SemesterDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}


