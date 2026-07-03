import { ReviewQueuePanel } from "@/components/ReviewQueuePanel";

export default function ReviewPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Review queue</p>
          <h1>Turn submissions into reviewed source decisions.</h1>
          <p>
            This local prototype queue lets reviewers triage submissions, add notes, and mark items as approved, rejected, pending, or needing more information.
          </p>
        </div>
      </section>
      <ReviewQueuePanel />
    </>
  );
}
