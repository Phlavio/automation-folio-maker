import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Phil Social Automation" },
      {
        name: "description",
        content:
          "Terms for Phil Social Automation, including authorized TikTok uploads, account responsibilities, acceptable use, and service availability.",
      },
      { property: "og:title", content: "Terms of Service | Phil Social Automation" },
    ],
    links: [{ rel: "canonical", href: "https://philipdev.onrender.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <LegalSection title="1. Service and acceptance">
        <p>
          These terms govern your use of Phil Social Automation. By using the application, you agree
          to these terms. If you do not agree, do not authorize an account or use the service.
        </p>
        <p>
          Phil Social Automation uses n8n workflows on the operator's own local server to automate
          social media publishing through official APIs. Its TikTok integration uses TikTok's
          official Content Posting API to upload and publish content you authorize, subject to the
          permissions and features TikTok makes available to the application.
        </p>
      </LegalSection>
      <LegalSection title="2. Your responsibilities">
        <p>
          You must have authority to use each connected account and the rights, licenses, and
          permissions needed for every video, caption, audio track, and other material you submit.
          You remain responsible for your content, publishing instructions, and account activity.
        </p>
        <p>
          Review the selected account, content, audience, and publishing settings before authorizing
          a post. Keep your account secure and notify the operator if you suspect unauthorized use.
        </p>
      </LegalSection>
      <LegalSection title="3. TikTok account authorization">
        <p>
          You authorize access through TikTok's OAuth authorization flow. The application uses the
          resulting credentials within the permissions you grant to carry out authorized uploads and
          publishing. Do not provide your TikTok password to the operator.
        </p>
        <p>
          You may revoke the application's access through your TikTok account settings and contact
          the operator to stop workflows and request deletion of locally held data. Revocation does
          not automatically remove content already sent to or published on TikTok.
        </p>
      </LegalSection>
      <LegalSection title="4. Acceptable use">
        <p>
          Do not use the application for unlawful activity, infringement, spam, impersonation,
          unauthorized account access, or content that violates TikTok's terms or Community
          Guidelines. Do not bypass API limits, permissions, moderation, or platform safeguards.
        </p>
        <p>
          The operator may suspend or stop access or workflows when misuse, security concerns, or
          platform restrictions require it.
        </p>
      </LegalSection>
      <LegalSection title="5. Content and third-party services">
        <p>
          You retain your rights in your content. By submitting it, you authorize the processing and
          transfer needed to perform your publishing instructions. TikTok processes submitted
          content under its own terms and policies.
        </p>
        <p>
          Phil Social Automation is independently operated and is not endorsed by TikTok. API access
          and successful publication depend on TikTok's permissions, review, limits, and service
          decisions. These terms do not promise approval of the application or of any content.
        </p>
      </LegalSection>
      <LegalSection title="6. Service availability">
        <p>
          The service depends on the local server, network connectivity, n8n workflows, and
          third-party APIs. It may be interrupted, changed, or discontinued. Uploads or posts may be
          delayed or fail; no uninterrupted availability or successful publication is guaranteed.
          Check publishing results before retrying to avoid duplicate posts.
        </p>
      </LegalSection>
      <LegalSection title="7. Privacy and changes">
        <p>
          The Privacy Policy explains how information is processed and how to request deletion.
          Updated terms will be published on this page with an updated effective date. Review these
          terms when using the service.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
