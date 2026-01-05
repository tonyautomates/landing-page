
import Link from "next/link";
import Header from "../../components/Header";
export default function TrasyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="mx-auto max-w-[900px] px-4 pt-8 pb-12">
        <div className="border border-black/10">
          <div className="px-5 py-10 text-center">
            <h1 className="heading-font tracking-[0.20em] text-[22px] sm:text-[30px]">
  Trasy i propozycje
</h1>

            <p className="mt-6 text-[14px] leading-8 text-black/60">
              Wybierz gotową trasę albo ułóżmy plan pod Ciebie. Poniżej 3 najczęstsze opcje.
            </p>

            <div className="mt-8 grid gap-6 text-left text-black/60">
              <Box
                title="Lizbona — klasyki i perełki"
                meta="4–6h / 1 dzień"
                desc="Stare miasto, punkty widokowe, klimatyczne uliczki, lokalne jedzenie."
              />
              <Box
                title="Sintra + Cabo da Roca"
                meta="1 dzień"
                desc="Pałace, ogrody i ocean. Najbardziej „wow” okolice Lizbony."
              />
              <Box
                title="Porto — Douro i wino porto"
                meta="4–6h / 1 dzień"
                desc="Spacer po mieście, rzeka, najlepsze miejsca na zdjęcia i smaki."
              />
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



function Box({
  title,
  meta,
  desc,
}: {
  title: string;
  meta: string;
  desc: string;
}) {
  return (
    <div className="border border-black/10 px-5 py-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div className="heading-font text-[12px] sm:text-[13px]" style={{ letterSpacing: "0.18em" }}>
          {title}
        </div>
        <div className="text-[11px] tracking-[0.18em] uppercase text-black/45">
          {meta}
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-8 text-black/70">{desc}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-[900px] px-4 pt-8 pb-10 text-center text-[10px] tracking-[0.18em] uppercase text-black/40">
      © {new Date().getFullYear()} Portugalia z Przewodnikiem
    </footer>
  );
}