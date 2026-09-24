import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { TelemetryStore, validateTelemetry } from "./core/streamer";

export function createApp(store = new TelemetryStore()): http.Server {
  const publicDir = path.resolve(__dirname, "../public");
  return http.createServer((req, res) => {
    res.setHeader("X-Content-Type-Options", "nosniff"); res.setHeader("X-Frame-Options", "DENY"); res.setHeader("Referrer-Policy", "no-referrer");
    if (req.method === "GET" && req.url === "/health") return json(res, 200, { status: "ok" });
    if (req.method === "GET" && req.url === "/api/telemetry") return json(res, 200, store.snapshot());
    if (req.method === "POST" && req.url === "/api/telemetry") {
      let body = ""; let tooLarge = false;
      req.on("data", chunk => { body += chunk; if (body.length > 64 * 1024) tooLarge = true; });
      req.on("end", () => { if (tooLarge) return json(res, 413, { error: "payload too large" }); try { const parsed = JSON.parse(body); const saved = store.ingest(validateTelemetry(parsed)); return json(res, 201, saved); } catch (error) { return json(res, 400, { error: error instanceof Error ? error.message : "invalid request" }); } });
      return;
    }
    if (req.method !== "GET" || (req.url !== "/" && req.url !== "/index.html")) return json(res, 404, { error: "not found" });
    const file = path.join(publicDir, "index.html");
    fs.readFile(file, (error, data) => { if (error) return json(res, 500, { error: "dashboard unavailable" }); res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }); res.end(data); });
  });
}
function json(res: http.ServerResponse, status: number, value: unknown): void { res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" }); res.end(JSON.stringify(value)); }
if (require.main === module) { const port = Number(process.env.PORT ?? 3000); if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be between 1 and 65535"); createApp().listen(port, "0.0.0.0", () => console.log(`CloudPulse Dashboard listening on http://localhost:${port}`)); }
