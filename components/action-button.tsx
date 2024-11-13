// ActionButton.tsx
"use client";

import Link from "next/link";
import { FC, ReactNode } from "react";

interface ActionButtonProps {
  text?: string | null;
  icon: ReactNode;  // Updated to accept any JSX element
  onClick?: () => void;
  href?: string;
}

const ActionButton: FC<ActionButtonProps> = ({ text, icon, onClick, href }) => (
  href ? (
    <Link href={href} className="w-full flex flex-row gap-2 items-center cursor-pointer">
      {icon}  {/* Render the icon as-is */}
      {text && <span className="font-light">{text}</span>}
    </Link>
  ) : (
    <div className="w-full flex flex-row gap-2 items-center cursor-pointer" onClick={onClick}>
      {icon}  {/* Render the icon as-is */}
      {text && <span className="font-light">{text}</span>}
    </div>
  )
);

export default ActionButton;
