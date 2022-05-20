import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

function AddProduct() {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [data, setData] = useState({})
  useEffect( () => {
    fetch('http://localhost:7000/categories')
    .then(res => res.json())
    .then(data => setCategories(data))
  }, [])

  const handleInput = (e) => {
    const {name, value} = e.target
    setData({...data, [name]: value})
  }

  const handleForm = (e) => {
    e.preventDefault()
    fetch('http://localhost:7000/products', {
      method: "POST", 
      headers: {
        "Content-Type": "Application/json"
      }, 
      body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data => {
        e.target.reset()
        navigate("/products")
    })
  }
  return (
    <div className='container'>
      <h1>Add Product</h1>
      <form onSubmit={(e) => handleForm(e)}>
        <div className="row">
          <div className="col-6">
            <input type="text" className='form-control mt-2' placeholder='Title' name='title' onChange={(e) => handleInput(e)} />  
            <input type="text" className='form-control mt-2' placeholder='Price' name='price' onChange={(e) => handleInput(e)} />  
            <input type="text" className='form-control mt-2' placeholder='Desc' name='description' onChange={(e) => handleInput(e)} />  
          </div>  
          <div className="col-6">
            <select name="category" className='form-control mt-2' onChange={(e) => handleInput(e)}>
            {
              categories.map( (index, key) => (

                <option value={index.name} key={key}>{index.name}</option>
              ))
            }
            </select>          
            <input type="text" className='form-control mt-2' placeholder='Image Url' name='image' onChange={(e) => handleInput(e)} />  
            <button className="btn btn-success mt-2 btn-block">Add Product</button>
          </div>
        </div>  
      </form>  
    </div>
  )
}

export default AddProduct