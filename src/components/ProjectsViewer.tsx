"use client";

import Image from "next/image";
import { useState } from "react";
import Balancer from "react-wrap-balancer";
import { TypeAnimation } from "react-type-animation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProjectCardProps {
	project: ProjectType;
	clickedCallback: (project: ProjectType) => void;
}

interface ProjectType {
	title: string;
	shortDesc: string;
	longDesc: string;
	image: string;
	screenshot: string;
	links: {
		name: string;
		url: string;
	}[];
}

const projects: Record<string, ProjectType> = {
	portal: {
		title: "Portal",
		shortDesc: "Dynamic, open-source membership managment",
		longDesc:
			"Portal is a dynamic, open-source membership management system that allows users to create and manage their own memberships. It offers a comprehensive suite of features for tracking and analyzing membership activity, including login frequencies and page access, alongside report generation for behavior analysis. Built on technologies like Next.js, Tailwind CSS, Prisma, and PostgreSQL, Portal is highly customizable to meet specific user needs.",
		image: "/img/projects/portal.png",
		screenshot: "/img/projects/sc/portal.jpeg",
		links: [{ name: "GitHub", url: "https://github.com/acmutsa/portal" }],
	},
	hackkit: {
		title: "HackKit",
		shortDesc: "Feature-packed Hackathon managment software.",
		longDesc:
			"HackKit is a feature-packed hackathon management software that allows organizers to build and manage their own hackathons. It simplifies participant registration, check-in, logistics, and more. The platform is highly extensible, allowing it to fit the needs of hackathons of all types.",
		image: "/img/projects/hackkit.png",
		screenshot: "/img/projects/sc/hackkit.png",
		links: [{ name: "GitHub", url: "https://github.com/acmutsa/hackkit" }],
	},
	rh: {
		title: "RowdyHacks",
		shortDesc: "West Texas's Largest Hackathon",
		longDesc:
			"Helped lead the web design team at RowdyHacks. Built eye catching landing pages which grew the event to over 500+ attendees. Made use of various web technologies including Next.js, Tailwind CSS, Framer Motion, and Remote Config.",
		image: "/img/projects/rh.png",
		screenshot: "/img/projects/sc/rh.png",
		links: [
			{ name: "Rowdyhacks 2023", url: "https://2023.rowdyhacks.org" },
			{ name: "Rowdyhacks 2024", url: "https://rowdyhacks.org" },
		],
	},
	utsa: {
		title: "UTSA iSENSE Project",
		shortDesc: "UTSA Reasearch Project",
		longDesc:
			"Worked on iSENSE as a research assistant at UTSA. iSENSE is a data visualization platform for K-12 educators that teaches students about statistics and data science. Supported the creation of interactive visualizations and tools within iSENSE, fostering a hands-on learning environment that encourages curiosity and critical thinking among young learners.",
		image: "/img/projects/utsa.png",
		screenshot: "/img/projects/sc/utsa.png",
		links: [
			{ name: "GitHub", url: "https://github.com/engaging-computing/rSENSE" },
			{ name: "iSENSE", url: "https://isenseproject.org/" },
		],
	},
};

