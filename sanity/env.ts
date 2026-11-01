export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-31";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Eksik ortam değişkeni: NEXT_PUBLIC_SANITY_DATASET (.env.local dosyasını kontrol edin)",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Eksik ortam değişkeni: NEXT_PUBLIC_SANITY_PROJECT_ID (.env.local dosyasını kontrol edin)",
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === "") {
    throw new Error(errorMessage);
  }
  return v;
}
