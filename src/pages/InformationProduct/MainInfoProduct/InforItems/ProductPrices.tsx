
import displayINRCurrency from "..//..//..//..//helpers/displayCurrency"
const ProductPrices = ({ price }: { price: string }) => {
  
  return (
    <section className='py-2 px-4 my-2 w-full text-[20px] text-red-500 rounded-sm bg-slate-50 flex items-center'>
      <p className=''>{displayINRCurrency(parseInt(price) - 2000000)} VNĐ</p>
      <p className=' px-4'> - </p>
      <p className=''>{displayINRCurrency(parseInt(price))} VNĐ</p>
    </section>
  )
}
export default ProductPrices
