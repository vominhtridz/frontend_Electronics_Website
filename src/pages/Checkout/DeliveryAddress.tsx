import axios from "axios"
import { LocationIcon } from "../../common/svgImage"
import {AddressType} from '..//..//typescript/customerType'
import { FormEvent, useEffect, useState } from "react"
import SummaryApi from "../../common"
import Cookies from "js-cookie"
import { Link } from "react-router-dom"
import UpdateAddressBox from "../../components/AddressBox/AddShopAddress"
import { useDispatch } from "react-redux"
import { setLoading } from "../../store/PageSlice"
import { toast } from "react-toastify"

const DeliveryAddress = ({ setProvince,fetchUserAddress, Province, UserAddr }: any) => {
  const [showAdres, setShowAdres] = useState<boolean>(false)
  const [Ward, setWard] = useState<string>("")
  const [district, setDistrict] = useState<string>("")
  const [Name, setName] = useState<string>("")
  const [Postal_code, setPostal_code] = useState<string>("")
  const [detailAdress, setDetailAdress] = useState<string>("")
  const [Phonenumber, setPhonenumber] = useState<string>()
  const [showAdresBoxItem, setShowAdresBoxItem] = useState<boolean>(false)
  const [numberErr, setNumberErr] = useState<boolean>(false)
  const [nameErr, setNameErr] = useState<boolean>(false)
  const [AddressErr, setAddressErr] = useState<boolean>(false)
  const [Default, setDefault] = useState<boolean>(false)
  const dispatch = useDispatch()
  const userid = Cookies.get("id")
  const token = Cookies.get("token")

  const handleUpdateAddr = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // check PhoneNumber, address , name is corrected?
    if (!validateShopAddress()) return
    const DataAddr = {
      postal_code: Postal_code,
      name: Name,
      detail_address: detailAdress,
      phonenumber: Phonenumber,
      city_address: `${Province}/${district}/${Ward}`,
      default: Default ? 1 : 0,
      customer_id: userid,
    }
    dispatch(setLoading(true))
    try {
      const response = await axios.post(
        SummaryApi.edit_address.url + "/" + UserAddr?.id,
        DataAddr,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.status === 200) {
        toast.success(response.data.cuccess)
        fetchUserAddress()
        dispatch(setLoading(false))
        //clear state
        handleCancelAdresBox()
      }
    } catch (error: any) {
      dispatch(setLoading(false))
      console.log(error)
      if (error.response) {
        toast.error(error.response?.data.error || error.response?.data?.error || "Lưu thất bại")
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("server không phản hồi.")
      } else {
        // Something else happened
        toast.error("có lỗi xảy ra.")
      }
    }
  }
  const handleShowUpdate = () => {
    const address = UserAddr?.city_address?.split("/") as string[]
    setName(UserAddr?.name as string)
    setDefault(UserAddr?.default as boolean)
    setPhonenumber(UserAddr?.phonenumber as string)
    setDetailAdress(UserAddr?.detail_address as string)
    setDistrict(address[1])
    setProvince(address[0])
    setPostal_code(UserAddr?.postal_code as string)
    setWard(address[2])
    setShowAdres(true)
  }
  const handleCancelAdresBox = () => {
    Cookies.remove("address_id")
    setShowAdres(false)
    setWard("")
    setProvince("")
    setDistrict("")
    setName("")
    setDetailAdress("")
    setPhonenumber("")
    setShowAdresBoxItem(false)
    setNumberErr(false)
    setNameErr(false)
    setAddressErr(false)
    setShowAdres(false)
    setPostal_code("")
  }
  const validateShopAddress = () => {
    if (!Phonenumber) {
      setNumberErr(true)
      return false
    }
    if (!Ward && !Province && !district && !AddressErr && !numberErr && !nameErr) {
      setNumberErr(true)
      setNameErr(true)
      setAddressErr(true)
      return false
    } else if (!Ward && !Province && !district && AddressErr && numberErr && nameErr) {
      setNumberErr(true)
      setNameErr(true)
      setAddressErr(true)
      return false
    }
    setNumberErr(false)
    setNameErr(false)
    setAddressErr(false)
    return true
  }

  return (
    <div className='rounded-sm shadow text-[14px] p-4 bg-white'>
      <h2 className='flex text-lg  items-center py-2 text-green-500'>
        <p className='px-2 text-2xl  text-green-500'>{LocationIcon}</p>
        <p className=''>Địa Chỉ Nhận Hàng</p>
      </h2>

      {UserAddr ? (
        <nav className='flex items-center'>
          <h2 className='px-2  text-[13px]'>{UserAddr?.name}</h2>
          <p className='px-1  text-[13px]'>(+84) {UserAddr?.phonenumber}</p>
          <address className='text-[13px] pl-6 pr-2 pt-1'>{UserAddr?.detail_address}</address>
          <label
            htmlFor='Mặc định'
            className='px-2 border-green-500 border text-green-600 text-[12px]'
          >
            Mặc định
          </label>
          <button
            onClick={handleShowUpdate}
            className='bg-red-500 ml-4 hover:bg-red-600 text-white font-semibold py-1.5 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105'
          >
            Thay đổi
          </button>
        </nav>
      ) : (
        <div className='flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md'>
          <h2 className='text-gray-700 font-semibold'>Chưa có địa chỉ, vui lòng cập nhật.</h2>
          <Link
            to='/user/account/address'
            className='ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300'
          >
            Cập nhật ngay
          </Link>
        </div>
      )}
      {showAdres && (
        <UpdateAddressBox
          Postal_code={Postal_code}
          setPostal_code={setPostal_code}
          handleUpdate={handleUpdateAddr}
          Default={Default}
          setDefault={setDefault}
          Province={Province}
          Ward={Ward}
          district={district}
          detailAdress={detailAdress}
          showAdresBoxItem={showAdresBoxItem}
          setShowAdresBoxItem={setShowAdresBoxItem}
          numberErr={numberErr}
          nameErr={nameErr}
          Name={Name}
          setName={setName}
          handleSave={handleUpdateAddr}
          phonenumber={Phonenumber}
          AddressErr={AddressErr}
          setWard={setWard}
          setProvince={setProvince}
          setDistrict={setDistrict}
          setDetailAdress={setDetailAdress}
          setPhonenumber={setPhonenumber}
          handleCancel={handleCancelAdresBox}
        />
      )}
    </div>
  )
}

export default DeliveryAddress
