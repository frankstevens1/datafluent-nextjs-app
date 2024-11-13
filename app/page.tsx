import ShuffledText from "@/components/shuffled-text";
import ThemeSwitcher from "@/components/theme-switcher";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ShuffledText text="datafluent.one"/>
      <main className="h-full w-full flex flex-col gap-8 row-start-2 items-center">
        <section>
          
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <ThemeSwitcher />
      </footer>
    </div>
  );
}
