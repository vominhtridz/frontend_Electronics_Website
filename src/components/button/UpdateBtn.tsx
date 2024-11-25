interface UpdateBtnType {
  handleUpdate: any
}
const UpdateBtn = ({ handleUpdate }: UpdateBtnType) => {
  return (
    <button
      type="submit"
      className='text-[13px] outline-none  hover:bg-green-600 px-6 py-2.5 bg-green-500 text-white hover:shadow border border-green-300 rounded-sm'
      onClick={handleUpdate}
    >
      Cập nhật
    </button>
  )
}

export default UpdateBtn
