import { Boxes, HandCoins, LayoutDashboard, Shirt } from 'lucide-react'
import React from 'react'

function DashbordSideBar() {
    return (
        <div>
            <div className=' col-3' style={{height: '80vh', maxWidth: 300, position: 'fixed'}}>
                <div className="card" style={{height: '50vh'}}>
                    <h5 className="card-header bg-white">Tableau de bord Vendeur</h5>
                    <div className="card-body">
                        <div className=' py-2 fs-5'> <LayoutDashboard/> Dasboard</div>
                        <div className=' py-2 fs-5'> <Shirt/> Mes Produits</div>
                        <div className=' py-2 fs-5'> <Boxes/> Commandes Reçue</div>
                        <div className=' py-2 fs-5'> <HandCoins/> Vendre un produit</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashbordSideBar
