"use client"
import { AddCommande } from '@/app/controllers/AddCommande';
import { getCitiesByState, getIvoryCoastStates } from '@/lib/location';
import useStore, { PanierStore } from '@/store/useStore';
import { MenuItem, TextField } from '@mui/material';
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

function page() {

    const [load, setLoad] = useState(false)

    const panier = PanierStore(state => state.panier)
    const nbreEls = PanierStore(state => state.nbreEls)
    const total = panier.reduce((acc, item) => acc + item.prixInitial * item.qte, 0)

    const videPanier = PanierStore(state => state.videPanier)

    const client = useStore(state => state.clientStore)

    // États pour la sélection
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [quartier, setQuartier] = useState<string>('');

    const localisation = useStore(state => state.localisation);
    const setLocalisation = useStore(state => state.setLocalisation);

    // Récupérer les régions (states)
    const states = getIvoryCoastStates();
    // Récupérer les villes selon la région sélectionnée
    const cities = selectedState ? getCitiesByState(selectedState) : [];

    const localisationArray = [{
        region: selectedState,
        ville: selectedCity,
        quartier: quartier
    }];


    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <TextField
                                    select
                                    fullWidth
                                    label="Région"
                                    value={selectedState}
                                    onChange={e => {
                                        setSelectedState(e.target.value);
                                        setSelectedCity('');
                                    }}
                                    variant="filled"
                                    className="bg-white rounded"
                                    required
                                    sx={{
                                        '& label': { color: 'rgba(0, 0, 0, 0.7)' },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgb(250, 250, 250)'
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="">Sélectionnez une région</MenuItem>
                                    {states.map(state => (
                                        <MenuItem key={state.isoCode} value={state.isoCode}>{state.name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="mb-3">
                                <TextField
                                    select
                                    fullWidth
                                    label="Ville"
                                    value={selectedCity}
                                    onChange={e => setSelectedCity(e.target.value)}
                                    variant="filled"
                                    className="bg-white rounded"
                                    required
                                    disabled={!selectedState}
                                    sx={{
                                        '& label': { color: 'rgba(0, 0, 0, 0.7)' },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgb(250, 250, 250)'
                                            }
                                        }
                                    }}
                                >
                                    <MenuItem value="">Sélectionnez une ville</MenuItem>
                                    {cities.map(city => (
                                        <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    label="Quartier"
                                    value={quartier}
                                    onChange={e => setQuartier(e.target.value)}
                                    placeholder="Entrez le quartier"
                                    variant="filled"
                                    className="bg-white rounded"
                                    required
                                    sx={{
                                        '& label': { color: 'rgba(0, 0, 0, 0.7)' },
                                        '& .MuiFilledInput-root': {
                                            backgroundColor: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgb(250, 250, 250)'
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    if (selectedState && selectedCity && quartier) {
                                        setLocalisation({ region: selectedState, ville: selectedCity, quartier });
                                    } else {
                                        alert("Veuillez remplir tous les champs d'adresse.");
                                    }
                                }}
                            >Enregistré</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container my-5'>
                <div className='row'>

                    <div className='col-12 col-md-8 mb-4'>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header d-flex justify-content-between bg-white">
                                <p>Adresse client</p>
                                <p>
                                    <button type="button" className="btn-black" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        ajouter votre address <ChevronRight size={18} />
                                    </button>
                                </p>
                            </div>
                            <div className="card-body pb-0">
                                {client && (
                                    <>
                                        <p className='m-0'><small>{client.nom} {client.prenom}</small></p>
                                        <p className='m-0'><small>{client.email}</small></p>
                                        <p className='m-0'><small>{client.tel}</small></p>
                                    </>
                                )}
                                <p className='text-muted'>
                                    <small>
                                        {localisation.region
                                            ? `${localisation.region} | ${localisation.ville} - ${localisation.quartier} |`
                                            : 'Aucune adresse sélectionnée'}
                                    </small>
                                </p>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="card-header d-flex justify-content-between bg-white">
                                <p>Détails de livraison</p>
                                <p><Link href={'#'} className='text-decoration-none'>Modifier <ChevronRight size={18} /></Link></p>
                            </div>
                            <div className="card-body pb-0">
                                <p className='m-0'><small>Point de livraison</small></p>
                                <p className='text-muted'>
                                    <small>
                                        {localisation.region
                                            ? `${localisation.region} | ${localisation.ville} - ${localisation.quartier} |`
                                            : 'Aucune adresse sélectionnée'}
                                    </small>
                                </p>
                            </div>
                            {panier.map(item => (
                                <div key={item.idProduit} className="card-footer d-flex justify-content-between bg-white border pb-0">
                                    <div className='col-12'>
                                        <div className="card mb-3 border-0">
                                            <div className="row g-0">
                                                <div className="col-3 col-md-2">
                                                    {item.image && item.image.length > 0 && (
                                                        <img src={item.image} className="img-fluid rounded-top-2" alt={item.produitNom || "Produit"} width={70} height={70} />
                                                    )}
                                                </div>
                                                <div className="col-9 col-md-10">
                                                    <div className="card-body pt-0">
                                                        <h5 className="card-title"><small className="text-body-secondary">{item.produitNom}</small></h5>
                                                        <p><small className="text-body-secondary">Quantité {item.qte}</small></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='col-12 col-md-4 mb-4'>
                        {panier.map(item => (
                            <div key={item.idProduit} className="card shadow-sm mb-3">
                                <div className="card-header bg-white">Résumé du panier</div>
                                <div className="card-body">
                                    <div className='border-bottom mb-2'>
                                        <p>Total article ({item.qte})</p>
                                        <p className='fs-5 fw-semibold'>{item.prixInitial * item.qte} <span className='text-or'>FCFA</span></p>
                                    </div>
                                    <div>
                                        <p>Total</p>
                                        <p className='fs-5 fw-semibold'>{item.prixInitial * item.qte} <span className='text-or'>FCFA</span></p>
                                    </div>
                                </div>
                                <div className="card-footer bg-white text-center">
                                    <button
                                        onClick={() => AddCommande(
                                            panier,
                                            total,
                                            { region: selectedState, ville: selectedCity, quartier },
                                            client,
                                            videPanier
                                        )}
                                        className='btn-or w-100'
                                    >
                                        Commander ({total})
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='col-12'>
                        <div className="card shadow-sm">
                            <div className="card-header bg-white">Mode de Paiement</div>
                            <div className="card-body">
                                <p className='m-0'><small>Payer cash à la livraison.</small></p>
                                <p className='m-0 text-muted'><small>Réglez vos achats en espèces directement à la livraison. Nous n'acceptons que les Francs CFA.</small></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default page
