import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import Link from 'next/link'
import React, { MouseEvent } from 'react'

function FooterPage() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleSocialHover = (e: MouseEvent<HTMLAnchorElement>, color: string) => {
        (e.target as HTMLAnchorElement).style.color = color;
    };

    const handleSocialLeave = (e: MouseEvent<HTMLAnchorElement>) => {
        (e.target as HTMLAnchorElement).style.color = '#6c757d';
    };

    const handleButtonHover = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.target as HTMLButtonElement;
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
    };

    const handleButtonLeave = (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.target as HTMLButtonElement;
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '';
    };

    return (
        <footer className="bg-dark text-white">
            {/* Section principale du footer */}
            <div className="container py-5">
                <div className="row g-4">
                    {/* Colonne 1 - À propos */}
                    <div className="col-lg-3 col-md-6">
                        <div className="mb-4">
                            <img
                                src="/logo/logo-3.png"
                                alt="Logo Tissali"
                                width={150}
                                height={50}
                                className="mb-3"
                            />
                            <p className="text-light small lh-base">
                                Tissali connecte les communautés à travers une plateforme innovante
                                dédiée à la culture, au commerce et aux traditions africaines.
                            </p>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="d-flex gap-3">
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary text-decoration-none"
                                style={{ transition: 'color 0.3s ease' }}
                                onMouseEnter={(e) => handleSocialHover(e, '#1877f2')}
                                onMouseLeave={handleSocialLeave}
                            >
                                <Facebook size={24} />
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary text-decoration-none"
                                style={{ transition: 'color 0.3s ease' }}
                                onMouseEnter={(e) => handleSocialHover(e, '#0077b5')}
                                onMouseLeave={handleSocialLeave}
                            >
                                <Linkedin size={24} />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary text-decoration-none"
                                style={{ transition: 'color 0.3s ease' }}
                                onMouseEnter={(e) => handleSocialHover(e, '#e4405f')}
                                onMouseLeave={handleSocialLeave}
                            >
                                <Instagram size={24} />
                            </Link>
                        </div>
                    </div>

                    {/* Colonne 2 - Entreprise */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-3 fw-bold">
                            Entreprise
                        </h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href="/about" className="text-light text-decoration-none small">
                                    À propos de Tissali
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/careers" className="text-light text-decoration-none small">
                                    Carrières
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/culture" className="text-light text-decoration-none small">
                                    Culture & Tradition
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/advertising" className="text-light text-decoration-none small">
                                    Publicités
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/accessibility" className="text-light text-decoration-none small">
                                    Accessibilité
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 - Découvrir */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-3 fw-bold">
                            Découvrir
                        </h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link href="/how-it-works" className="text-light text-decoration-none small">
                                    Comment ça marche ?
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/verification" className="text-light text-decoration-none small">
                                    Vérification de l'article
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/mobile-apps" className="text-light text-decoration-none small">
                                    Applications mobiles
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/dashboard" className="text-light text-decoration-none small">
                                    Tableau de bord
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 - Aide & Contact */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="text-white mb-3 fw-bold">
                            Aide & Support
                        </h5>
                        <ul className="list-unstyled mb-4">
                            <li className="mb-2">
                                <Link href="/help" className="text-light text-decoration-none small">
                                    Centre d'aide
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/sell" className="text-light text-decoration-none small">
                                    Vendre
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/buy" className="text-light text-decoration-none small">
                                    Acheter
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/rent" className="text-light text-decoration-none small">
                                    Mettre en location
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/security" className="text-light text-decoration-none small">
                                    Confiance et sécurité
                                </Link>
                            </li>
                        </ul>

                        {/* Informations de contact */}
                        <div className="d-flex flex-column gap-2">
                            <div className="d-flex align-items-center gap-2 text-light">
                                <Mail size={16} />
                                <span className="small">support@tissali.com</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 text-light">
                                <Phone size={16} />
                                <span className="small">+225 XX XX XX XX</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 text-light">
                                <MapPin size={16} />
                                <span className="small">Abidjan, Côte d'Ivoire</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Séparateur */}
            <hr className="border-secondary m-0" />

            {/* Section copyright */}
            <div className="container py-4">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <p className="text-secondary small mb-0">
                            © {new Date().getFullYear()} Tissali. Tous droits réservés.
                        </p>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-md-end gap-3 mt-3 mt-md-0">
                            <Link href="/privacy" className="text-secondary text-decoration-none small">
                                Politique de confidentialité
                            </Link>
                            <Link href="/terms" className="text-secondary text-decoration-none small">
                                Conditions d'utilisation
                            </Link>
                            <Link href="/cookies" className="text-secondary text-decoration-none small">
                                Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bouton retour en haut */}
            <button
                onClick={scrollToTop}
                className="btn btn-light position-fixed bottom-0 end-0 m-4 rounded-circle shadow"
                style={{
                    width: '50px',
                    height: '50px',
                    zIndex: 1000,
                    transition: 'all 0.3s ease'
                }}
                aria-label="Retour en haut"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
            >
                <ArrowUp size={20} />
            </button>

            <style jsx>{`
                .text-light:hover {
                    color: #ffffff !important;
                    transition: color 0.3s ease;
                }
                
                .text-secondary:hover {
                    color: #ffffff !important;
                    transition: color 0.3s ease;
                }
            `}</style>
        </footer>
    )
}

export default FooterPage