export type SubmissionStatus = "pending" | "accepted" | "needs_more_info" | "rejected";

export type LocalSubmission = {
  id: string;
  type: string;
  title: string;
  url: string;
  jurisdiction?: string;
  topics?: string;
  description?: string;
  contact?: string;
  submittedAt: string;
  status: SubmissionStatus;
  triageNotes: string[];
};

export function classifySubmission(input: {
  type: string;
  title: string;
  url: string;
  description?: string;
}): Pick<LocalSubmission, "status" | "triageNotes"> {
  const notes: string[] = [];
  const normalizedUrl = input.url.toLowerCase();
  const description = input.description?.trim() ?? "";

  if (!normalizedUrl.startsWith("https://")) {
    notes.push("Prefer secure source URLs before publication.");
  }

  if (description.length < 40) {
    notes.push("Needs more explanation before review.");
  }

  if (["case", "guidance link", "template", "correction"].includes(input.type.toLowerCase())) {
    notes.push("Submission type is within MVP scope.");
  } else {
    notes.push("Submission type may need manual scope review.");
  }

  return {
    status: notes.some((note) => note.includes("Needs more")) ? "needs_more_info" : "pending",
    triageNotes: notes
  };
}
