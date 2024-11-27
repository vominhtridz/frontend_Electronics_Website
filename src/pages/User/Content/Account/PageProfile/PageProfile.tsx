import { FormEvent, useEffect, useState } from "react"
import { UserImage } from "./Image/SetUpUserImage"
import ItemsOfProfile from "./ItemsOfProfile"
import axios from "axios"
import SummaryApi from "../../../../../common"
import Cookies from "js-cookie"
import { formatDate } from "../../../../../components/features/generateCodeRandom"
import UpdateBtn from "../../../../../components/button/UpdateBtn"
import { useDispatch } from "react-redux"
import { setLoading } from "../../../../../store/PageSlice"
import uploadImage from "../../../../../helpers/uploadImage"
import { toast } from "react-toastify"
export const PageProfile = () => {
  let [img, setImg] = useState<string>('')
  let [file, setFile] = useState<any>({})
  const dispatch = useDispatch();
  let [defaultName, setDefaultName] = useState<string>('')
  let [day, setDay] = useState<number>()
  let [month, setMonth] = useState<number>()
  let [year, setYear] = useState<number>()
  let [phoneNumber, setPhoneNumber] = useState<number|null>(null)
  let [Email, setEmail] = useState<string>('')
  const userid = Cookies.get('id');
  const token = Cookies.get("token")
  /// -----------------------------CALLBACK WHEN BIRTHDAY CHANGE ------------------------
  const fetchUserDetails = async () => {
      dispatch(setLoading(true));
      try {
        const dataResponse = await axios.get(SummaryApi.current_user.url + "/" + userid, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch(setLoading(false));
        const user = dataResponse?.data?.data;
        const birthday= formatDate(user.birthday);
        setImg(user.image)
        setDay(birthday?.day)
        setMonth(birthday?.month)
        setYear(birthday?.year)
        setDefaultName(user?.name)
        setPhoneNumber(user?.phonenumber)
        setEmail(user?.email)
      } catch (error) {
      dispatch(setLoading(true))

        console.error("Error fetching user details:", error)
      }
    }
  useEffect(() => {
    fetchUserDetails()
  }, [])
  /// -----------------------------HANDLE SAVE ------------------------
  const handleUpdate = async(e: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
    e.preventDefault()
    const data = {
      name: defaultName,
      birthday: `${year}-${month}-${day}`,
      phonenumber: phoneNumber,
      email: Email,
      image: file != null ? await uploadImage(file) : img,
    }
    dispatch(setLoading(true));
    try {
      const response = await axios.post(SummaryApi.updateUser.url + "/" + userid, data, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        dispatch(setLoading(false))
        fetchUserDetails()
        toast.success(response.data.cuccess || "Cập Nhật Thành Công")
      } else {
        throw new Error("Có lỗi Xảy Ra khi Cập Nhật Người Dùng")
      }
    }
    catch (err) { 
      console.error("Error updating user details:", err)
      dispatch(setLoading(false));
    }
  }

  /// -----------------------------RENDER ELEMENT ------------------------

  return (
    <form onSubmit={handleUpdate} encType='multipart/form-data' className=' bg-white '>
      <nav className='px-6 py-4 border-b  vorder-slate-400'>
        <h2 className='text-[19px]   '>Hồ sơ của tôi</h2>
        <p className='text-[12px] '>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      </nav>
      <div className='rounded-sm flex  text-slate-700 px-6 py-4 w-full'>
        <ItemsOfProfile
          defaultName={defaultName}
          setDefaultName={setDefaultName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setEmail={setEmail}
          email={Email}
          day={day}
          month={month}
          year={year}
          setMonth={setMonth}
          setYear={setYear}
          setDay={setDay}
        />
        <UserImage img={img} file={file} setFile={setFile} setImg={setImg} />
      </div>
      <div className='pl-20 pb-4'>
        <UpdateBtn handleUpdate={handleUpdate} />
      </div>
    </form>
  )
}
export default PageProfile
