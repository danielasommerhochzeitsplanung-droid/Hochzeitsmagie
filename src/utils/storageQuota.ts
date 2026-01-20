export interface StorageQuotaInfo {
  usedBytes: number;
  estimatedLimitBytes: number;
  percentageUsed: number;
}

export function getStorageQuotaInfo(): StorageQuotaInfo {
  let usedBytes = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const value = localStorage.getItem(key) || '';
      usedBytes += key.length + value.length;
    }
  }

  usedBytes *= 2;

  const estimatedLimitBytes = 5 * 1024 * 1024;

  const percentageUsed = Math.min(100, (usedBytes / estimatedLimitBytes) * 100);

  return {
    usedBytes,
    estimatedLimitBytes,
    percentageUsed,
  };
}
