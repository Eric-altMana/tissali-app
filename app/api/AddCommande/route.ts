import { dbConnect } from "@/lib/mongoConfig"
import { CommandeCollection } from "@/Models/modelsConfig"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: Request) => {
  try {
    await dbConnect()

    const body = await req.json()

    const newCommande = new CommandeCollection(body)

    await newCommande.save()

    return NextResponse.json({ message: "Commande enregistrée avec succès" })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Une erreur s'est produite" })
  }
}
