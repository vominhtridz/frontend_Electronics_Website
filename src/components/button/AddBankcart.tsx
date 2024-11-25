interface AddBankCardType {
  handleAddBank: () => void
}
export const AddBankCard = ({ handleAddBank }: AddBankCardType) => {
  return (
    <button
      className=' bg-green-500 hover:bg-green-600 text-white  px-4 py-2 text-base rounded-sm flex items-center '
      onClick={handleAddBank}
    >
      Thêm tài khoản ngân hàng
    </button>
  )
}
export default AddBankCard
