import { useState } from "react"
import moc from "..//..//..//..//..//assest/sampleImage.jpg"
const Classify = ({ ...items }) => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div className='flex items-center  text-[13.5px] my-4  leading-5'>
      <p className='pr-2'>Phân loại</p>
      <nav className='pl-8 flex items-center'>
        <button className='flex border px-2 py-1.5 border-green-400 rounded-sm mx-1'>
          <img src={moc} alt='' className='w-6 h-6' />
          <p className='text-green-700 px-1'>{items?.color}</p>
        </button>
      </nav>
    </div>
  )
}
export default Classify