export default function ProjectsViewer() {
	const [currentlySelected, setCurrentlySelected] = useState<null | ProjectType>(null);

	function onProjectClick(project: null | ProjectType) {
		setCurrentlySelected(project);
	}

	return (
		<>
			<div className="h-[20vh] w-screen grid grid-cols-1 grid-rows-5">
				<div className="bg-gradient-to-b from-transparent to-transparent h-full w-full"></div>
				<div className="bg-neutral-900 h-full w-full"></div>
				<div className="bg-neutral-800 h-full w-full"></div>
				<div className="bg-neutral-600 h-full w-full"></div>
				<div className="bg-neutral-400 h-full w-full"></div>
				<div className="bg-neutral-200 h-full w-full"></div>
			</div>
			<section className="min-h-screen w-screen bg-white overflow-hidden relative px-20 py-40 text-black">
				<h1 className="font-gsans font-black text-black text-8xl">Experience</h1>
				<p className="font-gmono pt-5 text-xl">
					Various <span className="bg-black text-white p-1">places</span> and{" "}
					<span className="bg-black text-white p-1">things</span> I've worked on.
				</p>
				<div className="grid grid-cols-4 gap-5 pt-20">
					<ProjectCard project={projects.hackkit} clickedCallback={onProjectClick} />
					<ProjectCard project={projects.utsa} clickedCallback={onProjectClick} />
					<ProjectCard project={projects.rh} clickedCallback={onProjectClick} />
					<ProjectCard project={projects.portal} clickedCallback={onProjectClick} />
					<ProjectHeader
						key={currentlySelected?.title || "null"}
						project={currentlySelected}
					/>
				</div>
				<div className="flex items-center flex-col pt-20 max-w-[750px] mx-auto">
					<div className="flex font-gmono w-full font-bold">
						<p>With Experience @</p>
						<Link href={"/resume"} className="ml-auto underline cursor-pointer">
							View Resume
						</Link>
					</div>
					<div className="w-full h-52 p-5 flex items-center justify-around border-dashed border-2 border-black rounded-xl mt-3">
						<Image
							src="/img/exp/google.svg"
							alt="Google Icon"
							height={150}
							width={150}
							className="saturate-0 brightness-[.70] contrast-[1000%]"
						/>
						<Image
							src="/img/exp/karat.jpeg"
							alt="Karat Icon"
							height={150}
							width={150}
							className="grayscale"
						/>
						<Image
							src="/img/exp/acm.png"
							alt="ACM Icon"
							height={150}
							width={150}
							className="invert"
						/>
						<Image
							src="/img/exp/utsa.png"
							alt="ACM Icon"
							height={150}
							width={150}
							className="saturate-0 brightness-[.70] contrast-[1000%]"
						/>
					</div>
				</div>
			</section>
		</>
	);
}

function ProjectCard({ project, clickedCallback }: ProjectCardProps) {
	const { title, shortDesc, longDesc, image } = project;
	return (
		<div
			onClick={() => clickedCallback(project)}
			className="h-52 border-2 border-dashed border-black rounded-xl flex items-center justify-center hover:bg-black transition-all [&>*]:hover:invert hover:border-white duration-300 cursor-pointer"
		>
			<Image
				src={image}
				alt={title + " icon"}
				width={150}
				height={150}
				className="saturate-0 brightness-[.70] contrast-[1000%] transition-all duration-1000"
			/>
		</div>
	);
}

function ProjectHeader({ project }: { project: null | ProjectType }) {
	if (project === null) return null;
	const [isDoneTyping, setIsDoneTyping] = useState(false);

	const { title, shortDesc, longDesc, links } = project;

	return (
		<div className={`h-[26rem] col-span-4 bg-black rounded-xl grid grid-cols-2`}>
			<div className="flex items-center justify-center p-5">
				<div className="p-2 bg-white rounded relative">
					<Image
						src={project.screenshot}
						className="rounded"
						alt={title}
						width={400}
						height={300}
					/>
				</div>
			</div>
			<div className="flex flex-col justify-center gap-y-5 font-gmono text-white">
				<h1 className="font-black text-3xl">{title}</h1>
				<div>
					<div className="relative h-min m-0 p-0 ">
						<p className="absolute top-0 left-0 pr-2">
							<TypeAnimation
								key={longDesc}
								sequence={[longDesc, () => setIsDoneTyping(true)]}
								speed={99}
							/>
						</p>
						{/* <p className="absolute top-0 left-0 bg-red-500">{longDesc}</p> */}
						<p className="opacity-0 pr-2">{longDesc}</p>
					</div>
				</div>
				<div
					className={`flex gap-x-2 transition-all duration-300 ${
						isDoneTyping ? "opacity-100" : "opacity-0"
					}`}
				>
					{links.map(({ name, url }) => (
						<Link href={url} target="_blank" key={url}>
							<button className="bg-white text-black font-gmono text-md rounded py-2 px-2 font-bold">
								{name}
							</button>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
