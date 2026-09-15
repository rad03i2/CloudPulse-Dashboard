import { ServiceHealth, NodeMetrics, IncidentAlert } from "../types/telemetry";

export class AlertEvaluator {
  public static evaluateService(service: ServiceHealth): IncidentAlert | null {
    if (service.errorRatePercent > 5.0) {
      return {
        alertId: `alert-err-${service.serviceId}-${Date.now()}`,
        serviceId: service.serviceId,
        severity: "CRITICAL",
        title: "High Error Rate Detected",
        message: `Service ${service.serviceName} exceeded error threshold (5%). Current: ${service.errorRatePercent}%`,
        metricValue: service.errorRatePercent,
        threshold: 5.0,
        timestamp: Date.now(),
      };
    }

    if (service.latencyP99Ms > 250) {
      return {
        alertId: `alert-lat-${service.serviceId}-${Date.now()}`,
        serviceId: service.serviceId,
        severity: "HIGH",
        title: "P99 Latency SLA Breach",
        message: `Service ${service.serviceName} p99 response time degraded to ${service.latencyP99Ms}ms`,
        metricValue: service.latencyP99Ms,
        threshold: 250.0,
        timestamp: Date.now(),
      };
    }

    return null;
  }

  public static evaluateNode(node: NodeMetrics): IncidentAlert | null {
    if (node.cpuUsagePercent > 90.0) {
      return {
        alertId: `alert-cpu-${node.nodeId}-${Date.now()}`,
        serviceId: node.nodeId,
        severity: "CRITICAL",
        title: "Node CPU Saturation",
        message: `Node ${node.nodeId} in cluster ${node.cluster} reached ${node.cpuUsagePercent}% CPU`,
        metricValue: node.cpuUsagePercent,
        threshold: 90.0,
        timestamp: Date.now(),
      };
    }
    return null;
  }
}
