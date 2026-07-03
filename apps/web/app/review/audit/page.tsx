import Link from "next/link";
import { ReviewAuditPanel } from "@/components/ReviewAuditPanel";

export default function ReviewAuditPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Review history</p>
          <h1>Track review activity over time.</h1>
          <p>
            This local history records when review items are created, updated, annotated, or removed. It gives the prototype a shape for a future server-backed history log.
          </p>
          <div className="button-row">
            <Link className="secondary-button" href="/review">Back to queue</Link>
          </div>
        </div>
      </section>
      <ReviewAuditPanel />
    </>
  );
}
