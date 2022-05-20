import React from 'react'
import { NavLink } from 'react-router-dom'
function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <NavLink className="navbar-brand" to="/">Admin Dashboard</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav  ">
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/categories">Categories</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/add-category">Add Category</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/products">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/add-product">Add Product</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className="nav-link" to= "/blogs">Blogs</NavLink>
                    </li>
                    <li className='nav-item'>
                         <NavLink className="nav-link" to= "/addblog">Add Blog</NavLink>
                     </li>
                </ul>
                
            </div>
        </nav>
    )
}

export default Header