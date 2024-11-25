
import { FC } from "react"
const Days = Array.from({ length: 31 }, (_, i) => i + 1)
const Years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
const Months = Array.from({ length: 12 }, (_, i) => i + 1)
const BirthdayField: FC<any> = ({ day, month, year, ChangeDay, ChangeMonth, ChangeYear }) => {
  // --------------------------- DAY--------------------
  const getYear = () =>
    Years.map((yearvalue, index) => (
      <option className='mx-3 text-black text-[13px] ' key={index} value={yearvalue}>
        Năm {yearvalue}
      </option>
    ))
  // --------------------------- MONTH-------------------------

  const getMonth = () =>
    Months.map((monthvalue, index) => (
      <option className='mx-3 text-black text-[13px] ' key={index} value={monthvalue}>
        Tháng {monthvalue}
      </option>
    ))
  // --------------------------- YEAR-------------------------

  const getDay = () =>
    Days.map((dayvalue, index) => (
      <option className='mx-3 text-black text-[13px] ' key={index} value={dayvalue}>
        Ngày {dayvalue}
      </option>
    ))
  // --------------------------- RENDER ELEMENT-------------------------
  return (
    <div className='flex items-center py-2 '>
      <label className='text-sm whitespace-nowrap min-w-[115px] max-w-[115px]'>Ngày Sinh</label>
      <select
        value={day}
        onChange={ChangeDay}
        name='day'
        id='day'
        className='border outline-blue-500 text-[13px] border-gray-400 px-4 mr-1.5 py-0.5'
      >
        {getDay()}
      </select>
      <select
        value={month}
        onChange={ChangeMonth}
        name='month'
        id='month'
        className='border outline-blue-500 text-[13px] border-gray-400 px-4 mx-1.5 py-0.5'
      >
        {getMonth()}
      </select>
      <select
        value={year}
        onChange={ChangeYear}
        name='year'
        id='year'
        className='border outline-blue-500 text-[13px] border-gray-400 px-4 mx-1.5 py-0.5'
      >
        {getYear()}
      </select>
    </div>
  )
}

export default BirthdayField
