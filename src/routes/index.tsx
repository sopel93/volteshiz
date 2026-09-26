import { createFileRoute, Link } from "@tanstack/react-router";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <PageHeader kicker="VOLT · APK · Shizuku" title="Wgraj na telefon">
        Android Studio nie jest potrzebne. Pobierz APK, zainstaluj na realme 9
        Pro 5G, potem sparuj Shizuku. Podgląd w przeglądarce nie uruchomi
        radia — to robi plik na telefonie.
      </PageHeader>

      <section className="px-5">
        <a href="/VOLT.apk" download="VOLT.apk" className="block">
          <Button type="button" size="xl" className="w-full rounded-lg">
            <Download />
            Pobierz VOLT.apk
          </Button>
        </a>
        <p className="mt-3 text-center text-xs text-subtle">
          5,9 MB · podpis debug · poza Sklepem Play
        </p>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-lg font-medium tracking-tight">Na telefonie</h2>
        <ol className="mt-3 space-y-3">
          {[
            {
              n: "1",
              t: "Zainstaluj APK",
              d: "Otwórz pobrany plik. ColorOS zapyta o instalację z tego źródła — zezwól. To nie jest aplikacja ze Sklepu Play.",
            },
            {
              n: "2",
              t: "Zainstaluj Shizuku",
              d: "Ze Sklepu Play. VOLT bez działającego Shizuku nic nie zmieni w radiu.",
            },
            {
              n: "3",
              t: "Sparuj Shizuku",
              d: "Ustawienia → Informacje o telefonie → 7× numer kompilacji. Opcje programisty → Debugowanie bezprzewodowe. W Shizuku: parowanie kodem, potem Start.",
            },
            {
              n: "4",
              t: "Otwórz VOLT",
              d: "Połącz Shizuku → zezwól → Zastosuj cały tuner (Smart 5G, DNS, APN, VoLTE).",
            },
          ].map((step) => (
            <li
              key={step.n}
              className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)]"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-signal">{step.n}</span>
                <h3 className="text-sm font-medium text-fg">{step.t}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6 px-5">
        <h2 className="text-lg font-medium tracking-tight">Co jest w tunerze</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li className="rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
            Inteligentne 5G off · typ sieci NSA · oszczędzanie danych · bateria
          </li>
          <li className="rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
            Prywatny DNS: Cloudflare, Google, Quad9, AdGuard
          </li>
          <li className="rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
            APN IPv4/IPv6 + gotowce Play / Orange / Plus / T-Mobile
          </li>
          <li className="rounded-2xl bg-surface px-4 py-3 shadow-[var(--shadow-border)]">
            VoLTE, VoWiFi, RadioInfo
          </li>
        </ul>
      </section>

      <section className="mt-6 px-5">
        <div className="flex flex-wrap gap-2">
          <Badge>pl.volt.tuner</Badge>
          <Badge>Shizuku 13.1.5</Badge>
          <Badge>realme 9 Pro 5G</Badge>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-subtle">
          Kod źródłowy (Android Studio / Gradle) jest opcjonalny — tylko gdy
          chcesz sam kompilować. Na ColorOS operator może trzymać IMS na szaro
          mimo exit=0.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button variant="secondary" asChild>
            <Link to="/pliki">Kod źródłowy</Link>
          </Button>
          <a href="/VOLT-Shizuku-Android.zip" download>
            <Button type="button" variant="secondary" className="w-full">
              Projekt ZIP
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
