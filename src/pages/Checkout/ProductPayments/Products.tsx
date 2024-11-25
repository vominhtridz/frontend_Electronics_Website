import { useSelector } from "react-redux"
import img from "..//..//..//assest/sampleImage.jpg"
import { CartType } from "../../../typescript/CartType"
import { server } from "../../../common/path"
import displayINRCurrency from "../../../helpers/displayCurrency"
import { Link } from "react-router-dom"
const Products = () => {
  const cart = useSelector((state: any) => state?.cart?.cart)
  return (
    <div>
      {
        cart?.map((item: CartType) => {
          return (
            <div className='flex py-4 items-center justify-between text-[13px]' key={item?.products?.name}>
              <div className='flex items-center min-w-[400px] max-w-[400px]'>
                <img src={server + item?.products?.image} className='w-16 h-14' alt='' />
                <div className='px-6'>
                  <Link
                    to={`/product/${item?.products.id}`}
                    className='block   hover:underline hover:text-blue-500 text-lg  py-1.5 leading-5'
                  >
                    {item?.products?.name}
                  </Link>
                  <label className='border rounded-sm px-1  text-[10px] border-red-500 text-red-600'>
                    Đổi ý miễn phí 15 ngày
                  </label>
                </div>
              </div>
              <div className=' text-base pl-4 text-slate-700'>Màu: {item?.products?.color}</div>
              
                <p className='pl-[7.5rem] pr-14 text-black'>{displayINRCurrency(item?.products?.price)} VNĐ</p>
                <p className='px-16'>{item?.quantity}</p>
                <p className='px-16'>{displayINRCurrency(item?.products?.price * item?.quantity)} VNĐ</p>
              
            </div>
          )
        })
      }
    </div>
  )
}

export default Products
