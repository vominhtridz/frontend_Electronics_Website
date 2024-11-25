
import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputCustom from "../../../../../components/input/InputCustom"
import SendBtn from "../../../../../components/button/SendBtn"
interface VerifiCodeEmailType {
  CodeVerifi: string | undefined
  email: string
  oldEmail: string | undefined
  setCodeVerifi: (e: string) => void
  setvisibleCode: (e: boolean) => void
}
const VerifiCodeEmail = ({ CodeVerifi, email, oldEmail, setvisibleCode, setCodeVerifi }: VerifiCodeEmailType) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")
  //---------------HANDLE SEND--------------------------------
  const handleSend = (e: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
    e.preventDefault()
    setDisable(true)
    setLoading(true)
    if (CodeVerifi == code) {
      setDisable(false)
      setLoading(false)
      
    } else {
      setDisable(false)
      setLoading(false)
    }
  }
  const changeCode = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value)
  //---------------------------RENDER ELEMENT--------------------------------

  return (
    <div className='bg-white'>
      <h2 className='text-[19px]  px-6 py-4 border-b  vorder-slate-400 '>Xác Thực email</h2>
      <div className='py-4 px-2 flex '>
        <label htmlFor='' className='text-base font-normal pt-2.5'>
          - Mã xác thực
        </label>
        <form onSubmit={handleSend} className='w-1/3 pl-6'>
          <div className=''>
            <InputCustom placeHolder="THay dổi code" value={code} changeValue={changeCode} disable={disable} />
          </div>
          <p className='py-1'></p>
          <SendBtn handleSend={handleSend} loading={loading} />
        </form>
      </div>
    </div>
  )
}

export default VerifiCodeEmail
