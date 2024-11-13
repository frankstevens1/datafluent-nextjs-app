import ThemeSwitcher from "@/components/theme-switcher";
import Navbar from "@/components/user/navigation-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-start my-2 mx-4 md:mx-10">
      <Navbar/>
      <div className="w-full h-full">
        {children}
      </div>
      <div className="absolute bottom-8">
        <ThemeSwitcher />
      </div>
    </div>
  );
}
