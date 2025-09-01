import { CirclePlus, LayoutDashboard, ShoppingBag, Store } from "lucide-react";

type SidebarProps = {
    vendeur: { _id: string | undefined } | undefined;
}

function Sidebar({ vendeur }: SidebarProps) {
    const SidebarData = [
        {
            titre: "Dashboard",
            icon: <LayoutDashboard size={23} />,
            link: `/pages/Backoffice/Dashboard/${vendeur?._id}`,
            description: "Vue d'ensemble de votre activité"
        },
        {
            titre: "Mes Produits",
            icon: <Store size={23} />,
            link: `/pages/Backoffice/MesProduits/${vendeur?._id}`,
            description: "Gérer votre catalogue"
        },
        {
            titre: "Commandes Reçues",
            icon: <ShoppingBag size={23} />,
            link: `/pages/Backoffice/Commandes/${vendeur?._id}`,
            description: "Suivre vos ventes"
        },
        {
            titre: "Vendre un produit",
            icon: <CirclePlus size={23} />,
            link: `/pages/Backoffice/AddProduit/${vendeur?._id}`,
            description: "Ajouter un nouveau produit"
        },
    ];

    const handleNavigation = (link: string) => {
        window.location.pathname = link;
    };

    const isActive = (link: string) => {
        return window.location.pathname === link;
    };

    return (
        <div className="bg-light border-end vh-100 position-sticky top-0" style={{ width: '280px', top: '0' }}>
            {/* Header du sidebar */}
            <div className="p-3 border-bottom bg-dark-md text-white">
                <h5 className="mb-1 fw-bold">Espace Vendeur</h5>
                <small className="text-light opacity-75">Gestion de votre boutique</small>
            </div>

            {/* Navigation */}
            <nav className="p-3">
                <ul className="nav nav-pills flex-column gap-2">
                    {SidebarData.map((item, index) => {
                        const active = isActive(item.link);
                        return (
                            <li key={index} className="nav-item">
                                <button
                                    onClick={() => handleNavigation(item.link)}
                                    className={`nav-link w-100 text-start d-flex align-items-center gap-3 p-2 border-0 ${
                                        active 
                                            ? ' bg-medium-1 text-white shadow-sm' 
                                            : 'text-dark bg-transparent hover-bg-light'
                                    }`}
                                    style={{
                                        borderRadius: '12px',
                                        transition: 'all 0.2s ease-in-out',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!active) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }
                                    }}
                                >
                                    <div className={`${active ? 'text-white' : 'text-dark'}`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className={`fw-semibold ${active ? 'text-white' : 'text-dark'}`}>
                                            {item.titre}
                                        </div>
                                        <small className={`${active ? 'text-light opacity-75' : 'text-muted'}`}>
                                            {item.description}
                                        </small>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer du sidebar */}
            <div className="position-absolute bottom-0 w-100 p-3 border-top bg-light">
                <div className="d-flex align-items-center gap-2 text-muted">
                    <div className="bg-dark-md rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '32px', height: '32px' }}>
                        <Store size={16} className="text-white" />
                    </div>
                    <div>
                        <small className="fw-semibold text-dark">Vendeur ID</small>
                        <br />
                        <small className="text-muted">{vendeur?._id?.slice(-8) || 'Non défini'}</small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;