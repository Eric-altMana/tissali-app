import { dbConnect } from "@/lib/mongoConfig"
import { CommandeCollection } from "@/Models/modelsConfig";
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    try {
        await dbConnect()
        const mesCommandes = await CommandeCollection.find().sort({ dateAjout: -1 }); // produits récents en premier

        // Calcule la somme totale des montants
        const totalMontant = mesCommandes.reduce((sum, commande) => {
            return sum + (commande.montantTotal || 0); // Assure-toi que le champ est bien nommé
        }, 0);

        return NextResponse.json({
            message: "ok commande récupérée",
            commandes: mesCommandes,
            totalMontant
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Erreur lors de la recupération des commandes" })
    }
}