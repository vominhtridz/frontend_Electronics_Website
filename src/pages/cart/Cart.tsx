import { ChangeEvent, useContext, useEffect, useState } from "react"
import OptionsNavPrices from "./ShoppingCart/OptionsNavPrices"
import ProductsCart from "./ShoppingCart/ProductsCart"
import { useDispatch, useSelector } from "react-redux"
import { ContextType } from "../../typescript/ContextType"
import Context from "../../context"
import Cookies from "js-cookie"
import { setLoading } from "../../store/PageSlice"
import SummaryApi from "../../common"
import axios from "axios"
import { toast } from "react-toastify"
import { CartType } from "../../typescript/CartType"
import { useNavigate } from "react-router-dom"
import displayINRCurrency from "../../helpers/displayCurrency"

const PageCart = () => {
  const cart = useSelector((state: any) => state?.cart?.cart)
  const { fetchUserAddToCart } = useContext<ContextType>(Context)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const token = Cookies.get("token")
  const user_id = Cookies.get('id')
  const [total, setTotal] = useState<number>(0)
const [quantities, setQuantities] = useState<{ [key: number]: number }>({})
useEffect(() => {
  if (cart && cart.length > 0) {
    const initialQuantities: { [key: number]: number } = {}
    cart.forEach((item: CartType) => {
      // Đảm bảo rằng quantity là một số hợp lệ
      initialQuantities[item.product_id] = Number(item.quantity) || 1
       setTotal(prev => prev + Number(item?.price) * Number(item.quantity))
    })
    setQuantities(initialQuantities)
  }
}, [cart])
  
  const handleRemoveAll = async () => {
    if (cart.length <1) {
      return
    }
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa hết không?")
    if (confirmed) {
      dispatch(setLoading(true))
      try {
        const dataResponse = await axios.delete(SummaryApi.removeCartbyId.url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (dataResponse.status === 200) {
          dispatch(setLoading(false))
          Cookies.remove("bank_id")
          fetchUserAddToCart()
          toast.success("Xoá tất cả Giỏ Hàng thành công")
        }
      } catch (error) {
        dispatch(setLoading(false))
        console.error("Error deleting cart item:", error)
      }
    }
   
  }
  const handlePayment = () => {
    if (cart?.length < 1) return;
    
    navigate('/checkout')
  }
  // Hàm xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemove = async (cart_id: number) => {
    if (!cart) {
      return;
    }
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa không?")
    if (confirmed) {
      dispatch(setLoading(true))
      try {
        const dataResponse = await axios.delete(SummaryApi.removeCartbyId.url + "/" + cart_id, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (dataResponse.status === 200) {
          dispatch(setLoading(false))
          Cookies.remove("bank_id")
          fetchUserAddToCart()
          toast.success("Xoá Giỏ Hàng Thành Công")
        }
      } catch (error) {
        dispatch(setLoading(false))
        console.error("Error deleting cart item:", error)
      }
    }
  }
  useEffect(() => {
    if (!token || !user_id) {
      navigate("/login")
    }
  }, [])
  return (
    <div className='container mx-auto px-6 py-8'>
      {/* Thông báo mã giảm giá */}
      <section className='bg-yellow-50 border border-yellow-200 text-slate-700 rounded-lg p-4 mb-8 flex items-center'>
        <div className='w-6 h-6 bg-green-600 rounded-sm'></div>
        <p className='ml-3'>
          Nhấn vào mục <span className='font-semibold'>Mã giảm giá</span> ở cuối trang để hưởng miễn
          phí vận chuyển bạn nhé!
        </p>
      </section>

      {/* Tiêu đề các cột */}
      <OptionsNavPrices />

      {/* Danh sách sản phẩm trong giỏ hàng */}

      <div className='bg-white rounded-lg shadow-sm mb-8'>
        <ProductsCart
          setQuantities={setQuantities}
          handleRemove={handleRemove}
          quantities={quantities}
        />
      </div>

      {/* Thanh toán và các tùy chọn khác */}
      <div className='bg-white p-6 rounded-lg shadow flex flex-col sm:flex-row items-center justify-between'>
        <button
          onClick={handleRemoveAll}
          className='whitespace-nowrap font-normal bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-150'
        >
          Xoá Tất Cả
        </button>
        {/* Tổng thanh toán */}
        <div className='flex items-center w-full justify-end'>
          <h2 className='text-base mr-4'>Tổng thanh toán:</h2>
          <span className='text-xl text-red-500 font-semibold mr-6'>{cart?.length} Sản phẩm</span>
          <span className='text-xl text-red-500 font-semibold mr-6'>
            {displayINRCurrency(total)}
          </span>
          <button onClick={handlePayment} className='font-normal bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-150'>
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  )
}

export default PageCart
