import type { Metadata } from "next";
import PolicyShell from "@/components/Legal/PolicyShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Skiller",
  description: "How Skiller and Khusoma collect, use, and protect learner data.",
};

export default function PrivacyPage() {
  return (
    <PolicyShell
      title="Privacy Policy"
      description="This page explains what information Skiller collects, how it is used, and the basic choices learners, tutors, schools, and partners have when using the platform."
    >
      <section>
        <h2 className="text-lg font-semibold text-black">What we collect</h2>
        <p className="mt-2">
          We may collect account details such as your name, email address,
          school or organisation, profile image, course progress, quiz results,
          messages, support requests, and technical usage data such as device,
          browser, IP address, and session logs.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">How we use it</h2>
        <p className="mt-2">
          We use data to create and secure accounts, deliver courses, track
          progress, support tutors and learners, improve platform reliability,
          investigate abuse, and communicate about account, service, or learning
          activity that matters to you.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">When we share data</h2>
        <p className="mt-2">
          We may share information with hosting providers, analytics providers,
          payment or communication vendors, and authorised institutional
          partners where needed to operate the service. We do not sell personal
          data. We may also disclose data when required by law or to protect the
          platform, our users, or the public.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Retention and security</h2>
        <p className="mt-2">
          We keep data for as long as it is reasonably needed for the service,
          legal compliance, dispute handling, and record keeping. We use
          practical technical and organisational controls, but no internet
          system can be guaranteed fully secure.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Cross-border use</h2>
        <p className="mt-2">
          Skiller may serve users across multiple African countries and may use
          infrastructure or service providers located in other regions. By using
          the platform, you understand that data may be processed outside your
          home country, subject to applicable safeguards and provider controls.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Your choices</h2>
        <p className="mt-2">
          You may request access, correction, or deletion of account data where
          applicable. If a learner uses the platform through a school, parent,
          guardian, or sponsoring organisation, some requests may need to be
          handled through that institution first.
        </p>
      </section>
    </PolicyShell>
  );
}
