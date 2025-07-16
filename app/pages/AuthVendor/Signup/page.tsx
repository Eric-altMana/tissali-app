"use client"
import { TextField, MenuItem } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import useStore from '@/store/useStore'
import { getCitiesByState, getIvoryCoastStates } from '@/lib/location'
import { VendeurType } from '@/app/Types/Types'

function page() {


    const [formData, setFormData] = useState<VendeurType>({
        nom: "",
        prenom: "",
        tel: "",
        email: "",
        password: "",
        nomBoutique: "",
        localisation: [] // Correction ici : tableau vide au départ
    })

    // États pour la sélection
    const [selectedState, setSelectedState] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [quartier, setQuartier] = useState<string>('');


    // Récupérer les régions (states)
    const states = getIvoryCoastStates();
    // Récupérer les villes selon la région sélectionnée
    const cities = selectedState ? getCitiesByState(selectedState) : [];

    const [load, setLoad] = useState(false)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevEl) => ({
            ...prevEl,
            [name]: value
        }))
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoad(true)
        try {
            const { email, password, nom, prenom, tel } = formData

            // Validation des champs
            if (!email || !password || !nom || !prenom || !tel) {
                alert("Veuillez remplir tous les champs")
                setLoad(false)
                return
            }

            const localisationArray = [{
                region: selectedState,
                ville: selectedCity,
                quartier: quartier
            }];

            //On envoi au back mongodb
            const req = await axios.post("/api/CreatVendor/Signup", {
                nom: formData.nom,
                prenom: formData.prenom,
                tel: formData.tel,
                email: formData.email,
                password: formData.password,
                nomBoutique: formData.nomBoutique,
                localisation: localisationArray // On envoie bien un tableau d'objet
            })

            if (req?.data?.message === "ok") {
                alert("Compte créé avec succès");
                setFormData({ nom: "", prenom: "", tel: "", email: "", password: "", nomBoutique:"", localisation: [] }); // Correction ici
            } else {
                alert(req?.data?.message || "Une erreur s'est produite");
            }

        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cet email est déjà utilisé.");
            } else {
                alert("Une erreur est survenue");
            }
            console.log(error)
        } finally {
            setLoad(false)
        }
    }

    return (
        <div>
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="card bg-warning p-4 w-100" style={{ maxWidth: '600px' }}>
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4 fw-bold">Créer un compte</h2>
                        <form onSubmit={submitForm}>
                            <div className="row">
                                <div className="col-12 col-md-6 mb-3">
                                    <TextField
                                        onChange={handleChangeInput}
                                        name="nom"
                                        value={formData.nom}
                                        fullWidth
                                        label="Nom"
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
                                <div className="col-12 col-md-6 mb-3">
                                    <TextField
                                        onChange={handleChangeInput}
                                        name="prenom"
                                        value={formData.prenom}
                                        fullWidth
                                        label="Prénom"
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
                                <div className="col-12 col-md-6 mb-3">
                                    <TextField
                                        onChange={handleChangeInput}
                                        name="tel"
                                        value={formData.tel}
                                        fullWidth
                                        label="Tel"
                                        type="text"
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
                                <div className="col-12 col-md-6 mb-3">
                                    <TextField
                                        onChange={handleChangeInput}
                                        name="email"
                                        value={formData.email}
                                        fullWidth
                                        label="Email"
                                        type="email"
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
                                <div className="col-12 col-md-6 mb-3">
                                    <TextField
                                        onChange={handleChangeInput}
                                        name="password"
                                        value={formData.password}
                                        fullWidth
                                        label="Mot de passe"
                                        type="password"
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
                                <div className="col-12 col-md-6 mb-3">
                                    <TextField
                                        onChange={handleChangeInput}
                                        name="nomBoutique"
                                        value={formData.nomBoutique}
                                        fullWidth
                                        label="Nom de la boutique"
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
                                <div className="col-12 col-md-6 mb-3">
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
                                            <MenuItem key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-12 col-md-6 mb-3">
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
                                            <MenuItem key={city.name} value={city.name}>
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className="col-12 col-md-6 mb-3">
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
                            {!load ?
                                <button type="submit" className="btn btn-dark w-100 py-2 fw-bold text-warning mt-2">
                                    Créer un compte
                                </button>
                                : <button className="btn btn-primary w-100 py-2 mt-2" type="button" disabled>
                                    <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                    <span role="status">Traitement en cours...</span>
                                </button>
                            }

                            <p className='text-center mt-1'>Déja un compte?
                                <Link href={"/pages/AuthVendor/Login"}>Se connecter</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
