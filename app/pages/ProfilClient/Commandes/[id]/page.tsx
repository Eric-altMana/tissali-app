import { Package2, UserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div>
            <div className=' container mt-5'>
                <div className=' row'>
                    <div className=' col-3'>
                        <div className="card">
                            <div className="card-body p-0">
                                <p className=' py-2 ps-3 mb-0'>
                                    <Link className="dropdown-item" href="/pages/CompteClient/Profile"><UserRound /> Votre compte</Link>
                                </p>
                                <p className='  bg-body-secondary py-2 ps-3 mb-0'>
                                    <Link className="dropdown-item" href="/pages/CompteClient/Commandes"><Package2 /> Vos commandes</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=' col-8'>
                        <div className="card">
                            <h5 className="card-header bg-white">Vos Commandes</h5>
                            <div className="card-body">
                                <div className=' border-bottom mb-2'>
                                    <h6>En cours/Livrées/Annulées</h6>
                                </div>

                                <div className="card-body border rounded d-flex justify-content-between" style={{ height: '150px' }}>
                                    <div className="card mb-3 border-0 " style={{ maxWidth: '380px' }}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src="/image/p4.jpg" className="img-fluid" style={{ height: '120px' }} alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body pt-0">
                                                    <h5 className="card-title mb-3">Pagne kita, kenté,</h5>
                                                    <p className=" my-2">Vendeur: <small className="text-body-secondary">Kané Eric</small></p>
                                                    <p className=" my-2"><small className="text-body-secondary">Colis livrée</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <p>
                                                <Link href={'#'} className=' text-decoration-none text-or'>Detaille</Link>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
