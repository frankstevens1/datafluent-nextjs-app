import { signUpAction } from "@/lib/auth-actions";
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ThirdPartyLogin from "@/components/auth/thirdparty-auth-buttons";
import PasswordGenerator from "@/components/auth/password-generator";

export default async function Signup(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <form className="flex flex-col min-w-64 max-w-64 mx-auto">
      <h1 className="text-2xl font-medium mb-6">Sign up</h1>
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
          <PasswordGenerator />
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          minLength={6}
          required
        />
        <SubmitButton formAction={signUpAction} pendingText="Signing up...">
          Sign up
        </SubmitButton>
        <p className="text-sm text text-foreground mt-4">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
