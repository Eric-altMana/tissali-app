import { dbConnect } from "@/lib/mongoConfig";
import { ProduitCollection } from "@/Models/modelsConfig";
import { NextRequest } from "next/server";

export const GET = async (req: Request, {
  params,
}: {
  params: Promise<{ vendeurId: string }>
}) => {

    try {

        await dbConnect()

        const { vendeurId } = await params

        if (!vendeurId) {
            return Response.json({ message: 'vendeurId manquant' });
        }

        const produits = await ProduitCollection.find({ vendeurId }).sort({ dateAjout: -1 }); // produits récents en premier

        const totalProduits = produits.length;

        return Response.json({ message: "Produits trouvés", produits });
    } catch (error) {
        console.log("Erreur lors de la récupération des produits du vendeur :", error);
        return Response.json({ error: 'Erreur serveur' });
    }
}