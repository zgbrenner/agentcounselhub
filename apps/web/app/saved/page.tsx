import { SavedResearchPanel } from "@/components/SavedResearchPanel";

export default function SavedPage() {
  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <p className="eyebrow">Local research folders</p>
          <h1>Your saved cases stay on your device.</h1>
          <p>
            The MVP uses browser IndexedDB. Saved research is not synced, uploaded, or associated with an account.
          </p>
        </div>
      </section>
      <SavedResearchPanel />
    </>
  );
}
