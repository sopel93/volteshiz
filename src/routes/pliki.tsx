import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pliki")({ component: FilesPage });

const FILES = [
  { id: "gradle", name: "app/build.gradle.kts", href: "/android/build.gradle.kts" },
  { id: "manifest", name: "AndroidManifest.xml", href: "/android/AndroidManifest.xml" },
  { id: "main", name: "MainActivity.kt", href: "/android/MainActivity.kt" },
  { id: "shell", name: "ShellService.kt", href: "/android/ShellService.kt" },
  { id: "aidl", name: "IShellService.aidl", href: "/android/IShellService.aidl" },
] as const;

function FilesPage() {
  const [active, setActive] = useState<(typeof FILES)[number]>(FILES[2]);
  const [source, setSource] = useState("Ładuję…");

  useEffect(() => {
    let gone = false;
    fetch(active.href)
      .then((r) => r.text())
      .then((t) => {
        if (!gone) setSource(t);
      })
      .catch(() => {
        if (!gone) setSource("Nie udało się wczytać pliku.");
      });
    return () => {
      gone = true;
    };
  }, [active]);

  return (
    <main>
      <PageHeader kicker="Źródła" title="Trzy pliki + UserService">
        To, o co prosiłeś: moduł Gradle, manifest i MainActivity. Shizuku 13
        wymaga jeszcze AIDL i ShellService — bez nich shell się nie skompiluje.
      </PageHeader>

      <section className="px-5">
        <a href="/VOLT.apk" download="VOLT.apk">
          <Button type="button" size="xl" className="w-full rounded-lg">
            Pobierz VOLT.apk
          </Button>
        </a>
        <a href="/VOLT-Shizuku-Android.zip" download className="mt-2 block">
          <Button type="button" variant="secondary" className="w-full">
            Projekt Android Studio (ZIP)
          </Button>
        </a>
        <div className="mt-4 flex flex-wrap gap-2">
          {FILES.map((file) => (
            <Button
              key={file.id}
              type="button"
              size="md"
              variant={file.id === active.id ? "primary" : "secondary"}
              onClick={() => setActive(file)}
            >
              {file.name.split("/").pop()}
            </Button>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <p className="font-mono text-xs text-subtle">{active.name}</p>
            <a
              href={active.href}
              download
              className="text-xs font-medium text-signal"
            >
              Pobierz
            </a>
          </div>
          <pre
            className={cn(
              "max-h-[28rem] overflow-auto px-4 py-3 font-mono text-[11px] leading-relaxed text-muted",
            )}
          >
            {source}
          </pre>
        </div>
      </section>
    </main>
  );
}
