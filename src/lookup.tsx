import { ActionPanel, Action, Detail, Form, showToast, Toast, getPreferenceValues } from "@raycast/api";
import { useState } from "react";

const API_URL = "https://analytics.dugganusa.com/api/v1";

interface Preferences { apiKey: string; }

function summarize(data: Record<string, any[]>): string {
  const parts: string[] = [];
  for (const [idx, hits] of Object.entries(data)) {
    if (!Array.isArray(hits) || !hits.length) continue;
    const f = hits[0];
    if (idx === "iocs") parts.push(`${f.malware_family || f.threat_type || "?"} (${f.source || "?"})`);
    else if (idx === "block_events") parts.push(`Blocked ${hits.length}x`);
    else if (idx === "pulses") parts.push(`${hits.length} OTX pulse(s)`);
    else if (idx === "cisa_kev") parts.push("CISA KEV");
    else if (idx === "adversaries") parts.push(`APT: ${f.name || "?"}`);
    else parts.push(`${idx}: ${hits.length}`);
  }
  return parts.join(" · ") || "Match found in DugganUSA index";
}

export default function LookupCommand() {
  const [result, setResult] = useState<string | null>(null);
  const { apiKey } = getPreferenceValues<Preferences>();

  async function handleSubmit(values: { indicator: string }) {
    const value = values.indicator.trim();
    if (!value) return;

    showToast({ style: Toast.Style.Animated, title: "Checking " + value + "..." });

    try {
      const headers: Record<string, string> = { Accept: "application/json" };
      if (apiKey) headers["Authorization"] = "Bearer " + apiKey;

      const res = await fetch(`${API_URL}/search/correlate?q=${encodeURIComponent(value)}`, { headers });
      const json = await res.json() as any;
      const correlations = json.data?.correlations || {};
      const totalHits = Object.values(correlations)
        .reduce((sum: number, hits: any) => sum + (Array.isArray(hits) ? hits.length : 0), 0);

      if (totalHits > 0) {
        const summary = summarize(correlations);
        setResult(`# ⚠️ Threat Indicator Found\n\n**${value}**\n\n${summary}\n\n**${totalHits} cross-index hits**\n\n[View full enrichment](${API_URL}/search/correlate?q=${encodeURIComponent(value)})\n\n---\n*Powered by [DugganUSA](https://www.dugganusa.com) · 1.08M+ IOCs · [AIPM Audit](https://aipmsec.com)*`);
        showToast({ style: Toast.Style.Failure, title: totalHits + " threat hits found!" });
      } else {
        setResult(`# ✅ Clean\n\n**${value}**\n\nNot found in 1,080,000+ IOC index.\n\n---\n*Powered by [DugganUSA](https://www.dugganusa.com) · [Free API Key](https://analytics.dugganusa.com/stix/register)*`);
        showToast({ style: Toast.Style.Success, title: "Clean — no threats found" });
      }
    } catch (e: any) {
      showToast({ style: Toast.Style.Failure, title: "API Error", message: e.message });
    }
  }

  if (result) {
    return (
      <Detail
        markdown={result}
        actions={
          <ActionPanel>
            <Action title="New Lookup" onAction={() => setResult(null)} />
            <Action.OpenInBrowser title="Open AIPM Audit" url="https://aipmsec.com" />
            <Action.OpenInBrowser title="Get Free API Key" url="https://analytics.dugganusa.com/stix/register" />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <Form actions={<ActionPanel><Action.SubmitForm title="Look Up" onSubmit={handleSubmit} /></ActionPanel>}>
      <Form.TextField id="indicator" title="Indicator" placeholder="IP, domain, hash, or CVE..." autoFocus />
      <Form.Description text="Checks against 1,080,000+ IOCs from the DugganUSA STIX feed. 275+ consumers in 46 countries." />
    </Form>
  );
}
