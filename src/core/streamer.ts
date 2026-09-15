import { NodeMetrics, ServiceHealth, ServiceStatus } from "../types/telemetry";

export class TelemetryAggregator {
  private latencies: number[] = [];
  private maxSamples = 1000;

  public recordLatency(ms: number): void {
    this.latencies.push(ms);
    if (this.latencies.length > this.maxSamples) {
      this.latencies.shift();
    }
  }

  public calculatePercentile(percentile: number): number {
    if (this.latencies.length === 0) return 0;
    const sorted = [...this.latencies].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return Number(sorted[Math.max(0, index)].toFixed(2));
  }

  public generateMockServiceHealth(serviceId: string, name: string): ServiceHealth {
    const errorRate = Number((Math.random() * 2.5).toFixed(2));
    const p95 = Number((45 + Math.random() * 80).toFixed(1));
    const p99 = Number((p95 + 20 + Math.random() * 50).toFixed(1));

    let status: ServiceStatus = "HEALTHY";
    if (errorRate > 2.0 || p99 > 180) status = "DEGRADED";
    if (errorRate > 5.0 || p99 > 300) status = "CRITICAL";

    return {
      serviceId,
      serviceName: name,
      status,
      latencyP95Ms: p95,
      latencyP99Ms: p99,
      errorRatePercent: errorRate,
      requestsPerSecond: Math.floor(1200 + Math.random() * 800),
      uptimeSeconds: 864000,
    };
  }

  public generateMockNode(nodeId: string, cluster: string): NodeMetrics {
    return {
      nodeId,
      cluster,
      cpuUsagePercent: Number((30 + Math.random() * 55).toFixed(1)),
      memoryUsagePercent: Number((50 + Math.random() * 35).toFixed(1)),
      diskIoRateMb: Number((12.5 + Math.random() * 40).toFixed(2)),
      temperatureCelsius: Number((42 + Math.random() * 18).toFixed(1)),
      timestamp: Date.now(),
    };
  }
}
