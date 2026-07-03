export type ReviewStatus = "pending" | "needs_info" | "approved" | "rejected";

export type ReviewItem = {
  id: string;
  type: string;
  title: string;
  url: string;
  jurisdiction?: string;
  topics?: string;
  description?: string;
  contact?: string;
  submittedAt: string;
  reviewStatus: ReviewStatus;
  reviewerNote?: string;
  updatedAt?: string;
};

export type ReviewAuditAction = "created" | "status_changed" | "note_updated" | "removed";

export type ReviewAuditEvent = {
  id: string;
  itemId: string;
  itemTitle: string;
  action: ReviewAuditAction;
  createdAt: string;
  fromStatus?: ReviewStatus;
  toStatus?: ReviewStatus;
  note?: string;
};

const STORAGE_KEY = "agentcounsel-review-queue";
const AUDIT_STORAGE_KEY = "agentcounsel-review-audit";

export function readReviewQueue(): ReviewItem[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as ReviewItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeReviewQueue(items: ReviewItem[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items, null, 2));
}

export function readReviewAuditLog(): ReviewAuditEvent[] {
  const raw = window.localStorage.getItem(AUDIT_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as ReviewAuditEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeReviewAuditLog(events: ReviewAuditEvent[]): void {
  window.localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(events, null, 2));
}

function appendAuditEvent(event: Omit<ReviewAuditEvent, "id" | "createdAt">): void {
  const auditEvent: ReviewAuditEvent = {
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };

  writeReviewAuditLog([auditEvent, ...readReviewAuditLog()]);
}

export function addReviewItem(item: Omit<ReviewItem, "id" | "submittedAt" | "reviewStatus">): ReviewItem {
  const reviewItem: ReviewItem = {
    ...item,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    reviewStatus: "pending"
  };

  writeReviewQueue([reviewItem, ...readReviewQueue()]);
  appendAuditEvent({ itemId: reviewItem.id, itemTitle: reviewItem.title, action: "created", toStatus: "pending" });
  return reviewItem;
}

export function updateReviewItem(id: string, updates: Partial<Pick<ReviewItem, "reviewStatus" | "reviewerNote">>): ReviewItem[] {
  let auditTarget: ReviewAuditEvent | null = null;
  const items = readReviewQueue().map((item) => {
    if (item.id !== id) {
      return item;
    }

    if (updates.reviewStatus && updates.reviewStatus !== item.reviewStatus) {
      auditTarget = {
        id: "pending",
        itemId: item.id,
        itemTitle: item.title,
        action: "status_changed",
        createdAt: "pending",
        fromStatus: item.reviewStatus,
        toStatus: updates.reviewStatus
      };
    } else if (typeof updates.reviewerNote === "string" && updates.reviewerNote !== (item.reviewerNote ?? "")) {
      auditTarget = {
        id: "pending",
        itemId: item.id,
        itemTitle: item.title,
        action: "note_updated",
        createdAt: "pending",
        note: updates.reviewerNote
      };
    }

    return {
      ...item,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  });

  writeReviewQueue(items);

  if (auditTarget) {
    appendAuditEvent(auditTarget);
  }

  return items;
}

export function removeReviewItem(id: string): ReviewItem[] {
  const existing = readReviewQueue();
  const removed = existing.find((item) => item.id === id);
  const items = existing.filter((item) => item.id !== id);
  writeReviewQueue(items);

  if (removed) {
    appendAuditEvent({ itemId: removed.id, itemTitle: removed.title, action: "removed", fromStatus: removed.reviewStatus });
  }

  return items;
}

export function exportReviewQueue(items: ReviewItem[]): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), items }, null, 2);
}

export function exportReviewAuditLog(events: ReviewAuditEvent[]): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), events }, null, 2);
}

export function clearReviewAuditLog(): void {
  writeReviewAuditLog([]);
}
