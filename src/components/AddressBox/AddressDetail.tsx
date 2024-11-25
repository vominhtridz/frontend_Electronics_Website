import { ChangeEvent, FC } from "react"

interface AddressDetailTypes {
  detailAdress: string
  AddressErr: boolean
  ChangeAddress: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const AddressDetail: FC<AddressDetailTypes> = ({ detailAdress, ChangeAddress, AddressErr }) => {
  return (
    <div className='w-full  relative mt-4 '>
      <label
        htmlFor='detailaddr'
        className='select-none text-[10px] absolute left-0.5 top-[-8px] z-20  px-1 text-black bg-white'
      >
        Địa chỉ chi tiết
      </label>
      <textarea
        name=''
        required
        id='detailaddr'
        rows={4}
        cols={30}
        className='text-sm p-2.5 w-full outline-none border border-slate-500 rounded-sm'
        onChange={ChangeAddress}
        placeholder='Số nhà tên đường...'
        value={detailAdress}
      ></textarea>
      {AddressErr && <span className='text-red-500 text-[13px]'>Địa chỉ chi tiết is required</span>}
    </div>
  )
}

export default AddressDetail
