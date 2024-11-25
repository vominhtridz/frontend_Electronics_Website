import { FC, useState } from "react"
import ChangeAddressBox from "./ChangeAddressBox"

const AddAddress: FC<any> = ({
  handleShowAddress,
  visiAddress,
  setVisiAddress,
  Ward,
  setWard,
  Province,
  isvisibleText,
  setProvince,
  district,
  setDistrict,
}) => {
  const [booleanWard, setBooleanWard] = useState<boolean>(false)
  const [booleanProvince, setbooleanProvince] = useState<boolean>(true)
  const [booleanDistrict, setBooleanDistrict] = useState<boolean>(false)
  const [RouteAddress, setRouteAddress] = useState<string>("Tỉnh/Thành phố")
  const [AddressDisAndWardAndCity, setAddressDisAndWardAndCity] = useState<any>()
  const [AddressWard, setAddressWard] = useState<any>()

  return (
    <div className='w-full  z-50'>
      <div className=' w-full '>
        {!isvisibleText && <h2 className='py-1 text-sm'>Tỉnh/Thành phố/Quận/Huyện/Phường/Xã</h2>}
        <button
          className='text-slate-500 w-full border relative flex justify-between outline-none items-center    border-slate-400 py-1.5 px-3.5  rounded-sm '
          onClick={handleShowAddress}
        >
          {!Province && <p className='w-full flex justify-start text-sm'>Chọn</p>}
          <div className='flex items-center w-full'>
            {Province && <p className='px-0.5 text-sm'>{`${Province}`}</p>}
            {district && <p className='px-0.5 text-sm'>{`/${district}`}</p>}
            {Ward && <p className='px-0.5 text-sm'>{`/${Ward}`}</p>}
          </div>

          <p className='mt-0.5'>
            {
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <g fill='none' fillRule='evenodd'>
                  <path d='M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z' />
                  <path
                    fill='currentColor'
                    d='M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z'
                  />
                </g>
              </svg>
            }
          </p>
          {visiAddress && (
            <ChangeAddressBox
              isvisibleText={isvisibleText as boolean}
              Province={Province}
              district={district}
              Ward={Ward}
              RouteAddress={RouteAddress}
              setVisiAddress={setVisiAddress}
              booleanDistrict={booleanDistrict}
              booleanWard={booleanWard}
              setWard={setWard}
              setProvince={setProvince}
              setDistrict={setDistrict}
              setBooleanWard={setBooleanWard}
              setbooleanProvince={setbooleanProvince}
              setBooleanDistrict={setBooleanDistrict}
              setRouteAddress={setRouteAddress}
              setAddressDisAndWardAndCity={setAddressDisAndWardAndCity}
              setAddressWard={setAddressWard}
              booleanProvince={booleanProvince}
              AddressDisAndWardAndCity={AddressDisAndWardAndCity || null}
              AddressWard={AddressWard || null}
            />
          )}
        </button>
      </div>
    </div>
  )
}

export default AddAddress
