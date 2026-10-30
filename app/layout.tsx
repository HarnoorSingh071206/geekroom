import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ChinkuRobot from "@/components/animations/ChinkuRobot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Geek Room — Build. Learn. Belong.",
    template: "%s | Geek Room",
  },
  description:
    "Geek Room is a college technology society for students passionate about web development, AI/ML, competitive programming, app development, and building things together.",
  keywords: [
    "Geek Room",
    "tech society",
    "college club",
    "web development",
    "AI ML",
    "competitive programming",
    "student community",
  ],
  // TODO: Replace with actual deployed URL before launch
  metadataBase: new URL("https://geekroom.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Geek Room",
    title: "Geek Room — Build. Learn. Belong.",
    description:
      "A college technology society for students who love building things.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Geek Room — Build. Learn. Belong.",
    description:
      "A college technology society for students who love building things.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#14151f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <Navigation />
        {/* z-10 keeps all page content above the fixed homepage
            animation canvas (z-0) — backgrounds stay transparent so
            the web backdrop still shows through */}
        <main
          id="main-content"
          className="relative z-10 flex-1 flex flex-col pt-20"
        >
          {children}
        </main>
        <Footer />
        <ChinkuRobot />
      </body>
    </html>
  );
}
