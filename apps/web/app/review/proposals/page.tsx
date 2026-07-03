import Link from "next/link";
import { SourceProposalPanel } from "@/components/SourceProposalPanel";

export default function ReviewProposalsPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Source proposals</p>
          <h1>Convert approved review items into registry candidates.</h1>
          <p>
            Approved local review items can be exported as source registry proposals. This keeps the source registry curated instead of automatically adding every submission.
          </p>
          <div className="button-row">
            <Link className="secondary-button" href="/review">Back to queue</Link>
          </div>
        </div>
      </section>
      <SourceProposalPanel />
    </>
  );
}
