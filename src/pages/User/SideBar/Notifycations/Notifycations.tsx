
import ItemsOfNotifycations from "./ItemsOfNotifycations"
import { Link } from "react-router-dom"

export const Notifycations = ({ setvisibleItems, visibleItems }: any) => {
  const handleShow = () => setvisibleItems("notification")
  return (
    <div className=' py-2'>
      <Link
        to={`/user/Notifications`}
        className='flex items-center'
        onClick={handleShow}
      >
        <p className='text-[17.5px] mr-3 text-green-500 rounded-full'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 20 20'>
            <path
              fill='currentColor'
              d='M4 8a6 6 0 0 1 4.03-5.67a2 2 0 1 1 3.95 0A6 6 0 0 1 16 8v6l3 2v1H1v-1l3-2zm8 10a2 2 0 1 1-4 0z'
            />
          </svg>
        </p>
        <p className='text-[14px] text-black block hover:text-green-600 leading-4'>Thông báo</p>
      </Link>
      {visibleItems == "notification" ? <ItemsOfNotifycations /> : ""}
    </div>
  )
}
export default Notifycations
