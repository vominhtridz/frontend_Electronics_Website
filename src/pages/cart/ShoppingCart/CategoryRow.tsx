import { FC, MouseEvent } from "react"
import { DownIcon } from "../../../common/svgImage"

interface CategoryRowTypes {
  handleShowClasify: () => void
  visible: boolean
  handleclick: (e: MouseEvent<HTMLDivElement>) => void
  color?:string
}
const CategoryRow: FC<CategoryRowTypes> = ({ handleShowClasify, color,visible, handleclick }) => {
  return (
    <button className='relative' onClick={handleShowClasify}>

        <div
          className='absolute top-full left-0 px-4 py-1 bg-white shadow rounded-sm border border-slate-200'
          onClick={handleclick}
        >
          <div className='flex items-center'>
            <p className=''>Màu:</p>
            <button className='px-4 py-2 ml-1 hover:bg-green-500 hover:text-white whitespace-nowrap rounded-md'>{color}</button>
          </div>
        </div>
      
    </button>
  )
}

export default CategoryRow
