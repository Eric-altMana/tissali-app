"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import "./AddProduit.css"
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import Image from 'next/image';
import { OutputCollectionState, OutputCollectionStatus } from '@uploadcare/file-uploader';
import axios from 'axios';
import { ProduitType, VendeurType } from '@/app/Types/Types';
import { AddPanier } from '@/app/controllers/AddPanier';
import { PanierStore } from '@/store/useStore';
import { CirclePlus, LayoutDashboard, ShoppingBag, Store } from 'lucide-react';
import Link from 'next/link';

function page() {

    const params = useParams();
    const id = params.id as string;

    const [produit, setProduit] = useState<ProduitType | null>(null)

    const [formData, setFormData] = useState({
        titre: '',
        prix: 0,
        quantite: 0,
        categorie: '',
        type: '',
        description: ''
    })

    const [load, setLoad] = useState(false)

    const [image, setImage] = useState("")

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

    //On appel les éléments du store
    const panier = PanierStore((state) => state.panier)
    const addPanierStore = PanierStore((state) => state.addPanierStore)
    const incQteEls = PanierStore((state) => state.incQteEls)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //upload avec UploadCare
    const recupImage = async (e: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">) => {
        const imageUrl = e?.allEntries[0]
        if (imageUrl) {
            setImage(imageUrl?.cdnUrl!)
            setFormData(prev => ({ ...prev, image: imageUrl?.cdnUrl! }));
        }
    }

    const object = {
        ...formData,
        images: [image],
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setLoad(true)
        if (!formData.titre || !formData.prix || !formData.quantite || !formData.categorie || !formData.type || !formData.description || !image) {
            console.log("Veuillez remplir tous les champs");
            return;
        }
        try {
            const req = await axios.post("/api/AddProduit", object)
            if (req.data.message === "ok") {
                console.log("Produit ajouté avec succès", req.data);

            }

            setFormData({
                titre: '',
                prix: 0,
                quantite: 0,
                categorie: '',
                type: '',
                description: ''
            })
            setImage("")
            setLoad(false)

        } catch (error) {
            console.log(error)
            setLoad(false)
            return;
        }
    }

    const recupProduit = async () => {
        try {
            const res = await axios.get((`/api/GetProduit/${id}`))
            console.log(res.data)
            if (res.data && res.data.message === "Produit trouvé") {
                console.log("Produit récupéré avec succès", res.data);
                setProduit(res.data.produit);
            } else {
                console.log("Aucun produit trouvé");
            }

        } catch (error) {
            console.log(error)
            return
        }
    }

    useEffect(() => {
        recupProduit()
    }, [])

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
                                        <Link href={`/pages/Backoffice/AddProduit/${vendeur?._id}`} className="btn-black text-decoration-none d-flex align-items-center mt-2">
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
                                    <div className='row'>
                                        <div className="col-5">
                                            <div className=" card shadow-sm p-4">
                                                <form onSubmit={(e) => submitForm(e)}>

                                                    <div className="mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Titre</label>
                                                        <input type="texte" name="titre" value={formData.titre} onChange={handleChange} className="form-control" id="exampleFormControlInput1" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Prix</label>
                                                        <input type="number" name="prix" value={formData.prix} onChange={handleChange} className="form-control" id="exampleFormControlInput1" />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Quantité</label>
                                                        <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} className="form-control" id="exampleFormControlInput1" />
                                                    </div>
                                                    <div className='mb-3'>
                                                        <select className="form-select" name="categorie" value={formData.categorie} onChange={handleChange} aria-label="Default select example">
                                                            <option value="" disabled>Catégories</option>
                                                            <option value="Chaussures">Chaussures</option>
                                                            <option value="Vêtements">Vêtements</option>
                                                            <option value="Accessoires">Accessoires</option>
                                                            <option value="Pagnes">Pagnes</option>
                                                        </select>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <select className="form-select" name="type" value={formData.type} onChange={handleChange} aria-label="Default select example">
                                                            <option value="" disabled>Types</option>
                                                            <option value="Chaussures">Location</option>
                                                            <option value="Vêtements">Vente</option>
                                                        </select>
                                                    </div>

                                                    {/* Upload avec uploadcare */}
                                                    <div className="mb-3 border w-100 p-3 rounded-3 text-center d-flex align-items-center justify-content-center">
                                                        <div>
                                                            <p>Cliquer pour télécharger votre image</p>
                                                            <FileUploaderRegular
                                                                sourceList="local"
                                                                classNameUploader="uc-light"
                                                                pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_KEY!}
                                                                onChange={(e) => recupImage(e)}
                                                            />
                                                            {image && (<Image src={image} width={100} height={100} className='rounded-3' alt='upload' />)}
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                                        <textarea className="form-control" name='description' value={formData.description} onChange={handleChange} id="exampleFormControlTextarea1" rows={3}></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        {!load ? (
                                                            <button type="submit" className="btn-black w-100">Ajouter le produit</button>
                                                        ) : (
                                                            <button className="btn btn-primary w-100" type="button" disabled>
                                                                <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                                                <span role="status">Loading...</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className='col-7'>
                                            <div className="d-flex flex-wrap justify-content-center">
                                                {produit ? (
                                                    <div className="cart">
                                                        <div className="product-card card-img mb-2">
                                                            <img
                                                                src={
                                                                    typeof produit.images === "string"
                                                                        ? produit.images
                                                                        : Array.isArray(produit.images)
                                                                            ? produit.images[0]
                                                                            : undefined
                                                                }
                                                                className="img-fluid rounded-top-2"
                                                                alt="Produit"
                                                            />

                                                        </div>
                                                        <div className="card-content">
                                                            <h5 className="card-title fw-normal mb-2">{produit.titre}</h5>
                                                            <h5 className="prix fs mb-2">{produit.prix} FCFA</h5>
                                                            <div className="btn-ctn mt-3">
                                                                <button className="add-btn w-100" onClick={() => AddPanier(produit, 1, panier, addPanierStore, incQteEls)}>Ajouter au panier</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-center">Aucun produit trouvé</p>
                                                )}

                                            </div>
                                        </div>
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
