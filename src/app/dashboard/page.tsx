"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p className="text-center mt-10">Carregando...</p>;
    }

    return (
        <div className="max-w-xl mx-auto mt-20 space-y-4 text-center">
            <h1 className="text-3xl font-bold">Bem-vindo(a) {session?.user.name} ao Dashboard</h1>
            <p>
                Você está logado como: <strong>{session?.user?.email}</strong>
            </p>
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
            >
                Sair
            </button>
        </div>
    );
}
