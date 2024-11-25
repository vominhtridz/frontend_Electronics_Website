import { FC } from "react"

interface handleRemoveType {
  handleRemove: () => void
}
const RemoveBtn: FC<handleRemoveType> = ({ handleRemove }) => {
  return (
    <button className='text-sm hover:underline   hover:text-blue-500 px-8 ' onClick={handleRemove}>
      Xoá
    </button>
  )
}

export default RemoveBtn
