import { useState } from 'react'
import { server } from '..//..//..//common/path'
import { loadImage } from "..//..//..//common/svgImage"
import { HeartIcon } from "..//..//..//common/svgImage"
import DisplayImage from "..//..//..//components/DisplayImage"
const ImageItems = ({ ...items }) => {
  const [image,setImage] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const handleclose = () => setShow(false)
  const handleShowImage = (img:string) => {
    setShow(true)
    setImage(img)
  }
  return (
    <div className='text-sm text-black w-1/3'>
      {items?.image ? (
        <img src={server + items?.image} className='object w-full h-[350px] rounded-sm ' alt='' />
      ) : (
        <div className='object w-full h-[350px] rounded-sm text-slate-500'>{loadImage}</div>
      )}
      <nav className='flex items-cente my-2'>
        <img
          src={server + items?.image}
          onClick={() => handleShowImage(server + items?.image)}
          className='w-1/5 hover:cursor-pointer shadow p-2 border border-gray-50 h-[82px] mx-2 rounded-sm '
          alt=''
        />
      </nav>
      <nav className='flex items-center  my-10 whitespace-nowrap'>
        <p className='flex text-[15px] items-center '>Chia sẻ: mạng xã hội</p>
        <p className='text-xl text-slate-200 px-4'>|</p>
        <p className='flex items-center text-base'>
          <span className='px-2 text-2xl text-red-500'>{HeartIcon}</span>
          Đã thích (3,3k)
        </p>
      </nav>
      {show && <DisplayImage onClose={handleclose} image={ image} />}
    </div>
  )
}
export default ImageItems
