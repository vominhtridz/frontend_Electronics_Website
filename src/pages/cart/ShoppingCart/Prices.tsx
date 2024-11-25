import { ChangeEvent, FC } from "react"
import displayINRCurrency from "../../../helpers/displayCurrency"
interface PricesTypes {
  number: number
  handleDecement: () => void
  ChangeNumber: (e: ChangeEvent<HTMLInputElement>) => void
  handleIncrement: () => void
  price: number
}
const Prices: FC<PricesTypes> = ({
  number,
  price,
  handleDecement,
  ChangeNumber,
  handleIncrement,
}) => {
  return (
    <div className='flex items-center'>
      <div className='flex items-center px-8'>
        <label className='px-3 line-through'>{displayINRCurrency(price)}</label>
        <label className='px-3'>{displayINRCurrency(price)}</label>
      </div>
      <nav className='flex items-center h-8 pl-16 '>
        <div className='flex items-center'>
          {/* <button
            onClick={handleDecement}
            className='px-4 py-2 bg-red-500 font-bold text-white rounded hover:bg-red-600'
          >
            -
          </button> */}
          <input
            type='number'
            value={number }
            onChange={ChangeNumber}
            readOnly
            className='w-14 mx-1.5 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            min={1}
          />
          {/* <button
            onClick={handleIncrement}
            className='px-4 py-2 font-bold bg-green-500 text-white rounded hover:bg-green-600'
          >
            +
          </button> */}
        </div>
      </nav>
    </div>
  )
}

export default Prices
