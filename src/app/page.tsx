import Link from "next/link";
import Wave from "@/components/Wave";
import Image from "next/image";

export default function Home() {
	return (
		<>
			<main className="relative min-h-screen font-gsans">
				<div className="fixed z-50 flex justify-around items-center font-gmono w-[325px] h-[50px] bg-black border-white border rounded-full top-5 left-5 px-5">
					<Link href="/#projects" className="cursor-pointer hover:underline">
						Projects
					</Link>
					<Link href="/#about" className="cursor-pointer hover:underline">
						About
					</Link>
					<Link href="/contact" className="cursor-pointer hover:underline">
						Contact
					</Link>
				</div>
				<div className="absolute flex flex-col justify-center gap-y-2 top-[50%] right-0 w-[40vw] h-[50vh]">
					<h1 className="text-6xl font-black font-gmono">Liam Murray</h1>
					<p className="font-gmono">Building Stuffs On The Internet</p>
				</div>
				<Wave />
			</main>
			<section
				className="min-h-[calc(100vh+16rem)] grid grid-cols-4 grid-rows-4 gap-4 w-screen p-10 pt-80"
				id="about"
			>
				<div className="col-span-2 row-span-2 rounded-2xl p-5 flex flex-col justify-center">
					<h1 className="font-black font-mono text-5xl">Hey there 👋</h1>
					<p className="font-mono font-bold text-md leading-normal pt-5">
						My name's Liam. I'm a sofware engineer based out of San Antonio. I'm
						currently studying Computer Science at the University of Texas at San
						Antonio while working on the side as a freelance software engineer. During
						my freetime I enjoy playing games, working on side projects, and walking.
					</p>
				</div>
				<div className="row-span-3 col-start-3 rounded-2xl bg-zinc-950 p-5">
					<p className="font-mono font-bold text-md leading-normal">Projects</p>
				</div>
				<div className="row-span-3 col-start-4 rounded-2xl bg-zinc-950 p-5">4</div>
				<div className="col-span-2 col-start-3 row-start-4 rounded-2xl bg-zinc-950 p-5 flex flex-col justify-between">
					<p className="font-mono font-bold text-md leading-normal">Previously @</p>
					<div className="flex gap-x-2 justify-around items-center px-5">
						<Image
							src="/img/exp/googlecolor.png"
							alt="Google Icon"
							height={100}
							width={100}
						/>
						<Image
							src="/img/exp/karat.jpeg"
							alt="Karat Icon"
							height={100}
							width={100}
						/>
						<Image
							src="/img/exp/acm.png"
							className="object-contain"
							alt="ACM Icon"
							height={100}
							width={100}
						/>
						<Image src="/img/exp/utsa.png" alt="ACM Icon" height={100} width={100} />
					</div>
					<Link
						href="/resume"
						className="font-mono font-bold text-md leading-normal self-end hover:underline"
					>
						Resume &rArr;
					</Link>
				</div>
				<div className="row-span-2 col-start-2 row-start-3 rounded-2xl bg-zinc-950 p-5">
					6
				</div>
				<div className="row-span-2 col-start-1 row-start-3 rounded-2xl bg-zinc-950 p-5">
					7
				</div>
			</section>
			{/* <section className="h-screen w-screen p-10" id="about">
				<div className="w-full h-full p-10 pt-80 pb-40 flex flex-col justify-center gap-y-10">
					<h1 className="font-gmono font-black text-white text-8xl">About</h1>
					<div className="grid grid-cols-2 w-full gap-x-4">
						<div className="rounded-xl border-white border bg-black w-full aspect-video p-5 flex items-center">
							<p className="font-mono font-bold text-xl leading-normal">
								Hey there!
								<br />
								<br />
								My name's Liam. I'm a sofware engineer based out of San Antonio. I'm
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
			</section> */}
			{/* <ProjectsViewer />
			<section className="w-screen p-10 bg-black grid grid-cols-2">
				<div className="min-h-screen flex items-center justify-center">
					<h1 className="font-black font-mono text-7xl">Writings</h1>
				</div>
				<div className="min-h-screen flex items-center justify-center"></div>
			</section> */}
		</>
	);
}
