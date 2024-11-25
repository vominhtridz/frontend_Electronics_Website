
import { useDispatch } from "react-redux"
import Classify from "./Classify"
import DiscountCode from "./DiscountCode"
import Quality from "./Quality"
import ReturnPolicy from "./ReturnPolicy"
import Transport from "./Transport"
import {  useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleBuyOrAddCart } from "../../../../../components/BuyOrAddCart"
import { ContextType } from "../../../../../typescript/ContextType"
import Context from "../../../../../context"
const NecessaryInfor = ({ ...items }) => {
  const [number, setNumber] = useState<number>(1)
  const { fetchUserAddToCart } = useContext<ContextType>(Context);
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const handleDecrement = () => {
      if (number > 1) {
        setNumber(prev => prev - 1)
      }
    }
    const ChangeNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value)
      if (value >= 1) {
        setNumber(value)
      }
    }
    const handleIncrement = () => {
      if (items.quantity == number) { 
        return
      }
      setNumber(prev => prev + 1)
    }
 
  
  return (
    <section className='px-6 py-2 w-full'>
      <DiscountCode />
      <ReturnPolicy />
      <Transport />
      <Classify {...items} />
      <Quality
        number={number}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        ChangeNumber={ChangeNumber}
        quantity={items?.quantity}
      />
      <div className='flex space-x-4 my-4 justify-between'>
        <button
          onClick={() =>
            handleBuyOrAddCart(false, {
              dispatch,
              
              product_id: items.id,
              quantity: number,
              price: items.price,
              total_price: parseInt(items.price) * number + 5000,
              fetchUserAddToCart,
            })
          }
          className='bg-green-500 text-sm leading-4 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300'
        >
          Thêm vào giỏ hàng
        </button>
        <button
          onClick={() =>
            handleBuyOrAddCart(true, {
              dispatch,
              navigate,
              product_id: items.id,
              quantity: number,
              price: items.price,
              total_price: parseInt(items.price) * number + 5000,
              fetchUserAddToCart,
            })
          }
          className='bg-orange-500 w-full text-base hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-300'
        >
          Mua
        </button>
      </div>
      <div className='border-b w-full border-slate-200'></div>
    </section>
  )
}
export default NecessaryInfor
