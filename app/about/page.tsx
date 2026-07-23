import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-slate-200 bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_52%,_#f59e0b_100%)] px-6 py-10 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:px-8">
        <p className="text-sm uppercase tracking-[0.24em] text-white/70">
          About Skiller
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">
          Open learning infrastructure, published in a practical form.
        </h1>
        <p className="mt-4 max-w-3xl text-sm text-white/80 sm:text-base">
          Skiller is currently available as a free tool for free use and
          learning. It is designed to be adopted, customized, and improved in
          the open while the platform continues to grow.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">
            Current operating model
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            The platform is open in its current form and is being maintained as
            a practical learning and delivery tool. Return-model planning is
            expected to begin once open traffic grows beyond roughly 400 active
            users in this public form.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Most future advancements are added on a non-timed basis while the
            product remains in maintenance-first mode. Issues are reviewed and
            handled on a monthly cadence, with faster feature development
            expected once funding or a stronger self-sustaining traffic model is
            reached.
          </p>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
          <h2 className="text-xl font-semibold text-slate-950">
            Contributing and support
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            Open contributions are welcome. If you want to contribute to the
            project, reach out to{" "}
            <a
              href="mailto:support@khusoma.org"
              className="font-medium text-slate-950 underline"
            >
              support@khusoma.org
            </a>{" "}
            to be added to the project.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            This platform is meant to be clear, usable, and adaptable first. As
            support grows, the roadmap can move from careful maintenance into
            more aggressive feature delivery.
          </p>
          <div className="mt-6">
            <Link
              href="/dashboard"
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open Dashboard
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
