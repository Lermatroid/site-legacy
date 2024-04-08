import Link from "next/link";
import Wave from "@/components/Wave";
import SocialBrowserWindow from "@/components/SocialBrowserWindow";
import { Github, Linkedin } from "lucide-react";
import SocialWrapper from "@/components/SocialBrowserWindow";
import ProjectsViewer from "@/components/ProjectsViewer";

export default function Home() {
	return (
		<>
			<main className="relative min-h-screen font-gsans">
				<div className="absolute flex justify-around items-center font-gmono w-[325px] h-[50px] bg-black border-white border rounded-full top-5 left-5 px-5">
					<Link href="/projects">Projects</Link>
					<Link href="/about">About</Link>
					<Link href="/contact">Contact</Link>
				</div>
				<div className="absolute flex flex-col justify-center gap-y-2 top-[50%] right-0 w-[40vw] h-[50vh]">
					<h1 className="text-6xl font-black font-gmono">Liam Murray</h1>
					<p className="font-gmono">Building Stuffs On The Internet</p>
				</div>
				<Wave />
			</main>
			<section className="h-screen w-screen p-10">
				<div className="w-full h-full p-10 pt-80 pb-40 flex flex-col justify-center gap-y-10">
					<h1 className="font-gmono font-black text-white text-8xl">About</h1>
					<div className="grid grid-cols-2 w-full gap-x-4">
						<div className="rounded-xl border-white border bg-black w-full aspect-video p-5 flex items-center">
							<p className="font-mono font-bold text-xl leading-normal">
								Hey there!
								<br />
								<br />
								My name's Liam. I'm a sofware enginner based out of San Antonio. I'm
								currently studying Computer Science at the University of Texas at
								San Antonio while working on the side as a freelance software
								engineer. During my freetime I enjoy playing games, working on side
								projects, and walking.
								<br />
								<br />
								You can find me around the internet over here &rArr;
							</p>
						</div>
						<SocialWrapper />
					</div>
				</div>
			</section>
			<ProjectsViewer />
		</>
	);
}
