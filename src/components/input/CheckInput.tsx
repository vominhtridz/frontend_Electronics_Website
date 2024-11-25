import { ChangeEvent } from "react"

interface CheckInputType {
  disable: boolean
  id: string
  checked: boolean
  handleChange:(e:ChangeEvent<HTMLInputElement>)=>void
}
const CheckInput = ({ disable, id, checked , handleChange}: CheckInputType) => {
  return (
    <input
      checked={checked ? true: false}
      type='checkbox'
      id={id}
      onChange={handleChange}
      className={`${disable ? "text-slate-400" : "text-blue-500"}`}
      disabled={disable}
    />
  )
}

export default CheckInput
