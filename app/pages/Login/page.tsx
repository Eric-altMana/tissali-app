"use client"
import { TextField } from '@mui/material'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/store/useStore'

function LoginPage() {

    const router = useRouter();

    const [load, setLoad] = useState(false)
    const [formData, setFormData] = useState({ email: "", password: "" })
    

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoad(true)
        try {
            const res = await axios.post("/api/CreatUser/Login", {
                email: formData.email,
                password: formData.password
            })
            console.log("Réponse de la connexion :", res.data)
            localStorage.setItem("client", JSON.stringify(res.data.client))
            
            const clientId = res.data.client.id; // <-- Récupère l'ID du client
            if (clientId) {
                router.push(`/pages/ProfilClient/Profil/${clientId}`);
            }else {
                alert("ID du client non trouvé dans la réponse.")
            }
            
        } catch (error) {
            console.log(error)
            alert("Erreur lors de la connexion")
        } finally {
            setLoad(false)
        }
    }

    return (
        <div>
            <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
                <div className="card bg-warning p-4" style={{ maxWidth: '500px' }}>
                    <div className="card-body">
                        <h2 className="card-title text-center mb-4 fw-bold">Se connecter</h2>
                        <form onSubmit={submitForm}>
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
                                />
                            </div>
                            {!load ?
                                <button type="submit" className="btn btn-dark w-100 py-2 fw-bold text-warning">
                                    Se connecter
                                </button>
                                : <button className="btn btn-secondary w-100" type="button" disabled>
                                    <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                    <span role="status">Traitement en cours...</span>
                                </button>
                            }
                            <p className='text-center mt-1'>Vous n'avez pas de compte ?
                                <Link href={"/pages/Signup"}>Créer un compte</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
