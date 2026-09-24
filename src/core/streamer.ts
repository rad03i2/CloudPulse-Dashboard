import { AlertEvaluator, classifyService } from "./alert_rules";
import { DashboardSnapshot, IncidentAlert, ServiceHealth } from "../types/telemetry";

export class TelemetryStore {
  private services = new Map<string, ServiceHealth>();
  private alerts: IncidentAlert[] = [];
  constructor(private readonly maxAlerts = 100) {}

  ingest(raw: Omit<ServiceHealth, "status">): ServiceHealth {
    const service: ServiceHealth = { ...raw, status: classifyService(raw) };
    this.services.set(service.serviceId, service);
    const alert = AlertEvaluator.evaluateService(service);
    if (alert) { this.alerts.unshift(alert); this.alerts = this.alerts.slice(0, this.maxAlerts); }
    return service;
  }

  snapshot(): DashboardSnapshot {
    const services = [...this.services.values()].sort((a, b) => a.serviceName.localeCompare(b.serviceName));
    return { timestamp: Date.now(), services, recentAlerts: this.alerts.slice(0, 20), summary: { total: services.length, healthy: services.filter(s => s.status === "HEALTHY").length, degraded: services.filter(s => s.status === "DEGRADED").length, critical: services.filter(s => s.status === "CRITICAL").length } };
  }
}

export function validateTelemetry(value: unknown): Omit<ServiceHealth, "status"> {
  if (!value || typeof value !== "object") throw new Error("JSON object required");
  const v = value as Record<string, unknown>;
  const text = (k: string) => { if (typeof v[k] !== "string" || !(v[k] as string).trim()) throw new Error(`${k} must be a non-empty string`); return (v[k] as string).trim(); };
  const num = (k: string, min = 0) => { if (typeof v[k] !== "number" || !Number.isFinite(v[k]) || (v[k] as number) < min) throw new Error(`${k} must be a finite number >= ${min}`); return v[k] as number; };
  const errorRatePercent = num("errorRatePercent"); if (errorRatePercent > 100) throw new Error("errorRatePercent must be <= 100");
  return { serviceId: text("serviceId"), serviceName: text("serviceName"), latencyP95Ms: num("latencyP95Ms"), latencyP99Ms: num("latencyP99Ms"), errorRatePercent, requestsPerSecond: num("requestsPerSecond"), uptimeSeconds: num("uptimeSeconds"), timestamp: typeof v.timestamp === "number" && Number.isFinite(v.timestamp) ? v.timestamp : Date.now() };
}
