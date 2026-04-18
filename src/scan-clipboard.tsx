import { ActionPanel, Action, Detail, showToast, Toast, Clipboard, getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";

const API_URL = "https://analytics.dugganusa.com/api/v1";
const PATTERNS: Record<string, RegExp> = {
  ipv4: /\b(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\b/g,
  domain: /\b(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:com|net|org|io|ai|dev|xyz|ru|cn|ir|kp)\b/gi,
  sha256: /\b[a-fA-F0-9]{64}\b/g,
  cve: /CVE-\d{4}-\d{4,7}/gi,
};
const SKIP = new Set(["0.0.0.0","127.0.0.1","8.8.8.8","1.1.1.1","google.com","github.com","microsoft.com","example.com","localhost"]);

interface Preferences { apiKey: string; }

export default function ScanClipboardCommand() {
  const [markdown, setMarkdown] = useState("Scanning clipboard...");
  const { apiKey } = getPreferenceValues<Preferences>();

  useEffect(() => {
    (async () => {
      const text = await Clipboard.readText() || "";
      if (!text.trim()) { setMarkdown("# Clipboard is empty"); return; }

      const iocs: string[] = [];
      const seen = new Set<string>();
      for (const [type, regex] of Object.entries(PATTERNS)) {
        for (const m of text.matchAll(regex)) {
          const v = m[0].toLowerCase();
          if (SKIP.has(v) || seen.has(v)) continue;
          seen.add(v);
          iocs.push(m[0]);
        }
      }

      if (!iocs.length) { setMarkdown("# No IOCs found in clipboard"); return; }

      showToast({ style: Toast.Style.Animated, title: `Checking ${iocs.length} indicator(s)...` });

      const headers: Record<string, string> = { Accept: "application/json" };
      if (apiKey) headers["Authorization"] = "Bearer " + apiKey;

      const lines = ["# Clipboard Scan Results\n"];
      let threats = 0;

      for (const value of iocs.slice(0, 20)) {
        try {
          const res = await fetch(`${API_URL}/search/correlate?q=${encodeURIComponent(value)}`, { headers });
          const json = await res.json() as any;
          const correlations = json.data?.correlations || {};
          const hits = Object.values(correlations).reduce((s: number, h: any) => s + (Array.isArray(h) ? h.length : 0), 0);
          if (hits > 0) {
            lines.push(`- ⚠️ **\`${value}\`** — ${hits} hits`);
            threats++;
          } else {
            lines.push(`- ✅ \`${value}\` — clean`);
          }
        } catch {
          lines.push(`- ❓ \`${value}\` — lookup failed`);
        }
      }

      lines.push(`\n---\n**${threats} threat(s)** in ${Math.min(iocs.length, 20)} checked.`);
      if (iocs.length > 20) lines.push(`*(${iocs.length - 20} more not checked — capped at 20)*`);
      lines.push(`\n*[DugganUSA](https://www.dugganusa.com) · [Free API Key](https://analytics.dugganusa.com/stix/register)*`);

      setMarkdown(lines.join("\n"));
      showToast({ style: threats > 0 ? Toast.Style.Failure : Toast.Style.Success, title: `${threats} threat(s) found` });
    })();
  }, []);

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser title="Open AIPM Audit" url="https://aipmsec.com" />
          <Action.OpenInBrowser title="Get Free API Key" url="https://analytics.dugganusa.com/stix/register" />
        </ActionPanel>
      }
    />
  );
}
