"use client"
import { ClientType} from '@/app/Types/Types'
import { TextField } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, db } from '@/lib/firebaseConfig'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import useStore from '@/store/useStore'

function page() {


    const [formData, setFormData] = useState<ClientType>({
        nom: "",
        prenom: "",
        tel: "",
        email: "",
        password: ""
    })

    const setClientStore = useStore((state) => state.setClientStore)

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

            //On envoi au back mongodb
            const req = await axios.post("/api/CreatUser/Signup", {
                nom: formData.nom,
                prenom: formData.prenom,
                tel: formData.tel,
                email: formData.email,
                password: formData.password // N'oublie pas d'envoyer le mot de passe !
            })

            if (req?.data?.message === "ok") {
                alert("Compte créé avec succès");
                setClientStore(req.data.client) // <-- Stocke le client dans le store Zustand
                setFormData({ nom: "", prenom: "", tel: "", email: "", password: "" });
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
                <div className="card bg-warning p-4" style={{ maxWidth: '500px' }}>
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4 fw-bold">Créer un compte</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-3">
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
                            <div className="mb-3">
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
                            <div className="mb-3">
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
                            <div className="mb-3">
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
                            <div className="mb-4">
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
                            {!load ?
                                <button type="submit" className="btn btn-dark w-100 py-2 fw-bold text-warning">
                                    Créer un compte
                                </button>
                                : <button className="btn btn-primary w-100" type="button" disabled>
                                    <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                    <span role="status">Traitement en cours...</span>
                                </button>
                            }

                            <p className=' text-center mt-1'>Déja un compte?
                                <Link href={"/pages/Login"}>Se connecter</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
