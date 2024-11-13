// Client component (ClientToast.tsx)
"use client"; // Ensure this is a client component

import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface ClientToastProps {
  message: string;
  title?: string;
}

export default function SuccessClientToast({ title="Success!" , message }: ClientToastProps) {
  // Trigger the toast on component mount
  useEffect(() => {
    if (message) {
      toast({
        title: title,
        description: message,
      })
    }
  }, [message]);

  return <Toaster />; // Render the toast container
}
