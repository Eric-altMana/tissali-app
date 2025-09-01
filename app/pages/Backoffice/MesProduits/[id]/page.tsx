"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import "./mesproduits.css"
import axios from 'axios';
import { ProduitType, VendeurType } from '@/app/Types/Types';
import Image from 'next/image';
import { CirclePlus, LayoutDashboard, ShoppingBag, Store } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebars/Sidebars';
import BackofficeNavebar from '@/app/components/BackofficeNavebar/BackofficeNavebar';

function page() {

    const params = useParams();
    const id = params.id as string;

    const [produits, setProduits] = useState<ProduitType[]>([]);

    const [vendeur, setVendeur] = useState<VendeurType | null>(null);

    useEffect(() => {
        const fetchVendeur = async () => {
            try {
                const res = await axios.get(`/api/GetVendeurData/${id}`);
                console.log("Données du vendeur récupérées :", res.data.vendeur);
                setVendeur(res.data.vendeur);
            } catch (error) {
                console.log("Erreur lors du chargement du profil :", error);
            }
        };
        fetchVendeur();
    }, [id]);

    const recupMesProduits = async () => {
        try {
            const res = await axios.get(`/api/GetMesProduits/${id}`)
            if (res.data.produits) {
                setProduits(res.data.produits);
            }

        } catch (error) {
            console.error("Erreur lors de la récupération des produits :", error);
        }
    }

    useEffect(() => {
        if (id) recupMesProduits();
    }, [id])

    return (
        <div className="min-vh-100 bg-light">
            {/* Layout principal */}
            <div className="d-flex">
                {/* Sidebar - Cachée sur mobile */}
                <div className="d-none d-lg-block">
                    <Sidebar vendeur={{ _id: vendeur?._id }} />
                </div>

                {/* Contenu principal */}
                <div className="flex-grow-1">
                    {/* Navbar */}
                    <BackofficeNavebar vendeur={{
                        _id: vendeur?._id,
                        nom: vendeur?.nom,
                        prenom: vendeur?.prenom
                    }} />

                    {/* Contenu de la page */}
                    <main className="container-fluid p-3 p-md-4">
                        {/* Header */}
                        <div className="row mb-4">
                            <div className="col-12">
                                <div className="bg-white rounded-3 shadow-sm p-4 border">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <h1 className="h3 text-dark mb-2 fw-bold">
                                                Bienvenue sur votre dashboard
                                            </h1>
                                            <p className="text-muted mb-0">
                                                Gérez vos articles et suivez vos commandes en temps réel
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default page
