import { ActionPanel, Action, Detail, Form, showToast, Toast, getPreferenceValues } from "@raycast/api";
import { useState } from "react";

const API_URL = "https://analytics.dugganusa.com/api/v1";

interface Preferences { apiKey: string; }

export default function TorCheckCommand() {
  const [result, setResult] = useState<string | null>(null);
  const { apiKey } = getPreferenceValues<Preferences>();

  async function handleSubmit(values: { ip: string }) {
    const ip = values.ip.trim();
    if (!ip) return;

    showToast({ style: Toast.Style.Animated, title: "Checking Tor relay " + ip + "..." });

    try {
      const headers: Record<string, string> = { Accept: "application/json" };
      if (apiKey) headers["Authorization"] = "Bearer " + apiKey;

      const res = await fetch(`${API_URL}/tor/relays?q=${encodeURIComponent(ip)}&limit=1`, { headers });
      const json = await res.json() as any;
      const relays = json.data?.relays || json.data?.hits || [];

      if (relays.length > 0 && relays[0].address === ip) {
        const r = relays[0];
        const flags = Array.isArray(r.flags) ? r.flags.join(", ") : (r.flags || "");
        setResult(
          `# 🧅 Tor Relay Found\n\n` +
          `| Field | Value |\n|-------|-------|\n` +
          `| **IP** | \`${ip}\` |\n` +
          `| **Nickname** | ${r.nickname || "?"} |\n` +
          `| **Flags** | ${flags} |\n` +
          `| **Country** | ${r.country || "?"} |\n` +
          `| **ASN** | ${r.asnOrg || r.asn || "?"} |\n` +
          `| **Bandwidth** | ${r.bandwidth || "?"} |\n` +
          `| **First Seen** | ${r.firstSeen || "?"} |\n\n` +
          `[View relay details](${API_URL}/tor/relay/${encodeURIComponent(r.fingerprint || ip)})\n\n` +
          `---\n*DugganUSA Tor Infrastructure Attribution Framework*`
        );
        showToast({ style: Toast.Style.Failure, title: "Tor relay: " + (r.nickname || ip) });
      } else {
        setResult(`# ✅ Not a Tor Relay\n\n\`${ip}\` is not a known Tor relay in our consensus data (10,000+ relays indexed).\n\n---\n*DugganUSA Tor Infrastructure Attribution Framework*`);
        showToast({ style: Toast.Style.Success, title: "Not a Tor relay" });
      }
    } catch (e: any) {
      showToast({ style: Toast.Style.Failure, title: "Error: " + e.message });
    }
  }

  if (result) {
    return (
      <Detail
        markdown={result}
        actions={
          <ActionPanel>
            <Action.OpenInBrowser title="View in Browser" url={`${API_URL}/tor/stats`} />
            <Action title="Check Another" onAction={() => setResult(null)} />
          </ActionPanel>
        }
      />
    );
  }

  return (
    <Form actions={<ActionPanel><Action.SubmitForm title="Check Tor Relay" onSubmit={handleSubmit} /></ActionPanel>}>
      <Form.TextField id="ip" title="IP Address" placeholder="e.g. 89.58.26.216" />
    </Form>
  );
}
