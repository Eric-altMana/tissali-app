import { dbConnect } from "@/lib/mongoConfig"
import { ProduitCollection } from "@/Models/modelsConfig"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        await dbConnect()
        const produits = await ProduitCollection.find({}).sort({ dateAjout: -1 }) // produits récents en premier
        console.log(produits)

        if (!produits || produits.length === 0) {
            return NextResponse.json({ message: "Aucun produit trouvé" })
        }

        return NextResponse.json({message: "Produits trouvés", produits})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "une erreur s'est produite"})
    }
}