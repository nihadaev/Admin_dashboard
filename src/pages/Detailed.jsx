import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
function Detailed() {
    const {id} = useParams()
    const [product,setProduct] = useState({})
    useEffect(() =>{
        fetch(`http://localhost:7000/products/${id}`)
        .then(res => res.json())
        .then(data => {
        setProduct(data)
    })
    }, [])
    console.log(product);
  return (


    <div>Detailed</div>
  )


}



export default Detailed