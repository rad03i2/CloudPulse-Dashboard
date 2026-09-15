import http from "http";
import fs from "fs";
import path from "path";
import { TelemetryAggregator } from "./core/streamer";
import { AlertEvaluator } from "./core/alert_rules";
import { IncidentAlert, ServiceHealth } from "./types/telemetry";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const aggregator = new TelemetryAggregator();

const SERVICES = [
  { id: "srv-auth", name: "Authentication API" },
  { id: "srv-payments", name: "Payment Gateway" },
  { id: "srv-inventory", name: "Inventory Service" },
  { id: "srv-notifications", name: "Push Notification Hub" },
];

const activeAlerts: IncidentAlert[] = [];

const server = http.createServer((req, res) => {
  if (req.url === "/api/telemetry") {
    const services: ServiceHealth[] = SERVICES.map((s) =>
      aggregator.generateMockServiceHealth(s.id, s.name)
    );

    // Evaluate alerts
    services.forEach((srv) => {
      const alert = AlertEvaluator.evaluateService(srv);
      if (alert) activeAlerts.unshift(alert);
    });

    if (activeAlerts.length > 20) activeAlerts.pop();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        timestamp: Date.now(),
        services,
        recentAlerts: activeAlerts.slice(0, 5),
      })
    );
    return;
  }

  // Serve Dashboard HTML
  const htmlPath = path.join(__dirname, "../public/index.html");
  if (fs.existsSync(htmlPath)) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(fs.readFileSync(htmlPath));
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("CloudPulse Telemetry Server Online.");
  }
});

server.listen(PORT, () => {
  console.log(`CloudPulse Dashboard server running at http://localhost:${PORT}`);
});
