import { useEffect, useState } from "react"
import FreeShip from "../../../../../assest/sampleImage.jpg"
import axios from "axios"
import Cookies from "js-cookie"
import SummaryApi from "../../../../../common"
import { AddressType } from "../../../../../typescript/customerType"
import { Link } from "react-router-dom"
const Transport = () => {
  const [UserAddr, setUserAddr] = useState<AddressType>()
  const token = Cookies.get("token");
  const userid = Cookies.get("id")
  const fetchUserAddress = async () => {
    try {
      const dataResponse = await axios.get(SummaryApi.get_address.url + "/" + userid, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (dataResponse.status === 200) {
        const address =
          dataResponse?.data?.data.find((data: AddressType) => data?.default == true) ||
          dataResponse?.data?.data[0] ;
        setUserAddr(address)
      }
    } catch (error) {
      console.error("Error fetching user details:", error)
    }
  }
  useEffect(() => {
    fetchUserAddress()
  }, [])

  return (
    <div className='flex  my-2 text-[14px] leading-5'>
      <p className='pr-2'>Vận Chuyển</p>
      <section className='text-sm'>
        <nav className='flex items-center  pr-2 pl-7'>
          <img src={FreeShip} alt='' className='w-6 h-6' />
          <p className='px-2'>Miễn phí vận chuyển đơn hàng trên 300k</p>
        </nav>
        <nav className='flex items-center text-[13px] py-1 pr-2 pl-5'>
          <div className='text-xl px-2 text-slate-600'>
            {
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 36 36'>
                <path
                  fill='currentColor'
                  d='M26.87 14.28a22.36 22.36 0 0 0-7.22-7.38a9.64 9.64 0 0 0-9-.7a8.6 8.6 0 0 0-4.82 6.4c-.08.49-.15 1-.21 1.4h-1A2.59 2.59 0 0 0 2 16.59v8.55a.86.86 0 0 0 .86.86h1.73v-.39a5.77 5.77 0 0 1 7.71-5.45l-1 1a4.56 4.56 0 0 0-4.34 1.58a3 3 0 0 0-.63.93A4.5 4.5 0 1 0 14.82 26h5.48v-.39a5.77 5.77 0 0 1 7.7-5.45l-1 1a4.56 4.56 0 0 0-4.34 1.58a3 3 0 0 0-.63.93a4.5 4.5 0 1 0 8.5 2.33h2.61a.86.86 0 0 0 .86-.86v-1.78a9.39 9.39 0 0 0-7.13-9.08M12 14H8c0-.35.1-.71.16-1.07a6.52 6.52 0 0 1 3.87-5Zm-1.64 14.36a2.5 2.5 0 1 1 2.5-2.5a2.5 2.5 0 0 1-2.5 2.5M19 19h-3v-2h3Zm-6-5V7.47a8.16 8.16 0 0 1 5.4 1.15A19.15 19.15 0 0 1 24 14Zm13.06 14.36a2.5 2.5 0 1 1 2.5-2.5a2.5 2.5 0 0 1-2.5 2.5'
                  className='clr-i-solid clr-i-solid-path-1'
                />
                <path fill='none' d='M0 0h36v36H0z' />
              </svg>
            }
          </div>
          {UserAddr && userid ? (
            <div>
              <div className='px-2 text-slate-500'>
                <p>Vận Chuyển Tới</p>
                <p>Phí Vận Chuyển</p>
              </div>
              <div className='text-black'>
                <div className='flex items-center'>
                  {UserAddr?.detail_address}
                  <div className='px-1'>
                    {
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <g fill='none' fillRule='evenodd'>
                          <path d='M24 0v24H0V0z' />
                          <path
                            fill='currentColor'
                            d='M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z'
                          />
                        </g>
                      </svg>
                    }
                  </div>
                </div>
                <div className='flex items-center hover:text-green-500'>
                  0 - 32.400 VNĐ
                  <div className='px-1'>
                    {
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='1em'
                        height='1em'
                        viewBox='0 0 24 24'
                      >
                        <g fill='none' fillRule='evenodd'>
                          <path d='M24 0v24H0V0z' />
                          <path
                            fill='currentColor'
                            d='M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z'
                          />
                        </g>
                      </svg>
                    }
                  </div>
                </div>
              </div>
            </div>
          ) : userid ? (
            <Link
              to={`/user/account/address`}
              className='inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300'
            >
              Thêm Địa Chỉ
            </Link>
          ) : (
            <Link
              to={`/login`}
              className='inline-block px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300'
            >
              Đăng Nhập
            </Link>
          )}
        </nav>
      </section>
    </div>
  )
}
export default Transport
