import Link from "next/link";
import { SubmissionForm } from "@/components/SubmissionForm";

export default function SubmitPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Community submissions</p>
          <h1>Suggest a source, correction, or update.</h1>
          <p>
            This MVP stores submissions locally. The next version can move submissions into a server-side workflow with duplicate checks, source review, and attorney-aware approvals.
          </p>
          <div className="button-row">
            <Link className="secondary-button" href="/review">Open local review page</Link>
          </div>
        </div>
      </section>
      <SubmissionForm />
    </>
  );
}
