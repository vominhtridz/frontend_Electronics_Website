import { useState } from "react"
import React from 'react';
interface QuanlityType {
  handleDecrement: () => void
  handleIncrement: () => void
  ChangeNumber: (e: React.ChangeEvent<HTMLInputElement>) => void
  quantity: number
  number:number
}
const Quality = ({
  handleDecrement,
  handleIncrement,
  ChangeNumber,
  quantity,
  number,
}: QuanlityType) => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className='flex items-center my-2 text-[14px] leading-5'>
      <p className='pr-2'>Số lượng</p>
      <nav className='flex items-center h-8 pl-9'>
        <div className='flex items-center gap-4'>
          {/* Nút giảm số lượng */}
          <button
            onClick={handleDecrement}
            className='px-4 py-2 bg-red-500 font-bold text-white rounded hover:bg-red-600'
          >
            -
          </button>
          {/* Ô nhập số lượng */}
          <input
            type='number'
            value={number}
            onChange={ChangeNumber}
            className='w-16 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            min='1'
          />
          <button
            onClick={handleIncrement}
            className='px-4 py-2 font-bold bg-green-500 text-white rounded hover:bg-green-600'
          >
            +
          </button>
        </div>
      </nav>
      <p className='text-black px-6'>{quantity} sản phẩm có sẵn</p>
    </div>
  )
}
export default Quality
