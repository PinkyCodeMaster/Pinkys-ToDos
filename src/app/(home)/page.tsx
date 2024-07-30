import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // Create the Supabase client to interact with the Supabase API
  const supabase = createClient();

  // Get the user object to check if the user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Family Hive</h1>
      <p className="text-lg mb-4">Your one-stop solution for family management.</p>
      {/* Add links to login or register pages */}
      <div className="space-x-4">
        <a href="/auth/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</a>
        <a href="/auth/register" className="bg-green-500 text-white px-4 py-2 rounded">Register</a>
      </div>
    </div>
  );
}
