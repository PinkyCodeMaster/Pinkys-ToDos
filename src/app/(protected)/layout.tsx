import { ReactNode } from "react";
import NavBar from "@/components/NavBar";

interface ProtectedProp {
    children: ReactNode
}

export default async function ProtectedLayout({ children }: ProtectedProp) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <NavBar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                {children}
            </main>
        </div>
    );
}