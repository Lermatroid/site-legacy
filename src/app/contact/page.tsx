"use client";

import { useWindowSize } from "usehooks-ts";
import { useState } from "react";
import Confetti from "react-confetti";
import { toast } from "sonner";
import Link from "next/link";

const email = "hi@liam.so";

export default function Page() {
	const [showConfetti, setShowConfetti] = useState(false);
	const { width = 0, height = 0 } = useWindowSize();

	function copyEmail() {
		navigator.clipboard.writeText(email);
		toast("Email copied to clipboard!");
		setShowConfetti(true);
	}

	return (
		<>
			{showConfetti && (
				<Confetti
					className="grayscale"
					onConfettiComplete={() => setShowConfetti(false)}
					recycle={false}
					run={showConfetti}
					numberOfPieces={200}
					width={width}
					height={height}
				/>
			)}
			<main className="min-h-screen w-screen dotBg flex flex-col items-center justify-center text-black">
				<div className="aspect-video max-w-[600px] w-full bg-white border-black border-2 rounded-xl flex flex-col items-center justify-center">
					<h1 className="font-gmono font-bold text-3xl pb-12">Contact</h1>
					<div className="flex items-center gap-x-2 ">
						<button
							onClick={copyEmail}
							className="bg-black text-white font-gmono text-md rounded py-2 px-2 font-bold"
						>
							Copy Email
						</button>
					</div>
				</div>
				<div className="text-black font-gmono flex items-start w-full max-w-[600px] pt-2">
					<Link href={"/"} className="underline cursor-pointer bg-white">
						Return Home
					</Link>
				</div>
			</main>
		</>
	);
}
