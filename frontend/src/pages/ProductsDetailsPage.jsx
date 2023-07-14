import React, { useEffect, useState } from 'react'
import Header from '../components/layouts/Header'
import Footer from '../components/layouts/Footer'
import ProductsDetails from "../components/Products/ProductsDetails"
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProduct from '../components/Products/SuggestedProduct'

const ProductsDetailsPage = () => {

    const {id} = useParams();
    const [data, setData] = useState(null);
    const [productName, setProductName] = useState(id.replace(/-/g," "))

    useEffect(() =>{
      setProductName(id.replace(/-/g," "))
    },[id])

    useEffect(() =>{
      const data = productData.find((i)=> i.name === productName);
      setData(data); 
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    },[productName])



  return (
    <div>
        <Header />
        <ProductsDetails data={data}/>
        {
            data && <SuggestedProduct data={data} />
        }
        <Footer />
    </div>
  )
}

export default ProductsDetailsPage