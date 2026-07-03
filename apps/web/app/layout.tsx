import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentCounsel Hub",
  description: "Open, AI-readable legal research platform prototype."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <Link className="brand" href="/">
              <strong>AgentCounsel Hub</strong>
              <span>Open legal research, structured for humans and AI.</span>
            </Link>
            <nav className="nav" aria-label="Primary navigation">
              <Link href="/cases">Cases</Link>
              <Link href="/guidance">Guidance</Link>
              <Link href="/saved">Saved</Link>
              <Link href="/submit">Submit</Link>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            Prototype only. Not legal advice. AI-generated metadata and treatment signals require source verification and attorney review where appropriate.
          </footer>
        </div>
      </body>
    </html>
  );
}
