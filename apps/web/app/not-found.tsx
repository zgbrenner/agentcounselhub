import Link from "next/link";

export default function NotFound() {
  return (
    <section className="panel">
      <p className="eyebrow">Not found</p>
      <h1>That record is not in the prototype index yet.</h1>
      <p>Try the seed case search or submit a source suggestion.</p>
      <div className="button-row">
        <Link className="button" href="/cases">Search cases</Link>
        <Link className="secondary-button" href="/submit">Submit source</Link>
      </div>
    </section>
  );
}
