interface InputCustomType {
  value: string
  changeValue: (e: string | any) => void
  placeHolder: string
  error?: boolean
  cursor?: string
  handleClick?: () => void
  length?: number
  htmlFor?: string
  required?: boolean
  disable?:boolean
  type?: string
}
const InputCustom = ({
  value,
  changeValue,
  placeHolder,
  htmlFor,
  error,
  cursor,
  handleClick,
  type,
  length,
  disable = false,
  required,
}: InputCustomType) => {
  const checkError = error ? "border-red-500 outline-none" : "border-gray-300 outline-blue-500"

  return (
    <input
      onClick={handleClick}
      type={type ? type : "text"}
      id={htmlFor}
      disabled={disable}
      required={required}
      className={`${checkError} ${cursor} px-2 py-2  text-[14px]  text-black border  rounded-sm bg-white w-full`}
      value={value}
      maxLength={length || 60}
      placeholder={placeHolder}
      onChange={e => changeValue(e.target.value)}
    />
  )
}

export default InputCustom
