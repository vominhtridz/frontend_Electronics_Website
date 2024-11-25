
import { FC, FormEvent } from "react"
interface SendBtn {
  handleSend: (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => void
  disable?: boolean
}
const SendBtn: FC<SendBtn> = ({ handleSend, disable }) => {
 
  return (
    <button
      disabled={disable}
      type='submit'
      className={`${disable ? "bg-gray-100 opacity-90" : ""} hover:bg-red-50 px-8 py-2 rounded-sm border border-red-500 text-red-600`}
      onClick={handleSend}
    >
      Gửi
    </button>
  )
}

export default SendBtn
