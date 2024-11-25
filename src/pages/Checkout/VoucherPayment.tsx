const VoucherPayment = () => {
  return (
    <div className='bg-white my-6 text-[13px] rounded-md shadow-lg p-5'>
      {/* Header Section */}
      <div className='flex items-center pb-4 border-b border-slate-300 text-lg font-bold'>
        <p className='px-1.5 text-xl text-red-500'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M4 4a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2a2 2 0 0 1-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 1-2-2a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2zm11.5 3L17 8.5L8.5 17L7 15.5zm-6.69.04c.98 0 1.77.79 1.77 1.77a1.77 1.77 0 0 1-1.77 1.77c-.98 0-1.77-.79-1.77-1.77a1.77 1.77 0 0 1 1.77-1.77m6.38 6.38c.98 0 1.77.79 1.77 1.77a1.77 1.77 0 0 1-1.77 1.77c-.98 0-1.77-.79-1.77-1.77a1.77 1.77 0 0 1 1.77-1.77'
            />
          </svg>
        </p>
        <h2 className='text-lg font-semibold text-gray-700 ml-2'>Sango Voucher</h2>
      </div>

      {/* Voucher Selection */}
      <div className='flex items-center justify-between py-4 my-3 bg-green-100 rounded-md shadow-inner'>
        <label htmlFor='' className='mx-4 text-sm text-gray-700 font-medium'>
          🎉 Voucher Giảm 30%
        </label>
        <button className='bg-white text-sm text-red-500 border border-red-400 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300 ease-in-out shadow-md'>
          Chọn Voucher
        </button>
      </div>
    </div>
  )
}

export default VoucherPayment
