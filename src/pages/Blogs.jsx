import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Blogs() {
    const [blogs,setBlogs] = useState([])
    const [modal,setModal] = useState(false)
    const [val,setVal] = useState({})


    useEffect(() => {
        fetch('http://localhost:7000/blogs')
        .then(res => res.json())
        .then(data => {
            setBlogs(data)
        })
    },[])
    

    const deleteBlog = (id) => {
        fetch(`http://localhost:7000/blogs/${id}`, {
            method: "DELETE",
            headers : {
                "Content-Type": "Application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setBlogs(blogs.filter(el => el.id !== id))

        })
    }

    const editBlog = (id) => {
      setModal(!modal)
      let ourBlog=blogs.find(el => el.id === id)
      setVal(ourBlog)
    }

    const handleInput = (e) => {
      setVal({...val,
        [e.target.name] : e.target.value
      })
    }
    
    const handleSubmitForm = (e) => {
      e.preventDefault()

      fetch(`http://localhost:7000/blogs/${val.id}`,{
        method: "PUT",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify(val) 
      }).then(res => res.json())
      .then(data => {
        let list = [...blogs]
        let index = list.findIndex(e => e.id === val.id)
        list.splice(index, 1, val)
        setBlogs(list)
        setModal(!modal)
      })
    }
  return (
    <div className='container'>
        <h2 className='mt-2'>Blogs</h2>
        <div className="row mt-2">
            {
                blogs.length>0 ? 
                blogs.map((index,key) => (
                    <div className="col-4" key={key}>
                        <div className="card mt-4 p-2">
                                <img src={index.image} alt={index.title} className="w-100" />
                                <h2> {index.title} </h2>
                            <div className="btn-group">
                                <Link to= {`/blogs/${index.id}`} className='btn btn-primary'>Read more </Link>
                                <button className="btn btn-danger" onClick={() => deleteBlog(index.id)}>Delete</button>
                                <button className="btn btn-success" onClick={() => editBlog(index.id)}>Edit</button>
                            </div>
                        </div>
                    </div>
                )): 
                <h1>No item</h1>
            } 
        </div>

        <div className={modal ? "modal fade show": "modal fade "} >
        <div className="modal-dialog modal-dialog-centered" >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >Modal title</h5>
              <button type="button" className="close" onClick={() => setModal(!modal)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmitForm(e)}>
                <input type="text" name='title' className='form-control mt-2' value={val.title || ""} onChange= {(e) => handleInput(e)} />
                <input type="text" name='body' className='form-control mt-2' value={val.body || ""} onChange= {(e) => handleInput(e)} />
                <input type="text" name='image' className='form-control mt-2' value={val.image || ""} onChange= {(e) => handleInput(e)} />
                <button className="btn btn-success btn-block mt-2">Edit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModal(!modal)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blogs