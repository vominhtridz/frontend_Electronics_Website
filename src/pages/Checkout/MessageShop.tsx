import { useState } from "react"
import { FiTruck } from "react-icons/fi"
import { FaChevronDown } from "react-icons/fa"
import { useSelector } from "react-redux"
import { CartType } from "../../typescript/CartType"
import displayINRCurrency from "../../helpers/displayCurrency"

const MessageShop = ({
  setMessage,
message,
delivered_date,
delivery_type,
setDelivery_type}:any) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const cart = useSelector((state: any) => state?.cart?.cart)
 const total = cart?.reduce(
   (sum:any, item: CartType) => sum + Number(item?.products?.price) * item?.quantity,
   0, // Giá trị khởi tạo
  )
  const Date = delivered_date.toLocaleDateString("vi-VN").split('/') ;
  const carriers = ["Nhanh", "Tiết kiệm", "Hỏa tốc", "Giao hàng 4H", "Viettel Post", "GHN Express"]

  const handleSelectCarrier = (carrier:string) => {
    setDelivery_type(carrier)
    setShowDropdown(false)
  }
  const handleMessage = (message: string) => {
    setMessage(message)
  }
  return (
    <div className='shadow rounded-md bg-blue-50 p-6'>
      {/* Lời nhắn */}
      <div className='flex items-center border-b border-slate-300 pb-6 w-full'>
        <nav className='flex items-center border-r border-slate-300 pr-4'>
          <div className='px-2 font-medium text-gray-600'>Lời nhắn:</div>
          <input
            required
            onChange={e => handleMessage(e.target.value)}
            value={message}
            type='text'
            placeholder='Lưu ý cho người bán...'
            className='outline-none px-4 py-2.5 w-[26rem] rounded-sm text-[15px] bg-white border border-slate-200 focus:border-blue-400'
          />
        </nav>
        {/* Đơn vị vận chuyển */}
        <div className='ml-auto'>
          <div className='relative flex items-center'>
            <p className='pl-4 pr-6 text-sm font-medium text-gray-600'>Đơn vị vận chuyển:</p>
            <div className='relative'>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className='flex items-center bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
              >
                <FiTruck className='mr-2' />
                {delivery_type}
                <FaChevronDown className='ml-2' />
              </button>
              {showDropdown && (
                <div className='absolute top-12 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-48 z-10'>
                  {carriers.map(carrier => (
                    <button
                      key={carrier}
                      onClick={() => handleSelectCarrier(carrier)}
                      className='w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700'
                    >
                      {carrier}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className='text-green-500 flex tracking-wide items-center text-sm mt-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1.25em'
              height='1em'
              viewBox='0 0 640 512'
              fill='currentColor'
              className='mr-2'
            >
              <path d='M112 0C85.5 0 64 21.5 64 48v48H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H48c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16 7.2-16 16s7.2 16 16 16h192c8.8 0 16 7.2 16 16s-7.2 16-16 16H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48zm432 237.3V256H416v-96h50.7zM160 368a48 48 0 1 1 0 96a48 48 0 1 1 0-96m272 48a48 48 0 1 1 96 0a48 48 0 1 1-96 0' />
            </svg>
            Nhận hàng vào ngày {Date[0]} tháng {Date[1]} Năm {Date[2]}
          </div>
        </div>
      </div>
      {/* Tổng số tiền */}
      <div className='py-4 flex items-center justify-end w-full'>
        <p className='text-sm text-black'>Tổng số tiền ({cart?.length} sản phẩm):</p>
        <p className='px-6 text-xl font-bold text-red-500'>{displayINRCurrency(total)} VNĐ</p>
      </div>
    </div>
  )
}

export default MessageShop
