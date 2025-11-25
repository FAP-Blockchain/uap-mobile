export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: "admin" | "teacher" | "student";
  action: string;
  resource: string;
  resourceId?: string;
  resourceName?: string;
  details: string;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    location?: string;
    oldValue?: any;
    newValue?: any;
  };
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  blockchainHash?: string;
}

export interface SystemLog {
  id: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  service: string;
  details?: any;
  timestamp: string;
  userId?: string;
  requestId?: string;
}

export interface AuditReport {
  id: string;
  reportType: "activity" | "security" | "blockchain" | "performance";
  title: string;
  description?: string;
  dateRange: {
    from: string;
    to: string;
  };
  filters: {
    userId?: string;
    action?: string;
    resource?: string;
    severity?: string;
  };
  data: any;
  generatedBy: string;
  generatedAt: string;
  fileUrl?: string;
}

