import { classifyService } from "../src/core/alert_rules";
import { TelemetryStore, validateTelemetry } from "../src/core/streamer";

const base = { serviceId:"api", serviceName:"API", latencyP95Ms:80, latencyP99Ms:100, errorRatePercent:0.2, requestsPerSecond:50, uptimeSeconds:100, timestamp:1 };
describe("telemetry", () => {
  test("classifies thresholds", () => { expect(classifyService(base)).toBe("HEALTHY"); expect(classifyService({...base, latencyP99Ms:200})).toBe("DEGRADED"); expect(classifyService({...base, errorRatePercent:6})).toBe("CRITICAL"); });
  test("stores latest service and summary", () => { const s=new TelemetryStore(); s.ingest(base); s.ingest({...base, serviceId:"worker",serviceName:"Worker",errorRatePercent:6}); const snap=s.snapshot(); expect(snap.summary).toEqual({total:2,healthy:1,degraded:0,critical:1}); expect(snap.recentAlerts).toHaveLength(1); });
  test("validates payloads", () => { expect(validateTelemetry({...base,timestamp:undefined}).serviceId).toBe("api"); expect(()=>validateTelemetry({...base,errorRatePercent:101})).toThrow(); expect(()=>validateTelemetry({...base,serviceId:""})).toThrow(); });
});
