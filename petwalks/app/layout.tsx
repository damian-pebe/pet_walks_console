import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Head from "next/head"; // Import next/head for metadata
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"

const noto = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetWalks Console Management",
  description: "Console management for PetWalks app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={noto.className}>
        
      <ThemeProvider
            attribute="class"
            
            enableSystem
            disableTransitionOnChange
          >        
        
        {children}
        </ThemeProvider>
        
        </body>

    </html>
  );

}


