'use client'
import { AddCommande } from '@/app/controllers/AddCommande'
import { PanierStore } from '@/store/useStore'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function PagePanier() {

    const router = useRouter()

    const panier = PanierStore(state => state.panier)
    const nbreEls = PanierStore(state => state.nbreEls)
    const deleteQteEls = PanierStore(state => state.deleteQteEls)
    const videPanier = PanierStore(state => state.videPanier)

    const incQteEls = PanierStore(state => state.incQteEls)
    const decQteEls = PanierStore(state => state.decQteEls)


    const total = panier.reduce((acc, item) => acc + item.prixInitial * item.qte, 0)

    if (panier.length === 0) {
        return <div className="container mt-5 text-center"><h4>Votre panier est vide</h4></div>
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-8">
                    {panier.map(item => (
                        <div key={item.idProduit} className="card shadow-sm p-0 my-3">
                            <h5 className="card-header bg-white">Panier ({nbreEls}) </h5>
                            <div className="card-body d-flex justify-content-between" style={{ height: '150px' }}>
                                <div className="card mb-3 border-0" style={{ maxWidth: '380px' }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            {item.image && item.image.length > 0 && (
                                                <img
                                                    src={item.image}
                                                    className="img-fluid rounded-top-2"
                                                    alt={item.produitNom || "Produit"}
                                                    width={70}
                                                    height={70}
                                                />
                                            )}
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body pt-0">
                                                <h5 className="card-title mb-3">{item.produitNom}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="fs-3 fw-semibold">{item.prixInitial * item.qte} <span className="text-or">FCFA</span></p>
                                </div>
                            </div>
                            <div className="card-footer pt-0 d-flex border-0 bg-white">
                                <button className="trash-btn text-center" onClick={() => deleteQteEls(item.id!)}>
                                    <Trash2 /> Supprimer
                                </button>
                                <div className="ms-auto">
                                    <button
                                        className="btn btn-sm border pt-1 py-2 text-center text-white bg-black mx-3 shadow-sm"
                                        onClick={() => decQteEls(item.id!)}
                                        disabled={item.qte <= 1}
                                    >
                                        <Minus />
                                    </button>

                                    <span>{item.qte}</span>

                                    <button
                                        className="btn btn-sm border pt-1 py-2 text-center text-white bg-black mx-3 shadow-sm"
                                        onClick={() => incQteEls(item.id!)}
                                    >
                                        <Plus />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-3 mt-3">
                    <div className="card">
                        <div className="card-header bg-white">Résumé du panier</div>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <p>Sous-total</p>
                                <p className="fs-5 fw-semibold">{total} <span className="text-or">FCFA</span></p>
                            </div>
                        </div>
                        <div className="card-footer bg-white text-center">
                            <button onClick={() => router.push("/pages/Checkout")} className="btn-or">Commander ({total} FCFA)</button>
                            <br />
                            <button onClick={videPanier} className="btn btn-link text-danger mt-2">Vider le panier</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PagePanier
