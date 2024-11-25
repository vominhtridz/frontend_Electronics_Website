import { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import viettel from "..//assest/giaohangviettel.jpg"
import nhanh from '..//assest/giaohangnhanh.png'
import tietkiem from "..//assest/giaohangtietkiem.png"
import viettelpay from "..//assest/viettelpay.png"
import momo from "..//assest/momoicon.png"
import { useDispatch } from "react-redux"
import SummaryApi from "../common"
import axios from "axios"
import { setLoading } from "../store/PageSlice"
import { SettingType } from "../typescript/HomeType"
const Footer: FC = () => {
  const dispatch = useDispatch()
  const [settings, setSettings] = useState<SettingType| any>(null)
 

    const fetchSettings = async () => {
      dispatch(setLoading(true))

      try {
        const dataResponse = await axios.get(SummaryApi.get_settings.url, {
          headers: {
            accept: "application/json",
          },
        })
        if (dataResponse.status === 200) {
          dispatch(setLoading(false))

          const settings = dataResponse?.data?.data[0]
          setSettings(settings)
        }
      } catch (error) {
        dispatch(setLoading(false))

        console.error("Error fetching user details:", error)
      }
  }
  console.log(settings)
  useEffect(() => {
    fetchSettings()
  }, [])
  return (
    <footer className='bg-gray-900 text-white py-12'>
      <div className='container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* Phần Địa chỉ liên hệ */}
        <div>
          <h2 className='text-xl font-semibold mb-6'>Thông tin liên hệ</h2>
          <ul className='space-y-2'>
            <li>{settings?.web_name}</li>
            <li>Địa chỉ: {settings?.address}</li>
            <li>
              Email:
              <a href='mailto:' className='hover:text-gray-300'>
                {settings?.email}
              </a>
            </li>
            <li>
              Điện thoại:
              <a href='tel:0379948336' className='hover:text-gray-300'>
                0379948336
              </a>
            </li>
          </ul>
        </div>

        {/* Phần Liên kết nhanh */}
        <div>
          <h2 className='text-xl font-semibold mb-6'>Liên kết nhanh</h2>
          <ul className='space-y-2'>
            <li>
              <Link to='/' className='hover:text-gray-300'>
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link to='/' className='hover:text-gray-300'>
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to='/' className='hover:text-gray-300'>
                Điều khoản dịch vụ
              </Link>
            </li>
            <li>
              <Link to='/' className='hover:text-gray-300'>
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Phần Phương thức thanh toán & vận chuyển */}
        <div>
          <h2 className='text-xl font-semibold mb-6'>Phương thức thanh toán</h2>
          <div className='flex items-center space-x-4 mb-8'>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png'
              alt='Visa'
              className='w-12 h-8'
            />
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png'
              alt='MasterCard'
              className='w-12 h-8'
            />
            <img src={momo} alt='Momo' className='w-12 h-8' />
            <img src={viettelpay} alt='Vietcombank' className='w-12 h-8' />
          </div>

          <h2 className='text-xl font-semibold mb-6'>Phương thức vận chuyển</h2>
          <div className='flex items-center space-x-4'>
            <img src={viettel} alt='Giao hàng nhanh' className='w-12 h-8' />
            <img src={nhanh} alt='Giao hàng tiết kiệm' className='w-12 h-8' />
            <img src={tietkiem} alt='Viettel Post' className='w-12 h-8' />
          </div>
        </div>
      </div>

      {/* Phần cuối cùng */}
      <div className='text-center mt-10 border-t border-gray-700 pt-6'>
        <p>&copy; 2024 Shop ABC. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer
