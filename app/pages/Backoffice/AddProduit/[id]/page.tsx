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
import { 
    CirclePlus, 
    LayoutDashboard, 
    ShoppingBag, 
    Store, 
    Upload, 
    Eye, 
    Save, 
    Loader,
    Package,
    Euro,
    Hash,
    Tag,
    FileText,
    Image as ImageIcon,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/app/components/Sidebars/Sidebars';
import BackofficeNavebar from '@/app/components/BackofficeNavebar/BackofficeNavebar';

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
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [success, setSuccess] = useState(false);

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

    const panier = PanierStore((state) => state.panier)
    const addPanierStore = PanierStore((state) => state.addPanierStore)
    const incQteEls = PanierStore((state) => state.incQteEls)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }

    const recupImage = async (e: OutputCollectionState<OutputCollectionStatus, "maybe-has-group">) => {
        const imageUrl = e?.allEntries[0]
        if (imageUrl) {
            setImage(imageUrl?.cdnUrl!)
            setFormData(prev => ({ ...prev, image: imageUrl?.cdnUrl! }));
            if (errors.image) {
                setErrors(prev => ({ ...prev, image: '' }));
            }
        }
    }

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};
        
        if (!formData.titre.trim()) newErrors.titre = 'Le titre est requis';
        if (!formData.prix || formData.prix <= 0) newErrors.prix = 'Le prix doit être supérieur à 0';
        if (!formData.quantite || formData.quantite <= 0) newErrors.quantite = 'La quantité doit être supérieure à 0';
        if (!formData.categorie) newErrors.categorie = 'Veuillez sélectionner une catégorie';
        if (!formData.type) newErrors.type = 'Veuillez sélectionner un type';
        if (!formData.description.trim()) newErrors.description = 'La description est requise';
        if (!image) newErrors.image = 'Une image est requise';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const object = {
        ...formData,
        images: [image],
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (!validateForm()) {
            return;
        }

        setLoad(true)
        setSuccess(false)
        
        try {
            const req = await axios.post("/api/AddProduit", object)
            if (req.data.message === "ok") {
                console.log("Produit ajouté avec succès", req.data);
                setSuccess(true);
                
                // Reset form
                setFormData({
                    titre: '',
                    prix: 0,
                    quantite: 0,
                    categorie: '',
                    type: '',
                    description: ''
                })
                setImage("")
                
                // Hide success message after 3 seconds
                setTimeout(() => setSuccess(false), 3000);
            }
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

    const categories = [
        { value: 'Chaussures', label: 'Chaussures', icon: '👟' },
        { value: 'Vêtements', label: 'Vêtements', icon: '👕' },
        { value: 'Accessoires', label: 'Accessoires', icon: '💍' },
        { value: 'Pagnes', label: 'Pagnes', icon: '🎨' },
        { value: 'Tenue', label: 'Tenue', icon: '👗' }
    ];

    const types = [
        { value: 'Location', label: 'Location', color: 'info' },
        { value: 'Vente', label: 'Vente', color: 'success' }
    ];

    return (
        <div className="min-vh-100 bg-light">
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
                                    <div className="d-flex align-items-center">
                                        <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                                            <CirclePlus size={24} className="text-primary" />
                                        </div>
                                        <div>
                                            <h1 className="h3 fw-bold mb-1">Ajouter un nouveau produit</h1>
                                            <p className="text-muted mb-0">Complétez les informations pour créer votre produit</p>
                                        </div>
                                    </div>

                                    {/* Message de succès */}
                                    {success && (
                                        <div className="alert alert-success d-flex align-items-center mt-3 mb-0" role="alert">
                                            <CheckCircle size={20} className="me-2" />
                                            <div>Produit ajouté avec succès !</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row g-4">
                            {/* Formulaire */}
                            <div className="col-12 col-xl-7">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-header bg-white border-bottom py-3">
                                        <h5 className="mb-0 fw-bold">Informations du produit</h5>
                                        <small className="text-muted">Remplissez tous les champs obligatoires</small>
                                    </div>
                                    <div className="card-body p-4">
                                        <form onSubmit={submitForm}>
                                            <div className="row g-3">
                                                {/* Titre */}
                                                <div className="col-12">
                                                    <label className="form-label fw-semibold">
                                                        <Package size={16} className="me-2 text-primary" />
                                                        Titre du produit *
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        name="titre" 
                                                        value={formData.titre} 
                                                        onChange={handleChange} 
                                                        className={`form-control ${errors.titre ? 'is-invalid' : ''}`}
                                                        placeholder="Ex: Chaussures de sport Nike"
                                                    />
                                                    {errors.titre && <div className="invalid-feedback">{errors.titre}</div>}
                                                </div>

                                                {/* Prix et Quantité */}
                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">
                                                        <Euro size={16} className="me-2 text-success" />
                                                        Prix (FCFA) *
                                                    </label>
                                                    <div className="input-group">
                                                        <input 
                                                            type="number" 
                                                            name="prix" 
                                                            value={formData.prix || ''} 
                                                            onChange={handleChange} 
                                                            className={`form-control ${errors.prix ? 'is-invalid' : ''}`}
                                                            placeholder="0"
                                                            min="1"
                                                        />
                                                        <span className="input-group-text">FCFA</span>
                                                        {errors.prix && <div className="invalid-feedback">{errors.prix}</div>}
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">
                                                        <Hash size={16} className="me-2 text-info" />
                                                        Quantité *
                                                    </label>
                                                    <input 
                                                        type="number" 
                                                        name="quantite" 
                                                        value={formData.quantite || ''} 
                                                        onChange={handleChange} 
                                                        className={`form-control ${errors.quantite ? 'is-invalid' : ''}`}
                                                        placeholder="1"
                                                        min="1"
                                                    />
                                                    {errors.quantite && <div className="invalid-feedback">{errors.quantite}</div>}
                                                </div>

                                                {/* Catégorie et Type */}
                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">
                                                        <Tag size={16} className="me-2 text-warning" />
                                                        Catégorie *
                                                    </label>
                                                    <select 
                                                        className={`form-select ${errors.categorie ? 'is-invalid' : ''}`} 
                                                        name="categorie" 
                                                        value={formData.categorie} 
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Sélectionner une catégorie</option>
                                                        {categories.map(cat => (
                                                            <option key={cat.value} value={cat.value}>
                                                                {cat.icon} {cat.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.categorie && <div className="invalid-feedback">{errors.categorie}</div>}
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label fw-semibold">
                                                        <Store size={16} className="me-2 text-secondary" />
                                                        Type de vente *
                                                    </label>
                                                    <select 
                                                        className={`form-select ${errors.type ? 'is-invalid' : ''}`} 
                                                        name="type" 
                                                        value={formData.type} 
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Sélectionner un type</option>
                                                        {types.map(type => (
                                                            <option key={type.value} value={type.value}>
                                                                {type.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.type && <div className="invalid-feedback">{errors.type}</div>}
                                                </div>

                                                {/* Upload d'image */}
                                                <div className="col-12">
                                                    <label className="form-label fw-semibold">
                                                        <ImageIcon size={16} className="me-2 text-purple" />
                                                        Image du produit *
                                                    </label>
                                                    <div className={`border rounded-3 p-4 text-center bg-light ${errors.image ? 'border-danger' : 'border-2 border-dashed'}`}>
                                                        {!image ? (
                                                            <div className="py-3">
                                                                <Upload size={48} className="text-muted mb-3" />
                                                                <h6 className="text-muted mb-2">Cliquez pour télécharger votre image</h6>
                                                                <p className="text-muted small mb-3">JPG, PNG ou GIF (max. 10MB)</p>
                                                                <FileUploaderRegular
                                                                    sourceList="local"
                                                                    classNameUploader="uc-light"
                                                                    pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_KEY!}
                                                                    onChange={(e) => recupImage(e)}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex flex-column align-items-center">
                                                                <div className="position-relative mb-3">
                                                                    <Image 
                                                                        src={image} 
                                                                        width={120} 
                                                                        height={120} 
                                                                        className='rounded-3 object-fit-cover' 
                                                                        alt='Image téléchargée' 
                                                                    />
                                                                    <div className="position-absolute top-0 end-0 bg-success rounded-circle p-1">
                                                                        <CheckCircle size={16} className="text-white" />
                                                                    </div>
                                                                </div>
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-outline-secondary btn-sm"
                                                                    onClick={() => setImage('')}
                                                                >
                                                                    Changer l'image
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {errors.image && <div className="text-danger small mt-1">{errors.image}</div>}
                                                </div>

                                                {/* Description */}
                                                <div className="col-12">
                                                    <label className="form-label fw-semibold">
                                                        <FileText size={16} className="me-2 text-secondary" />
                                                        Description *
                                                    </label>
                                                    <textarea 
                                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                                                        name='description' 
                                                        value={formData.description} 
                                                        onChange={handleChange} 
                                                        rows={4}
                                                        placeholder="Décrivez votre produit en détail..."
                                                    />
                                                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                                    <div className="form-text">
                                                        {formData.description.length}/500 caractères
                                                    </div>
                                                </div>

                                                {/* Bouton de soumission */}
                                                <div className="col-12">
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        <button 
                                                            type="button" 
                                                            className="btn btn-outline-secondary me-md-2"
                                                            onClick={() => {
                                                                setFormData({
                                                                    titre: '',
                                                                    prix: 0,
                                                                    quantite: 0,
                                                                    categorie: '',
                                                                    type: '',
                                                                    description: ''
                                                                })
                                                                setImage('')
                                                                setErrors({})
                                                            }}
                                                        >
                                                            Réinitialiser
                                                        </button>
                                                        <button 
                                                            type="submit" 
                                                            className="btn btn-primary px-4"
                                                            disabled={load}
                                                        >
                                                            {load ? (
                                                                <>
                                                                    <Loader size={16} className="me-2 spinner-border spinner-border-sm" />
                                                                    Ajout en cours...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Save size={16} className="me-2" />
                                                                    Ajouter le produit
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* Aperçu */}
                            <div className="col-12 col-xl-5">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-header bg-white border-bottom py-3">
                                        <h5 className="mb-0 fw-bold">
                                            <Eye size={20} className="me-2 text-primary" />
                                            Aperçu du produit
                                        </h5>
                                        <small className="text-muted">Voici comment votre produit apparaîtra</small>
                                    </div>
                                    <div className="card-body p-4">
                                        {(formData.titre || formData.prix || image) ? (
                                            <div className="card border shadow-sm">
                                                <div className="position-relative">
                                                    {image ? (
                                                        <img
                                                            src={image}
                                                            className="card-img-top object-fit-cover"
                                                            alt="Aperçu produit"
                                                            style={{ height: '250px' }}
                                                        />
                                                    ) : (
                                                        <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
                                                            <div className="text-center text-muted">
                                                                <ImageIcon size={48} className="mb-2 opacity-50" />
                                                                <p>Image du produit</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    
                                                    {formData.type && (
                                                        <span className={`position-absolute top-0 end-0 m-2 badge bg-${types.find(t => t.value === formData.type)?.color || 'secondary'}`}>
                                                            {formData.type}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <h5 className="card-title fw-bold mb-0">
                                                            {formData.titre || 'Titre du produit'}
                                                        </h5>
                                                        {formData.categorie && (
                                                            <span className="badge bg-light text-dark">
                                                                {categories.find(c => c.value === formData.categorie)?.icon} {formData.categorie}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="d-flex align-items-center mb-3">
                                                        <h4 className="text-success fw-bold mb-0 me-3">
                                                            {formData.prix ? `${formData.prix.toLocaleString()} FCFA` : '0 FCFA'}
                                                        </h4>
                                                        {formData.quantite > 0 && (
                                                            <span className="badge bg-info bg-opacity-10 text-info">
                                                                {formData.quantite} en stock
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <p className="card-text text-muted mb-3">
                                                        {formData.description || 'Description du produit...'}
                                                    </p>
                                                    
                                                    <div className="d-grid">
                                                        <button 
                                                            className="btn btn-primary"
                                                            disabled
                                                        >
                                                            <ShoppingBag size={16} className="me-2" />
                                                            Aperçu - Ajouter au panier
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-5">
                                                <Package size={64} className="text-muted opacity-25 mb-3" />
                                                <h6 className="text-muted">Aperçu du produit</h6>
                                                <p className="text-muted small">Remplissez le formulaire pour voir l'aperçu</p>
                                            </div>
                                        )}

                                        {/* Dernier produit ajouté */}
                                        {produit && (
                                            <div className="mt-4 pt-4 border-top">
                                                <h6 className="fw-bold mb-3">Dernier produit ajouté</h6>
                                                <div className="card border">
                                                    <div className="card-body p-3">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={
                                                                    typeof produit.images === "string"
                                                                        ? produit.images
                                                                        : Array.isArray(produit.images)
                                                                            ? produit.images[0]
                                                                            : undefined
                                                                }
                                                                width={60}
                                                                height={60}
                                                                className="rounded-2 object-fit-cover me-3"
                                                                alt="Dernier produit"
                                                            />
                                                            <div className="flex-grow-1">
                                                                <h6 className="fw-semibold mb-1">{produit.titre}</h6>
                                                                <div className="text-success fw-bold">{produit.prixInitial} FCFA</div>
                                                            </div>
                                                            <button 
                                                                className="btn btn-sm btn-outline-primary"
                                                                onClick={() => AddPanier(produit, 1, panier, addPanierStore, incQteEls)}
                                                            >
                                                                <ShoppingBag size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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