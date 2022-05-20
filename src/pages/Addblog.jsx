import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

function Addblog() {
    const [blog,setBlog] = useState({})
    const navigate = useNavigate()
    
    const handleInput = (e) => {
        const {name,value}= e.target
        setBlog({...blog, 
        [name]: value
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        fetch('http://localhost:7000/blogs', {
            method: "POST",
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify(blog)
        })
        .then(res => res.json())
        .then(data => {
            e.target.reset()
            navigate('/blogs')
        })
    }


  return (
    <div className='container'>
        <h2 className='mt-2'>Add Blog</h2>
        <form className='mt-2' onSubmit={(e) => handleSubmitForm(e)}>
            <div className="row">
                <div className="col-6">
                    <input type="text" name='title' placeholder='Title' className='form-control mt-2' onChange={(e) => handleInput(e)} />
                    <input type="text" name='body' placeholder='Body' className='form-control mt-2' onChange={(e) => handleInput(e)} />
                </div>
                <div className="col-6">
                <input type="text" name='image' placeholder='Image' className='form-control mt-2' onChange={(e) => handleInput(e)} />
                <button className="btn btn-success btn-block mt-2">Add</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Addblog