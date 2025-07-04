import type { Metadata } from "next";
import "./globals.css";
import { ClientProvider } from "@/providers/ClientProvider";
import { Toaster } from "react-hot-toast";
import { Zain } from "next/font/google";

const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Steps",
  description:
    "Steps is a summer camp for kids, where they can learn and have fun.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={`${zain.className} antialiased`}>
          <Toaster />
          {children}
        </body>
      </html>
    </ClientProvider>
  );
}
