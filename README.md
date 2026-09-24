# CloudPulse Dashboard

A small, self-hosted TypeScript dashboard for receiving service telemetry, classifying service health, and surfacing recent alerts. It is intentionally simple: no account, cloud vendor, database, or API key is required.

## English

### Why it exists
CloudPulse provides a practical local endpoint for applications, scripts, labs, and small environments that need a lightweight view of service health without adopting a full observability platform.

### Features
- `POST /api/telemetry` ingestion with strict input validation and a 64 KiB request limit.
- Automatic `HEALTHY`, `DEGRADED`, and `CRITICAL` classification from p99 latency and error rate.
- In-memory latest-state store and bounded recent-alert history.
- Responsive browser dashboard with automatic 10-second refresh.
- `GET /health` health endpoint and `GET /api/telemetry` JSON snapshot.
- Security headers, safe browser rendering, no telemetry forwarding, and no secrets required.
- TypeScript checks, Jest tests, and cross-platform GitHub Actions CI.

### Preview
Run the server and open `http://localhost:3000`. The dashboard starts empty by design; submit telemetry to populate it. Screenshots are not committed because the UI reflects runtime data.

### Requirements & installation
Node.js 20+ and npm are required.

```bash
git clone https://github.com/rad03i2/CloudPulse-Dashboard.git
cd CloudPulse-Dashboard
npm install
npm run build
npm start
```

Set `PORT` to change the listening port (default `3000`).

### Usage
Submit one service sample:

```bash
curl -X POST http://localhost:3000/api/telemetry -H "Content-Type: application/json" -d '{"serviceId":"orders","serviceName":"Orders API","latencyP95Ms":82,"latencyP99Ms":115,"errorRatePercent":0.4,"requestsPerSecond":320,"uptimeSeconds":86400}'
```

Read the current snapshot with `curl http://localhost:3000/api/telemetry` and readiness with `curl http://localhost:3000/health`.

Default health thresholds are defined in `src/core/alert_rules.ts`: degraded at p99 >= 180 ms or errors >= 2%; critical at p99 >= 300 ms or errors >= 5%.

### Project structure
`src/index.ts` contains the HTTP API/server, `src/core/` contains validation, state, health and alert logic, `src/types/` contains shared types, `public/` contains the dashboard, and `tests/` contains automated tests.

### Testing
```bash
npm run check
npm test
npm run build
```
CI runs these commands on Node 20 and 22 across Linux, Windows, and macOS.

### Limitations
State is in memory and resets on restart. Authentication, TLS termination, durable time-series storage, distributed ingestion, tracing, metrics scraping, notification integrations, and historical charts are intentionally out of scope. Put the service behind an authenticated reverse proxy before exposing ingestion to an untrusted network.

### Security & privacy
CloudPulse does not make outbound network requests and does not require credentials. Treat submitted telemetry as potentially sensitive operational data. Do not submit secrets or personal data. See `SECURITY.md` for reporting guidance.

### Optional roadmap
Durable storage, configurable thresholds, API authentication, and historical charts are reasonable future extensions; they are not claimed as current features.

### Contributing & license
See `CONTRIBUTING.md`. Licensed under the MIT License.

### Author
**Radwan Abdulhadi Ahmed**  
**رضوان عبدالهادي أحمد**  
GitHub: **@rad03i2**

---

## العربية

### نظرة عامة
CloudPulse لوحة مراقبة ذاتية الاستضافة مكتوبة بـ TypeScript لاستقبال قياسات الخدمات، وتحديد حالتها الصحية، وعرض التنبيهات الحديثة. لا تحتاج إلى حساب سحابي أو قاعدة بيانات أو مفتاح API.

### لماذا المشروع؟
يوفر المشروع نقطة استقبال ولوحة بسيطة للتطبيقات والمختبرات والبيئات الصغيرة التي تحتاج رؤية سريعة لصحة الخدمات دون تركيب منصة مراقبة ضخمة.

### المزايا
- استقبال القياسات عبر `POST /api/telemetry` مع تحقق صارم وحد أقصى 64 KiB للطلب.
- تصنيف تلقائي إلى `HEALTHY` و`DEGRADED` و`CRITICAL` حسب p99 ونسبة الأخطاء.
- حفظ آخر حالة لكل خدمة وسجل تنبيهات محدود في الذاكرة.
- لوحة متجاوبة تتحدث تلقائيًا كل 10 ثوانٍ.
- مسارا صحة وJSON عبر `/health` و`/api/telemetry`.
- ترويسات أمان وعرض آمن للنصوص وعدم إرسال البيانات إلى جهات خارجية.
- اختبارات Jest وفحص TypeScript وCI متعدد الأنظمة.

### المعاينة والتثبيت
يتطلب Node.js 20+ وnpm. بعد الاستنساخ شغّل `npm install` ثم `npm run build` ثم `npm start` وافتح `http://localhost:3000`. تبدأ اللوحة فارغة عمدًا حتى ترسل قياسات فعلية. يمكن تغيير المنفذ بمتغير البيئة `PORT`.

### الاستخدام والإعداد
استخدم مثال `curl` في القسم الإنجليزي لإرسال قياس خدمة. الحدود الافتراضية موجودة في `src/core/alert_rules.ts`: الحالة المتدهورة عند p99 أكبر أو يساوي 180ms أو أخطاء 2%، والحرجة عند 300ms أو أخطاء 5%.

### بنية المشروع والاختبار
الخادم وAPI في `src/index.ts`، ومنطق التحقق والحالة والتنبيهات في `src/core/`، والأنواع في `src/types/`، والواجهة في `public/`، والاختبارات في `tests/`. للتحقق شغّل `npm run check` و`npm test` و`npm run build`.

### القيود
البيانات محفوظة في الذاكرة وتُفقد عند إعادة التشغيل. لا توجد حاليًا مصادقة أو تخزين زمني دائم أو tracing أو scraping أو إشعارات خارجية أو مخططات تاريخية. لا تعرض نقطة الاستقبال على شبكة غير موثوقة دون reverse proxy محمي.

### الأمان والخصوصية
لا يجري CloudPulse اتصالات صادرة ولا يحتاج أسرارًا. قد تكون القياسات التشغيلية حساسة، لذلك لا ترسل كلمات مرور أو مفاتيح أو بيانات شخصية. راجع `SECURITY.md` للإبلاغ عن المشاكل الأمنية.

### التطوير الاختياري
التخزين الدائم والحدود القابلة للضبط والمصادقة والمخططات التاريخية تحسينات مستقبلية اختيارية وليست ميزات حالية.

### المساهمة والترخيص
راجع `CONTRIBUTING.md`. المشروع مرخص بترخيص MIT.

### المؤلف
**Radwan Abdulhadi Ahmed**  
**رضوان عبدالهادي أحمد**  
GitHub: **@rad03i2**
