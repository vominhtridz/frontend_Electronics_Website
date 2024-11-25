import { ChangeEvent, FC } from "react"

interface CustomType {
  label: string
  placeholder: string
  value: string | number
  type?: string
  ChangeValue: (e: ChangeEvent<HTMLInputElement>) => void
}

const ProfileUserCustom: FC<CustomType> = ({
  placeholder,
  label,
  value,
  type,
  ChangeValue,
}) => {
  return (
    <div className='flex items-center  w-full '>
      <label className='whitespace-nowrap min-w-[115px] max-w-[115px] block pr-4'>{label} </label>
      <input
        autoComplete='new-password'
        type={type ? 'number':'text'}
        className='outline-none  w-full  px-2 py-1.5 text-sm transition duration-500   border my-2  text-black border-slate-400 rounded-sm '
        placeholder={placeholder}
        onChange={ChangeValue}
        value={value}
        required
      />
    </div>
  )
}
export default ProfileUserCustom
