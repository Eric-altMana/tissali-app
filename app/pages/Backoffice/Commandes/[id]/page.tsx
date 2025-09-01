"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import "./commandesrecues.css"
import Image from 'next/image';
import Link from 'next/link';
import { CirclePlus, LayoutDashboard, ShoppingBag, Store } from 'lucide-react';
import { VendeurType } from '@/app/Types/Types';
import axios from 'axios';
import Sidebar from '@/app/components/Sidebars/Sidebars';
import BackofficeNavebar from '@/app/components/BackofficeNavebar/BackofficeNavebar';

function page() {

    const params = useParams();
    const id = params.id as string;

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
