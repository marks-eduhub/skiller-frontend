import type { Metadata } from "next";
import PolicyShell from "@/components/Legal/PolicyShell";

export const metadata: Metadata = {
  title: "Cookie Notice | Skiller",
  description: "A plain-language summary of cookies and similar technologies used by Skiller.",
};

export default function CookiesPage() {
  return (
    <PolicyShell
      title="Cookie Notice"
      description="This notice explains the basic categories of cookies and similar technologies that may be used on the platform."
    >
      <section>
        <h2 className="text-lg font-semibold text-black">Essential cookies</h2>
        <p className="mt-2">
          These support sign-in, session handling, security, page navigation,
          and basic platform functionality. Without them, core learning and
          account flows may not work properly.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Performance and analytics</h2>
        <p className="mt-2">
          We may use analytics or diagnostic tools to understand feature usage,
          performance, and service quality. These tools help improve course
          delivery, reduce failures, and prioritise product fixes.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Preference storage</h2>
        <p className="mt-2">
          Some information may be stored in your browser to remember settings,
          recent activity, or interface choices so the experience feels more
          consistent across sessions.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Managing cookies</h2>
        <p className="mt-2">
          You can usually control cookies through your browser settings. Blocking
          some categories may affect sign-in, content loading, or other parts of
          the learning experience.
        </p>
      </section>
    </PolicyShell>
  );
}
