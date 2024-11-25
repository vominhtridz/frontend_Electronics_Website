import { useState } from "react"
import LocateLocationBox from "./LocateLocationBox"

const LocateAddress = () => {
  const [booleanLocate, setBooleanLocate] = useState<boolean>(false)
  function handleShow() {
    setBooleanLocate(true)
  }

  function handleLocateYourself() {}
  return (
    <div className='my-6 relative w-full'>
      <div className='flex border border-slate-400 rounde-sm   items-center py-1 px-4'>
        <p className='text-2xl pr-1 text-slate-400'>
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7'
              />
            </svg>
        </p>
        <button className='text-left leading-4' onClick={handleShow}>
          <span className='text-[14px] my-1 pl-0.5'>Định vị</span>
          <p className='text-[10px] '>Giúp đơn hàng được giao nhanh nhất</p>
        </button>
      </div>
      {booleanLocate && (
        <LocateLocationBox
          handleLocateYourself={handleLocateYourself}
          setBooleanLocate={setBooleanLocate}
        />
      )}
    </div>
  )
}

export default LocateAddress
