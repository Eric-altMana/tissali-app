import { GetAuthToken } from "@/app/controllers/security/token";
import { dbConnect } from "@/lib/mongoConfig";
import { ProduitCollection, VendeurCollection } from "@/Models/modelsConfig";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        await dbConnect()
        const data = await req.json();

        //On recupère l'_id dans le token
        const vendeurData = await GetAuthToken()

        if (!vendeurData?.data) {
            return NextResponse.json({ message: "Utilisateur non reconnu" })
        }

        const nouveauProduit = new ProduitCollection({...data, vendeurId: vendeurData.data._id })
        await nouveauProduit.save();

        return NextResponse.json({message: "ok"}, data);
        
    } catch (error) {
        console.log("Erreur lors de l'ajout du produit :", error);
    }
}