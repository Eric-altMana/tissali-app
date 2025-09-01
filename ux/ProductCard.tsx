import React from 'react'

function ProductCard() {
    return (
        <div>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                        {produits.length > 0 && produits.map((produit: ProduitType, index) => (
                            <div key={index} className="card border-0 shadow-sm">
                                <Link href={`/pages/Detaile/${produit._id}`} className="text-decoration-none text-black">
                                    <div className="position-relative">
                                        {produit.images && produit.images.length > 0 && (
                                    <img
                                        src={produit.images[0]}
                                        className="card-img-top"  alt={produit.titre || "Produit"} />
                                    <button type="button"
                                        className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm">
                                        <i className="bi bi-heart fs-5"></i>
                                    </button>
                                        )}
                                    </div>
                                </Link>

                                <div className="card-body">
                                    <p className="text-muted small mb-1">{produit?.titre}</p>
                                    <h6 className="card-title mb-1">
                                        {produit?.titre}
                                    </h6>
                                    <p className="text-muted small mb-3">
                                        {produit?.description || "Aucune description disponible"}
                                    </p>

                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="text-warning">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star"></i>
                                        </div>
                                        <span className="text-muted small">({produit?.quantite})</span>
                                    </div>

                                    <div className="fs-5 fw-semibold"> {produit?.prixInitial} FCFA</div>
                                    <div className="btn-ctn mt-3">
                                        <button className="add-btn w-100" onClick={() => AddPanier(produit, 1, panier, addPanierStore, incQteEls)}>Ajouter au panier</button>
                                    </div>
                                </div>
                            </div>
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
