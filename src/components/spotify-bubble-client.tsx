"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SpotifyBubbleClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Set up the interval
    const interval = setInterval(() => {
      router.refresh();
    }, 20000); // 20 seconds

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [router]);

  return <>{children}</>;
}
