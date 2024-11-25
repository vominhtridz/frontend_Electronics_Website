const VoucherShopping = () => {
  return (
    <div className='flex border-b bg-white border-slate-200 px-4 py-4 items-center'>
      <nav className=''>
        <label htmlFor='' className='border border-red-300 rounded-lg  mx-2 px-2'></label>
        Voucher giảm đến ₫800k
      </nav>
      <button className='mx-2 relative text-blue-600'>
        Xem thêm voucher
        <div className='absolute top-full right-0 rounded-sm shadow'></div>
      </button>
    </div>
  )
}

export default VoucherShopping
