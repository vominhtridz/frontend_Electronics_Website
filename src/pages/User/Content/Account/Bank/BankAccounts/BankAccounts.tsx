import RemoveBtn from "../../../../../../components/button/RemoveBtn"
import img from "../../../../../../assest/bank.png"
import { BankType } from "../../../../../../typescript/customerType"

type BankAccountsProps = {
  data: any
  handleRemove: (id: number) => void
  handleEdit: (id: number) => void
}

const BankAccounts: React.FC<BankAccountsProps> = ({ data, handleRemove, handleEdit }) => {
  const getUserBanks = () =>
    data.map((item:any) => (
      <div
        className='flex justify-between items-start bg-white shadow rounded-lg p-4 my-4 border border-gray-200 hover:shadow-lg transition duration-300'
        key={item.id}
      >
        {/* Hình ảnh ngân hàng */}
        <div className='flex items-center'>
          <div className='rounded-lg overflow-hidden w-24 h-20 border border-gray-100'>
            <img src={img} alt='Bank' className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Thông tin tài khoản ngân hàng */}
        <div className='flex-1 ml-6'>
          {/* Tên ngân hàng và nút chức năng */}
          <div className='flex items-center justify-between mb-3'>
            <p className='text-lg font-semibold text-black uppercase'>{item.bank_name}</p>
            <div className='flex items-center space-x-3'>
              
              {item.default && (
                <span className='bg-green-600 text-white py-1.5 px-4 rounded-full text-xs'>
                  Mặc định
                </span>
              )}
              <RemoveBtn handleRemove={() => handleRemove(item.id)} />
              <button
                onClick={() => handleEdit(item.id)}
                className='text-blue-500 text-sm hover:underline transition duration-200'
              >
                Chỉnh Sửa
              </button>
            </div>
          </div>

          {/* Thông tin chi tiết */}
          <div className='text-sm text-gray-700'>
            <p>
              Họ và tên: <span className='font-medium'>{item.name}</span>
            </p>
            <p>
              Chi nhánh: <span className='font-medium'>{item.branch_name}</span>
            </p>
          </div>
        </div>
      </div>
    ))

  return (
    <div className='space-y-4'>
      {data.length > 0 ? (
        getUserBanks()
      ) : (
        <p className='text-center py-8'>Chưa có tài khoản ngân hàng nào</p>
      )}
    </div>
  )
}

export default BankAccounts
