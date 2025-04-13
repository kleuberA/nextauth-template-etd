// app/api/change-password/route.ts
import { auth } from "@/auth"; // ajuste se seu NextAuth estiver em outro lugar
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user || !user.password) {
        return NextResponse.json({ error: "Usuário inválido" }, { status: 400 });
    }

    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
        return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedNewPassword },
    });

    return NextResponse.json({ message: "Senha alterada com sucesso" });
}
