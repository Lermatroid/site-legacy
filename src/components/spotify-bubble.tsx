"use client";

import { Unplug } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type NowPlayingResponse = {
  isPlaying: boolean;
  track?: {
    title: string;
    artist: string;
    albumImageUrl: string;
    songUrl: string;
  };
  nextRefreshIn: number;
};

export default function SpotifyBubble() {
  const [data, setData] = useState<NowPlayingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch("/api/spotify/now-playing");
      const newData: NowPlayingResponse = await response.json();
      setData(newData);

      // Schedule next refresh based on the response
      setTimeout(() => {
        fetchNowPlaying();
      }, Math.min(newData.nextRefreshIn, 20) * 1000);
    } catch (error) {
      console.error("Failed to fetch now playing:", error);
      // Retry after 30 seconds on error
      setTimeout(() => {
        fetchNowPlaying();
      }, 30000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    if (data?.isPlaying && data.track?.albumImageUrl) {
      // Create a temporary image to analyze
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = data.track.albumImageUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;

        if (!ctx) {
          console.error("Could not get canvas context");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        // Get the pixel data from the center of the image
        const imageData = ctx.getImageData(
          img.width / 2,
          img.height / 2,
          1,
          1
        ).data;

        const color = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
        setDominantColor(color);
      };
    }
  }, [data?.track?.albumImageUrl]);

  if (loading) {
    return <div className="rounded-2xl bg-zinc-950 p-5 ">Loading...</div>;
  }

  if (!data?.isPlaying) {
    return (
      <div className="rounded-2xl bg-zinc-950 p-5 flex flex-col justify-center items-center gap relative ">
        <p className="font-mono font-bold text-md leading-normal absolute left-0 top-0 pt-5 pl-5">
          Now Playing
        </p>

        <div className="h-[40px] w-full absolute bottom-0 left-0 pl-5 pb-5 flex items-center gap-x-1">
          <p className="leading-[20px] font-mono text-sm">Offline </p>{" "}
          <Unplug size={15} />
        </div>
        <NextImage
          src="/img/other/spotify.png"
          alt="Spotify Icon"
          className="absolute bottom-0 right-0 pr-5 pb-5 invert z-50"
          width={40}
          height={40}
        />
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl bg-zinc-950 p-5 flex flex-col justify-start gap relative overflow-hidden "
      style={{
        background: dominantColor
          ? `linear-gradient(to bottom right, ${dominantColor}, rgba(24, 24, 27, 1))`
          : undefined,
      }}
    >
      <p className="font-mono font-bold text-md leading-normal absolute right-0 top-0 pt-5 pr-5">
        Now Playing{" "}
        <span className="inline-flex gap-1">
          <span className="w-1 h-3 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite] [animation-delay:-0.3s]"></span>
          <span className="w-1 h-3 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite] [animation-delay:-0.15s]"></span>
          <span className="w-1 h-3 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite]"></span>
        </span>
      </p>

      <NextImage
        src={data.track!.albumImageUrl}
        alt="Album Art"
        width={100}
        height={100}
      />
      <div className="pt-2">
        <p className="font-bold">{data.track!.title}</p>
        <p className="text-sm">{data.track!.artist}</p>
      </div>

      <Link href={data.track!.songUrl} target="_blank">
        <NextImage
          src="/img/other/spotify.png"
          alt="Spotify Icon"
          className="absolute bottom-0 right-0 pr-5 pb-5 invert z-50"
          width={40}
          height={40}
        />
      </Link>
    </div>
  );
}
