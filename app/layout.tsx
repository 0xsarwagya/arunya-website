import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { DM_Mono, Hind } from "next/font/google";
import "./globals.css";

const regularFont = Hind({
	subsets: ["latin"],
	variable: "--font-regular",
	display: "swap",
	weight: "400",
});

const codeFont = DM_Mono({
	subsets: ["latin"],
	variable: "--font-code",
	display: "swap",
	weight: "400",
});

export const metadata: Metadata = {
	title: "Arunya: Privacy-First, Open-Source Analytics",
	description:
		"Arunya is an open-source analytics tool offering insights while protecting user privacy. GDPR/CCPA compliant and easy to deploy.",
	openGraph: {
		title: "Arunya: Privacy-First, Open-Source Analytics",
		description:
			"Discover Arunya, the open-source tool that delivers analytics without compromising privacy.",
		images: ["/images/og-image.png"],
		url: "https://arunya.0xsarwagya.codes",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Arunya: Privacy-First, Open-Source Analytics",
		description:
			"Insights without compromise. Explore Arunya, the privacy-first analytics tool",
		images: [
			{
				url: "/images/og-image.png",
				alt: "Arunya: Privacy-First, Open-Source Analytics",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${regularFont.variable} ${codeFont.variable} font-regular`}
				suppressHydrationWarning
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<main className="sm:container mx-auto w-[88vw] h-auto">
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
