import React, { useState, useEffect } from 'react'

function Categories() {
  const [modal, setModal] = useState(false)
  const [categories, setCategories] = useState([])
  const [val, setVal] = useState({})
  useEffect(() => {
    fetch('http://localhost:7000/categories')
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      })
  }, [])

  const deleteItem = (id) => {
    fetch(`http://localhost:7000/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setCategories(categories.filter(e => e.id !== id))
      })

  }

  const editItem = (id) => {
    setModal(!modal)
    let el = categories.find(e => e.id === id)
    setVal({name: el.name, id: el.id})
  }

  const handleEditInput = (e) => {
    setVal({...val, name: e.target.value})
  }

  const handleEditForm = (e) => {
    e.preventDefault()
    fetch(`http://localhost:7000/categories/${val.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify(val)
    }).then(res => res.json())
    .then(data => {
      let list = [...categories]
        let index = list.findIndex(e => e.id === val.id)
        list.splice(index, 1, val)
        setCategories(list)
        setModal(!modal)
    })
  }
  return (
    <>
      <div className='container py-3'>
        <table className="table table-dark table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Config</th>
            </tr>
          </thead>
          <tbody>

            {
              categories.length > 0 ?
                categories.map((index, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{index.name}</td>
                    <td>
                      <div className="btn-group">
                        <button className='btn btn-danger' onClick={() => deleteItem(index.id)}>Del</button>
                        <button className='btn btn-success' onClick={() => editItem(index.id)}>Edit</button>
                      </div>
                    </td>
                  </tr>
                )) :
                <tr>
                  <td colSpan={3}>No item</td>
                </tr>
            }

          </tbody>
        </table>
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
              <form onSubmit={(e) => handleEditForm(e)}>
                <input type="text" className='form-control my-3' value={val.name || ""} onChange={(e) => handleEditInput(e)}/>
                <button className='btn btn-success'>Edit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setModal(!modal)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Categories