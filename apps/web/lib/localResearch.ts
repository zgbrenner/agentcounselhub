import type { SavedCase } from "@/lib/types";

const DB_NAME = "agentcounsel-local-research";
const STORE_NAME = "saved-cases";
const DB_VERSION = 1;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function saveCaseLocally(savedCase: SavedCase): Promise<void> {
  const database = await openDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).put(savedCase);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });

  database.close();
}

export async function getSavedCases(): Promise<SavedCase[]> {
  const database = await openDatabase();

  const savedCases = await new Promise<SavedCase[]>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const request = transaction.objectStore(STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result as SavedCase[]);
    request.onerror = () => reject(request.error);
  });

  database.close();
  return savedCases.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function deleteSavedCase(id: string): Promise<void> {
  const database = await openDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, "readwrite");
    transaction.objectStore(STORE_NAME).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });

  database.close();
}

export function exportSavedCases(savedCases: SavedCase[]): string {
  return JSON.stringify({ exportedAt: new Date().toISOString(), savedCases }, null, 2);
}
