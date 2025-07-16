"use client"
import NavBar from '@/app/components/Header/NavBar'
import { ProduitType } from '@/app/Types/Types';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {

    const params = useParams();
    const id = params.id as string;

    const [produit, setProduit] = useState<ProduitType | null>(null)

    const recupDetailProduits = async () => {
        try {
            const res = await axios.get(`/api/GetProduit/${id}`)
            console.log(res.data)
            if (res.data.produit) {
                setProduit(res.data.produit);
            }

        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    }

    useEffect(() => {

        if (id) recupDetailProduits()

    }, [id])

    return (
        <div>
            <NavBar />
            <div className=' container-fluid my-2'>
                <div className='row'>
                    {produit && (
                        <>
                            <div className="col-8">
                                <div className="row row-cols-2">
                                    <div className=' m-1' style={{ width: '480px' }}>
                                        <div className=' card rounded-0 border-0' style={{ height: '100%', width: '480px' }}>
                                            {produit.images && produit.images.length > 0 && (
                                                <Image
                                                    src={produit.images[0]}
                                                    className="img-fluid rounded-top-2"
                                                    alt={produit.titre || "Produit"}
                                                    width={480}
                                                    height={500}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className=' m-1' style={{ width: '480px' }}>
                                        <div className=' card rounded-0 border-0' style={{ height: '100%', width: '480px' }}>
                                            {produit.images && produit.images.length > 0 && (
                                                <Image
                                                    src={produit.images[0]}
                                                    className="img-fluid rounded-top-2"
                                                    alt={produit.titre || "Produit"}
                                                    width={480}
                                                    height={500}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className=' m-1' style={{ width: '480px' }}>
                                        <div className=' card rounded-0 border-0' style={{ height: '100%', width: '480px' }}>
                                            {produit.images && produit.images.length > 0 && (
                                                <Image
                                                    src={produit.images[0]}
                                                    className="img-fluid rounded-top-2"
                                                    alt={produit.titre || "Produit"}
                                                    width={480}
                                                    height={500}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className=' m-1' style={{ width: '480px' }}>
                                        <div className=' card rounded-0 border-0' style={{ height: '100%', width: '480px' }}>
                                            {produit.images && produit.images.length > 0 && (
                                                <Image
                                                    src={produit.images[0]}
                                                    className="img-fluid rounded-top-2"
                                                    alt={produit.titre || "Produit"}
                                                    width={480}
                                                    height={500}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className=' m-1' style={{ width: '480px' }}>
                                        <div className=' card rounded-0 border-0' style={{ height: '100%', width: '480px' }}>
                                            {produit.images && produit.images.length > 0 && (
                                                <Image
                                                    src={produit.images[0]}
                                                    className="img-fluid rounded-top-2"
                                                    alt={produit.titre || "Produit"}
                                                    width={480}
                                                    height={500}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className=' m-1' style={{ width: '480px' }}>
                                        <div className=' card rounded-0 border-0' style={{ height: '100%', width: '480px' }}>
                                            {produit.images && produit.images.length > 0 && (
                                                <Image
                                                    src={produit.images[0]}
                                                    className="img-fluid rounded-top-2"
                                                    alt={produit.titre || "Produit"}
                                                    width={480}
                                                    height={500}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-4">
                                <div className=' border rounded p-3'>
                                    <div>
                                        <div className=' border-bottom border-secondary-subtle rounded-0 mb-3'>
                                            <p className=' fs-3 fw-semibold'>{produit.titre}</p>
                                            <p className=' fs-4 fw-semibold'>{produit.prix} <span className=' text-or'>Fcfa</span></p>
                                            <p>{produit.description}</p>
                                        </div>
                                    </div>
                                    <div className='mb-3'>
                                        <button className='btn-black' style={{ width: '200px' }}>Acheter</button>
                                    </div>
                                    <div>
                                        <button className='btn border  fw-semibold' style={{ width: '200px' }}>Louer</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default page
