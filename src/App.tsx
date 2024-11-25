
import './css/App.css';
import { Outlet } from 'react-router-dom';
import Header from "./components/Header/Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch, useSelector } from "react-redux"
import { setUserDetails } from "./store/userSlice"
import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Footer from './components/Footer';
import Loading from './components/Loading';
import { setCart } from './store/CartSlice';
import { setFilterProduct } from './store/FilterProductSlide';
import { ZaloIcon } from './common/svgImage';
function App() {
  const loading = useSelector((state: any) => state.page.loading)
  const cart = useSelector((state: any) => state.cart.cart)
  const [isHovered, setIsHovered] = useState(false)
  const dispatch = useDispatch()
  var token = Cookies.get("token")
  var userid = Cookies.get("id")
  const fetchUserDetails = async () => {
    try {
     const dataResponse = await axios.get(SummaryApi.current_user.url + "/" + userid, {
       headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
         
       },
     })  
      dispatch(setUserDetails(dataResponse.data.data))
    } catch (error) {

      console.error("Error fetching user details:", error)
    }
  }
  const fetchFilterProduct = async () => {
    try {
     const dataResponse = await axios.get(SummaryApi.filterProduct.url,{
       headers: {
         accept: "application/json",
       },
     })  
      dispatch(setFilterProduct(dataResponse.data.data))
    } catch (error) {

      console.error("Error fetching user details:", error)
    }
  }
  const fetchUserAddToCart = async () => {
   try {
     const dataResponse = await axios.get(SummaryApi.getCustomerCart.url + "/" + userid, {
       headers: {
         accept: "application/json",
         Authorization: `Bearer ${token}`,
       },
     })
   
     dispatch(setCart(dataResponse.data.data))
   } catch (error) {
     console.error("Error fetching user details:", error)
   }
  }

  useEffect(() => {
    /**user Details */
    if (token && userid) {
      fetchUserDetails()
      /**user Details cart product */
      fetchFilterProduct()
      fetchUserAddToCart()
    }
  }, [token, userid, cart])


  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user detail fetch
          // current user add to cart product count,
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position='top-center' />
        <Header />
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet />
        </main>
        <Footer />
        {/* Loading */}
        {loading && <Loading />}
        <div
          className='fixed bottom-20 right-10 flex z-50 items-center justify-end space-x-2'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <span className='bg-gray-800 text-white text-sm py-1 px-3 rounded-md shadow-md transition-opacity duration-300'>
              Chat Zalo
            </span>
          )}
          <a
            href='https://zalo.me/0379948336'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-blue-500 hover:bg-blue-600  text-white rounded-full shadow-lg flex items-center justify-center w-16 h-16 transition transform hover:scale-110'
            aria-label='Chat Zalo'
          >
            {/* Icon Zalo */}
            {ZaloIcon}
          </a>
        </div>
      </Context.Provider>
    </>
  )
}

export default App;
