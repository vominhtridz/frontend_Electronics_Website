
import Cookies from "js-cookie"
import UpdateAddressBox from "../../../../../components/AddressBox/AddShopAddress"
import ShowAdress from "./ShowAddress/ShowAddress"
import { FormEvent, useEffect, useState } from "react"
import axios from "axios"
import SummaryApi from "../../../../../common"
import { useDispatch } from "react-redux"
import { setLoading } from "../../../../../store/PageSlice"
import { toast } from "react-toastify"
import { AddressType } from "../../../../../typescript/customerType"

export const PageAddress = () => {
  const [Ward, setWard] = useState<string>("")
  const dispatch = useDispatch();
  const [Province, setProvince] = useState<string>("")
  const [UserAddr, setUserAddr] = useState<any[]>([])
  const [district, setDistrict] = useState<string>("")
  const [Name, setName] = useState<string>("")
  const [Postal_code, setPostal_code] = useState<string>("")
  const [detailAdress, setDetailAdress] = useState<string>("")
  const [Phonenumber, setPhonenumber] = useState<string>()
  const [showAdresBoxItem, setShowAdresBoxItem] = useState<boolean>(false)
  const [numberErr, setNumberErr] = useState<boolean>(false)
  const [nameErr, setNameErr] = useState<boolean>(false)
  const [AddressErr, setAddressErr] = useState<boolean>(false)
  const [showAdres, setShowAdres] = useState<boolean>(false)
  const [Default, setDefault] = useState<boolean>(false)
  const userid = Cookies.get('id')
  const token = Cookies.get("token")
  const fetchUserAddress = async () => {
      dispatch(setLoading(true))

    try {
      const dataResponse = await axios.get(SummaryApi.get_address.url + "/" + userid, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (dataResponse.status === 200) {
      dispatch(setLoading(false))

        const address = dataResponse?.data?.data
        setUserAddr(address)
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.error("Error fetching user details:", error)
    }
  }

  const handleRemove = async (address_id: number) => {
    dispatch(setLoading(true))
    try {
      const dataResponse = await axios.delete(SummaryApi.remove_address.url + "/" + address_id, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (dataResponse.status === 200) {
        dispatch(setLoading(false))
        Cookies.remove("address_id")
        fetchUserAddress()
        toast.success("Xoá Địa Chỉ Thành Công")
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.error("Error fetching user details:", error)
    }
  }
  useEffect(() => {
    fetchUserAddress()
  }, [])
  // --------------------------- HANDLE SAVE ADDRESS TO DATABASE--------------------
  async function handleSave(e: FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation()
    // check PhoneNumber, address , name is corrected?
    if (!validateShopAddress()) return
   const DataAddr = {
     postal_code: Postal_code,
     name: Name,
     detail_address: detailAdress,
     phonenumber: Phonenumber,
     city_address: `${Province}/${district}/${Ward}`,
     default: Default? 1: 0,
     customer_id: userid,
    }
    dispatch(setLoading(true))
    try {
      const response = await axios.post(SummaryApi.add_address.url, DataAddr, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 201) {
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
  // --------------------------HANDLE REMOVE AND UPDATE USER ADDRESS-----------------------
  const ShowUpdateBox = (address_id: number) => {
    Cookies.set('address_id', JSON.stringify(address_id));
    const user = UserAddr.find((user) => user.id === address_id);
    const address = user?.city_address.split("/")
    setName(user?.name )
    setDefault(user?.default)
    setPhonenumber(user?.phonenumber)
    setDetailAdress(user?.detail_address)
    setDistrict(address[1])
    setProvince(address[0])
    setPostal_code(user?.postal_code)
    setWard(address[2])
    setShowAdres(true)
  }
  const handleUpdateAddr = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation()
    const address_id =Cookies.get('address_id')
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
       const response = await axios.post(SummaryApi.edit_address.url +'/'+address_id, DataAddr, {
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
           Authorization: `Bearer ${token}`,
         },
       })
       if (response.status === 200) {
        Cookies.remove("address_id")
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
  // --------------------------VALIDATE SHOP ADDRESSS-----------------------
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
  const ShowAdressBox = () => setShowAdres(true)
  const handleCancelAdresBox = () => {
    Cookies.remove('address_id')
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
    setPostal_code('')
  }

  // ------------------------RENDER ELEMENT --------------------------
  return (
    <section className='bg-white w-full h-full p-4'>
      <nav className='flex justify-between px-2  border-b py-2 border-gray-200'>
        <h2 className=' text-black text-lg'>Địa chỉ của tôi</h2>
        <button
          className='text-[13px] outline-none  hover:bg-green-600 px-6 py-2.5 bg-green-500 text-white hover:shadow border border-green-300 rounded-base'
          onClick={ShowAdressBox}
        >
          Thêm địa chỉ
        </button>
      </nav>
      {/* -------------------- INFOR USER ADDRESS ALTER ADD */}
      {UserAddr && UserAddr.length > 0 ? (
        <ShowAdress handleUpdate={ShowUpdateBox} handleRemove={handleRemove} data={UserAddr} />
      ) : (
        <p className='py-20 text-3xl font-medium  uppercase flex items-center justify-center'>
          Chưa có Địa Chỉ Nào
        </p>
      )}
      {/* -------------------------ADD ADDRESS BOX -------------- */}
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
          handleSave={handleSave}
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
    </section>
  )
}
export default PageAddress
