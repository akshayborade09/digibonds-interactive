import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScaleWrapper } from "@/components/providers/ScaleWrapper";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiBonds — Bond Investment Platform",
  description:
    "Invest in high-yield bonds with DigiBonds. Transparent, secure, and built for the Indian investor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${workSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange={false}
        >
          <LenisProvider>
            <ScaleWrapper>{children}</ScaleWrapper>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
