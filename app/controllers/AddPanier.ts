"use client"

import { PanierType, ProduitType } from "../Types/Types"

export const AddPanier = (
    produit: ProduitType,
    qte: number,
    panier: PanierType[],
    addPanierStore: (els: PanierType[]) => void,
    incQteEls: (id: string) => void
) => {
      if (typeof window !== undefined) {
    const elSearch = panier?.find(item => item.idProduit === produit?._id)

    if (!elSearch) {
      addPanierStore([...panier, {
        idProduit: produit?._id!,
        produitNom: produit?.titre!,
        prixInitial: produit?.prix!,
        qte,
        prixTotal: Number(produit?.prix) * Number(qte),
        image: produit?.images ? produit?.images[0] : '',
        typeProduit: produit?.type!
      }])

      incQteEls(produit._id!) 
      return
    }

    elSearch.qte += Number(qte)
    elSearch.prixTotal += (qte * produit?.prix!)
    incQteEls(produit._id!) 
  }

}