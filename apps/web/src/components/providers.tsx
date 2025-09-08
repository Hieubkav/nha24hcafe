"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import LightOverlay from "./light-overlay";
import BulbToggle from "./bulb-toggle";
import LenisProvider from "./lenis-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
	const content = (
		<>
			{children}
			<Toaster richColors />
			<LightOverlay />
			<BulbToggle />
		</>
	);

	return (
		<LenisProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark" // mặc định dark để đúng vibe đen/xám sang trọng
				enableSystem
				disableTransitionOnChange
			>
				{convexUrl ? (
					<ConvexProvider client={new ConvexReactClient(convexUrl)}>
						{content}
					</ConvexProvider>
				) : (
					content
				)}
			</ThemeProvider>
		</LenisProvider>
	);
}
