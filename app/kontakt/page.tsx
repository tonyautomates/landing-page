"use client";

import Header from "../../components/Header";
import Link from "next/link";
import { useState } from "react";

export default function KontaktPage() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(false);
    setSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      cityRoute: formData.get("cityRoute"),
      date: formData.get("date"),
      message: formData.get("message"),
      page: window.location.pathname,
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setSent(true);
      form.reset();
    } catch {
      setSent(false);
      // If you want an error message later, we can add it without changing layout.
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="mx-auto max-w-[900px] px-4 pt-8 pb-12">
        <div className="border border-black/10">
          <div className="px-5 py-10 text-center">
            <h1 className="heading-font tracking-[0.20em] text-[22px] sm:text-[30px]">Kontakt</h1>

            <p className="mt-5 text-[14px] leading-7 text-black/60">
              Napisz krótko czego potrzebujesz (miasto, termin, liczba osób) — odezwiemy się z propozycją.
            </p>

            <form onSubmit={onSubmit} className="mt-8 max-w-[520px] mx-auto text-left grid gap-3">
              <Field name="name" label="Imię" placeholder="Np. Kasia" />
              <Field name="email" label="Email" placeholder="np. kasia@email.com" type="email" />
              <Field name="cityRoute" label="Miasto / trasa" placeholder="Lizbona / Sintra / Porto..." />
              <Field name="date" label="Termin" placeholder="Np. 12–15 lipca" />
              <Textarea name="message" label="Wiadomość" placeholder="Ile osób? Co chcesz zobaczyć?" />

              <button
                type="submit"
                disabled={sending}
                className="mt-2 border border-black/20 px-6 py-3 text-[11px] tracking-[0.22em] uppercase"
                style={{ borderRadius: 12, background: "black", color: "white", opacity: sending ? 0.7 : 1 }}
              >
                {sending ? "Wysyłam..." : "Wyślij"}
              </button>

              {sent && (
                <p className="text-[11px] tracking-[0.22em] uppercase text-black/55">
                  Wysłane. Dziękujemy — wrócimy z odpowiedzią jak najszybciej.
                </p>
              )}
            </form>

            <div className="mt-10">
              <Link className="underline text-black/70" href="/">
                Wróć na stronę główną
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="mx-auto max-w-[900px] px-4 pt-14 pb-10 text-center nav-font text-[10px] tracking-[0.22em] uppercase text-black/55">
  © {new Date().getFullYear()} Portugalia z Przewodnikiem
</footer>
    </main>
  );
}

/* These keep your existing UI meaning.
   I only added `name` support so the form can send data. */
function Field({
  label,
  placeholder,
  type = "text",
  name,
}: {
  label: string;
  placeholder: string;
  type?: string;
  name: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[10px] tracking-[0.22em] uppercase text-black/55">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="border border-black/15 px-4 py-3 text-[13px] outline-none"
        style={{ borderRadius: 10 }}
      />
    </label>
  );
}

function Textarea({
  label,
  placeholder,
  name,
}: {
  label: string;
  placeholder: string;
  name: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[10px] tracking-[0.22em] uppercase text-black/55">{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        rows={6}
        className="border border-black/15 px-4 py-3 text-[13px] outline-none resize-none"
        style={{ borderRadius: 10 }}
      />
    </label>
  );
}