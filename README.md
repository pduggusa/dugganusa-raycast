# DugganUSA Threat Intel — Raycast Extension

**Instant IOC lookup from your Mac launcher. Type an IP, get enrichment.**

## Commands

| Command | Description |
|---------|-------------|
| **Threat Intel Lookup** | Check an IP, domain, hash, or CVE against 1.08M+ IOCs |
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

Free tier (500 queries/day) works without a key. Get one at [analytics.dugganusa.com/stix/register](https://analytics.dugganusa.com/stix/register).

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
