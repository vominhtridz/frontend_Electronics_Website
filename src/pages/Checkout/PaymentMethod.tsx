import { useState } from "react"
import { useSelector } from "react-redux"
import { CartType } from "../../typescript/CartType"
import displayINRCurrency from "../../helpers/displayCurrency"

const PaymentMethod = ({ handlePayment, setPayment_method,
  floatTotal,
total_amount,
shipfeeTotal,
  tax,
Shipfees,
Payment_method}:any) => {
  // State quản lý phương thức thanh toán
  const cart = useSelector((state: any) => state?.cart?.cart)
  const total =cart
      ?.reduce(
        (sum: any, item: CartType) => sum + Number(item?.products?.price) * item?.quantity,
        0, // Giá trị khởi tạo
      )
 
  const handleSeenRules = () => {
    alert("Bạn đang xem Điều khoản Sango")
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPayment_method(event.target.value)
  }

  return (
    <div className='bg-white p-6 rounded-lg text-[14px] mt-6 shadow-lg'>
      {/* Phương thức thanh toán */}
      <div className='flex items-center border-b border-gray-300 py-4 justify-between w-full'>
        <h2 className='text-lg font-semibold'>Phương thức thanh toán</h2>
        <div>
          <label htmlFor='payment-method' className='px-2 text-gray-700 font-medium'>
            Phương thức thanh toán :
          </label>
          <select
            id='payment-method'
            className='payment-select py-1.5 px-2 border-gray-500 border'
            value={Payment_method}
            onChange={handleChange}
          >
            <option value='cod'>Thanh toán khi nhận hàng</option>
            <option value='bank'>Thanh toán bằng ngân hàng</option>
          </select>

          <div className='flex pt-2 items-center'>
            <div className='px-2  font-medium text-gray-700'>Bạn đã chọn :</div>
            {Payment_method === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán bằng ngân hàng"}
          </div>
        </div>
      </div>

      {/* Tóm tắt đơn hàng */}
      <div className='flex flex-col py-4 px-4 items-end border-b border-gray-200'>
        <nav className='text-gray-500 w-[250px] py-2 flex justify-between items-center'>
          <div className="whitespace-nowrap">Tổng tiền hàng</div>
          <label className='px-4'>{displayINRCurrency(total)} VNĐ</label>
        </nav>
        <nav className='text-gray-500 w-[250px] py-2 flex justify-between items-center'>
          <div>Phí vận chuyển</div>
          <label className='px-4'>{displayINRCurrency(Shipfees?.shipping_fee)} VNĐ</label>
        </nav>
        <nav className='text-gray-500 w-[250px] py-2 flex justify-between items-center'>
          <div className="whitespace-nowrap">Thuế VAT</div>
          <label className='px-4'>
            {displayINRCurrency(floatTotal * (Number(tax?.tax_rate) / 100))} VNĐ
          </label>
        </nav>
        <nav className='text-gray-500 w-[250px] py-2 flex justify-between items-center'>
          <div className="whitespace-nowrap">Tổng thanh toán</div>
          <label className='px-4 text-lg whitespace-nowrap font-semibold text-red-500'> {displayINRCurrency(total_amount)} VNĐ</label>
        </nav>
      </div>

      {/* Điều khoản và nút đặt hàng */}
      <div className='flex items-center justify-between py-6'>
        <nav className='flex items-center'>
          <div>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo</div>
          <button className='px-2 text-blue-600 hover:underline' onClick={handleSeenRules}>
            Điều khoản Sango
          </button>
        </nav>
        <button
          onClick={handlePayment}
          className='bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition shadow-lg'
        >
          Đặt Hàng
        </button>
      </div>
    </div>
  )
}

export default PaymentMethod
