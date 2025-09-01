"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import useStore from '@/store/useStore'
import { Heart, ShoppingBag, User } from 'lucide-react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { ClientType } from './Types/Types'
import FooterPage from './components/Footer/FooterPage'
import ListProduitPage from './components/Listproduits'
import ProductCard from '@/ux/ProductCard'
import CardCategorie from '@/ux/CardCategorie'

function Home() {


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

                                    <Link href={"/pages/Signup"} className='text-decoration-none text-black'>
                                        <User />
                                    </Link>
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

            <div className="container-fluid">
                <div className="row text-center">
                    <div className="col-12 col-md">
                        <Link className="text-decoration-none text-black d-block py-2" href="/product-list">
                            Nouveautés
                        </Link>
                    </div>
                    <div className="col-12 col-md">
                        <Link className="text-decoration-none text-or d-block py-2" href="/product-list">
                            Weeks-end Privilèges
                        </Link>
                    </div>
                    <div className="col-12 col-md">
                        <Link className="text-decoration-none text-black d-block py-2" href="/product-list">
                            Bijoux & Accessoires
                        </Link>
                    </div>
                    <div className="col-12 col-md">
                        <Link className="text-decoration-none text-black d-block py-2" href="/product-list">
                            Tenues Traditionnelles
                        </Link>
                    </div>
                    <div className="col-12 col-md">
                        <Link className="text-decoration-none text-black d-block py-2" href="/product-list">
                            Pret-à-porter
                        </Link>
                    </div>
                    <div className="col-12 col-md">
                        <Link className="text-decoration-none text-black d-block py-2" href="/product-list">
                            Couples
                        </Link>
                    </div>
                    <div className="col-12 col-md">
                        <Link className="text-decoration-none text-black d-block py-2" href="/product-list">
                            Singles
                        </Link>
                    </div>
                </div>
            </div>


            <div className='d-flex justify-content-center bg-black py-4'>
                <div>
                    <h1 className=' text-white text-center display-4'>Des privilèges rien que pour vous — Transformez chaque cérémonie en événement inoubliable !</h1>
                    <h4 className=' text-white text-center fst-italic'>🎉 Découvrez nos offres spéciales !</h4>
                    <div className=' text-center'>
                        <button className='btn bg-white mx-3'>Mariage</button>
                        <button className='btn bg-white mx-3'>Baptème</button>
                        <button className='btn bg-white mx-3'>Shooting</button>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt-3 hero-banner">
                <div className='row justify-content-center align-items-center'>
                    <div className=' col-lg-6'>
                        <div className="hero-card-1 text-bg-dark">
                            <div className="card-text">
                                <h1>LES PIÈCES ICONIQUES</h1>
                                <p className=' fs-4'>Des tenues qui marquent, <br /> qui captent tous les regards</p>
                                <button className='btn-black'>Célébrez vos racines avec style</button>
                            </div>
                        </div>
                    </div>
                    <div className=' col-lg-6'>
                        <div className="hero-card-2 text-bg-dark">
                            <div className="card-text">
                                <h1>LES TRÉSORS D’HÉRITAGE</h1>
                                <p className=' fs-4'>Des bijoux empreints d’histoire,<br /> Chaque pièce raconte une tradition</p>
                                <button className='btn-black'>Brillez avec des trésors de tradition</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CardCategorie/>

            <div className='actu-ctn container-fluid py-5'>
                <h3 className='py-3 ms-lg-5 ps-lg-5'>Produits ajoutés récemment</h3>
                <ListProduitPage />
            </div>

            <div className=' container'>
                <div className='row'>
                    <div className='banner'>
                        <div className=' col'>
                            <div className='card banner-card bg-white d-flex justify-content-center align-items-center' style={{ width: '22em' }}>
                                <div className=' py-3'>
                                    <h3 className=' pb-3'>Rentabilisez vos créations <br /> culturelles uniques</h3>
                                    <div className='pb-3'>
                                        <button className='btn-or'>Exposez vos pièces en ligne</button>
                                    </div>
                                    <div className=''>
                                        <button className='btn border'>Découvrir comment ça marche</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-5" style={{ backgroundColor: 'ivory' }}>
                <div className="row mb-4 ps-3">
                    <h3>Tenues en vogue</h3>
                    <p>Nos dernières interventions dans des événements</p>
                </div>

                <div className="row g-3">
                    {/* Ligne 1 */}
                    <div className="col-12 col-md-8">
                        <div className="overflow-hidden rounded-3 shadow-sm">
                            <img
                                src="/image/t1.jpg"
                                className="img-fluid w-100"
                                style={{ height: '100%', maxHeight: '500px', objectFit: 'cover' }}
                                alt="Tenue 1"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="overflow-hidden rounded-3 shadow-sm">
                            <img
                                src="/image/t2.jpg"
                                className="img-fluid w-100"
                                style={{ height: '100%', maxHeight: '500px', objectFit: 'cover' }}
                                alt="Tenue 2"
                            />
                        </div>
                    </div>

                    {/* Ligne 2 */}
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="overflow-hidden rounded-3 shadow-sm">
                            <img
                                src="/image/t3.jpg"
                                className="img-fluid w-100"
                                style={{ height: '300px', objectFit: 'cover' }}
                                alt="Tenue 3"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="overflow-hidden rounded-3 shadow-sm">
                            <img
                                src="/image/t4.jpg"
                                className="img-fluid w-100"
                                style={{ height: '300px', objectFit: 'cover' }}
                                alt="Tenue 4"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="overflow-hidden rounded-3 shadow-sm">
                            <img
                                src="/image/t5.jpg"
                                className="img-fluid w-100"
                                style={{ height: '300px', objectFit: 'cover' }}
                                alt="Tenue 5"
                            />
                        </div>
                    </div>

                    {/* Ligne 3 */}
                    <div className="col-12 col-sm-6">
                        <div className="overflow-hidden rounded-3 shadow-sm">
                            <img
                                src="/image/t6.jpg"
                                className="img-fluid w-100"
                                style={{ height: '300px', objectFit: 'cover' }}
                                alt="Tenue 6"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="overflow-hidden rounded-3 shadow-sm">
                            <img
                                src="/image/t7.jpg"
                                className="img-fluid w-100"
                                style={{ height: '300px', objectFit: 'cover' }}
                                alt="Tenue 7"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <FooterPage />
        </div>
    )
}

export default Home
