import { ActionPanel, Action, Form, open } from "@raycast/api";

export default function AipmCommand() {
  async function handleSubmit(values: { domain: string }) {
    const domain = values.domain.trim().toLowerCase()
      .replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
    if (domain && domain.includes(".")) {
      open("https://aipmsec.com/audit.html?domain=" + encodeURIComponent(domain));
    }
  }

  return (
    <Form actions={<ActionPanel><Action.SubmitForm title="Audit" onSubmit={handleSubmit} /></ActionPanel>}>
      <Form.TextField id="domain" title="Domain" placeholder="yourcompany.com" autoFocus />
      <Form.Description text="AIPM audits how GPT-4o, Claude, Gemini, Mistral, and DeepSeek perceive your brand. 5 models, 7 signals, 15 seconds. Free." />
    </Form>
  );
}
