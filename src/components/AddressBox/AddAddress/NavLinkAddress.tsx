import { FC, MouseEvent } from "react"

const NavLinkAddress: FC<any> = ({
  setRouteAddress,
  RouteAddress,
  setBooleanWard,
  setbooleanProvince,
  setBooleanDistrict,
  Ward,

  district,
}) => {
  function handleProvice(e: MouseEvent<HTMLDivElement>) {
    setbooleanProvince(true)
    setBooleanWard(false)
    setBooleanDistrict(false)
    setRouteAddress(e.currentTarget?.innerHTML)
  }
  function handleDistrict(e: MouseEvent<HTMLDivElement>) {
    if (!district) return
    setbooleanProvince(false)
    setBooleanWard(false)
    setBooleanDistrict(true)
    setRouteAddress(e.currentTarget?.innerHTML)
  }
  function handleWard(e: MouseEvent<HTMLDivElement>) {
    if (!Ward) return
    setbooleanProvince(false)
    setBooleanWard(true)
    setBooleanDistrict(false)
    setRouteAddress(e.currentTarget?.innerHTML)
  }
  const ManageNavLinkAddress = [
    {
      title: "Tỉnh/Thành phố",
      functionHandle: handleProvice,
    },
    {
      title: "Quận/huyện",
      functionHandle: handleDistrict,
    },
    {
      title: "Phường/xã",
      functionHandle: handleWard,
    },
  ]
  const getManageNavLinkAddress = ManageNavLinkAddress.map((item, index) => {
    return (
      <div
        key={index}
        className={`${RouteAddress === item.title ? "border-green-500 text-green-500 bg-green-50" : "border-slate-300 text-slate-400 bg-slate-50"} 
        ${!Ward && item.title != "Tỉnh/Thành phố" ? "cursor-not-allowed" : ""}
        ${!district && item.title != "Tỉnh/Thành phố" ? "cursor-not-allowed" : ""}
        
        w-1/3 rounded-sm border py-1.5 mx-1 outline-none`}
        onClick={item.functionHandle}
      >
        {item.title}
      </div>
    )
  })
  return <div className='flex items-center w-full text-sm'>{getManageNavLinkAddress}</div>
}
export default NavLinkAddress
