import { dbConnect } from "@/lib/mongoConfig"
import { ProduitCollection } from "@/Models/modelsConfig"
import { NextResponse } from "next/server"

export const GET = async (req: Request, {
  params,
}: {
  params: Promise<{ id: string }>
}) => {
    try {
        await dbConnect()
        const { id } = await params;

        const produit = await ProduitCollection.findById(id).lean()
        console.log(produit)

        if (!produit) {
            return NextResponse.json({ message: "Produit non trouvé" })
        }

        return NextResponse.json({message: "Produit trouvé", produit})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "une erreur s'est produite"})
    }
}