import { dbConnect } from "@/lib/mongoConfig";
import { CategorieCollection } from "@/Models/modelsConfig";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { labelCategorie, slug } = await req.json()
        if (!labelCategorie || !slug) {
            return new Response(JSON.stringify({ message: "Nom et slug requis" }));
        }

        await dbConnect()

        const nouvelleCategorie = new CategorieCollection({labelCategorie, slug})
        await nouvelleCategorie.save()

        return NextResponse.json({message: "ok"})

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Erreur lors de la création de la catégorie"})
    }
}