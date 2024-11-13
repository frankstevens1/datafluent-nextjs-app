"use client";

import { capitalizeFirstLetter } from "@/lib/utils";
import CopyToClipboard from "./copy-to-clipboard";

interface NeatDevDataProps {
  title?: string;
  data: any;
  isCentered?: boolean;
  showKeys?: boolean;
}

export default function NeatDevData({ title, data, isCentered = false, showKeys = false }: NeatDevDataProps) {

  // If data is undefined or null, use a fallback message
  const displayData = data ? data : { message: "No data available" };

  return (
    <div
      className={`h-fit flex flex-col bg-slate-300 dark:bg-slate-500 p-3 rounded-lg shadow-lg ${
        isCentered ? 'fixed inset-0 m-auto flex items-center justify-center z-50' : 'relative'
      }`}
      style={isCentered ? { maxWidth: '80%', maxHeight: '60%' } : {}}
    >
      <div className="flex w-full flex-row justify-between items-center mb-2">
        <h1>{title ? capitalizeFirstLetter(title) : "Untitled"}</h1>
        <CopyToClipboard textToCopy={JSON.stringify(displayData, null, 2)} />
      </div>
      <pre className="w-full bg-secondary p-3 rounded-lg text-xs overflow-auto custom-scrollbar">
        {showKeys ? JSON.stringify(Object.keys(displayData), null, 2) : JSON.stringify(displayData, null, 2)}
      </pre>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 18px; /* Width of the scrollbar */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb; /* Background of the scrollbar track (light gray) */
          border-radius: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #9ca3af; /* Color of the scrollbar thumb (dark gray) */
          border-radius: 8px; /* Rounded corners for the thumb */
          border: 3px solid #e5e7eb; /* Space around the thumb */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #1f2937; /* Darker color when hovering over the scrollbar */
        }
      `}</style>
    </div>
  );
}
