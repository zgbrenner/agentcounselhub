import type { GuidanceResource } from "@/lib/types";

export const guidanceResources: GuidanceResource[] = [
  {
    id: "guidance_cooley_startup",
    slug: "cooley-go-startup-formation",
    title: "Startup formation and financing resources",
    publisher: "Cooley GO",
    url: "https://www.cooleygo.com/",
    category: "Startups",
    jurisdiction: "United States",
    summary: "Public startup guidance and tools useful for founders, early-stage companies, and counsel. This prototype stores metadata and links out rather than copying full text.",
    tags: ["startups", "formation", "financing", "venture"],
    recommendedUse: "link_and_summarize",
    licenseNote: "Link and summarize unless source terms clearly permit reuse."
  },
  {
    id: "guidance_yc_safe",
    slug: "yc-safe-financing-documents",
    title: "SAFE financing documents",
    publisher: "Y Combinator",
    url: "https://www.ycombinator.com/documents/",
    category: "Templates",
    jurisdiction: "United States",
    summary: "Canonical public source for Y Combinator financing templates. Track version and source URL before reusing or adapting.",
    tags: ["safe", "templates", "startup financing", "venture"],
    recommendedUse: "link_and_summarize",
    licenseNote: "Confirm current template terms before storing or modifying full documents."
  },
  {
    id: "guidance_court_self_help",
    slug: "california-courts-self-help",
    title: "California Courts Self-Help Guide",
    publisher: "California Courts",
    url: "https://selfhelp.courts.ca.gov/",
    category: "Court self-help",
    jurisdiction: "California",
    summary: "Official public self-help materials from the California court system, useful for procedural guidance and public forms.",
    tags: ["self-help", "forms", "procedure", "california"],
    recommendedUse: "link_and_summarize",
    licenseNote: "Prefer official links and source metadata."
  },
  {
    id: "guidance_ftc_privacy",
    slug: "ftc-business-privacy-security",
    title: "Business guidance on privacy and security",
    publisher: "Federal Trade Commission",
    url: "https://www.ftc.gov/business-guidance/privacy-security",
    category: "Privacy",
    jurisdiction: "United States",
    summary: "Public agency guidance for businesses on privacy, security, advertising, and consumer protection compliance.",
    tags: ["privacy", "security", "consumer protection", "agency guidance"],
    recommendedUse: "link_and_summarize",
    licenseNote: "Government-source materials may have different reuse rules; preserve source attribution and retrieval date."
  }
];
