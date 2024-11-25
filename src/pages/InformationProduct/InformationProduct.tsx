
import NavLinkPage from "./NavLinkPage"
import MainInfoProduct from "./MainInfoProduct/MainInfoProduct"

import DetailProduct from "./DetailProduct/DetailProduct"
import MoreProducts from "../cart/MoreProducts/MoreProducts"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SummaryApi from "../../common"
import axios from "axios"
import { ProductType } from "../../typescript/HomeType"
import ReviewStars from "./ReviewStars"
import { useDispatch } from "react-redux"
import { setLoading } from "../../store/PageSlice"

const PageInformationProduct = () => {
  const [Product, setProduct] = useState<ProductType>()
  const dispatch = useDispatch()
  const { id } = useParams();

  const fetchProduct = async () => {
    dispatch(setLoading(true))
   try {
     const dataResponse = await axios.get(SummaryApi.productDetails.url + "/" + parseInt(id as string), {
       headers: {
         accept: "application/json",
       },
     })
     if (dataResponse.status === 200) { 
    dispatch(setLoading(false))
       
       const product = dataResponse?.data?.data
       setProduct(product)
     }
   } catch (error) {
    dispatch(setLoading(false))
     
     console.error("Error fetching user details:", error)
   }
  }
  useEffect(() => {
    fetchProduct()
    
  },[])
  
  return (
    <div className='w-full px-14 '>
      <NavLinkPage {...Product} />
      <MainInfoProduct {...Product} />
      <DetailProduct {...Product} />
      <ReviewStars />
      <MoreProducts fetchProductDetail={fetchProduct} id={Product?.category_id} />
    </div>
  )
}
export default PageInformationProduct
