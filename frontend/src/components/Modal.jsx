import axios from 'axios';
import React, {useState} from 'react'

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/todos', {
            title: formData.title,
            body: formData.body
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    return(
        <div>
            <button className="button is-info" onClick={() => setIsOpen(true)}>
                Add Todo
            </button>
            <div className={`modal ${isOpen ? 'is-active' : ''}`}>
                <div className="modal-background"></div>
                <div className="modal-content">
                    <div className="box">
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Title" name='title' onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="field mb-3">
                                <label className="label">Description</label>
                                <div className="control">
                                    <textarea className="textarea" placeholder="Description" name='body' onChange={handleChange} required></textarea>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <button className="button is-link" onClick={()=>setIsOpen(false)}>Submit</button>
                                </div>
                                <div className="control">
                                    <button className="button is-link is-light" onClick={()=> setIsOpen(false)}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <button className="modal-close is-large" aria-label="close" onClick={() => setIsOpen(false)}></button>
            </div>
        </div>
    )
}

export default Modal