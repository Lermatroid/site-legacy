"use client";

import { Unplug } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type RecentGameResponse = {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
};

export default function SteamBubble() {
  const [data, setData] = useState<RecentGameResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecentGame = async () => {
    try {
      const response = await fetch("/api/steam/recent");
      const newData: RecentGameResponse = await response.json();
      console.log("Steam API Response:", newData);
      setData(newData);
    } catch (error) {
      console.error("Failed to fetch recent game:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentGame();
    const interval = setInterval(fetchRecentGame, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="col-start-1 row-start-4 rounded-2xl bg-zinc-950 p-5">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="col-start-1 row-start-4 rounded-2xl bg-zinc-950 p-5 flex flex-col justify-center items-center gap relative">
        <p className="font-mono font-bold text-md leading-normal absolute left-0 top-0 pt-5 pl-5">
          Recently Played
        </p>

        <div className="h-[40px] w-full absolute bottom-0 left-0 pl-5 pb-5 flex items-center gap-x-1">
          <p className="leading-[20px] font-mono text-sm">Offline </p>
          <Unplug size={15} />
        </div>
        <NextImage
          src="/img/other/steam.png"
          alt="Steam Icon"
          className="absolute bottom-0 right-0 pr-5 pb-5 invert z-50"
          width={40}
          height={40}
        />
      </div>
    );
  }

  // Convert playtime from minutes to hours and minutes
  const hours = Math.floor(data.playtime_2weeks / 60);
  const minutes = data.playtime_2weeks % 60;
  const playtimeText =
    hours > 0 ? `${hours}h ${minutes}m played` : `${minutes}m played`;

  return (
    <div className="col-start-1 row-start-4 rounded-2xl bg-zinc-950 p-5 flex flex-col justify-start gap relative overflow-hidden">
      <Link
        href={`https://store.steampowered.com/app/${data.appid}`}
        target="_blank"
      >
        <NextImage
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${data.appid}/header.jpg`}
          alt="Game Banner"
          width={200}
          height={100}
          className="rounded-lg hover:opacity-80 transition-opacity"
        />
      </Link>
      <div className="pt-2">
        <p className="font-bold">Recently Played</p>
        <p className="text-sm">{data.name}</p>
      </div>

      <Link href="https://steamcommunity.com/id/lermatroid" target="_blank">
        <NextImage
          src="/img/other/steam.png"
          alt="Steam Icon"
          className="absolute bottom-0 right-0 pr-5 pb-5 z-50 hover:opacity-80 transition-opacity"
          width={45}
          height={45}
        />
      </Link>
    </div>
  );
}
