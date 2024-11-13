"use client";

import React, { useState } from "react";
import { CheckCircle, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CopyToClipboardProps {
  textToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    const prettyJson = JSON.stringify(JSON.parse(textToCopy), null, 2); 
    
    try {
      // Use the modern Clipboard API if available
      await navigator.clipboard.writeText(prettyJson);
      setIsCopied(true);
      // Show toast notification on successful copy
      toast({
        title: "Copied!",
        description: "The content has been successfully copied to your clipboard.",
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    copyToClipboard();
  };

  return (
    <div className="flex w-fit">
      <button onClick={handleCopy} className="flex justify-center w-full">
        {isCopied ? (
          <div className="flex flex-row items-center p-2 rounded-xl bg-gray-400 hover:bg-gray-600 text-white w-fit">
            <CheckCircle className="h-4 w-4 mr-0.5" />
            <p className="text-xs ml-1">Copied!</p>
          </div>
        ) : (
          <div className="flex flex-row items-center p-2 rounded-xl bg-gray-400 hover:bg-gray-600 text-white w-fit">
            <Copy className="h-4 w-4 mr-0.5" />
            <p className="text-xs flex justify-center ml-1 pr-3.5">Copy</p>
          </div>
        )}
      </button>
    </div>
  );
};

export default CopyToClipboard;
