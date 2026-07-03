import { SubmissionForm } from "@/components/SubmissionForm";

export default function SubmitPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Community submissions</p>
          <h1>Suggest a source, correction, or update.</h1>
          <p>
            This MVP stores submissions locally as a mock review queue. The next version can move submissions into a server-side triage workflow with duplicate checks, source review, and attorney-aware approvals.
          </p>
        </div>
      </section>
      <SubmissionForm />
    </>
  );
}
