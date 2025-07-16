"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import "./commandesrecues.css"
import Image from 'next/image';
import Link from 'next/link';
import { CirclePlus, LayoutDashboard, ShoppingBag, Store } from 'lucide-react';
import { VendeurType } from '@/app/Types/Types';
import axios from 'axios';

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
                                        <a className="nav-link" href="#">Accueil</a>
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
                                        <Link href={`/pages/Backoffice/MesProduits/${vendeur?._id}`} className="nav-link text-dark d-flex align-items-center mt-2">
                                            <Store /> Mes Produits
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={`/pages/Backoffice/Commandes/${vendeur?._id}`} className="btn-black text-decoration-none d-flex align-items-center mt-2">
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
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped align-middle">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Ref. Commande</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Client</th>
                                                    <th scope="col">Type</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>#001</td>
                                                    <td>2025-07-08</td>
                                                    <td>Mark Otto</td>
                                                    <td>Standard</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-1">
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-secondary me-1">
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>#002</td>
                                                    <td>2025-07-07</td>
                                                    <td>Jacob Thornton</td>
                                                    <td>Express</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-1">
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-secondary me-1">
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>#003</td>
                                                    <td>2025-07-06</td>
                                                    <td>John Doe</td>
                                                    <td>Premium</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary me-1">
                                                            <i className="bi bi-eye"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-secondary me-1">
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger">
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
