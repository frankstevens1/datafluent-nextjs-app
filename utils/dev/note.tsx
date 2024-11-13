import { ArrowUpRight, InfoIcon } from "lucide-react";
import Link from "next/link";

interface NoteBannerProps {
  note?: string;
  url?: string;
}

export function NoteBanner({ 
  note = "Truth hides in paradox, revealing itself only in glimpses.", 
  url = "https://www.reddit.com/r/philosophy/comments/e1ifqi/slavoj_%C5%BEi%C5%BEek_our_theories_contain_paradoxes_not/" 
}: NoteBannerProps) {
  return (
    <div className="bg-muted/50 px-5 py-3 border rounded-md flex gap-4 max-w-lg">
      <InfoIcon size={16} className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <small className="text-sm text-secondary-foreground">
          <strong> Note:</strong> {note}
        </small>
        <div>
          <Link
            href={url}
            target="_blank"
            className="text-primary/50 hover:text-primary flex items-center text-sm gap-1"
          >
            Learn more <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
