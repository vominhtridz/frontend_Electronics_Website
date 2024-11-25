import { CgClose } from "react-icons/cg"



const DisplayInforBank = ({
  infor,
  note,
  onClose,
}: any) => {
  return (
    <div className='fixed z-50 inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center'>
      {/* Overlay mờ nền */}
      <div className='bg-white shadow-lg rounded-lg w-full max-w-2xl mx-4 sm:mx-auto p-6 relative'>
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-3xl text-gray-500 hover:text-red-500 transition-transform transform hover:scale-110 cursor-pointer'
          aria-label='Close'
        >
          <CgClose />
        </button>

        {/* Nội dung chính */}
        <div className='text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-4'>
            Thông Tin Thanh Toán
          </h1>
          <div className='space-y-4 text-left'>
            <span className='text-gray-900 w-full sm:w-2/3'>{infor}</span>

            <div className='flex flex-col sm:flex-row items-start justify-between'>
              <span className='font-semibold text-gray-700 w-full sm:w-1/3'>Ghi chú:</span>
              <span className='text-gray-900 w-full sm:w-2/3'>{note?note : 'không có'}</span>
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className='mt-6 flex justify-center'>
          <button
            onClick={onClose}
            className='bg-blue-500 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition'
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default DisplayInforBank
