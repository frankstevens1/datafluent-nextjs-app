"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/auth/submit-button";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

export default function SignupError() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    const supabase = createClient();
    const { error } = await supabase.from("support").insert([
      { email, message, route: "auth error" }
    ]);

    if (error) {
      console.error("Error submitting support request:", error.message);
      setSubmissionStatus("error");
    } else {
      setSubmissionStatus("submitted");
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full gap-4 min-w-64 max-w-64 mx-auto">
      <div>
        <h1 className="text-2xl font-medium">Signup Error</h1>
        <p className="text-sm text-secondary-foreground mt-2">
          Unfortunately, there was an issue processing your signup. Please try again or contact support if the problem persists.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Link href="/sign-up">
          <Button className="w-full">Try Again</Button>
        </Link>
      </div>
      {submissionStatus === "submitted" ? (
        <div className="bg-muted/50 px-5 py-3 border rounded-md flex gap-4 mt-4 max-w-lg">
          <InfoIcon size={16} className="mt-0.5" />
          <div className="flex flex-col gap-1">
            <small className="text-sm text-secondary-foreground">
              <strong>Note:</strong> Thank you for reaching out. We’ve received your message and will get back to you as soon as possible.
            </small>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
          <Label htmlFor="email">Your Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="you@your.email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Label htmlFor="message">Message</Label>
          <Textarea
            name="message"
            placeholder="Describe your issue"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="p-2 border rounded-md"
          />

          <SubmitButton disabled={submissionStatus === "submitting"}>
            {submissionStatus === "submitting" ? "Submitting..." : "Send Message"}
          </SubmitButton>

          {submissionStatus === "error" && (
            <p className="text-sm text-red-600 mt-2">
              There was an error submitting your message. Please try again later.
            </p>
          )}
        </form>
      )}
    </div>
  );
}