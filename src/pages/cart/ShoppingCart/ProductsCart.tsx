import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react"
import Prices from "./Prices"
import CategoryRow from "./CategoryRow"
import { Link } from "react-router-dom"
import {  useSelector } from "react-redux"
import { ContextType } from "../../../typescript/ContextType"
import Context from "../../../context"
import { CartType } from "../../../typescript/CartType"
import displayINRCurrency from "../../../helpers/displayCurrency"
import { server } from "../../../common/path"
import { toast } from "react-toastify"

interface ProductsCartType {
  handleRemove: (id: number) => void
  quantities: any
  setQuantities:any
}

const ProductsCart = ({ handleRemove,setQuantities,quantities }: ProductsCartType) => {
  const { fetchUserAddToCart } = useContext<ContextType>(Context)

  const cart = useSelector((state: any) => state?.cart?.cart)
  const [visible, setVisible] = useState<boolean>(false)
 const handleShowClasify = () => setVisible(!visible)


  const handleIncrement = (productId: number, quantity: number) => {
    if (quantity <= quantities[productId]) {
      toast.error('Sản Phẩm chỉ còn ' + quantity +'Cái')
      return
    }
    setQuantities((prev: any) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }))
  }

  const handleDecrement = (productId: number) => {
    setQuantities((prev:any) => ({
      ...prev,
      [productId]: Math.max(prev[productId] - 1, 1),
    }))
  }

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>, productId: number,quantity:number) => {
    const value = Number(event.target.value)
    if (value >= 1) {
      setQuantities((prev:any) => ({
        ...prev,
        [productId]: value,
      }))
    }
  }

  return (
    <div className='bg-white p-4 border border-gray-50 my-2 shadow'>
      {cart?.length > 0 ? (
        cart?.map((item: CartType) => (
          <div key={item.product_id} className='flex items-center justify-between rounded-lg py-4'>
            {/* Product Image and Details */}
            <div className='flex items-center flex-grow'>
              <img
                src={server + item.products.image}
                alt='Product'
                className='w-26 h-24 object-cover rounded-md mr-4'
              />
              <div className='flex flex-col'>
                <Link
                  to={`/product/${item.product_id}`}
                  className='text-lg leading-5 text-gray-700 tracking-normal font-semibold hover:underline hover:text-blue-600'
                >
                  {item.products?.name}
                </Link>
                <div className='flex items-center'>
                  <button className='px-4 py-2 ml-1  whitespace-nowrap rounded-md'>
                    Màu: {item?.products?.color}
                  </button>
                </div>
              </div>
            </div>

            {/* Quantity Control */}
            <div className='flex items-center mr-36'>
              <Prices
                price={item?.price}
                handleDecement={() => handleDecrement(item.product_id)}
                ChangeNumber={e => handleChangeQuantity(e, item.product_id, item.products.quantity)}
                handleIncrement={() => handleIncrement(item.product_id, item.products.quantity)}
                number={quantities[item.product_id]}
              />
            </div>

            {/* Price Display */}
            <div className='text-base whitespace-nowrap font-semibold text-red-500 w-[10rem]'>
              {displayINRCurrency(item.total_price)} VNĐ
            </div>

            {/* Delete Button */}
            <div className='px-8'>
              <button
                onClick={() => handleRemove(item.id)}
                className='text-white bg-red-500 hover:bg-red-600 rounded-lg px-4 py-2 transition-all duration-150'
              >
                Xoá
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className='flex flex-col items-center justify-center my-10 p-6 rounded-lg  max-w-md mx-auto'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
            Giỏ hàng của bạn đang trống!
          </h2>
          <p className='text-gray-600 mb-6'>Hãy tìm một sản phẩm ưng ý và thêm vào giỏ hàng nhé.</p>
          <Link
            to='/'
            className='px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow transition'
          >
            Khám phá sản phẩm
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProductsCart
