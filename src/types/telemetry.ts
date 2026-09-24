export type ServiceStatus = "HEALTHY" | "DEGRADED" | "CRITICAL";

export interface ServiceHealth {
  serviceId: string;
  serviceName: string;
  status: ServiceStatus;
  latencyP95Ms: number;
  latencyP99Ms: number;
  errorRatePercent: number;
  requestsPerSecond: number;
  uptimeSeconds: number;
  timestamp: number;
}

export interface IncidentAlert {
  id: string;
  serviceId: string;
  serviceName: string;
  severity: "warning" | "critical";
  message: string;
  timestamp: number;
}

export interface DashboardSnapshot {
  timestamp: number;
  services: ServiceHealth[];
  recentAlerts: IncidentAlert[];
  summary: { total: number; healthy: number; degraded: number; critical: number };
}
