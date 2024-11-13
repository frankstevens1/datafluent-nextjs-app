import { signInAction } from "@/lib/auth-actions";
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ThirdPartyLogin from "@/components/auth/thirdparty-auth-buttons";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium mb-6">Sign in</h1>
      <ThirdPartyLogin provider="github" />
      <div className="h-2"/>
      <ThirdPartyLogin provider="google" />
      <p className="flex items-center justify-center text-sm my-6 text-gray-500">
        <span className="border-t border-gray-300 flex-grow mr-3"></span>
        or
        <span className="border-t border-gray-300 flex-grow ml-3"></span>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Password</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Sign in
        </SubmitButton>
        <p className="text-sm text-foreground mt-4">
          Don&apos;t have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
