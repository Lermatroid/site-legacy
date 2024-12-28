"use client";
import { X as CloseIcon, Minus, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useId } from "react";
import Link from "next/link";
import { useState, useRef } from "react";
import { cn } from "@/utils/cn";
import Image from "next/image";

interface SocialBrowserWindowProps {
	children: React.ReactNode;
	url: string;
	index: number;
	onDragStartCallback: () => void;
	className?: string;
	startingPos?: {
		x: number;
		y: number;
	};
}

import Draggable from "react-draggable";

function SocialBrowserWindow({
	children,
	url,
	index,
	onDragStartCallback: onDragStartCallback,
	className,
	startingPos,
}: SocialBrowserWindowProps) {
	const id = useId();
	const nodeRef = useRef<HTMLDivElement>(null!) as React.RefObject<HTMLDivElement>; // TODO: Make this better. Weird fix for the type error. Hopefully this gets better as React 19 matures.

	return (
		<Draggable
			handle={`.${id.replaceAll(":", "")}`}
			bounds="parent"
			onStart={() => onDragStartCallback()}
			defaultPosition={startingPos}
			nodeRef={nodeRef}
		>
			<div
				className={cn(
					"w-[150px] aspect-square border-white border bg-black relative",
					className
				)}
				style={{ zIndex: index }}
				ref={nodeRef}
			>
				<div
					className={`h-[30px] w-full border-b-white border-b flex items-center justify-end gap-x-1 p-1 cursor-grab ${id.replaceAll(
						":",
						""
					)}`}
				>
					<div className="border border-white aspect-square h-[calc(30px-0.5rem)]">
						<Minus size={20} />
					</div>
					<div className="border border-white aspect-square h-[calc(30px-0.5rem)]">
						<CloseIcon size={20} />
					</div>
				</div>
				<div className="h-[calc(100%-30px)] flex items-center justify-center">
					<Link href={url} target="_blank">
						{children}
					</Link>
				</div>
			</div>
		</Draggable>
	);
}

export default function SocialWrapper() {
	const [indexes, setIndexes] = useState([1, 2, 3, 4]);

	// key: index ( a window ), value: the z index of the window

	function getNewStackingState(indexes: number[], indexToMoveToTop: number) {
		const newArr = Array.from(indexes);
		const highestZIndex = newArr.length;
		const currZIndex = newArr[indexToMoveToTop];

		if (currZIndex === highestZIndex) {
			return newArr;
		}

		for (let i = 0; i < newArr.length; i++) {
			if (newArr[i] < currZIndex) {
				continue;
			}
			if (i === indexToMoveToTop) {
				newArr[i] = highestZIndex;
				continue;
			}
			newArr[i] = newArr[i] - 1;
		}

		return newArr;
	}

	function onDragStart(index: number) {
		setIndexes(getNewStackingState(indexes, index));
	}

	return (
		<div className="relative overflow-hidden flex flex-wrap items-start justify-evenly">
			<SocialBrowserWindow
				url="https://github.com/lermatroid"
				index={indexes[0]}
				onDragStartCallback={() => onDragStart(0)}
				className="top-[25%]"
			>
				<Github size={60} color="white" />
			</SocialBrowserWindow>
			<SocialBrowserWindow
				url="https://www.linkedin.com/in/liamrmurray/"
				index={indexes[1]}
				onDragStartCallback={() => onDragStart(1)}
				className="top-[50%]"
			>
				<Linkedin size={60} color="white" />
			</SocialBrowserWindow>
			<SocialBrowserWindow
				url="https://bsky.app/profile/liam.so"
				index={indexes[2]}
				onDragStartCallback={() => onDragStart(2)}
				className="top-[25%]"
			>
				<Image
					className="invert"
					src="/img/bsky.webp"
					alt="Bluesky"
					width={60}
					height={60}
					priority
				/>
			</SocialBrowserWindow>
			<SocialBrowserWindow
				url="https://instagram.com/lermatroid"
				index={indexes[3]}
				onDragStartCallback={() => onDragStart(3)}
				className="top-[50%]"
			>
				<Instagram size={60} color="white" />
			</SocialBrowserWindow>
		</div>
	);
}
