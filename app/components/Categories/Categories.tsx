import React from 'react'

function Categories() {

    const categories = [
        {
            titre: "tenues traditionnelles",
            link: "/categories/tenues-traditionnelles",
            image: "/images/categorie1.jpg",
        }
    ]

    const handleChangecategorie = (link: string) => {
        window.location.pathname = link;
    };

    return (
        <div>
            <div className='container py-5'>
                <div className='row'>
                    <div>
                        <div className='' style={{ width: "140px", height: "140px" }}>
                            <div className="">
                                <img src="image/p5.jpg" className="card-img img-thumbnail rounded-circle border border-warning" alt="..." />
                            </div>
                        </div>
                        <p className=' text-body text-muted'>Chaussures</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
