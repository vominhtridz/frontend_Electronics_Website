

import SummaryApi from "../common"
import axios from "axios"
import Cookies from "js-cookie"
import { setLoading } from "../store/PageSlice"
import { toast } from "react-toastify"


interface DataType {
  dispatch: any // Đảm bảo `dispatch` là function
  total_price: number
  product_id: number
  quantity: number
  price: number
  fetchUserAddToCart: () => void
  navigate?: any
}

export const handleBuyOrAddCart = async (redirect1: boolean, data: DataType) => {
  const token = Cookies.get("token")
  const userid = Cookies.get("id")
  // Đảm bảo rằng các tham số luôn có giá trị hợp lệ
  if (!token || !userid) {
    toast.error("Bạn cần phải đăng nhập.")
    window.location.href = '/login';
    return
  }
  const dataCart = {
    customer_id: userid,
    product_id: data.product_id,
    quantity: data.quantity,
    discount: null, // Nếu không có giảm giá, set là 0
    session_id: null,
  }

  data.dispatch(setLoading(true))

  try {
    const response = await axios.post(SummaryApi.addToCartProduct.url, dataCart, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.success) {
      toast.success(response.data.success || "Thêm vào giỏ hàng thành công") // Sửa từ `cuccess` thành `success`
      // Giả sử bạn có hàm `fetchUserBank` ở đâu đó, hãy gọi nó nếu cần thiết
      data.fetchUserAddToCart()
      data.dispatch(setLoading(false))
    }
  } catch (error: any) {
    data.dispatch(setLoading(false)) // Đảm bảo gọi đúng `data.dispatch`
    console.log(error)
    if (error.response) {
      toast.error(error.response?.data.error || error.response?.data?.error || "Lưu thất bại")
    } else if (error.request) {
      toast.error("Server không phản hồi.")
    } else {
      toast.error("Có lỗi xảy ra.")
    }
  }

  // Điều hướng nếu `redirect1` là true
  if (redirect1) {
    data.navigate("/cart")
  }
}
