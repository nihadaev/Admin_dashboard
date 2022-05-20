import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
function DetailedBlog() {
    const {id} = useParams()
    const [blog,setBlog]= useState({})

   useEffect(() => {
    fetch(`http://localhost:7000/blogs/${id}`)
    .then(res => res.json())
    .then(data => {
    setBlog(data)
})
   }, [])
    console.log(blog);
  return (
    <div className='container'>
        <div className="row mt-2">
            <div className="col-6">
                <img src={blog.image} alt={blog.title} className='w-100' />
            </div>
            <div className="col-6">
                <h2 className='mt-2'> {blog.title} </h2>
                <h2 className='mt-2'> {blog.body} </h2>
            </div>
        </div>
    </div>
  )
}

export default DetailedBlog