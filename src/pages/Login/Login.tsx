import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import loginIcons from "..//..//assest/signin.gif"
import FormLogin from "./FormLogin"
import Cookies from "js-cookie"
const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const code = Cookies.get("token")
  const userid = Cookies.get("token")
  useEffect(() => {
    if (code && userid) {
      return navigate('/')
    }
  },[])
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData(preve => {
      return {
        ...preve,
        [name]: value,
      }
    })
  }
  const handleShowPwd = () => setShowPassword(!showPassword)

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login icons' />
          </div>

          <FormLogin
            data={data}
            setData={setData}
            handleOnChange={handleOnChange}
            showPassword={showPassword}
            handleShowPwd={handleShowPwd}
          />

          <p className='my-5'>
            Chưa có tài khoản ?
            <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>
              Đăng kí
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login
