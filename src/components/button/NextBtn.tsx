
import { FC, FormEvent } from "react"

interface NextBtnTypes {
  handleNext: (e: FormEvent<HTMLButtonElement | HTMLFormElement>) => void
  loading?: boolean
}
const NextBtn: FC<NextBtnTypes> = ({ handleNext, loading }) => {
  return (
    <button
      disabled={loading == true ? true : false}
      onClick={handleNext}
      type='submit'
      className={` rounded-sm text-sm text-white bg-green-600 px-4 py-2`}
    >
      {loading ? (
        <p className='text-lg flex items-center justify-center'>
          
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <g
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
              >
                <path stroke-dasharray='16' stroke-dashoffset='16' d='M12 3c4.97 0 9 4.03 9 9'>
                  <animate
                    fill='freeze'
                    attributeName='stroke-dashoffset'
                    dur='0.3s'
                    values='16;0'
                  />
                  <animateTransform
                    attributeName='transform'
                    dur='1.5s'
                    repeatCount='indefinite'
                    type='rotate'
                    values='0 12 12;360 12 12'
                  />
                </path>
                <path
                  stroke-dasharray='64'
                  stroke-dashoffset='64'
                  stroke-opacity='0.3'
                  d='M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z'
                >
                  <animate
                    fill='freeze'
                    attributeName='stroke-dashoffset'
                    dur='1.2s'
                    values='64;0'
                  />
                </path>
              </g>
            </svg>
          
        </p>
      ) : (
        "Tiếp theo"
      )}
    </button>
  )
}

export default NextBtn
