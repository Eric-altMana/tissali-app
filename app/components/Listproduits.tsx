"use client"
import { ListProduits, ProduitType } from '@/app/Types/Types'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AddPanier } from '../controllers/AddPanier'
import { PanierStore } from '@/store/useStore'
import Link from 'next/link'

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
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                    {produits.length > 0 && produits.map((produit: ProduitType, index) => (
                        <div className="col" key={index}>

                            <div className="cart">
                                <Link href={`/pages/Detaile/${produit._id}`} className="text-decoration-none text-black">
                                    <div className="product-card card-img mb-2">
                                        {produit.images && produit.images.length > 0 && (
                                            <Image
                                                src={produit.images[0]}
                                                className="img-fluid rounded-top-2"
                                                alt={produit.titre || "Produit"}
                                                width={300}
                                                height={300}
                                            />
                                        )}
                                    </div>
                                </Link>
                                <div className="card-content">
                                    <div className=' text-start'>
                                        <div>
                                            <h5 className="card-title fw-normal mb-2">
                                                {produit?.titre} 
                                               
                                            </h5>
                                            <h5 className="prix fs mb-2">
                                                {produit?.prix}
                                                
                                            </h5>
                                            <p className='mt-0'>
                                                <span className=' text-end'><small>{produit?.quantite}: disponibles</small></span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="btn-ctn mt-3">
                                        <button className="add-btn w-100" onClick={() => AddPanier(produit, 1, panier, addPanierStore, incQteEls)}>Ajouter au panier</button>
                                    </div>
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
