const manageOptionsNavPrices = ["Đơn giá", "Số lượng", "Số tiền", "Thao tác"]
const OptionsNavPrices = () => {
  const getOptionsNavPrices = () =>
    manageOptionsNavPrices.map((option, index) => (
      <p className={`${option == "Số tiền" ? 'pl-24 pr-6': 'px-16'} tracking-wider text-[15px] text-slate-600`} key={index}>
        {option}
      </p>
    ))
  return (
    <div className=' my-4 text-base text-[13px] flex items-center justify-between bg-white rounded-sm px-4 py-4 '>
      <nav className='flex items-center text-[14px]'>
        <p className='pl-16 text-lg'>Sản phẩm</p>
      </nav>
      <nav className='flex items-center  justify-between'>{getOptionsNavPrices()}</nav>
    </div>
  )
}

export default OptionsNavPrices
