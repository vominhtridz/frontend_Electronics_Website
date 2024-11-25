
import { useSelector } from "react-redux"
import Products from "./Products"

const manageProductPayments = ["Đơn Giá ", "Số Lượng", "Thành Tiền"]
const ProductPayments = () => {
  

  const getProductPayments = () =>
    manageProductPayments.map((item, index) => {
      return (
        <div className='px-16  text-[15px] text-slate-400 ' key={item + index}>
          {item}
        </div>
      )
    })
  return (
    <div className='my-4 shadow rounded-sm text-[13px] w-full bg-white px-4 py-8'>
      <div className='flex pb-4 justify-between w-full'>
        <h2 className='text-xl'>Sản phẩm</h2>
        <div className='flex text-sm items-center'>{getProductPayments()}</div>
      </div>
      
      <Products />
    </div>
  )
}

export default ProductPayments
