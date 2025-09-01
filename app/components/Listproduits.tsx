"use client"
import { ListProduits, ProduitType } from '@/app/Types/Types'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AddPanier } from '../controllers/AddPanier'
import { PanierStore } from '@/store/useStore'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'

function ListProduitPage() {

    const [produits, setProduits] = useState<ProduitType[]>([])

    //On appel les éléments du store
    const panier = PanierStore((state) => state.panier)
    const addPanierStore = PanierStore((state) => state.addPanierStore)

    const incQteEls = PanierStore(state => state.incQteEls)
    const decQteEls = PanierStore(state => state.decQteEls)

    const recupProduits = async () => {
        try {
            const res = await axios.get('/api/GetListProduit')
            if (res.data.message === "Produits trouvés") {
                setProduits(res.data.produits)
            } else {
                console.log(res.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        recupProduits()
    }, [])

    return (
        <div>
            <div className="container-fluid">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-center">
                    {produits.length > 0 && produits.map((produit: ProduitType, index) => (
                        <div key={index} className="card border-0 p-0 rounded-0 shadow-sm m-4" style={{ width: '18rem' }}>
                            <Link href={`/pages/Detaile/${produit._id}`} className="text-decoration-none text-black">
                                <div className="position-relative">
                                    {produit.images && produit.images.length > 0 && (
                                        <>
                                            <img
                                                src={produit.images[0]}
                                                className="card-img-top object-fit-cover"
                                                alt={produit.titre || "Produit"}
                                                width={190}
                                                height={380}
                                            />
                                            <button type="button"
                                                className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm">
                                                <Heart size={20}/>
                                            </button>
                                        </>
                                    )}
                                </div>
                            </Link>

                            <div className="card-body p-0">
                                <p className="text-muted small mb-1">{produit?.titre}</p>
                                <h6 className="card-title mb-1">
                                    {produit?.titre}
                                </h6>
                                <p className="text-muted small mb-3">
                                    {produit?.description || "Aucune description disponible"}
                                </p>

                                <div className="d-flex align-items-center gap-2 mb-2">

                                    <span className="badge rounded-pill text-bg-warning">({produit?.quantite}): Disponibles</span>
                                </div>
                                
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <div className="fs-6 fw-semibold"> {produit?.prixInitial} FCFA</div>
                                    <button className="Btn" onClick={() => AddPanier(produit, 1, panier, addPanierStore, incQteEls)}>

                                        <div className="shop-cart">
                                            <ShoppingCart className='shop-cart-icon' />
                                        </div>

                                        <div className="text">Ajouter au panier</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListProduitPage
