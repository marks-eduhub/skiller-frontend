import type { Metadata } from "next";
import PolicyShell from "@/components/Legal/PolicyShell";

export const metadata: Metadata = {
  title: "Terms of Service | Skiller",
  description: "Standard platform terms for using Skiller and Khusoma services.",
};

export default function TermsPage() {
  return (
    <PolicyShell
      title="Terms of Service"
      description="These terms set the basic rules for using Skiller as a learner, tutor, school, or partner. They are intentionally plain and operational rather than exhaustive legal drafting."
    >
      <section>
        <h2 className="text-lg font-semibold text-black">Accounts</h2>
        <p className="mt-2">
          You are responsible for keeping your login details secure and for
          activity that happens through your account. Information you provide
          must be accurate and reasonably up to date.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Using the platform</h2>
        <p className="mt-2">
          You may use Skiller only for lawful education, training, and community
          activity. You must not misuse the service, interfere with platform
          operations, scrape protected data, attempt unauthorised access, or use
          the platform to distribute harmful, deceptive, or unlawful content.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Content and materials</h2>
        <p className="mt-2">
          Course content, platform branding, software, and materials remain the
          property of Skiller, Khusoma, tutors, or other rights holders unless
          clearly stated otherwise. You may not copy, resell, or republish
          protected material beyond normal educational use without permission.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Learner and tutor conduct</h2>
        <p className="mt-2">
          Users must communicate respectfully, avoid harassment, and not submit
          work that is fraudulent, abusive, or designed to mislead other users.
          We may limit, suspend, or remove accounts that create safety,
          integrity, or legal risk for the platform or community.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Payments and subscriptions</h2>
        <p className="mt-2">
          If paid services are offered, the applicable price, billing cycle, and
          refund or cancellation terms will be shown at the point of purchase.
          Access may be limited or revoked for unpaid or reversed charges where
          permitted by law and platform policy.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Service availability</h2>
        <p className="mt-2">
          We aim to keep the service available and reliable, but uptime is not
          guaranteed. Features may change, pause, or be removed when needed for
          maintenance, security, compliance, or product improvement.
        </p>
      </section>
    </PolicyShell>
  );
}
