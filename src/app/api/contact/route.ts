import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const json = await request.json();
        const { name, email, message } = json;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Todos los campos son obligatorios" },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        const { error } = await supabase
            .from("contacts")
            .insert({
                name,
                email,
                message,
                read: false,
            });

        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json(
                { error: "Error guardando el mensaje." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" });
    } catch (err) {
        console.error("Internal error:", err);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
