import { ChangeEvent, useRef } from "react"
interface UserImageType {
  setImg: (e: string) => void
  img: string
  file: any
  setFile: (e: any) => void
}
export const UserImage = ({ setImg, img, setFile }: UserImageType) => {
  const fileUserImg = useRef<HTMLInputElement>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile)
    setImg(URL.createObjectURL(selectedFile as File))
  }

  const handleSetImage = () => fileUserImg.current?.click()
  return (
    <div className='border-l border-slate-400 flex w-1/2 flex-col items-center '>
      {img && (
        <img
          src={img}
          className='w-[210px] rounded-full cursor-pointer    h-[210px] mb-4'
          onClick={handleSetImage}
        />
      )}
      {!img && (
        <div
          onClick={handleSetImage}
          className='cursor-pointer text-gray-500 w-[130px] text-[5rem] border border-slate-300 flex items-center justify-center rounded-full    h-[130px] my-8'
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='0.88em' height='1em' viewBox='0 0 448 512'>
            <path
              fill='currentColor'
              d='M224 256a128 128 0 1 0 0-256a128 128 0 1 0 0 256m-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7c0-98.5-79.8-178.3-178.3-178.3z'
            />
          </svg>
        </div>
      )}

      <input
        type='file'
        multiple
        onChange={handleChange}
        ref={fileUserImg}
        name='fileUserImg'
        accept='image/*'
        className='hidden'
      />
      <label
        htmlFor='fileUserImg'
        className='border border-slate-400  rounded-sm cursor-pointer inline-block hover:bg-slate-50 px-4 py-1.5 text-sm'
        onClick={handleSetImage}
      >
        Chọn Ảnh
      </label>

      <p className='text-[13px] py-6 text-black '>
        Dụng lượng file tối đa 1 MB <br />
        Định dạng:.JPEG, .PNG
      </p>
    </div>
  )
}
export default UserImage
