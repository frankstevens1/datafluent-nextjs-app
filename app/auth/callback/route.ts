import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    try {
      const supabase = await createClient();
      
      // Try to exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error("Failed to exchange code for session:", error.message);
        return NextResponse.json({ message: "Session exchange failed", error: error.message }, { status: 500 });
      }

    } catch (err) {
      console.error("An error occurred during session exchange:", err);
      return NextResponse.json({ message: "An unexpected error occurred", error: err }, { status: 500 });
    }
  } else {
    console.error(JSON.stringify(requestUrl));
    console.error("No auth code provided in URL");
    return NextResponse.json({ message: "No auth code provided" }, { status: 400 });
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  return NextResponse.redirect(`${origin}`);
}
