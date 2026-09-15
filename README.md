<div align="center">

# 📊 CloudPulse Dashboard
### Modern Real-Time Microservices Telemetry, SLA Health Monitoring & Incident Operations Center
#### لوحة تحكم ومراقبة حية للبنية التحتية السحابية والخدمات المصغرة مع التنبيه بالأعطال

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

<br/>

[English Documentation](#-english-overview) • [التوثيق بالعربية](#-نظرة-عامة-باللغة-العربية) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Commercial Services](#-commercial-devops--fullstack-solutions)

</div>

---

## 🌟 Highlights

**CloudPulse** provides engineering teams with an ultra-responsive, real-time observability and telemetry operations center. Designed for modern Kubernetes clusters and microservices, it tracks live p95/p99 response latency, error rates, system throughput, and automatically flags SLA breaches.

---

## 🚀 Key Capabilities

- ⚡ **Real-Time Stream Engine**: Low-overhead telemetry aggregation with moving-window percentile computation.
- 🎯 **Incident Rules Evaluator**: Evaluates SLA thresholds (latency degradation, error spikes, CPU saturation).
- 🎨 **Glassmorphism Dark UI**: Gorgeous, responsive web dashboard built with strict TypeScript and modern CSS.
- 📈 **Service Health Metrics**: Live status indicators (`HEALTHY`, `DEGRADED`, `CRITICAL`), request load, and uptime tracking.
- 🐳 **Containerized**: Ready to deploy via Docker and Kubernetes manifest.

---

## 🏛️ Architecture

```text
  [ Microservices & K8s Nodes ]
                 │
                 ▼ (Telemetry Streams)
    ┌──────────────────────────┐
    │  Telemetry Aggregator    │  ◄── P95 / P99 Calculation & Moving Window
    └────────────┬─────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │   Alert Rules Engine     │  ◄── SLA Violation & Anomaly Thresholds
    └────────────┬─────────────┘
                 │
                 ▼
    ┌──────────────────────────┐
    │   Real-Time Dashboard    │  ◄── Glassmorphism Dark UI & Incident Logs
    └──────────────────────────┘
```

---

## ⚡ Quick Start

```bash
git clone https://github.com/rad03i2/CloudPulse-Dashboard.git
cd CloudPulse-Dashboard

# Install dependencies
npm install

# Build TypeScript
npm run build

# Start telemetry server
npm start
```
Open **`http://localhost:3000`** in your browser to view the live dashboard.

---

## 🇸🇦 نظرة عامة باللغة العربية

### ما هو نظام CloudPulse Dashboard؟
**CloudPulse Dashboard** هي منصة متطورة لمراقبة أداء السيرفرات السحابية والخدمات المصغرة (Microservices) في الوقت الفعلي. تمنح فرق الهندسة والـ DevOps رؤية شاملة لمعدلات الاستجابة، ونسب الأخطاء، وحالة الخوادم مع تنبيهات فورية عند حدوث أي خلل.

### أهم المزايا:
1. **مراقبة حية لحظية**: حساب دقيق لسرعة الاستجابة (P95 و P99 Latency) ومعدل الطلبات في الثانية (RPS).
2. **رصد الأعطال التلقائي**: تقييم مستمر لسلامة الخدمات وتصنيفها الفوري (`سليم`، `متراجع`، `حرج`).
3. **تصميم عصري وجذاب**: واجهة بالوضع الليلي مع بطاقات تفاعلية متجاوبة مع كافة الشاشات.

---

## 💼 Commercial DevOps & Fullstack Solutions
### استفسارات التعاقد وتطوير الحلول السحابية ولوحات التحكم

Looking for custom infrastructure monitoring, SaaS dashboard development, or full-stack enterprise systems?
هل تبحث عن بناء لوحات تحكم مخصصة لشركتك، أو أنظمة مراقبة بنية تحتية سحابية متطورة؟

- 📩 **Contact**: Reach out via GitHub [@rad03i2](https://github.com/rad03i2)
- 🤝 **Freelance & Enterprise Consulting**: Available for full-stack TypeScript, React, and DevOps contracts.

---

## 📄 License
Licensed under the [MIT License](LICENSE). Developed by [rad03i2](https://github.com/rad03i2).
