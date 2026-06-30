# DugganUSA Threat Intel — Raycast Extension

**Instant IOC lookup from your Mac launcher. Type an IP, get enrichment.**

## What's New

The corpus this extension queries now exposes **four live, no-auth, durable validation endpoints** so you can verify feed quality yourself — they survive deploys, so the numbers are real:

- **Novelty** — [feed-uniqueness](https://analytics.dugganusa.com/api/v1/feed-uniqueness): ~75%+ of what we publish is **not in ThreatFox**.
- **Timeliness** — [kev-lead](https://analytics.dugganusa.com/api/v1/kev-lead): a live ledger of how far ahead of CISA KEV we flagged each exploited CVE — positive leads, same-day, and no-receipt all shown honestly, with receipts.
- **Accuracy** — [spamhaus-validation](https://analytics.dugganusa.com/api/v1/spamhaus-validation): Spamhaus **independently corroborates** our first-hand contributions.
- **Liveness** — [feed-efficacy](https://analytics.dugganusa.com/api/v1/feed-efficacy): opt-in consumer reports of when our indicators actually fire on real traffic — proof the feed is operationally live, not just large.

Type an IP and the verdict you get back is drawn from intel that is independently novel, early, and corroborated. (We cap our own claims at 95% honest confidence.)

## Commands

| Command | Description |
|---------|-------------|
| **Threat Intel Lookup** | Check an IP, domain, hash, or CVE against 1.5M+ IOCs |
| **AIPM Audit** | Audit any domain's AI presence — opens in browser |
| **Scan Clipboard** | Extract + check all IOCs from clipboard contents |

## Install

Raycast Store submission pending. Install from source:

```bash
git clone https://github.com/pduggusa/dugganusa-raycast.git
cd dugganusa-raycast
npm install
npm run dev
```

## Configuration

Set your API key in Raycast Preferences → Extensions → DugganUSA Threat Intel → API Key.

The DugganUSA feed is **API-key-enforced** — anonymous requests return `401`, an unregistered token returns `429`. The free tier (500 queries/day) is a **free registered key**, not anonymous access. Register (30 seconds, no card) at [analytics.dugganusa.com/stix/register](https://analytics.dugganusa.com/stix/register).

## Part of the DugganUSA Ecosystem

- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=DugganUSALLC.dugganusa-threat-intel)
- [CLI Tool](https://github.com/pduggusa/dugganusa-cli)
- [GitHub Action](https://github.com/pduggusa/dugganusa-action)
- [Chrome Extension](https://github.com/pduggusa/dugganusa-chrome)
- [Slack Bot](https://github.com/pduggusa/dugganusa-slack)
- [Splunk TA](https://github.com/pduggusa/dugganusa-splunk)
- [Sentinel](https://github.com/pduggusa/dugganusa-sentinel)
- [Elastic](https://github.com/pduggusa/dugganusa-elastic)
- [dugganusa.com](https://www.dugganusa.com)

## License

MIT — [DugganUSA LLC](https://www.dugganusa.com)

---

<!-- DUGGANUSA-FAMILY-FOOTER-V1 -->
## DugganUSA Defender Family

Same threat corpus, surfaced wherever you live. Open source, MIT licensed, receipts on every repo.

| Plugin | Surface |
|---|---|
| [dugganusa-scanner-core](https://github.com/pduggusa/dugganusa-scanner-core) | Core IOC scanning engine |
| [dugganusa-vscode](https://github.com/pduggusa/dugganusa-vscode) | VS Code extension |
| [dugganusa-splunk](https://github.com/pduggusa/dugganusa-splunk) | Splunk Technology Add-on |
| [dugganusa-slack](https://github.com/pduggusa/dugganusa-slack) | Slack bot |
| **dugganusa-raycast** _(this repo)_ | Raycast extension |
| [dugganusa-sentinel](https://github.com/pduggusa/dugganusa-sentinel) | Microsoft Sentinel TAXII connector |
| [dugganusa-obsidian](https://github.com/pduggusa/dugganusa-obsidian) | Obsidian plugin |
| [dugganusa-nvim](https://github.com/pduggusa/dugganusa-nvim) | Neovim plugin |
| [dugganusa-elastic](https://github.com/pduggusa/dugganusa-elastic) | Elastic / OpenSearch integration |
| [dugganusa-edge-shield](https://github.com/pduggusa/dugganusa-edge-shield) | Cloudflare Worker |
| [dugganusa-cli](https://github.com/pduggusa/dugganusa-cli) | CLI scanner |
| [dugganusa-chrome](https://github.com/pduggusa/dugganusa-chrome) | Chrome extension |
| [dugganusa-action](https://github.com/pduggusa/dugganusa-action) | GitHub Action |
| [dredd-mcp](https://github.com/pduggusa/dredd-mcp) | Pre-flight MCP security (this repo) |

Backed by the live DugganUSA threat intel platform: [analytics.dugganusa.com](https://analytics.dugganusa.com).

_Jeevesus saves. Dredd judges._
