"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
	const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
	const content = (
		<>
			{children}
			<Toaster richColors />
		</>
	);

	return (
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
	);
}
