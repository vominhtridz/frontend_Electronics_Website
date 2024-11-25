import { ChangeEvent, useState } from "react"
import SaveFindVoucher from "./button/SaveFindVoucher"
import FindVoucherInput from "./input/FindVoucherInput"

const FindVoucherBox = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [visibleBtn, setVisibleBtn] = useState<boolean>(false)
  const [voucherInput, setVoucherInput] = useState<string>("")
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (voucherInput === "") {
      setVisible(false)
    }
    setVisibleBtn(true)
    setVoucherInput(e.target.value)
    setVisible(true)
  }
  const handleRemoveText = () => {
    setVoucherInput("")
    setVisible(false)
    setVisibleBtn(false)
  }
  const handleKeyPress = () => {
    if (voucherInput) return
    else if (voucherInput === "") {
      setVisible(false)
      setVisibleBtn(false)
    }
  }
  return (
    <div className=' py-6 flex items-center  my-4 justify-center'>
      <p className='px-4'>Mã Voucher</p>
      <div className='relative'>
        <FindVoucherInput
          handleChange={handleChange}
          voucherInput={voucherInput}
          handleKeyPress={handleKeyPress}
        />
        {visible && (
          <button
            className='text-[19px] absolute right-3 top-2 p-1 text-slate-400'
            onClick={handleRemoveText}
          >
            {
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16'>
                <path
                  fill='currentColor'
                  fillRule='evenodd'
                  d='M5.75 3V1.5h4.5V3zm-1.5 0V1a1 1 0 0 1 1-1h5.5a1 1 0 0 1 1 1v2h2.5a.75.75 0 0 1 0 1.5h-.365l-.743 9.653A2 2 0 0 1 11.148 16H4.852a2 2 0 0 1-1.994-1.847L2.115 4.5H1.75a.75.75 0 0 1 0-1.5zm-.63 1.5h8.76l-.734 9.538a.5.5 0 0 1-.498.462H4.852a.5.5 0 0 1-.498-.462z'
                  clipRule='evenodd'
                />
              </svg>
            }
          </button>
        )}
      </div>
      <SaveFindVoucher visibleBtn={visibleBtn} />
    </div>
  )
}
export default FindVoucherBox
