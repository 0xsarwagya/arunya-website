import Anchor from "@/components/anchor";
import { ModeToggle } from "@/components/theme-toggle";
import { page_routes } from "@/lib/routes-config";
import Image from "next/image";
import Link from "next/link";
import { SheetLeftbar } from "./leftbar";

export const NAVLINKS = [
	{
		title: "Documentation",
		href: `/docs${page_routes[0].href}`,
	},
	{
		title: "GitHub",
		href: "https://github.com/0xsarwagya/arunya",
	},
];

export function Navbar() {
	return (
		<nav className="w-full h-14 sticky top-0 z-50 lg:px-4 backdrop-filter backdrop-blur-xl bg-opacity-5">
			<div className="sm:container h-full max-sm:px-3 flex items-center justify-between ">
				<SheetLeftbar />
				<div className="flex items-center gap-9">
					<Logo />
					<div className="lg:flex hidden items-center gap-5 text-sm font-medium text-muted-foreground">
						{NAVLINKS.map((item) => {
							return (
								<Anchor
									key={item.title + item.href}
									activeClassName="text-primary font-semibold"
									absolute
									className="flex items-center gap-1"
									href={item.href}
								>
									{item.title}
								</Anchor>
							);
						})}
					</div>
				</div>

				<ModeToggle />
			</div>
		</nav>
	);
}

function Logo() {
	return (
		<Link href="/" className="flex items-center gap-3">
			<Image src={"/logo.png"} alt={"arunya logo"} width={30} height={30} />
			<h2 className="text-md font-bold font-code">Arunya</h2>
		</Link>
	);
}
