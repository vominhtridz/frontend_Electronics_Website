interface AddCreditCardType {
  handleAddCreditCart: () => void
}
export const AddCreditCard = ({ handleAddCreditCart }: AddCreditCardType) => {
  console.log("check rerendering")
  return (
    <button
      className=' bg-green-500 text-white px-4 py-1 text-sm rounded-sm flex items-center outline-none'
      onClick={handleAddCreditCart}
    >
      <p className='text-2xl px-2 text-slate-50'>+</p> Thêm thẻ mới
    </button>
  )
}
export default AddCreditCard
