import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SuccessClientToast from "@/utils/dev/client-toast";

export const metadata = {
  title: "Protected Page",
};

export default async function ProtectedPage(props: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Check if the user is authenticated
  if (!user) {
    return redirect("/sign-in");
  }

  // Get the query parameters from the URL
  const success = searchParams.success;

  return (
    <div className="flex-1 w-full flex flex-col">
      {success && <SuccessClientToast message="Password reset."/>}
    </div>
  );
}
