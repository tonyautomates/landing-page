"use client";
import Header from "../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setContactOpen(false);
    }
    if (contactOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [contactOpen]);

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />
      
      {/* Mobile-first centered hero */}
      <section className="mx-auto max-w-[900px] px-4 pt-8">
        <div className="border border-black/10">
          {/* Image space */}
          <div className="w-full bg-black/5" style={{ height: "45vh", minHeight: 280 }} />

          <div className="px-5 py-8 text-center">
           <h1 className="display-font text-[18px] sm:text-[28px] text-center">
            Portugalia bez chaosu
            </h1>

            <p className="mt-5 text-[14px] leading-7 text-black/70">
              Prywatne zwiedzanie po polsku: Lizbona, Sintra, Porto i Algarve.
              Spokojne tempo, piękne miejsca, dobra logistyka.
            </p>

            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="mt-7 inline-flex items-center justify-center px-6 py-3 nav-font text-[11px] border"
              style={{ borderColor: "rgba(0,0,0,0.15)", background: "white", borderRadius: 12 }}
            >
              Zapytaj o termin
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-[900px] px-4 pt-14 pb-10 text-center nav-font text-[10px] text-black/40">
        © {new Date().getFullYear()} Portugalia z Przewodnikiem
      </footer>

      {/* Contact modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.55)" }}
            onClick={() => setContactOpen(false)}
            aria-label="Zamknij"
          />

          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 bg-white border border-black/15">
            <div className="flex items-start justify-between gap-6 px-5 py-5 border-b border-black/10">
              <div className="text-center w-full">
                <div className="nav-font text-[10px] text-black/55">Kontakt</div>
                <div className="mt-2 heading-font text-[18px]">Zapytanie</div>
              </div>
              <button
                type="button"
                onClick={() => setContactOpen(false)}
                className="nav-font text-[10px] border border-black/15 px-3 py-2"
              >
                Zamknij
              </button>
            </div>

            <div className="px-5 py-5">
              <form className="grid gap-3 text-center">
                <Field label="Imię" name="name" placeholder="Np. Kasia" />
                <Field label="Email" name="email" placeholder="np. kasia@email.com" type="email" />
                <Field label="Miasto / trasa" name="route" placeholder="Lizbona / Sintra / Porto..." />
                <Field label="Termin" name="date" placeholder="Np. 12–15 lipca" />
                <TextArea label="Wiadomość" name="message" placeholder="Ile osób? Co chcesz zobaczyć?" />

                <button
                  type="button"
                  className="mt-2 inline-flex justify-center px-6 py-3 nav-font text-[11px] border"
                  style={{ borderColor: "rgba(0,0,0,0.2)", background: "white", color: "black", borderRadius: 12 }}
                >
                  Wyślij
                </button>

                <p className="text-[12px] text-black/50 leading-6">
                  Dane wykorzystam wyłącznie do kontaktu w sprawie wycieczki.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="grid gap-1 text-left">
      <span className="nav-font text-[10px] text-black/45">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full border border-black/15 px-3 py-3 text-[14px] outline-none"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <label className="grid gap-1 text-left">
      <span className="nav-font text-[10px] text-black/45">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={4}
        className="w-full border border-black/15 px-3 py-3 text-[14px] outline-none resize-none"
      />
    </label>
  );
}