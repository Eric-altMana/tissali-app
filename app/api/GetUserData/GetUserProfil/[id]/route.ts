import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoConfig";
import { ClientCollection } from "@/Models/modelsConfig";

export const GET = async (req: Request, {
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  
  const { id } = await params;

  try {
    await dbConnect();

    const client = await ClientCollection.findById(id).lean();

    if (!client) {
      return NextResponse.json(
        { success: false, message: "Client introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, client }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur récupération client:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
};
