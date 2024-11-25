import { Link } from "react-router-dom"
import ItemsOfAccount from "./ItemsOfAccount"

export const AccountOfMine = ({ setvisibleItems, visibleItems }: any) => {
  const handleShow = () => setvisibleItems("account")
  return (
    <div className='py-2'>
      <Link
        to={`/user/account/profile`}
        onClick={handleShow}
        className='text-[14px] flex items-center whitespace-nowrap text-black hover:text-green-600 leading-4'
      >
        <p className='text-2xl mr-1.5 text-blue-500 rounded-full'>
          {
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                fillOpacity='0.25'
                d='M3 11c0-3.771 0-5.657 1.172-6.828S7.229 3 11 3h2c3.771 0 5.657 0 6.828 1.172S21 7.229 21 11v2c0 3.771 0 5.657-1.172 6.828S16.771 21 13 21h-2c-3.771 0-5.657 0-6.828-1.172S3 16.771 3 13z'
              />
              <circle cx='12' cy='10' r='4' fill='currentColor' />
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M18.946 20.253a.23.23 0 0 1-.14.25C17.605 21 15.836 21 13 21h-2c-2.835 0-4.605 0-5.806-.498a.23.23 0 0 1-.14-.249C5.483 17.292 8.429 15 12 15s6.517 2.292 6.946 5.253'
                clipRule='evenodd'
              />
            </svg>
          }
        </p>
        Tài khoản của tôi
      </Link>
      {visibleItems == "account" ? <ItemsOfAccount /> : ""}
    </div>
  )
}
export default AccountOfMine
