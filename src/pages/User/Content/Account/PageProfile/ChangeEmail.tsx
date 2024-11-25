
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import VerifiCodeEmail from "./VerifiCodeEmail"
import InputCustom from "../../../../../components/input/InputCustom"
import NextBtn from "../../../../../components/button/NextBtn"
const ChangeEmail = () => {
  const [email, setEmail] = useState<string>( "")
  const [loading, setLoading] = useState<boolean>(false)
  const [disable, setDisableEmail] = useState<boolean>(false)
  const [visibleCode, setvisibleCode] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [CodeVerifi, setCodeVerifi] = useState<string>("")
  //----------------------------------- SET VISIBLE CODE AND SET NEW EMAIL ---------------------
  useEffect(() => {
    const local = localStorage.getItem("email")
    if (local && CodeVerifi != "") {
      setvisibleCode(true)
      setEmail(local)
    }
  }, [visibleCode])

  //-----------------------HANDLE SEND------------------------------
  const handleSend = (e: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setDisableEmail(true)

  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  //-----------------------RENDER ELEMENT------------------------------
  return (
    <div className=''>
      {visibleCode ? (
        <VerifiCodeEmail
          setCodeVerifi={setCodeVerifi}
          setvisibleCode={setvisibleCode}
          CodeVerifi={CodeVerifi}
          email={email}
          oldEmail={email}
        />
      ) : (
        <div className='bg-white'>
          <h2 className='text-[19px]  px-6 py-4 border-b  vorder-slate-400 '>Thay đổi địa chỉ email</h2>
          <div className='py-4 px-2 flex '>
            <label htmlFor='' className='text-base font-normal'>
              - Địa chỉ email mới
            </label>
            <form onSubmit={handleSend} className='w-1/3 pl-6'>
              <div className=''>
                <InputCustom placeHolder="Email.." changeValue={handleChange} value={email}  />
              </div>
              <p className={` text-red-600 text-[11px] ${message ? "" : "py-1"}`}>{message}</p>
              <NextBtn handleNext={handleSend} loading={loading} />
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChangeEmail
