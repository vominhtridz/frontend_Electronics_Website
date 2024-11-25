
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { VNPhoneNumberRegex } from "../../../../../components/regex/regex"
import InputCustom from "../../../../../components/input/InputCustom"
import SendBtn from "../../../../../components/button/SendBtn"

export const UserPhoneNunber = () => {
  const navigate = useNavigate()
  const [number, setNumber] = useState<string>("")
  const [disable, setDisable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const handleSend = (e: FormEvent<HTMLButtonElement | HTMLFormElement>) => {
  
  }
  const ChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const valueStartsWithZero = value.startsWith("0")
    if (value.length > 10) return
    const isValidPhoneNumber = VNPhoneNumberRegex.test("84" + value)
    if (value.length === 0) {
      setNumber("")
      setError(false)
    } else if (value.length > 10) {
      setError(true)
      setNumber(value.substring(0, 10))
    } else if (!valueStartsWithZero) {
      setNumber("0" + value)
    } else {
      setNumber(value)
      setError(!isValidPhoneNumber)
    }
  }

  return (
    <div className='bg-white'>
      <h2 className='text-[19px]  px-6 py-4 border-b  vorder-slate-400 '>Thay đổi số điện thoại</h2>
      <div className='py-4 px-2 flex '>
        <label htmlFor={`userpn`} className='text-base font-normal pt-1'>
          - Số điện thoại mới
        </label>
        <form onSubmit={handleSend} className='w-1/3 pl-6'>
          <div className=''>
            <InputCustom placeHolder="Số" changeValue={ChangeNumber} value={number} disable={disable} error={error} />
          </div>
          <p className='py-1'></p>
          <SendBtn handleSend={handleSend} loading={loading} />
        </form>
      </div>
    </div>
  )
}
export default UserPhoneNunber
