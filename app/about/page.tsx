import type { Metadata } from "next";
import PolicyShell from "@/components/Legal/PolicyShell";

export const metadata: Metadata = {
  title: "About Skiller | Skiller",
  description:
    "Operational overview of Skiller, its open-use model, contribution path, and maintenance approach.",
};

export default function AboutPage() {
  return (
    <PolicyShell
      title="About Skiller"
      description="Skiller is currently published as a free tool for free use and learning. It is intentionally practical, adaptable, and open to contribution while the platform grows into a stronger self-sustaining model."
    >
      <section>
        <h2 className="text-lg font-semibold text-black">Current use model</h2>
        <p className="mt-2">
          The platform is open in its current form and can be adopted,
          customized, and improved for real learning use. It is being operated
          in a lightweight public mode while usage and community traffic grow.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Return model</h2>
        <p className="mt-2">
          Return-model planning is expected to begin once open traffic grows
          beyond roughly 400 active users in the platform’s public form. Until
          then, the priority remains access, learning value, and practical
          iteration.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Maintenance and roadmap</h2>
        <p className="mt-2">
          Most future advancements are added on a non-timed basis. In its
          current maintenance mode, issues are handled on a monthly cycle where
          practical, while faster and more aggressive feature work is expected
          only after stronger funding or a more self-sustaining traffic-backed
          operating model is reached.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-black">Open contributions</h2>
        <p className="mt-2">
          Open contributions are welcome. If you want to contribute to the
          project, reach out to{" "}
          <a
            href="mailto:support@khusoma.org"
            className="font-medium text-black underline"
          >
            support@khusoma.org
          </a>{" "}
          to be added to the project.
        </p>
      </section>
    </PolicyShell>
  );
}
