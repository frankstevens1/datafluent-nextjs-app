import ThemeSwitcher from "@/components/theme-switcher";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-12">
      <div>
        {children}
      </div> 
      <div className="absolute bottom-14">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
