"use client"
import useStore from '@/store/useStore'
import axios from 'axios'
import { Heart, ShoppingBag, ShoppingBasket, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

function NavBar() {


    const client = useStore((state) => state.clientStore)
    const id = client?._id

   /* useEffect(() => {
        if (!id) return
        axios.get(`/api/profils/Client/GetClient/${id}`)
            .then(res => {
                if (res.data.success) setClient(res.data.client)
                else alert(res.data.message)
            })
            .catch(() => alert("Erreur chargement profil"))
    }, [id])*/


    /* const setClient = useStore((state) => state.setClient)
     const client = useStore((state) => state.client)
     const clientId = client?._id
     
    const recupClient = async () => {
     try {
         const res = await axios.get(`/api/profils/Client/GetClientCurrent`);
         if (res.data?.client) {
             setClient(res.data.client);
         } else {
             console.log("Client non trouvé :", res.data);
         }
     } catch (err) {
         console.error("Erreur récupération client :", err);
     }
 };
 
 useEffect(() => {
     if (!client?._id) {
         recupClient();
     }
 }, [client]);
 */

    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <Image src="/logo/logo-3.png"
                            alt="Logo Tissali"
                            width={150}
                            height={50}
                        />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto text-center mb-2 mb-lg-0">
                            <li className="nav-item me-3">
                                <input className="form-control border-dark me-5" type="search" placeholder="Rechercher" aria-label="Rechercher" />
                            </li>
                            <li className=' nav-item me-3'>
                                <button className='btn btn-outline-dark'>Consulter les profils vendeur</button>
                            </li>
                            <li className=' nav-item'>
                                <Link href={'/pages/AuthVendor/Login'} className=' d-block mt-auto btn-or text-decoration-none'>Vendre un article</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className=' nav-item me-3'>
                                {client  ? (
                                    <div className="dropdown-center">
                                        <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Bonjour {client.nom}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" href={`/pages/CompteClient/Profile/`}>Votre compte</Link></li>
                                            <li><Link className="dropdown-item" href="/pages/CompteClient/Commandes">Vos commandes</Link></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <Link href={"/pages/Login"} className=' text-decoration-none text-black'> <User /> </Link>
                                )}
                            </li>
                            <li className=' nav-item me-3'>
                                <Heart />
                            </li>
                            <li className=' nav-item'>
                                <ShoppingBag />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
