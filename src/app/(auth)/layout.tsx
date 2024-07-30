import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return (
        <main className="w-full min-h-screen lg:grid lg:grid-cols-2">
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                {children}
            </div>

        </main>
    );
}
