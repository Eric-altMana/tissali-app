"use client"
import axios from 'axios'
import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'

function page() {

    const [formData, setFormData] = useState({
        labelCategorie: "",
        slug: ""
    })

    const [load, setload] = useState(false)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setload(true)
            const req = await axios.post('/Admin/api/Categories', formData)
            console.log(req.data)
            setFormData({
                labelCategorie: "",
                slug: ""
            })
            setload(false)
        } catch (error) {
            console.log(error)
            setload(false)
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center align-items-center vh-100'>
                    <div className='col-md-4 shadow p-4 rounded'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Catégorie (ex: Bijoux)</label>
                                    <input type="text" name="labelCategorie" value={formData.labelCategorie} onChange={handleChangeInput} className="form-control" id="formGroupExampleInput" placeholder="Catégorie" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formGroupExampleInput2" className="form-label">slug (ex: bijoux)</label>
                                    <input type="text" name="slug" value={formData.slug} onChange={handleChangeInput} className="form-control" id="formGroupExampleInput2" placeholder="slug" />
                                </div>
                                <div className='mb-3'>
                                    {!load
                                        ? <button type='submit' className='btn bg-black color-medium-3 form-control'>
                                            <PlusCircle /> ajouter
                                        </button>
                                        : <button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                                            <span role="status">Traitement en cours...</span>
                                        </button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
