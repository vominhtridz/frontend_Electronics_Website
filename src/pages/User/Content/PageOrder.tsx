import axios from "axios"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import SummaryApi from "../../../common"
import { OrderType } from "../../../typescript/customerType"
import { Link } from "react-router-dom"
import displayINRCurrency from "../../../helpers/displayCurrency"
import { useDispatch } from "react-redux"
import { setLoading } from "../../../store/PageSlice"
import { toast } from "react-toastify"

const PageOrder = () => {
  const [orders, setOrders] = useState<OrderType[]>([])
  const token = Cookies.get("token")
  const dispatch = useDispatch();
  const userid = Cookies.get("id")
const fetchOrders = async () => {
  try {
    dispatch(setLoading(true));
    const dataResponse = await axios.get(SummaryApi.getOrder.url + "/" + userid, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    if (dataResponse.status === 200) {
    dispatch(setLoading(false))

      const orders = dataResponse?.data?.data
      setOrders(orders)
    }
  } catch (error) {
    dispatch(setLoading(false))
    console.error("Error fetching user details:", error)
  }
}
  // Giả sử dữ liệu được lấy từ API
  useEffect(() => {
   

    fetchOrders()
  }, [])
  // HANDLE CANCELLED ORDERS
  const handleCancel = async (id: number) => { 
    const confirm = window.confirm("Bạn Có Chắc Chắn Muốn Huỷ Đơn Hàng " + id)
    if (confirm) {
         dispatch(setLoading(true))
         try {
           const dataResponse = await axios.post(
             `${SummaryApi.cancelled_OrderById.url}/${id}`,
             {}, 
             {
               headers: {
                 accept: "application/json",
                 Authorization: `Bearer ${token}`,
               },
             },
           )
        
           if (dataResponse.status === 200) {
             dispatch(setLoading(false))
             fetchOrders()
             toast.success(dataResponse?.data?.success || "Hủy Đơn Hàng Thành Công")
           }
         } catch (error) {
           dispatch(setLoading(false))
           console.error("Error fetching user details:", error)
         }
       
    }
  }
  const handleShow = (id: number) => {
    
  }
  return (
    <div className=' bg-gray-50 p-6'>
      <h1 className='text-3xl font-bold text-gray-600 mb-8'>Danh Sách Đơn Hàng của bạn</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow-md rounded-lg'>
          <thead>
            <tr>
              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Mã Đơn hàng
              </th>
              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Tên khách hàng
              </th>
              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Email
              </th>
              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Phương thức thanh toán
              </th>

              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Ngày Đặt Hàng
              </th>
              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Ngày Nhận Hàng
              </th>

              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Tổng giá trị
              </th>
              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Trạng thái đơn hàng
              </th>
              <th className='py-2.5 text-center px-2 text-[13px] text-gray-700 leading-4 bg-gray-200 '>
                Thao Tác
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className='border-b'>
                  <td className='py-4 text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    {order?.order_id}
                  </td>
                  <td className='py-4 text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    {order?.customers?.name}
                  </td>
                  <td className='py-4 text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    {order?.customers?.email}
                  </td>
                  <td className='py-4 text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    {order?.payment_method === "cod"
                      ? "Thanh toán khi nhận hàng"
                      : "Chuyển khoản ngân hàng"}
                  </td>

                  <td className='py-4 text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    {new Date(order?.order_date).toLocaleDateString()}
                  </td>
                  <td className='py-4 text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    {order?.delivered_date
                      ? new Date(order?.delivered_date).toLocaleDateString()
                      : "Chưa giao"}
                  </td>

                  <td className='py-4 whitespace-nowrap text-red-500 font-medium text-center px-2 text-[13px] text-gray-700 leading-4'>
                    {displayINRCurrency(order?.total_amount)} VNĐ
                  </td>
                  <td className=' whitespace-nowrap text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    <span
                      className={`px-4 py-2 select-none rounded text-white ${
                        order?.order_status === "delivering"
                          ? "bg-blue-500"
                          : order?.order_status === "completed"
                            ? "bg-green-500"
                            : order?.order_status === "cancelled"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                      }`}
                    >
                      {order?.order_status == "delivering"
                        ? "Đang Vận Chuyển"
                        : order?.order_status == "completed" ?
                          'Hoàn Thành' : order?.order_status == "cancelled" ?
                            'bị hủy' : 'đang xử lý'
                      }
                      
                      
                    </span>
                  </td>
                  <td className='py-4 text-center px-2 text-[13px] font-medium text-gray-700 leading-4'>
                    {/* <button
                      onClick={()=>handleShow(order.order_id)}
                      className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
                    >
                      Xem
                    </button> */}
                    <button
                      onClick={() => handleCancel(order.order_id)}
                      className='ml-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded'
                    >
                      Huỷ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className='text-center py-4 text-gray-500'>
                  <div className='flex flex-col items-center justify-center my-10 p-6 rounded-lg  max-w-md mx-auto'>
                    <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
                      Bạn Chưa Mua Sản Phẩm Nào
                    </h2>
                    <p className='text-gray-600 mb-6'>
                      Hãy tìm một sản phẩm ưng ý và thêm vào giỏ hàng nhé.
                    </p>
                    <Link
                      to='/'
                      className='px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow transition'
                    >
                      Khám phá sản phẩm
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PageOrder
