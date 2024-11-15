// src/utils/dev/tailwind-indicator.tsx
export const TailwindIndicator = () => {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-10 h-10 bg-gray-800 text-white text-xs rounded-full">
      <span className="block md:hidden">SM</span>
      <span className="hidden md:block lg:hidden">MD</span>
      <span className="hidden lg:block xl:hidden">LG</span>
      <span className="hidden xl:block 2xl:hidden">XL</span>
      <span className="hidden 2xl:block">2XL</span>
    </div>
  );
};