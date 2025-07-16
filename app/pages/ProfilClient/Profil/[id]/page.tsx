// pages/CompteClient/Profile/[id].tsx
"use client";

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '@/store/useStore';
import { getIvoryCoastStates, getCitiesByState } from '@/lib/location';
import { ChevronLeft, Pencil } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ClientType } from '@/app/Types/Types';
import Link from 'next/link';

export default function ProfileClient() {

    const params = useParams();
    const id = params.id as string;

    const [client, setClient] = useState<ClientType | null>(null);



    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [quartier, setQuartier] = useState('');
    const states = getIvoryCoastStates();
    const cities = selectedState ? getCitiesByState(selectedState) : [];

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const res = await axios.get(`/api/GetUserData/GetUserProfil/${id}`);
                console.log("Données du client récupérées :", res.data.client);
                setClient(res.data.client);
            } catch (error) {
                console.log("Erreur lors du chargement du profil :", error);
            }
        };
        fetchClient();
    }, [id]);

    const handleLocationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!client || !selectedState || !selectedCity || !quartier) return;

        try {
            const res = await axios.put(`/api/profils/Clients/UpdateClient/${id}`, {
                localisations: {
                    region: selectedState,
                    ville: selectedCity,
                    quartier: quartier,
                }
            });

            setClient(res.data.client); // ← actualise le store
            alert("Localisation mise à jour !");
        } catch (error) {
            console.error("Erreur mise à jour:", error);
        }
    };

    return (
        <div className="container my-5">
            <div>
                {client?._id && (
                    <small>
                        <Link href={`/pages/Home/${client._id}`} className="btn ps-0 mb-3">
                            <ChevronLeft size={16} /> Retour à la page d'accueil
                        </Link>
                    </small>
                )}
            </div>
            <h2>Profil de {client?.nom}</h2>

            {client && (
                <>
                    <div className="card mb-4">
                        <div className="card-header">Informations personnelles</div>
                        <div className="card-body">
                            <p><strong>Nom :</strong> {client.nom} {client.prenom}</p>
                            <p><strong>Email :</strong> {client.email}</p>
                            <p><strong>Téléphone :</strong> +225 {client.tel}</p>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between">
                            <span>Adresse(s)</span>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#localisationModal"
                            >
                                <Pencil size={16} /> Ajouter localisation
                            </button>
                        </div>
                        <div className="card-body">
                            {client.localisations && client.localisations?.length > 0 ? (
                                client.localisations.map((loc, idx) => (
                                    <p key={idx}>{loc.region} - {loc.ville} - {loc.quartier}</p>
                                ))
                            ) : (
                                <p className="text-muted">Aucune adresse enregistrée.</p>
                            )}
                        </div>
                    </div>
                </>
            )}

            {/* MODAL */}
            <div className="modal fade" id="localisationModal" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={handleLocationSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter une adresse</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" />
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Région</label>
                                    <select
                                        className="form-select"
                                        value={selectedState}
                                        onChange={(e) => {
                                            setSelectedState(e.target.value);
                                            setSelectedCity('');
                                        }}
                                    >
                                        <option value="">Sélectionnez une région</option>
                                        {states.map((state) => (
                                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Ville</label>
                                    <select
                                        className="form-select"
                                        value={selectedCity}
                                        onChange={(e) => setSelectedCity(e.target.value)}
                                        disabled={!selectedState}
                                    >
                                        <option value="">Sélectionnez une ville</option>
                                        {cities.map((city) => (
                                            <option key={city.name} value={city.name}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Quartier</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={quartier}
                                        onChange={(e) => setQuartier(e.target.value)}
                                        placeholder="Ex: Cocody Angré"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                <button type="submit" className="btn btn-primary">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
