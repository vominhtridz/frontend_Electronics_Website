import { ChangeEvent, useEffect, useState } from "react"
import loginIcons from "../../assest/signin.gif"
import { Link, useNavigate } from "react-router-dom"
import imageTobase64 from "../../helpers/imageTobase64"
import { singupType } from "../../typescript/signuptype"
import FormSignup from "./FormSignup"
import Cookies from "js-cookie"

const SignUp = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
   const navigate = useNavigate()
   const code = Cookies.get("token")
   const userid = Cookies.get("token")
   useEffect(() => {
     if (code && userid) {
       return navigate("/")
     }
   }, [])
  const [data, setData] = useState<singupType>({
    email: "",
    password: "",
    name: "",
    password1: "",
    image: "",
  })
  const [image, setImage] = useState<string>("")
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData(preve => {
      return {
        ...preve,
        [name]: value,
      }
    })
  }

  const handleUploadPic = async (e: any) => {
    const file = e.currentTarget?.files[0]
    const imagePic = await imageTobase64(file)
    setImage(imagePic as string)
  }
  const handleShowPwd = () =>  setShowPassword(preve => !preve)
  const handleShowConfirmPwd = () => setShowConfirmPassword(preve => !preve)
  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={image || loginIcons} alt='login icons' />
            </div>
            <form>
              <label>
                <div className='text-xs bg-opacity-80 bg-slate-200  pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                  Ảnh
                </div>
                <input
                  type='file'
                  name='profilePic'
                  className='hidden'
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <FormSignup
            image={image}
            data={data}
            handleOnChange={handleOnChange}
            showConfirmPassword={showConfirmPassword}
            showPassword={showPassword}
            handleShowPwd={handleShowPwd}
            handleShowConfirmPwd={handleShowConfirmPwd}
          />

          <p className='my-5'>
            Đã có tài khoản ?{" "}
            <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
