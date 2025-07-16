"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import "./dashboard.css";
import Link from 'next/link';
import axios from 'axios';
import { CommandeType, VendeurType } from '@/app/Types/Types';
import Image from 'next/image';
import { Boxes, CirclePlus, LayoutDashboard, Package2, ShoppingBag, Store } from 'lucide-react';

type StatsCommandes = {
    nombre: number;
    montant: number;
};

type StatsProduits = {
    totalProduits: number;
    produitsAjoutesAujourdHui: number;
};

function page() {

    const params = useParams();
    const id = params.id as string;

    const [vendeur, setVendeur] = useState<VendeurType | null>(null);
    const [commandes, setCommandes] = useState<CommandeType[]>([])



    const [montant, setMontant] = useState<number | null>(null);
    const commandesTotal = commandes?.length || 0





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

    useEffect(() => {
        const fetchCommandes = async () => {
            try {
                const res = await axios.get("/api/GetCommande")
                console.log(res.data.commandes)
                setCommandes(res.data.commandes)

            } catch (error) {
                console.log("erreur lors de la recup des commandes", error)
            }
        };

        fetchCommandes()
    }, [])

    useEffect(() => {
        const fetchMontantTotal = async () => {
            try {
                const res = await axios.get('/api/GetCommande');
                setMontant(res.data.totalMontant);
            } catch (err) {
                console.error("Erreur récupération montant total", err);
            }
        };

        fetchMontantTotal();
    }, []);


    const formatDate = (date?: Date): string => {
        return date ? new Date(date).toLocaleDateString() : "—";
    };


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
                                        <button className="d-flex align-items-center btn-black">
                                            <LayoutDashboard /> Dashboard
                                        </button>
                                    </li>

                                    <li>
                                        <Link href={`/pages/Backoffice/MesProduits/${vendeur?._id}`} className=" nav-link text-dark d-flex align-items-center mt-2">
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
                            <h1 className="text-dark">Bienvenue sur votre dashboard</h1>
                            <p className="text-muted">Commencez à gérer vos articles et vos commandes</p>

                            <div className="container-fluid p-3">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                                    {/* <!-- Card --> */}
                                    <div className="col">
                                        <div className="card h-100 text-center p-3">
                                            <div className=' card-header'>
                                                Total de produit ajouter <Boxes />
                                            </div>
                                            <p></p>
                                        </div>
                                    </div>

                                    {/* <!-- card --> */}
                                    <div className="col">
                                        <div className="card h-100 text-center p-3">
                                            <div className=' card-header'>
                                                Commandes Réçues <Package2 />
                                            </div>
                                            <p>{commandesTotal}</p>
                                        </div>
                                    </div>

                                    {/* <!-- card --> */}
                                    <div className="col">
                                        <div className="card h-100 text-center p-3">
                                            <div className=' card-header'>
                                                Total commande Livrées <ShoppingBag />
                                            </div>
                                            {montant && <p> {montant.toFixed(2)} Fcfa</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mt-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-striped align-middle">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Image</th>
                                                    <th>Produit</th>
                                                    <th>Date</th>
                                                    <th>Client</th>
                                                    <th>Téléphone</th>
                                                    <th>Localisation</th>
                                                    <th>Type</th>
                                                    <th>Total</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(commandes) &&
                                                    commandes.map((cmd, index) =>
                                                        Array.isArray(cmd.produits) ? (
                                                            cmd.produits.map((produit, idx) => (
                                                                <tr key={`${cmd._id}-${produit._id}`}>
                                                                    <td>{index + 1}</td>
                                                                    <td>
                                                                        {produit.image ? (
                                                                            <img
                                                                                src={produit.image}
                                                                                alt={produit.produitNom}
                                                                                width={50}
                                                                                height={50}
                                                                                style={{ objectFit: "cover", borderRadius: "5px" }}
                                                                            />
                                                                        ) : (
                                                                            "—"
                                                                        )}
                                                                    </td>
                                                                    <td>{produit.produitNom}</td>
                                                                    <td>{formatDate(cmd.dateAjout)}</td>
                                                                    <td>{cmd.client?.[0]?.nom} {cmd.client?.[0]?.prenom}</td>
                                                                    <td>{cmd.client?.[0]?.tel || "—"}</td>
                                                                    <td>{cmd.localisation?.[0]?.ville}, {cmd.localisation?.[0]?.quartier}</td>
                                                                    <td>{produit.typeProduit || "—"}</td>
                                                                    <td>{produit.prixTotal.toLocaleString()} FCFA</td>
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
                                                            ))
                                                        ) : null
                                                    )}
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
