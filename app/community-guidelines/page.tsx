import type { Metadata } from "next";
import PolicyShell from "@/components/Legal/PolicyShell";

export const metadata: Metadata = {
  title: "Community Guidelines | Skiller",
  description: "Basic conduct standards for learners, tutors, and community participation on Skiller.",
};

export default function CommunityGuidelinesPage() {
  return (
    <PolicyShell
      title="Community Guidelines"
      description="These guidelines set the expected tone for discussions, mentorship, course comments, and other community interactions on the platform."
    >
      <section>
        <h2 className="text-lg font-semibold text-black">Be respectful</h2>
        <p className="mt-2">
          Treat learners, tutors, and staff with respect. Harassment, hateful
          speech, bullying, threats, or targeted abuse are not allowed.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Keep it useful</h2>
        <p className="mt-2">
          Community spaces should support learning. Stay on topic, avoid spam,
          avoid misleading claims, and do not flood discussions with repetitive
          or low-value posts.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Protect privacy</h2>
        <p className="mt-2">
          Do not post someone else&apos;s private information, credentials,
          assessment answers, or confidential school or business material
          without proper permission.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">No abuse of the learning process</h2>
        <p className="mt-2">
          Do not impersonate others, cheat through restricted assessments,
          upload malicious files, or misuse platform tools to disrupt learning
          activity for others.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Enforcement</h2>
        <p className="mt-2">
          We may remove content or restrict accounts when conduct creates safety,
          moderation, platform integrity, or legal risk. Serious or repeated
          violations may lead to suspension or permanent removal.
        </p>
      </section>
    </PolicyShell>
  );
}
