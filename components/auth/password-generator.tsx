"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckCircle, Copy, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const generatePassword = (length = 16) => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    return Array.from({ length })
      .map(() => charset[Math.floor(Math.random() * charset.length)])
      .join("");
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    setIsCopied(false);
    setOpen(true);
  };

  const handleCopyToClipboard = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);
      toast({
        title: "Password copied",
        description: "Strong password copied to your clipboard."
      })
      setTimeout(() => {
        setIsCopied(false);
        setOpen(false); // Close the popover after copying
      }, 500); // Close popover after 500ms
    }
  };

  const handleRegenerate = () => {
    const newPassword = generatePassword();
    setPassword(newPassword);
    setIsCopied(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <p className="flex flex-row text-xs underline hover:cursor-pointer" onClick={handleGeneratePassword}>
          <ShieldCheck className="mr-2" size={14} />
          Generate Password
        </p>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex items-center justify-between gap-2">
            <div className="flex flex-row items-center gap-4 bg-muted p-2 pr-3 rounded-lg">
                <span className="text-nowrap tracking-wider text-sm">{password ? password : 'Regenerate...'}</span>
                {password &&
                    <div className="focus:outline-none focus:ring-0 p-0" onClick={handleCopyToClipboard}>
                        {isCopied ? (
                            <div className="p-1.5">
                                <CheckCircle className="text-green-500" size={16} />
                            </div>
                            ) : (
                            <div className="p-1.5 rounded-lg hover:bg-muted-foreground hover:text-muted">
                                <Copy size={16} />
                            </div>
                        )}
                    </div>
                }
            </div>
            <Button className="focus:outline-none focus:ring-0" variant="ghost" size="icon" onClick={handleRegenerate}>
              <RefreshCw size={12} />
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PasswordGenerator;
