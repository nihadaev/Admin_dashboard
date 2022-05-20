import React from "react";

import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import Detailed from "./pages/Detailed";
import Blogs from "./pages/Blogs";
import DetailedBlog from "./pages/DetailedBlog";
import Addblog from "./pages/Addblog";

function App() {
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/products/:id" element={<Detailed />}/>
        <Route path="/blogs" element= {<Blogs/>} />
        <Route path="/blogs/:id" element={<DetailedBlog />}/>
        <Route path="/addblog" element= {<Addblog/>} />
      </Routes>
    </>
  );
}

export default App;
