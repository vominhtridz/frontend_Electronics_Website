
const ShopEnsure = () => {
  return (
    <section className='flex items-center text-sm'>
      <nav className='text-sm  flex items-center'>
        <p className='text-3xl text-red-500'>
          {
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='1em'
              height='1em'
              viewBox='0 0 1024 1024'
            >
              <path
                fill='currentColor'
                d='M866.9 169.9L527.1 54.1C523 52.7 517.5 52 512 52s-11 .7-15.1 2.1L157.1 169.9c-8.3 2.8-15.1 12.4-15.1 21.2v482.4c0 8.8 5.7 20.4 12.6 25.9L499.3 968c3.5 2.7 8 4.1 12.6 4.1s9.2-1.4 12.6-4.1l344.7-268.6c6.9-5.4 12.6-17 12.6-25.9V191.1c.2-8.8-6.6-18.3-14.9-21.2M694.5 340.7L481.9 633.4a16.1 16.1 0 0 1-26 0l-126.4-174c-3.8-5.3 0-12.7 6.5-12.7h55.2c5.1 0 10 2.5 13 6.6l64.7 89l150.9-207.8c3-4.1 7.8-6.6 13-6.6H688c6.5.1 10.3 7.5 6.5 12.8'
              />
            </svg>
          }
        </p>
        <p className='px-1'>Sango Đảm bảo</p>
      </nav>
      <p className='px-6 text-slate-500'>Trả hàng miễn phí trong 15 ngày</p>
    </section>
  )
}
export default ShopEnsure