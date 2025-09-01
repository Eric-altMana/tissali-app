"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import "./dashboard.css";
import Link from 'next/link';
import axios from 'axios';
import { CommandeType, VendeurType } from '@/app/Types/Types';
import Image from 'next/image';
import { 
    Boxes, 
    CirclePlus, 
    LayoutDashboard, 
    Package2, 
    ShoppingBag, 
    Store, 
    Eye, 
    Edit, 
    Trash2,
    TrendingUp,
    Calendar,
    Users,
    MapPin,
    Phone
} from 'lucide-react';
import Sidebar from '@/app/components/Sidebars/Sidebars';
import BackofficeNavebar from '@/app/components/BackofficeNavebar/BackofficeNavebar';

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
                if (res?.data?.commandes) {
                    const data: CommandeType[] = res?.data?.commandes

                    if (typeof window !== undefined) {
                        const vendeur = JSON.parse(localStorage.getItem("vendeur")!) || null
                        let table = []

                        data?.forEach(item => {
                            const produits = item?.panier?.filter(el => el?.vendeurId?.toLowerCase() === vendeur?._id?.toLowerCase())
                            console.log(produits)

                            let prixTotal = 0
                            produits?.forEach(item => {
                                prixTotal += Number(item?.prixTotal)
                            })

                            table.push({
                                _id: item?._id,
                                panier: produits,
                                client: item?.client,
                                produits: item?.produits || [],
                                localisation: item?.localisation || [],
                                total: prixTotal,
                                dateAjout: item?.dateAjout
                            });
                            setCommandes(table)
                        })
                    }
                }
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
        return date ? new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) : "Non défini";
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
    };

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
                                        <div className="col-md-4 text-md-end mt-3 mt-md-0">
                                            <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                                                <button className="btn btn-outline-primary btn-sm">
                                                    <Calendar size={16} className="me-1" />
                                                    Aujourd'hui
                                                </button>
                                                <button className="btn btn-primary btn-sm">
                                                    <CirclePlus size={16} className="me-1" />
                                                    Nouveau produit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cartes statistiques */}
                        <div className="row g-3 g-md-4 mb-4">
                            {/* Total produits */}
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="bg-primary bg-opacity-10 p-3 rounded-3">
                                                <Boxes size={24} className="text-primary" />
                                            </div>
                                            <span className="badge bg-success bg-opacity-10 text-success">
                                                +12%
                                            </span>
                                        </div>
                                        <h3 className="h4 fw-bold text-dark mb-1">--</h3>
                                        <p className="text-muted mb-0 small">Total produits ajoutés</p>
                                        <div className="progress mt-2" style={{ height: '4px' }}>
                                            <div className="progress-bar bg-primary" style={{ width: '65%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Commandes reçues */}
                            <div className="col-12 col-md-6 col-xl-4">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="bg-info bg-opacity-10 p-3 rounded-3">
                                                <Package2 size={24} className="text-info" />
                                            </div>
                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                <TrendingUp size={12} className="me-1" />
                                                +8%
                                            </span>
                                        </div>
                                        <h3 className="h4 fw-bold text-dark mb-1">{commandesTotal}</h3>
                                        <p className="text-muted mb-0 small">Commandes reçues</p>
                                        <div className="progress mt-2" style={{ height: '4px' }}>
                                            <div className="progress-bar bg-info" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Montant total */}
                            <div className="col-12 col-md-12 col-xl-4">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                            <div className="bg-success bg-opacity-10 p-3 rounded-3">
                                                <ShoppingBag size={24} className="text-success" />
                                            </div>
                                            <span className="badge bg-success bg-opacity-10 text-success">
                                                Actuel
                                            </span>
                                        </div>
                                        <h3 className="h4 fw-bold text-dark mb-1">
                                            {montant ? formatCurrency(montant) : '--'}
                                        </h3>
                                        <p className="text-muted mb-0 small">Revenus totaux</p>
                                        <div className="progress mt-2" style={{ height: '4px' }}>
                                            <div className="progress-bar bg-success" style={{ width: '80%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tableau des commandes */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-header bg-white border-bottom py-3">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <h5 className="mb-0 fw-bold">Commandes récentes</h5>
                                                <small className="text-muted">Gestion de vos commandes</small>
                                            </div>
                                            <div className="col-md-6 text-md-end mt-2 mt-md-0">
                                                <div className="d-flex flex-wrap gap-2 justify-content-md-end">
                                                    <select className="form-select form-select-sm w-auto">
                                                        <option>Toutes les commandes</option>
                                                        <option>En attente</option>
                                                        <option>Livrées</option>
                                                    </select>
                                                    <button className="btn btn-outline-secondary btn-sm">
                                                        Exporter
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-body p-0">
                                        {/* Version desktop */}
                                        <div className="d-none d-lg-block">
                                            <div className="table-responsive">
                                                <table className="table table-hover align-middle mb-0">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th className="border-0 px-4 py-3">#</th>
                                                            <th className="border-0 py-3">Produit</th>
                                                            <th className="border-0 py-3">Date</th>
                                                            <th className="border-0 py-3">Client</th>
                                                            <th className="border-0 py-3">Contact</th>
                                                            <th className="border-0 py-3">Localisation</th>
                                                            <th className="border-0 py-3">Type</th>
                                                            <th className="border-0 py-3">Total</th>
                                                            <th className="border-0 py-3 text-center">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(commandes) &&
                                                            commandes.map((cmd, index) =>
                                                                Array.isArray(cmd.produits) ? (
                                                                    cmd.produits.map((produit, idx) => (
                                                                        <tr key={`${cmd._id}-${produit._id}`} className="border-0">
                                                                            <td className="px-4 py-3">
                                                                                <span className="badge bg-light text-dark fw-normal">
                                                                                    {index + 1}
                                                                                </span>
                                                                            </td>
                                                                            <td className="py-3">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="me-3">
                                                                                        {produit.image ? (
                                                                                            <img
                                                                                                src={produit.image}
                                                                                                alt={produit.produitNom}
                                                                                                width={48}
                                                                                                height={48}
                                                                                                className="rounded-2 object-fit-cover"
                                                                                            />
                                                                                        ) : (
                                                                                            <div className="bg-light rounded-2 d-flex align-items-center justify-content-center" style={{width: '48px', height: '48px'}}>
                                                                                                <Package2 size={20} className="text-muted" />
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                    <div>
                                                                                        <div className="fw-semibold text-dark">{produit.produitNom}</div>
                                                                                        <small className="text-muted">SKU: #{produit._id?.slice(-6)}</small>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="py-3">
                                                                                <div className="d-flex align-items-center text-muted">
                                                                                    <Calendar size={14} className="me-1" />
                                                                                    {formatDate(cmd.dateAjout)}
                                                                                </div>
                                                                            </td>
                                                                            <td className="py-3">
                                                                                <div className="d-flex align-items-center">
                                                                                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-2">
                                                                                        <Users size={14} className="text-primary" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <div className="fw-medium text-dark">
                                                                                            {cmd.client?.[0]?.nom} {cmd.client?.[0]?.prenom}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td className="py-3">
                                                                                <div className="d-flex align-items-center text-muted">
                                                                                    <Phone size={14} className="me-1" />
                                                                                    {cmd.client?.[0]?.tel || "—"}
                                                                                </div>
                                                                            </td>
                                                                            <td className="py-3">
                                                                                <div className="d-flex align-items-center text-muted">
                                                                                    <MapPin size={14} className="me-1" />
                                                                                    <span className="text-truncate" style={{maxWidth: '120px'}}>
                                                                                        {cmd.localisation?.[0]?.ville}, {cmd.localisation?.[0]?.quartier}
                                                                                    </span>
                                                                                </div>
                                                                            </td>
                                                                            <td className="py-3">
                                                                                <span className="badge bg-info bg-opacity-10 text-info">
                                                                                    {produit.typeProduit || "Standard"}
                                                                                </span>
                                                                            </td>
                                                                            <td className="py-3">
                                                                                <div className="fw-bold text-success">
                                                                                    {formatCurrency(produit.prixTotal)}
                                                                                </div>
                                                                            </td>
                                                                            <td className="py-3 text-center">
                                                                                <div className="btn-group" role="group">
                                                                                    <button className="btn btn-sm btn-outline-primary" title="Voir">
                                                                                        <Eye size={14} />
                                                                                    </button>
                                                                                    <button className="btn btn-sm btn-outline-secondary" title="Modifier">
                                                                                        <Edit size={14} />
                                                                                    </button>
                                                                                    <button className="btn btn-sm btn-outline-danger" title="Supprimer">
                                                                                        <Trash2 size={14} />
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    ))
                                                                ) : null
                                                            )}

                                                        {/* Message si aucune commande */}
                                                        {(!commandes || commandes.length === 0) && (
                                                            <tr>
                                                                <td colSpan={9} className="text-center py-5">
                                                                    <div className="text-muted">
                                                                        <Package2 size={48} className="mb-3 opacity-50" />
                                                                        <h6>Aucune commande trouvée</h6>
                                                                        <p>Les commandes apparaîtront ici une fois reçues.</p>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Version mobile */}
                                        <div className="d-lg-none p-3">
                                            {Array.isArray(commandes) && commandes.length > 0 ? (
                                                commandes.map((cmd, index) =>
                                                    Array.isArray(cmd.produits) ? (
                                                        cmd.produits.map((produit, idx) => (
                                                            <div key={`${cmd._id}-${produit._id}`} className="card mb-3 border">
                                                                <div className="card-body p-3">
                                                                    <div className="d-flex align-items-start mb-3">
                                                                        <div className="me-3">
                                                                            {produit.image ? (
                                                                                <img
                                                                                    src={produit.image}
                                                                                    alt={produit.produitNom}
                                                                                    width={60}
                                                                                    height={60}
                                                                                    className="rounded-2 object-fit-cover"
                                                                                />
                                                                            ) : (
                                                                                <div className="bg-light rounded-2 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                                                                                    <Package2 size={24} className="text-muted" />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex-grow-1">
                                                                            <h6 className="fw-bold mb-1">{produit.produitNom}</h6>
                                                                            <div className="d-flex align-items-center text-muted mb-2">
                                                                                <Calendar size={14} className="me-1" />
                                                                                <small>{formatDate(cmd.dateAjout)}</small>
                                                                            </div>
                                                                            <div className="fw-bold text-success">
                                                                                {formatCurrency(produit.prixTotal)}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <div className="row text-sm">
                                                                        <div className="col-6">
                                                                            <div className="d-flex align-items-center mb-2">
                                                                                <Users size={14} className="me-2 text-primary" />
                                                                                <span>{cmd.client?.[0]?.nom} {cmd.client?.[0]?.prenom}</span>
                                                                            </div>
                                                                            <div className="d-flex align-items-center">
                                                                                <Phone size={14} className="me-2 text-muted" />
                                                                                <span>{cmd.client?.[0]?.tel || "—"}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <div className="d-flex align-items-center mb-2">
                                                                                <MapPin size={14} className="me-2 text-muted" />
                                                                                <span className="text-truncate">
                                                                                    {cmd.localisation?.[0]?.ville}
                                                                                </span>
                                                                            </div>
                                                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                                                {produit.typeProduit || "Standard"}
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex gap-2 mt-3">
                                                                        <button className="btn btn-sm btn-outline-primary flex-grow-1">
                                                                            <Eye size={14} className="me-1" />
                                                                            Voir
                                                                        </button>
                                                                        <button className="btn btn-sm btn-outline-secondary">
                                                                            <Edit size={14} />
                                                                        </button>
                                                                        <button className="btn btn-sm btn-outline-danger">
                                                                            <Trash2 size={14} />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : null
                                                )
                                            ) : (
                                                <div className="text-center py-5">
                                                    <Package2 size={48} className="mb-3 text-muted opacity-50" />
                                                    <h6 className="text-muted">Aucune commande trouvée</h6>
                                                    <p className="text-muted small">Les commandes apparaîtront ici une fois reçues.</p>
                                                </div>
                                            )}
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