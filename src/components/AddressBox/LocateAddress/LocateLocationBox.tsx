import { FC, useEffect, useState } from "react"

import MapComponent from "../../GoogleMap/GoogleMap"
import { useDispatch } from "react-redux"
interface LocateLocationBoxTypes {
  handleLocateYourself: () => void
  setBooleanLocate: (e: boolean) => void
}
const LocateLocationBox: FC<LocateLocationBoxTypes> = ({ handleLocateYourself, setBooleanLocate }) => {
  const handleTurnOffLocate = () => setBooleanLocate(false)
  const dispatch = useDispatch()
  const [isloading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    const TimeLoading = setTimeout(() => {
      setIsLoading(false)
    }, 1200)
    return () => {
      clearTimeout(TimeLoading)
    }
  }, [])
  return (
    <div className='absolute h-[28rem] border border-slate-300 bottom-[-10%]  rounded-sm shadow bg-white p-4 left-0 right-0 '>
      <div className='  flex items-center pb-4 justify-between'>
        <h2 className='text-lg'>Chọn địa điểm</h2>
        <div className='flex items-center'>
          <button className="" onClick={handleLocateYourself}>
            chọn
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7'
              />
            </svg>
          </button>
          <button className='px-4 text-lg' onClick={handleTurnOffLocate}>
            X
          </button>
        </div>
      </div>
      {/* {isloading ? <Loading /> : <MapComponent />} */}
    </div>
  )
}

export default LocateLocationBox
