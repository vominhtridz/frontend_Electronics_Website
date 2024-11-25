
import RemoveBtn from "../../../../../../components/button/RemoveBtn"
import img from "..//..//..//..//..//..//assest/sampleImage.jpg"

const CardAccounts = ({ data, RemoveCardACC }: any) => {
  const getUserCard = data.map((item: any, index: number) => (
    <div className='flex justify-between w-full py-4' key={index}>
      <div className='flex w-full '>
        <div className=' rounded-sm border mr-6 border-gray-100 shadow    overflow-hidden w-24 h-20 '>
          <img src={img} alt='' className='p-4  w-full h-full' />
        </div>
        <div className='w-full'>
          <div className='flex items-center w-full justify-between'>
            <p className='text-black uppercase text-base'></p>
            <div className='flex'>
              <label className='text-[12px] text-slate-500 px-4'>Đã kiểm tra</label>
              <label htmlFor='' className='bg-green-600 text-white px-1 rounded-sm text-[11px] py-1'>
                Mặc định
              </label>
              <RemoveBtn handleRemove={() => RemoveCardACC(item.cardid, item.userid)} />
            </div>
          </div>
          <p className='text-[12.5px] text-black pt-2'>ngày hết hạn: {item.exp_date}</p>
          <p className='text-[12.5px] text-black'>Họ và tên: {item.first_lastname}</p>
        </div>
      </div>
    </div>
  ))

  return <div className=''>{data ? getUserCard : ""}</div>
}

export default CardAccounts
