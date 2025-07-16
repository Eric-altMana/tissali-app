import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongoConfig";
import { ClientCollection, VendeurCollection } from "@/Models/modelsConfig";

export const GET = async (req: Request, {
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  
  const { id } = await params;

  try {
    await dbConnect();

    const vendeur = await VendeurCollection.findById(id).lean();

    if (!vendeur) {
      return NextResponse.json(
        { success: false, message: "vendeur introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, vendeur }, { status: 200 });
  } catch (error: any) {
    console.error("Erreur récupération vendeur:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur." },
      { status: 500 }
    );
  }
};
