import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex sm:min-h-[91vh] min-h-[88vh] flex-col items-center justify-center text-center px-2 py-8">
			<Link href="/" className="flex items-center gap-3 px-2 py-8">
				<Image src={"/logo.png"} alt={"arunya logo"} width={120} height={120} />
			</Link>
			<h1 className="text-3xl font-bold mb-4 sm:text-5xl">
				Privacy-First Analytics, Built for Insight, Not Intrusion
			</h1>
			<p className="mb-8 sm:text-md max-w-[800px] text-muted-foreground">
				Empower your data-driven decisions with an open-source tool that
				respects your users' privacy.
			</p>
			<div>
				<Link
					href={`/docs${page_routes[0].href}`}
					className={buttonVariants({
						className: "px-6 !font-medium",
						size: "lg",
					})}
				>
					Start Now
				</Link>
			</div>
		</div>
	);
}
