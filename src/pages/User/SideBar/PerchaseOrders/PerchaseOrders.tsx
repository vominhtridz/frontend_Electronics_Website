import { Link } from "react-router-dom"


export const PerchaseOrders = ({ setvisibleItems, visibleItems }: any) => {
 const handleShow = () => setvisibleItems("orders")
  return (
    <div className='py-2'>
      <Link to='/user/orders' className='flex items-center' onClick={handleShow} >
        <p className='text-[17.5px] mr-3 text-green-500 rounded-full'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 48 48'>
            <g fill='none' strokeLinejoin='round' strokeWidth='4'>
              <rect width='30' height='36' x='9' y='8' fill='#2f88ff' stroke='#000' rx='2' />
              <path stroke='#000' strokeLinecap='round' d='M18 4V10' />
              <path stroke='#000' strokeLinecap='round' d='M30 4V10' />
              <path stroke='#fff' strokeLinecap='round' d='M16 19L32 19' />
              <path stroke='#fff' strokeLinecap='round' d='M16 27L28 27' />
              <path stroke='#fff' strokeLinecap='round' d='M16 35H24' />
            </g>
          </svg>
        </p>
        <p className='text-[14px] text-black block hover:text-green-600 leading-4'>Đơn Hàng của bạn</p>
      </Link>
    </div>
  )
}
export default PerchaseOrders
