# DugganUSA Threat Intel — Raycast Extension

**Docs:** https://docs.dugganusa.com/quickstart/

**You do you. I do me. We share contexts.**

Your launcher keeps your workflow; one keystroke borrows the DugganUSA Feed's context on an indicator.

**Instant IOC lookup from your Mac launcher. Type an IP, get enrichment.**

## What's New

The corpus this extension queries now exposes **four live, no-auth, durable validation endpoints** so you can verify feed quality yourself — they survive deploys, so the numbers are real:

- **Novelty** — [feed-uniqueness](https://analytics.dugganusa.com/api/v1/feed-uniqueness): how much of our independently sourced data is not already in ThreatFox, so you can see what this feed adds beside the feeds you already run.
- **Timeliness** — [kev-lead](https://analytics.dugganusa.com/api/v1/kev-lead): a live ledger of when each exploited CVE entered our corpus next to its CISA KEV listing date, with receipts, including the ones we had no record of.
- **Accuracy** — [spamhaus-validation](https://analytics.dugganusa.com/api/v1/spamhaus-validation): Spamhaus **independently corroborates** our first-hand contributions.
- **Liveness** — [feed-efficacy](https://analytics.dugganusa.com/api/v1/feed-efficacy): opt-in consumer reports of when our indicators actually fire on real traffic — proof the feed is operationally live, not just large.

Type an IP, and you can check the corpus behind the verdict yourself on the endpoints above. (We cap our own claims at 95% honest confidence.)

## Commands

| Command | Description |
|---------|-------------|
| **Threat Intel Lookup** | Check an IP, domain, hash, or CVE against the DugganUSA Feed |
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

The DugganUSA feed is **API-key-enforced** — anonymous requests and unregistered keys return `401`; a key past its daily limit returns `429`. Both show as UNKNOWN, never clean. The free tier (10 queries/day — one clipboard scan can use up to 20; [pricing](https://analytics.dugganusa.com/pricing)) is a **free registered key**, not anonymous access. Register (30 seconds, no card) at [analytics.dugganusa.com/stix/register](https://analytics.dugganusa.com/stix/register).

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

Same DugganUSA Feed, surfaced wherever you live. Open source, MIT licensed, receipts on every repo.

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
| [dredd-mcp](https://github.com/pduggusa/dredd-mcp) | Dredd: pre-flight MCP security |

Backed by the [DugganUSA Feed](https://analytics.dugganusa.com/stix). Numbers are live: [/api/v1/search/stats](https://analytics.dugganusa.com/api/v1/search/stats). Pricing: [analytics.dugganusa.com/pricing](https://analytics.dugganusa.com/pricing). Contact: help@dugganusa.com.

_Threat intelligence you can check._
