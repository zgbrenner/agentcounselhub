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

const STORAGE_KEY = "agentcounsel-review-queue";

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

export function addReviewItem(item: Omit<ReviewItem, "id" | "submittedAt" | "reviewStatus">): ReviewItem {
  const reviewItem: ReviewItem = {
    ...item,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    reviewStatus: "pending"
  };

  writeReviewQueue([reviewItem, ...readReviewQueue()]);
  return reviewItem;
}

export function updateReviewItem(id: string, updates: Partial<Pick<ReviewItem, "reviewStatus" | "reviewerNote">>): ReviewItem[] {
  const items = readReviewQueue().map((item) => {
    if (item.id !== id) {
      return item;
    }

    return {
      ...item,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  });

  writeReviewQueue(items);
  return items;
}

export function removeReviewItem(id: string): ReviewItem[] {
  const items = readReviewQueue().filter((item) => item.id !== id);
  writeReviewQueue(items);
  return items;
}

export function exportReviewQueue(items: ReviewItem[]): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), items }, null, 2);
}
