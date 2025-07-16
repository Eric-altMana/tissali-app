"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import "./mesproduits.css"
import axios from 'axios';
import { ProduitType, VendeurType } from '@/app/Types/Types';
import Image from 'next/image';
import { CirclePlus, LayoutDashboard, ShoppingBag, Store } from 'lucide-react';
import Link from 'next/link';

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
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                    <div className="container-fluid">
                        <a className="navbar-brand d-flex align-items-center" href="#">
                            <Image src="/logo/logo-3.png"
                                alt="Logo Tissali"
                                width={150}
                                height={50}
                            />

                        </a>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">

                            <div className="d-flex align-items-center ms-auto">
                                <ul className="navbar-nav me-4">
                                    <li className="nav-item">
                                        <Link href={`/`} className="nav-link">Accueil</Link>
                                    </li>
                                </ul>
                                <div className="dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        href="#"
                                        id="userDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {vendeur?.nom} {vendeur?.prenom}
                                    </a>
                                    <ul
                                        className="dropdown-menu dropdown-menu-end"
                                        aria-labelledby="userDropdown"
                                    >
                                        <li><a className="dropdown-item" href="#">Super Admin</a></li>
                                        <li><a className="dropdown-item" href="#">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="page-background" style={{ minHeight: '100vh' }}>
                    {/* Navbar visible uniquement sur mobile */}
                    <nav className="navbar bg-light d-md-none px-3 border-bottom">
                        <button
                            className="btn btn-primary"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasSidebar"
                            aria-controls="offcanvasSidebar"
                        >
                            <i className="bi bi-list"></i>
                        </button>
                        <span className="ms-3 fw-bold">Dashboard</span>
                    </nav>

                    <div className="d-flex">
                        {/* Sidebar: offcanvas on mobile, fixed sidebar on desktop */}
                        <div
                            className="offcanvas-md offcanvas-start d-md-block bg-light"
                            data-bs-scroll="true"
                            data-bs-backdrop="false"
                            tabIndex={-1}
                            id="offcanvasSidebar"
                            aria-labelledby="offcanvasSidebarLabel"
                            style={{ width: '280px' }}
                        >
                            {/* Header visible only on mobile */}
                            <div className="offcanvas-header d-md-none">
                                <h5 className="offcanvas-title" id="offcanvasSidebarLabel">Menu</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>

                            {/* Sidebar content */}
                            <aside className="offcanvas-body p-3 border-end">
                                <ul className="nav nav-pills flex-column mb-auto">
                                    <li className="nav-item">
                                        <Link href={`/pages/Backoffice/Dashboard/${vendeur?._id}`} className="nav-link text-dark d-flex align-items-center">
                                            <LayoutDashboard /> Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <Link href={`/pages/Backoffice/MesProduits/${vendeur?._id}`} className="btn-black text-decoration-none d-flex align-items-center mt-2">
                                            <Store /> Mes Produits
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/pages/Backoffice/Commandes/${vendeur?._id}`} className="nav-link text-dark d-flex align-items-center mt-2">
                                            <ShoppingBag /> Commandes Reçues
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/pages/Backoffice/AddProduit/${vendeur?._id}`} className="nav-link text-dark d-flex align-items-center mt-2">
                                            <CirclePlus /> Vendre un produit
                                        </Link>
                                    </li>
                                </ul>
                            </aside>
                        </div>

                        {/* Main content */}
                        <section className="flex-grow-1 p-4">

                            <div className="card">
                                <div className='card-header'>
                                    <h5 className="card-title mt-2">Mes Produits</h5>
                                </div>
                                <div className="card-body">

                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                                        {produits.length > 0 && produits.map((produit: ProduitType, index) => (
                                            <div className="col" key={index}>
                                                <div className="cart">
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
                                                    <div className="card-content">
                                                        <div className=' text-start'>
                                                            <h5 className="card-title fw-normal mb-2">{produit?.titre}</h5>
                                                            <h5 className="prix fs mb-2">{produit?.prix}</h5>
                                                        </div>
                                                        <div className="btn-ctn mt-3">
                                                            <button className="add-btn w-100">Ajouter au panier</button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )
                                        )}
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default page
