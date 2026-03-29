export const mergeWithFallback = <T>(
  primary: T[],
  fallback: T[],
  minimumCount: number,
  getKey: (item: T) => string,
) => {
  const targetCount = Math.max(primary.length, minimumCount);
  const merged: T[] = [];
  const seen = new Set<string>();

  for (const item of [...primary, ...fallback]) {
    const key = getKey(item);

    if (seen.has(key)) continue;

    seen.add(key);
    merged.push(item);

    if (merged.length >= targetCount) {
      break;
    }
  }

  return merged;
};