import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Phil Social Automation" },
      {
        name: "description",
        content:
          "How Phil Social Automation processes TikTok account information, OAuth credentials, video content, and requests for data deletion.",
      },
      { property: "og:title", content: "Privacy Policy | Phil Social Automation" },
    ],
    links: [{ rel: "canonical", href: "https://philipdev.onrender.com/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <aside
        aria-label="Policy details awaiting confirmation"
        className="border border-border bg-card p-5"
      >
        <p className="font-medium text-foreground">Operator confirmation required</p>
        <p className="mt-2">
          This policy describes the intended TikTok integration. The operator still needs to confirm
          the exact permissions and fields collected, credential storage and access controls,
          workflow logs and backups, retention and deletion procedures, and any additional service
          providers. Those details are marked below and should be finalized before submitting this
          policy for app review or connecting other people's accounts.
        </p>
      </aside>
      <LegalSection title="1. Scope and information processed">
        <p>
          This policy covers Phil Social Automation and its TikTok publishing integration, operated
          through n8n on the operator's own local server. It also describes relevant services used
          by this portfolio website.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            TikTok account information: account identifiers and any profile or creator information
            returned by the APIs within the permissions granted, such as a display name, avatar, or
            available publishing settings.
          </li>
          <li>
            OAuth credentials: access tokens, refresh tokens if issued, granted permissions, and
            expiration information used to maintain authorized API access.
          </li>
          <li>
            Content: videos, captions, publishing settings, and related information supplied for
            uploading or publishing to the selected account.
          </li>
          <li>
            Operational information: upload or publishing identifiers, status responses, errors, and
            workflow execution information needed to run or troubleshoot a publishing task.
          </li>
          <li>
            Contact information: information you choose to include when contacting the operator.
          </li>
        </ul>
        <p>
          <strong className="text-foreground">Needs confirmation:</strong> the enabled OAuth scopes,
          exact account fields, and which operational information is stored in n8n execution history
          or other logs.
        </p>
      </LegalSection>
      <LegalSection title="2. OAuth and account access">
        <p>
          TikTok handles account sign-in and consent through its OAuth flow. The application
          exchanges the resulting authorization code for API credentials and uses those credentials
          to make requests within the permissions you grant. Refresh tokens, when issued and used,
          allow renewed access without repeating sign-in until access expires or is revoked. The
          application does not need your TikTok password.
        </p>
        <p>
          OAuth tokens are stored in the self-hosted n8n Credentials system and processed by the
          local automation setup to support authorized account access and publishing. They are not
          part of these public legal pages.
        </p>
        <p>
          <strong className="text-foreground">Needs confirmation:</strong> the actual credential
          storage location, people with access, token lifecycle, and whether credentials or account
          information could appear in logs or backups.
        </p>
      </LegalSection>
      <LegalSection title="3. How information is used">
        <p>
          Information is processed to connect the account you authorize, retrieve applicable creator
          and publishing settings, upload or publish your selected content, check results,
          troubleshoot failures, and respond to support or deletion requests. TikTok receives the
          credentials and content needed for the relevant API requests.
        </p>
        <p>
          <strong className="text-foreground">Needs confirmation:</strong> any additional uses,
          analytics, or sharing beyond this publishing workflow. No claim about selling data or
          using it for advertising is made without verification of the actual setup.
        </p>
      </LegalSection>
      <LegalSection title="4. Third-party services">
        <p>
          TikTok processes authorization, account information, and submitted content under its own
          policies. The automation runs in self-hosted n8n. This portfolio is hosted on Render and
          loads fonts from Google Fonts, so website requests reach those services and can include
          technical request information such as an IP address and browser information.
        </p>
        <p>
          <strong className="text-foreground">Needs confirmation:</strong> any additional storage,
          logging, monitoring, media hosting, or other services connected to the publishing
          workflow, and whether any TikTok data passes through Render. This list is not a verified
          inventory of all workflow providers.
        </p>
        <p>
          See{" "}
          <a
            className="text-primary underline underline-offset-4"
            href="https://www.tiktok.com/legal/page/row/privacy-policy/en"
          >
            TikTok's Privacy Policy
          </a>
          ,{" "}
          <a
            className="text-primary underline underline-offset-4"
            href="https://render.com/privacy"
          >
            Render's Privacy Policy
          </a>
          , and{" "}
          <a
            className="text-primary underline underline-offset-4"
            href="https://policies.google.com/privacy"
          >
            Google's Privacy Policy
          </a>{" "}
          for their practices.
        </p>
      </LegalSection>
      <LegalSection title="5. Security">
        <p>
          OAuth credentials enable account access and must be treated as sensitive information. No
          specific encryption, access-control, backup, or monitoring configuration has been verified
          for the local automation server, and this policy does not guarantee those protections or
          absolute security.
        </p>
        <p>
          <strong className="text-foreground">Needs confirmation:</strong> the security measures
          actually enabled for credentials, server access, network access, workflow execution data,
          and backups.
        </p>
      </LegalSection>
      <LegalSection title="6. Retention">
        <p>
          Tokens, account information, content copies, and workflow records may have different
          storage lifecycles. A verified retention schedule has not yet been provided; this policy
          does not promise a fixed retention period or automatic deletion.
        </p>
        <p>
          <strong className="text-foreground">Needs confirmation:</strong> retention periods or
          criteria for each data category, including execution history, temporary media, logs, and
          backups, and what happens when an account is disconnected.
        </p>
      </LegalSection>
      <LegalSection title="7. Revoking access and requesting deletion">
        <p>
          You can revoke the application's authorization through your TikTok account settings. To
          request access to, correction of, or deletion of information held by the operator, email
          the contact below with the subject “Phil Social Automation data request” and identify the
          connected account and your request. Do not include tokens or passwords.
        </p>
        <p>
          The operator may need to confirm that you control the account before acting. Revoking
          TikTok access does not itself delete stored copies or logs. Deleting local information
          does not remove content already published on TikTok; manage that content through TikTok.
        </p>
        <p>
          <strong className="text-foreground">Needs confirmation:</strong> the identity-check
          process, deletion steps for active records and backups, response timing, and any legal
          reasons for retaining information. No deletion completion deadline is promised here.
        </p>
      </LegalSection>
      <LegalSection title="8. Policy updates">
        <p>
          Changes will be published on this page with an updated effective date. Contact the
          operator if you need clarification before authorizing an account.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
