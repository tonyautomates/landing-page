import "./globals.css";
import "./intro.css";
import { Montserrat } from "next/font/google";
import TransitionProvider from "./TransitionProvider";
import Intro from "../components/Intro";

const headingFont = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-heading",
});

export const metadata = {
  title: "Portugalia Inaczej",
  description: "Wycieczki po Portugalii po polsku.",
};

// Runs before the first paint and decides whether the intro plays:
// once per visit (browser tab session), never with reduced motion.
// Add ?intro=1 to any address to watch it again.
// It also holds the intro while the tab is in the background, so a page
// opened in a new tab starts playing when the visitor actually looks at it.
const introBoot = `(function(){var d=document.documentElement,s='done';try{var force=/[?&]intro=1(&|$)/.test(location.search);var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=false;try{seen=!!sessionStorage.getItem('intro-seen')}catch(e){}if(force||(!calm&&!seen)){s='play';try{sessionStorage.setItem('intro-seen','1')}catch(e){}}}catch(e){}d.setAttribute('data-intro',s);if(s==='play'){var v=function(){if(document.hidden){d.setAttribute('data-intro-paused','')}else{d.removeAttribute('data-intro-paused')}};v();document.addEventListener('visibilitychange',v)}})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBoot }} />
      </head>
      <body className={headingFont.variable}>
        <Intro />
        <div className="intro-page-clip">
          <div className="intro-page">
            <TransitionProvider>{children}</TransitionProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
