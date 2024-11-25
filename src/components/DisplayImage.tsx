import { CgClose } from "react-icons/cg"

interface DisplayImageProps {
  image: string
  onClose: () => void
}

const DisplayImage = ({ image, onClose }: DisplayImageProps) => {
  return (
    <div className='fixed z-50 inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center'>
      {/* Overlay mờ nền */}
      <div className='bg-white shadow-lg rounded-lg max-w-5xl w-full mx-4 sm:mx-auto p-4 relative'>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-3xl text-gray-500 hover:text-red-500 transition-transform transform hover:scale-110 cursor-pointer'
          aria-label='Close'
        >
          <CgClose />
        </button>

        {/* Hình ảnh */}
        <div className='flex justify-center items-center p-4'>
          <img
            src={image}
            alt='Preview'
            className='w-full max-w-[80vh] h-auto max-h-[80vh] object-contain rounded-lg transition-transform transform hover:scale-105'
          />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage
