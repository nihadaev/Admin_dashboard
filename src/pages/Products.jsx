import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
function Products() {
  const [products, setProducts] = useState([])
  const [modal, setModal] = useState(false)
  const [val,setVal] = useState({})



  useEffect(() => {
    fetch("http://localhost:7000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const deleteProduct = (id) => {
    console.log(id);
    fetch(`http://localhost:7000/products/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"
      }

    })
    .then(res => res.json())
    .then(data =>{
      setProducts(products.filter(e => e.id!== id))

    })
   
  }

  const editProduct = (id) => {
    setModal(!modal)
    let el=products.find(el => el.id===id)
    setVal({title : el.title, price : el.price, description: el.description, category: el.category, id: el.id})
  }

  const editInput = (e) => {
    setVal({...val,
    [e.target.name] : e.target.value })
    
  }

  const submiteditedForm = (e) =>{
    e.preventDefault()
    fetch(`http://localhost:7000/products/${val.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(val)
    })
    .then(res => res.json())
    .then(data => {
      let list = [...products]
      let index = list.findIndex(e => e.id === val.id)
        list.splice(index, 1, val)
        setProducts(list)
        setModal(!modal)
    })
  }
  
  return (
    <div className='container py-3'>
      <h1>Products</h1>
      <div className="row">
        {
          products.length > 0 ?
            products.map((index, key) => (
              <div className="col-4" key={key}>
                <div class="card">
                  <img class="card-img-top" src={index.image} alt="Card image cap" />
                    <div class="card-body">
                      <h5 class="card-title">{index.title}</h5>
                      <Link to={`/products/${index.id}`} class="btn btn-primary">Read More</Link>
                      <button className='btn btn-danger' onClick={() => deleteProduct(index.id)}>Delete</button>
                      <button className='btn btn-success' onClick={() => editProduct(index.id)}>Edit</button>
                    </div>
                </div>
              </div>
            )) :
            <h1 className='text-center'>No item</h1>
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
              <form onSubmit={(e) => submiteditedForm(e)}>
                <p>Title:</p>
                <input type="text" name='title' className='form-control my-3' value={val.title || " "} onChange={(e) => editInput(e)} />
                <p>Price:</p>
                <input type="text" name='price' className='form-control my-3' value={val.price || " "} onChange={(e) => editInput(e)} />
                <p>Description:</p>
                <input type="text" name='description' className='form-control my-3' value={val.description || " "} onChange={(e) => editInput(e)} />
                <p>Category:</p>
                <input type="text" name='category' className='form-control my-3' value={val.category || " "} onChange={(e) => editInput(e)} />



                <button className='btn btn-success'>Edit</button>
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

export default Products