import React from "react"

type AddressItem = {
  id: number
  first_lastname: string
  phonenumber: string
  detailaddr: string
  addr: string
  setdefault: boolean
}

type ShowAddressProps = {
  data: AddressItem[]
  handleUpdate: (id: number) => void
  handleRemove: (id: number) => void
}

const ShowAddress: React.FC<ShowAddressProps> = ({ data, handleUpdate, handleRemove }) => {
  const getUserAddr = () =>
    data.map((item:any) => (
      <section
        className='flex border my-2 p-3 shadow rounded-md border-gray-200 justify-between'
        key={item.id}
      >
        <div className='text-slate-500 w-full'>
          {/* Tên và số điện thoại */}
          <div className='flex items-center justify-between text-sm my-1'>
            <div className='flex items-center'>
              <p className='py-1 pr-2 text-black font-medium'>{item?.name}</p>
              <span className='text-xl text-slate-400'>|</span>
              <p className='py-1 pl-2'>(+84) {item?.phonenumber}</p>
            </div>

            {/* Nút cập nhật và xóa */}
            <div className='flex items-center space-x-3'>
              <button
                onClick={() => handleUpdate(item.id)}
                className='text-blue-500 hover:underline'
              >
                Cập Nhật
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className='text-red-500 hover:underline'
              >
                Xóa
              </button>
            </div>
          </div>

          {/* Địa chỉ chi tiết */}
          <div className='my-2'>
            <p className='text-[12.5px] italic leading-4'>
              <strong>Địa Chỉ Chi tiết: </strong>
              {item.detail_address}
            </p>
            <address className='text-[12.5px] italic leading-4 my-1'>
              <strong>Tỉnh Quận Huyện: </strong>
              {item.city_address}
            </address>
            <address className='text-[12.5px] italic leading-4 my-1'>
              <strong>Mã Bưu Điện: </strong> {item.postal_code}
            </address>
          </div>

          {/* Nhãn "Mặc định" nếu có */}
          {item.default && (
            <span className='text-[12.8px] font-sans p-1 border border-red-600 text-red-500'>
              Mặc định
            </span>
          )}
        </div>
      </section>
    ))

  return (
    <div>
      {data.length === 0 ? (
        <p className='py-20 flex items-center justify-center'>Chưa có Địa chỉ nào</p>
      ) : (
        getUserAddr()
      )}
    </div>
  )
}

export default ShowAddress
