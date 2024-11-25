import { FC, MouseEvent } from "react"
import { CityAndDistrictsItems } from "..//index"
import NavLinkAddress from "./NavLinkAddress"

const ChangeAddressBox: FC<any> = ({
  AddressWard,
  setWard,
  setVisiAddress,
  RouteAddress,
  setProvince,
  setbooleanProvince,
  setRouteAddress,
  setAddressDisAndWardAndCity,
  Ward,
  Province,
  district,
  AddressDisAndWardAndCity,
  setDistrict,
  setBooleanDistrict,
  setBooleanWard,
  setAddressWard,
  booleanProvince,
  booleanDistrict,
  isvisibleText,
  booleanWard,
}) => {
  const getWard = AddressWard?.wards.map((warditem: any, index: number) => {
    function handleSetLocation() {
      setWard(warditem)
      setVisiAddress(false)
    }
    return (
      <option
        value={warditem}
        onClick={handleSetLocation}
        className={`${Ward === warditem ? "text-white bg-green-500 " : "hover:bg-green-50 hover:text-green-500"}  px-4 py-2 my-0.5 whitespce-nowrap text-sm `}
        key={index}
      >
        {warditem}
      </option>
    )
  })
  const getCityAndDistrictsItems = CityAndDistrictsItems.map((city, index) => {
    function handleSetLocation() {
      setProvince(city.title)
      setBooleanDistrict(true)
      setbooleanProvince(false)
      setRouteAddress("Quận/huyện")
      setAddressDisAndWardAndCity(city)
    }
    return (
      <option
        value={city.title}
        onClick={handleSetLocation}
        className={`${Province === city.title ? "text-white bg-green-500 " : "hover:bg-green-50 hover:text-green-500"} px-4  py-2 my-0.5 whitespce-nowrap text-sm `}
        key={index}
      >
        {city.title}
      </option>
    )
  })
  const getDistrict = AddressDisAndWardAndCity?.districts.map((districtItem: any, index: number) => {
    function handleSetLocation() {
      setDistrict(districtItem.title)
      setBooleanDistrict(false)
      setBooleanWard(true)
      setAddressWard({
        wards: districtItem.wards,
      })
      setRouteAddress("Phường/xã")
    }
    return (
      <option
        value={districtItem.title}
        onClick={handleSetLocation}
        className={`${district === districtItem.title ? "text-white bg-green-500 " : "hover:bg-green-50  hover:text-green-500"} px-4 py-2 my-0.5 whitespce-nowrap text-sm `}
        key={index}
      >
        {districtItem.title}
      </option>
    )
  })
  return (
    <div>
      <div
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
          e.preventDefault()
        }}
        className={` ${isvisibleText ? "top-full" : ""}
               fixed z-50  transition duration-500 bottom-full border-t border-r border-l border-slate-300  pb-14 right-[23.5rem] top-8 w-[37rem]
                h-[19rem] bg-white rounded-sm shadow-lg py-6 px-3
            `}
      >
        <NavLinkAddress
          Ward={Ward}
          district={district}
          setBooleanWard={setBooleanWard}
          setbooleanProvince={setbooleanProvince}
          setBooleanDistrict={setBooleanDistrict}
          RouteAddress={RouteAddress}
          setRouteAddress={setRouteAddress}
        />
        {booleanProvince && (
          <div className='h-full overflow-y-auto my-2 text-slate-500 flex items-baseline flex-wrap '>{getCityAndDistrictsItems}</div>
        )}
        {booleanDistrict && <div className='h-full overflow-y-auto my-2 text-slate-500  flex items-baseline flex-wrap '>{getDistrict}</div>}
        {booleanWard && (
          <div className='h-full overflow-y-auto my-2 text-slate-500 flex items-baseline clear-both flex-wrap '>{getWard}</div>
        )}
      </div>
    </div>
  )
}

export default ChangeAddressBox
