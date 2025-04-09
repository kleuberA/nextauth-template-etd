"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify(form),
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Erro ao registrar");
            toast.error(data.error || "Erro ao registrar. Tente novamente.");
            return;
        }

        toast.success('Conta criada com sucesso!');

        router.push("/login");
    }

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Criar conta</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nome"
                    className="w-full p-2 border rounded"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-2 border rounded"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                    Registrar
                </button>
            </form>
        </div>
    );
}
