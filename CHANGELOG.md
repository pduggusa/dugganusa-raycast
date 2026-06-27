# Changelog

## 1.2.0 (2026-06-27)

### Documentation & Feed-Awareness

- **Feed-quality validation, now provable live.** README adds the three live, no-auth, durable validation endpoints behind the corpus this extension queries: novelty ([feed-uniqueness](https://analytics.dugganusa.com/api/v1/feed-uniqueness), ~75%+ not in ThreatFox), timeliness ([kev-lead](https://analytics.dugganusa.com/api/v1/kev-lead), ~31 days ahead of CISA KEV), and accuracy ([spamhaus-validation](https://analytics.dugganusa.com/api/v1/spamhaus-validation), independently corroborated).
- **API-key enforcement corrected.** The STIX feed is API-key-enforced (anonymous → 401, unregistered Bearer → 429). The free tier is a free *registered* key; the `apiKey` preference is now marked required and docs no longer say it "works without a key."
- **IOC count aligned to 1.10M+** across the README, command descriptions, and lookup result/empty-state copy.

## 1.1.0

- Threat Intel Lookup, AIPM Audit, Scan Clipboard, Tor Relay Check, and Tor Relay Hunt commands.
