import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function AddCategory() {
  const navigate = useNavigate()

  const [data, setData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('http://localhost:7000/categories', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        e.target.reset()
        navigate("/categories")
      })
  }

  return (
    <div className='container py-3'>
      <h1>
        Add Category
      </h1>
      <div className="col-12">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-8">
              <input type="text" className='form-control' onChange={(e) => setData({ name: e.target.value })} />
            </div>
            <div className="col-4">
              <button className='btn btn-success btn-block'>Add Category</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategory