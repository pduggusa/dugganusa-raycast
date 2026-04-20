import { ActionPanel, Action, List, showToast, Toast, getPreferenceValues } from "@raycast/api";
import { useEffect, useState } from "react";

const API_URL = "https://analytics.dugganusa.com/api/v1";

interface Preferences { apiKey: string; }
interface Relay { address: string; nickname: string; country: string; asnOrg: string; flags: string[]; bandwidth: number; suspicionScore?: number; score?: number; }

export default function TorHuntCommand() {
  const [relays, setRelays] = useState<Relay[]>([]);
  const [loading, setLoading] = useState(true);
  const { apiKey } = getPreferenceValues<Preferences>();

  useEffect(() => {
    (async () => {
      try {
        const headers: Record<string, string> = { Accept: "application/json" };
        if (apiKey) headers["Authorization"] = "Bearer " + apiKey;

        const res = await fetch(`${API_URL}/tor/hunt`, { headers });
        const json = await res.json() as any;
        setRelays(json.data?.relays || json.data || []);
      } catch (e: any) {
        showToast({ style: Toast.Style.Failure, title: "Error: " + e.message });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <List isLoading={loading} searchBarPlaceholder="Filter suspicious Tor relays...">
      {relays.map((r, i) => {
        const flags = Array.isArray(r.flags) ? r.flags.join(", ") : "";
        const score = r.suspicionScore || r.score || 0;
        return (
          <List.Item
            key={r.address + i}
            title={r.nickname || r.address}
            subtitle={r.address}
            accessories={[
              { text: r.country || "?" },
              { text: `Score: ${score}` },
              { text: flags.includes("Exit") ? "EXIT" : "" },
            ]}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="View Relay" url={`${API_URL}/tor/relays?q=${r.address}`} />
                <Action.CopyToClipboard title="Copy IP" content={r.address} />
              </ActionPanel>
            }
          />
        );
      })}
    </List>
  );
}
