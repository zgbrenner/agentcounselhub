import { LocalSubmissionReviewPanel } from "@/components/LocalSubmissionReviewPanel";

export default function ReviewPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Local submission review</p>
          <h1>Review submitted sources before they enter the index.</h1>
          <p>
            This page is still local-only. It gives the MVP a concrete review workflow shape before adding a server-side queue, reviewer accounts, or attorney approval roles.
          </p>
        </div>
      </section>
      <LocalSubmissionReviewPanel />
    </>
  );
}
