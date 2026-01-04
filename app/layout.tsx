import "./globals.css";
import { Montserrat } from "next/font/google";

const heading = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Portuglia Inaczej",
  description: "Wycieczki po Portugalii po polsku.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={heading.variable}>{children}</body>
    </html>
  );
}