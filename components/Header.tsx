"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


  return (
    <header className="border-b border-black/10">
      {/* Top bar */}
      <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">

       {/* LEFT: Brand */}
<div
  className="flex flex-col
             items-center sm:items-start
             text-center sm:text-left"
>
  {/* This wrapper keeps subtitle centered under heading */}
  <div className="inline-flex flex-col items-center text-center">
    <div className="heading-font whitespace-nowrap
                    text-[13px] sm:text-[18px] md:text-[20px]
                    tracking-[0.18em]">
      PORTUGLIA INACZEJ
    </div>

    {/* Subtitle hidden on mobile */}
    <div className="hidden sm:block
                    mt-1 text-[11px]
                    tracking-[0.22em] uppercase text-black/55">
      Wycieczki po Portugalii po polsku
    </div>
  </div>
</div>

        {/* RIGHT: Desktop nav */}
        <nav
          className="hidden sm:flex gap-6
                     text-[11px] tracking-[0.22em]
                     uppercase text-black/55"
        >
          <Link href="/trasy" className="hover:text-black">Trasy</Link>
          <Link href="/galeria" className="hover:text-black">Galeria</Link>
          <Link href="/kontakt" className="hover:text-black">Kontakt</Link>
        </nav>

        {/* Mobile menu button */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="border border-black/20 px-4 py-2
                       text-[11px] uppercase tracking-[0.22em]"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`
          sm:hidden
          overflow-hidden
          transition-all duration-300 ease-out
          ${menuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex justify-center px-6 pb-6">
          <div className="w-full max-w-xs border border-black/20 bg-white">
            <nav
              className="flex flex-col
                         text-[12px] uppercase
                         tracking-[0.22em]
                         text-black/70"
            >
              <Link
                href="/trasy"
                onClick={() => setMenuOpen(false)}
                className="text-center py-4 border-b border-black/10 hover:text-black"
              >
                Trasy
              </Link>

              <Link
                href="/galeria"
                onClick={() => setMenuOpen(false)}
                className="text-center py-4 border-b border-black/10 hover:text-black"
              >
                Galeria
              </Link>

              <Link
                href="/kontakt"
                onClick={() => setMenuOpen(false)}
                className="text-center py-4 hover:text-black"
              >
                Kontakt
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}