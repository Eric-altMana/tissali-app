'use client'

import axios from 'axios'
import { ClientType, PanierType } from '@/app/Types/Types'

export const AddCommande = async (
  panier: PanierType[],
  total: number,
  localisation: { region: string; ville: string; quartier: string },
  client: ClientType | null,
  videPanier: () => void
) => {
  try {
    const res = await axios.post('/api/AddCommande', {
      produits: panier,
      total: total,
      localisation,
      client
    })

    if (res.data.message === "Commande enregistrée avec succès") {
      alert("Commande envoyée avec succès !")
      videPanier()
    } else {
      alert("Erreur lors de l’envoi de la commande.")
    }
  } catch (error) {
    console.error(error)
    alert("Erreur lors de l'envoi de la commande.")
  }
}
