/**
 * CloudPulse TypeScript Telemetry & Incident Schema Definitions.
 */

export type ServiceStatus = "HEALTHY" | "DEGRADED" | "CRITICAL";

export interface NodeMetrics {
  nodeId: string;
  cluster: string;
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  diskIoRateMb: number;
  temperatureCelsius: number;
  timestamp: number;
}

export interface ServiceHealth {
  serviceId: string;
  serviceName: string;
  status: ServiceStatus;
  latencyP95Ms: number;
  latencyP99Ms: number;
  errorRatePercent: number;
  requestsPerSecond: number;
  uptimeSeconds: number;
}

export interface IncidentAlert {
  alertId: string;
  serviceId: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  title: string;
  message: string;
  metricValue: number;
  threshold: number;
  timestamp: number;
}

export interface SystemOverview {
  totalNodes: number;
  healthyServices: number;
  activeIncidents: number;
  aggregateRps: number;
  avgLatencyMs: number;
}
