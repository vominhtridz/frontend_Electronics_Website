import { FC } from "react"

interface BackBtnTypes {
  handleBack: () => void
}
const BackBtn: FC<BackBtnTypes> = ({ handleBack }) => {
  return (
    <button
      className='px-8 flex items-center whitespace-nowrap 
       justify-center py-1.5 mx-1 hover:border-gray-300 hover:shadow  border-gray-300 border rounded-sm hover:bg-gray-100'
      onClick={handleBack}
    >
      Trở lại
    </button>
  )
}

export default BackBtn
