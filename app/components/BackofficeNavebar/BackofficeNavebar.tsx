import { Home, User, HelpCircle, LogOut } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type SidebarProps = {
    vendeur: {
        _id: string | undefined,
        nom: string | undefined,
        prenom: string | undefined,
    } | undefined;
}

function BackofficeNavbar({ vendeur }: SidebarProps) {
    const SidebarData = [
        {
            titre: "Accueil",
            icon: <Home size={18} />,
            link: `/`
        },
    ];

    const handleNavigation = (link: string) => {
        window.location.pathname = link;
    };

    const getInitials = () => {
        const nom = vendeur?.nom || '';
        const prenom = vendeur?.prenom || '';
        return `${prenom.charAt(0)}${nom.charAt(0)}`.toUpperCase();
    };

    const getFullName = () => {
        return `${vendeur?.prenom || ''} ${vendeur?.nom || ''}`.trim() || 'Utilisateur';
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
                <div className="container-fluid px-4">
                    {/* Logo avec badge */}
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <Image 
                            src="/logo/logo-3.png"
                            alt="Logo Tissali"
                            width={150}
                            height={50}
                        />
                        <span className="badge bg-primary ms-2">Backoffice</span>
                    </a>

                    {/* Toggle button pour mobile */}
                    <button
                        className="navbar-toggler border-0 shadow-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="d-flex align-items-center ms-auto">
                            
                            {/* Navigation items */}
                            <ul className="navbar-nav me-4">
                                {SidebarData.map((item, index) => {
                                    return (
                                        <li key={index} className="nav-item">
                                            <button
                                                className="nav-link btn btn-link text-decoration-none d-flex align-items-center gap-2 px-3 py-2 rounded-pill border-0"
                                                onClick={() => handleNavigation(item.link)}
                                                style={{
                                                    transition: 'all 0.2s ease',
                                                    color: '#495057'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#e9ecef';
                                                    e.currentTarget.style.color = '#0d6efd';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'transparent';
                                                    e.currentTarget.style.color = '#495057';
                                                }}
                                            >
                                                <span className="text-primary">{item.icon}</span>
                                                {item.titre}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Dropdown utilisateur */}
                            <div className="dropdown">
                                <a
                                    className="nav-link dropdown-toggle d-flex align-items-center gap-2 px-3 py-2 rounded-pill text-decoration-none border"
                                    href="#"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{
                                        backgroundColor: '#f8f9fa',
                                        border: '1px solid #dee2e6',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#e9ecef';
                                        e.currentTarget.style.borderColor = '#0d6efd';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.borderColor = '#dee2e6';
                                    }}
                                >
                                    {/* Avatar avec initiales */}
                                    <div 
                                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-1"
                                        style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
                                    >
                                        {getInitials()}
                                    </div>
                                    
                                    {/* Nom utilisateur */}
                                    <span className="text-dark fw-medium d-none d-md-inline">
                                        {getFullName()}
                                    </span>
                                </a>

                                {/* Menu déroulant */}
                                <ul
                                    className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2"
                                    aria-labelledby="userDropdown"
                                    style={{ 
                                        minWidth: '220px',
                                        borderRadius: '12px',
                                        border: '1px solid #e9ecef'
                                    }}
                                >
                                    {/* En-tête du menu */}
                                    <li className="px-3 py-2 border-bottom bg-light">
                                        <div className="d-flex align-items-center gap-2">
                                            <div 
                                                className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold"
                                                style={{ width: '24px', height: '24px', fontSize: '0.7rem' }}
                                            >
                                                {getInitials()}
                                            </div>
                                            <div>
                                                <div className="fw-semibold text-dark small">
                                                    {getFullName()}
                                                </div>
                                                <small className="text-muted">
                                                    ID: {vendeur?._id?.slice(-8) || 'Non défini'}
                                                </small>
                                            </div>
                                        </div>
                                    </li>
                                    
                                    {/* Options du menu */}
                                    <li>
                                        <a 
                                            className="dropdown-item d-flex align-items-center gap-2 py-2" 
                                            href="#"
                                            style={{ borderRadius: '8px' }}
                                        >
                                            <User size={16} className="text-muted" />
                                            Mon Profil
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <a 
                                            className="dropdown-item d-flex align-items-center gap-2 py-2" 
                                            href="#"
                                            style={{ borderRadius: '8px' }}
                                        >
                                            <HelpCircle size={16} className="text-muted" />
                                            Aide
                                        </a>
                                    </li>
                                    
                                    <li><hr className="dropdown-divider my-1" /></li>
                                    
                                    <li>
                                        <a 
                                            className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" 
                                            href="#"
                                            style={{ borderRadius: '8px' }}
                                        >
                                            <LogOut size={16} />
                                            Déconnexion
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BackofficeNavbar;