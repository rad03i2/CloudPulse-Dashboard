# Security Policy

## Supported version
Security fixes target the latest `main` branch.

## Reporting
Please report a suspected vulnerability privately through GitHub's security reporting features when available. Do not publish credentials, production telemetry, exploit details, or personal data in a public issue.

## Deployment guidance
CloudPulse has no built-in authentication in the current release. Keep it on a trusted network or place it behind an authenticated reverse proxy with TLS before exposing it externally. Never submit secrets through the telemetry endpoint. The process stores current telemetry and recent alerts only in memory and makes no outbound requests.
