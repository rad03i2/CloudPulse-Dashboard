import { IncidentAlert, ServiceHealth, ServiceStatus } from "../types/telemetry";

export interface Thresholds { degradedLatencyMs: number; criticalLatencyMs: number; degradedErrorRate: number; criticalErrorRate: number; }
export const DEFAULT_THRESHOLDS: Thresholds = { degradedLatencyMs: 180, criticalLatencyMs: 300, degradedErrorRate: 2, criticalErrorRate: 5 };

export function classifyService(input: Omit<ServiceHealth, "status">, thresholds = DEFAULT_THRESHOLDS): ServiceStatus {
  if (input.errorRatePercent >= thresholds.criticalErrorRate || input.latencyP99Ms >= thresholds.criticalLatencyMs) return "CRITICAL";
  if (input.errorRatePercent >= thresholds.degradedErrorRate || input.latencyP99Ms >= thresholds.degradedLatencyMs) return "DEGRADED";
  return "HEALTHY";
}

export class AlertEvaluator {
  static evaluateService(service: ServiceHealth): IncidentAlert | null {
    if (service.status === "HEALTHY") return null;
    const severity = service.status === "CRITICAL" ? "critical" : "warning";
    return { id: `${service.serviceId}:${service.status}:${service.timestamp}`, serviceId: service.serviceId, serviceName: service.serviceName, severity, message: `${service.serviceName} is ${service.status.toLowerCase()} (p99 ${service.latencyP99Ms} ms, errors ${service.errorRatePercent}%)`, timestamp: service.timestamp };
  }
}
