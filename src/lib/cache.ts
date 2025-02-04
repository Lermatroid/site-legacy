import "server-only";
import { revalidateTag, unstable_cache } from "next/cache";

type CacheConfig = {
  key: string;
  revalidate: number;
};

type CachedData<T> = {
  lastUpdated: Date;
  refreshWait: number;
  payload: T;
};

export function createCache<T>(fetchFn: () => Promise<T>, config: CacheConfig) {
  const { key, revalidate } = config;

  return unstable_cache(
    async () => {
      const data = await fetchFn();
      return {
        lastUpdated: new Date(),
        refreshWait: revalidate,
        payload: data,
      } as CachedData<T>;
    },
    [key],
    {
      revalidate,
      tags: [key],
    }
  );
}
