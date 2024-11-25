import { ChangeEvent, MouseEvent } from "react"
import NameAndPhoneNumber from "./NameAndPhoneNumber"
import AddressDetail from "./AddressDetail"
import AddAddress from "./AddAddress/AddAddress"
import LocateAddress from "./LocateAddress/LocateAddress"
import BackBtn from "../button/BackBtn"
import UpdateBtn from "../button/UpdateBtn"
import SendBtn from "../button/SendBtn"
import Cookies from "js-cookie"
import InputCustom from "../input/InputCustom"

const UpdateAddressBox = ({
  Province,
  Ward,
  district,
  detailAdress,
  showAdresBoxItem,
  setShowAdresBoxItem,
  numberErr,
  nameErr,
  Name,
  setDefault,
  setName,
  handleSave,
  phonenumber,
  AddressErr,
  setWard,
  Default,
  handleUpdate,
  setProvince,
  setDistrict,
  setDetailAdress,
  setPhonenumber,
  handleCancel,
  Postal_code,
setPostal_code,
}: any) => {
  const address_id = Cookies.get('address_id')
  const ChangeBoxDefault = () => setDefault(!Default)
  const ChangeInput = (e: string) => setName(e)
  const ChangeAddress = (e: ChangeEvent<HTMLTextAreaElement>) => setDetailAdress(e.target.value)
  const ChangeNumber = (value: string) => setPhonenumber(value)
  const ChangePostal_code = (e: ChangeEvent<HTMLInputElement>) => setPostal_code(e)
  const handleShowAddress = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setShowAdresBoxItem(!showAdresBoxItem)
  }
  return (
    <div className='fixed flex items-center justify-center left-0 right-0 bottom-0 top-0 bg-[rgba(0,0,0,0.4)] z-40 p-50'>
      <form
        
        className=' bg-white   rounded-sm text-[15px]  w-[40rem] h-[34rem] '
      >
        <div className='w-full z-10  flex items-center justify-between px-6 pt-2'>
          <h2 className='text-xl '>{address_id ? "Cập nhật địa chỉ " : "Thêm Địa Chỉ Mới"}</h2>
          <button onClick={handleCancel} className='text-2xl text-black'>
            x
          </button>
        </div>
        <div className=' pb-2 z-50 py-4  px-6 overflow-y-auto'>
          <NameAndPhoneNumber
            ChangeNumber={ChangeNumber}
            ChangeInput={ChangeInput}
            ShopInput={Name}
            number={phonenumber}
            numberErr={numberErr}
            nameErr={nameErr}
          />
          <AddressDetail
            AddressErr={AddressErr}
            detailAdress={detailAdress}
            ChangeAddress={ChangeAddress}
          />
          <AddAddress
            Ward={Ward}
            setWard={setWard}
            Province={Province}
            setProvince={setProvince}
            district={district}
            setDistrict={setDistrict}
            handleShowAddress={handleShowAddress}
            visiAddress={showAdresBoxItem}
            setVisiAddress={setShowAdresBoxItem}
          />
          <p className='py-1 text-sm'>Mã Bưu điện</p>
          <InputCustom
            changeValue={ChangePostal_code}
            value={Postal_code}
            required
            placeHolder='Mã Bưu Điện'
          />
          <div className='flex py-2 items-center'>
            <input
              type='checkbox'
              checked={Default}
              id='checkDefault'
              className=''
              onChange={ChangeBoxDefault}
            />
            <label htmlFor='checkDefault' className='pl-2 text-sm'>
              Đặt làm mặc định
            </label>
          </div>
        </div>
        <div className=' px-4 w-full  rounde-sm    flex justify-end items-center'>
          <BackBtn handleBack={handleCancel} />
          {address_id ? (
            <UpdateBtn handleUpdate={handleUpdate} />
          ) : (
            <SendBtn handleSend={handleSave} />
          )}
        </div>
        {/* Else */}
      </form>
    </div>
  )
}

export default UpdateAddressBox
