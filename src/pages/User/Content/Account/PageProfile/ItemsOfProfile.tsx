import { ChangeEvent } from "react"
import BirthdayField from "./Input/BirthDay"
import ProfileUserCustom from "./Input/ProfileUserCustom"
export const ItemsOfProfile = ({
  defaultName,
  day,
  month,
  year,
  setDay,
  setMonth,
  setYear,
  setDefaultName,
  userNameErr,
  phoneNumber,
  setPhoneNumber,
setEmail,
  email
}: any) => {
  const errusername = userNameErr ? "text-red-500" : "text-black"
  const ChangeDay = (e: ChangeEvent<HTMLSelectElement>) => setDay(e.target.value)
  const ChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => setMonth(e.target.value)
  const ChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const ChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)
  const ChangeYear = (e: ChangeEvent<HTMLSelectElement>) => setYear(e.target.value)
  const ChangeDefaultName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length >= 16) return
    else setDefaultName(value)
  }
  return (
    <div className='py-6 pr-16 pl-6 text-sm  text-black'>
      <ProfileUserCustom
        placeholder='Tên...'
        label='Tên người dùng'
        value={defaultName}
        ChangeValue={ChangeDefaultName}
      />
      <ProfileUserCustom
        placeholder='Số điện thoại...'
        label='Số Điện Thoại'
        value={phoneNumber}
        type='number'
        ChangeValue={ChangePhoneNumber}
      />
      <ProfileUserCustom
        placeholder='Email...'
        label='Email'
        value={email}
        ChangeValue={ChangeEmail}
      />

      <BirthdayField
        ChangeDay={ChangeDay}
        ChangeMonth={ChangeMonth}
        ChangeYear={ChangeYear}
        day={day}
        month={month}
        year={year}
      />
    </div>
  )
}
export default ItemsOfProfile
