"use client";
import Header from "../../components/Header";
import Link from "next/link";
import { useState } from "react";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="mx-auto max-w-[900px] px-4 pt-8 pb-12">
        <div className="border border-black/10">
          <div className="px-5 py-10 text-center">
            <h1 className="display-font text-[22px] sm:text-[30px]">Kontakt</h1>

            <p className="mt-5 text-[14px] leading-7 text-black/70">
              Napisz krótko czego potrzebujesz (miasto, termin, liczba osób) — odezwiemy się z propozycją.
            </p>

            <div className="mt-8 max-w-[520px] mx-auto text-left grid gap-3">
              <Field label="Imię" placeholder="Np. Kasia" />
              <Field label="Email" placeholder="np. kasia@email.com" type="email" />
              <Field label="Miasto / trasa" placeholder="Lizbona / Sintra / Porto..." />
              <Field label="Termin" placeholder="Np. 12–15 lipca" />
              <Textarea label="Wiadomość" placeholder="Ile osób? Co chcesz zobaczyć?" />

              <button
                type="button"
                onClick={() => setSent(true)}
                className="mt-2 border border-black/20 px-6 py-3 text-[11px] tracking-[0.22em] uppercase"
                style={{ borderRadius: 12, background: "black", color: "white" }}
              >
                Wyślij
              </button>

              {sent && (
                <p className="text-[12px] text-black/60 leading-6">
                  Wysłane. Dziękujemy — wrócimy z odpowiedzią jak najszybciej.
                </p>
              )}
            </div>

            <div className="mt-10">
              <Link className="underline text-black/70" href="/">
                Wróć na stronę główną
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] tracking-[0.18em] uppercase text-black/45">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-black/15 px-3 py-3 text-[14px] outline-none"
      />
    </label>
  );
}

function Textarea({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-[10px] tracking-[0.18em] uppercase text-black/45">
        {label}
      </span>
      <textarea
        rows={4}
        placeholder={placeholder}
        className="w-full border border-black/15 px-3 py-3 text-[14px] outline-none resize-none"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-[900px] px-4 pt-8 pb-10 text-center text-[10px] tracking-[0.18em] uppercase text-black/40">
      © {new Date().getFullYear()} Portugalia z Przewodnikiem
    </footer>
  );
}