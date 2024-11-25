import { FC } from "react"

interface PartSexTypes {
  gender: string
  handleGenderChange: (e: string) => void
}
const manageGenderInput = [
  {
    gender: "m",
    value: "Nam",
  },
  {
    gender: "w",
    value: "Nữ",
  },
  {
    gender: "o",
    value: "Khác",
  },
]
const PartSex: FC<PartSexTypes> = ({ handleGenderChange, gender }) => {
  const getGender = () =>
    manageGenderInput.map((item, index) => (
      <div className='flex items-center text-[14px] pr-3 ' key={index}>
        <input
          type='radio'
          id={`${item.gender}`}
          value={item.gender}
          checked={item.gender == gender ? true : false}
          className='text-lg px-1 outline-none  block hover:cursor-pointer'
          onChange={e => handleGenderChange(e.target.value)}
        />
        <label htmlFor={`${item.gender}`} className='px-1.5 pb-0.5 text-black'>
          {item.value}
        </label>
      </div>
    ))

  return (
    <div className='flex items-center py-2 ml-10'>
      <h2 className='pr-4'>Giới tính</h2>
      {getGender()}
    </div>
  )
}

export default PartSex
