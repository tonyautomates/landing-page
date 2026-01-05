import Header from "../../components/Header"
import Link from "next/link";
export default function GaleriaPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="mx-auto max-w-[900px] px-4 pt-8 pb-12">
        <div className="border border-black/10">
          <div className="px-5 py-10 text-center">
            <h1 className="heading-font tracking-[0.20em] text-[22px] sm:text-[30px]">Galeria</h1>

            <p className="mt-5 text-[14px] leading-7 text-black/60">
              Dodajemy tu zdjęcia, które budują klimat: tramwaje, uliczki, ocean, Sintra i Porto.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Slot label="Lizbona" />
              <Slot label="Tramwaj" />
              <Slot label="Ocean" />
              <Slot label="Sintra" />
              <Slot label="Porto" />
              <Slot label="Widoki" />
              <Slot label="Jedzenie" />
              <Slot label="Uliczki" />
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


function Slot({ label }: { label: string }) {
  return (
    <div className="border border-black/10">
      <div className="aspect-[4/3] bg-black/5" />
      <div className="px-3 py-3 text-[10px] tracking-[0.18em] uppercase text-black/45">
        {label}
      </div>
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