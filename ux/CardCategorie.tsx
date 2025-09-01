import React from 'react'

function CardCategorie() {
    return (
        <div className='container py-3'>
            <div className='row'>
                <div className=' d-flex flex-column'>
                    <div className='' style={{ width: "140px", height: "140px" }}>
                        <div className="">
                            <img src="image/p5.jpg" className="card-img img-thumbnail rounded-circle border border-warning" alt="..." />
                        </div>
                    </div>
                    <p className=' text-body text-muted'>Chaussures</p>
                </div>
            </div>

        </div>
    )
}

export default CardCategorie
