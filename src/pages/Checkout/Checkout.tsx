
import DeliveryAddress from "./DeliveryAddress"
import ProductPayments from "./ProductPayments/ProductPayments"
import MessageShop from "./MessageShop"
import PaymentMethod from "./PaymentMethod"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SummaryApi from "../../common"
import axios from "axios"
import { AddressType, ShipfeeType, taxType } from "../../typescript/customerType"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../store/PageSlice"
import { toast } from "react-toastify"
import { CartType } from "../../typescript/CartType"
import DisplayInforBank from "../../components/DisplayInforBank"
import { SettingType } from "../../typescript/HomeType"
const Checkout = () => {
  const userid = Cookies.get("id")
  const navigate = useNavigate()
  const token = Cookies.get("token")
  const [delivery_type, setDelivery_type] = useState<string>('nhanh')
  const [message, setMessage] = useState<string>("")
  const [Province, setProvince] = useState<string>("")
  const [Payment_method, setPayment_method] = useState<string>("cod")
  const [payment_type, setpayment_type] = useState<string>("cod")
  const [taxs, setTaxs] = useState<taxType | any>(null)
  const [UserAddr, setUserAddr] = useState<AddressType | any>(null)
  const [settings, setSettings] = useState<SettingType | any>(null)
  const [isBank, setIsBank] = useState<boolean>(false)
  const cart = useSelector((state: any) => state?.cart?.cart)
  const total = cart
    ?.reduce(
      (sum: any, item: CartType) => sum + Number(item?.products?.price) * item?.quantity,
      0, // Giá trị khởi tạo
    )
  const [Shipfees, setShipfees] = useState<ShipfeeType | any>(null)
  const floatTotal = parseFloat(total)
  const shipfeeTotal = parseFloat(Shipfees?.shipping_fee as any)
  const vat = cart?.reduce(
    (sum: any, item: CartType) => sum + (item?.quantity * (Number(item?.products?.price) * (Number(taxs?.tax_rate) / 100))),
    0, // Giá trị khởi tạo
  )

  const total_amount = floatTotal + shipfeeTotal + vat
  const dispatch = useDispatch()
  const [delivered_date, setDelivered_date] = useState<Date | any>(() => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 10) // Cộng thêm 10 ngày
    return currentDate
  })
  
  useEffect(() => {
    if (!token || !userid) {
      navigate("/login")
    }
  }, [])
  const fetchSettings = async () => {
      dispatch(setLoading(true))

    try {
      const dataResponse = await axios.get(SummaryApi.get_settings.url, {
        headers: {
          accept: "application/json",
        },
      })
      if (dataResponse.status === 200) {
      dispatch(setLoading(false))

        const settings = dataResponse?.data?.data[0]
        setSettings(settings)
      }
    } catch (error) {
      dispatch(setLoading(false))

      console.error("Error fetching user details:", error)
    }
  }
  const fetchShipfee = async () => {
      dispatch(setLoading(true))

    try {
      const dataResponse = await axios.get(SummaryApi.shipfee.url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (dataResponse.status === 200) {
      dispatch(setLoading(false))

        const shipfees =
          Province.toLowerCase() == "đà nẵng"
            ? dataResponse?.data?.data[0]
            : dataResponse?.data?.data[1]
        setShipfees(shipfees)
      }
    } catch (error) {
      dispatch(setLoading(false))

      console.error("Error fetching user details:", error)
    }
  }

  const fetchTax = async () => {
      dispatch(setLoading(true))

    try {
      const dataResponse = await axios.get(SummaryApi.tax.url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (dataResponse.status === 200) {
      dispatch(setLoading(false))

        const tax = dataResponse?.data?.data[0]
        setTaxs(tax)
      }
    } catch (error) {
      dispatch(setLoading(false))

      console.error("Error fetching user details:", error)
    }
  }
  const fetchUserAddress = async () => {
      dispatch(setLoading(true))

    try {
      const dataResponse = await axios.get(SummaryApi.get_address.url + "/" + userid, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (dataResponse.status === 200) {
      dispatch(setLoading(false))

        const addresses = dataResponse?.data?.data
        const address =
          addresses.find((address: AddressType) => address?.default == true) ||
          dataResponse?.data?.data[0]
        setUserAddr(address)
      }
    } catch (error) {
      dispatch(setLoading(false))

      console.error("Error fetching user details:", error)
    }
  }
  useEffect(() => {
    fetchTax()
    fetchShipfee()
    fetchUserAddress()
    fetchSettings()
  }, [])

  const handlePayment = async () => {
    if (cart?.length < 1) return;
    const date = new Date();

    let dataOrder = {
      customer_id: userid,
      delivered_date: delivered_date,
      shipped_date: null,
      payment_date: payment_type == "bank" ? date : delivered_date,
      order_date: date,
      payment_status: "success",
      shipping_address: Province,
      shipping_method: delivery_type.toLowerCase(),
      total_amount: total_amount,
      products: cart,
      address_id: UserAddr?.id,
      notes: message ? message : null,
      total_price: floatTotal,
      payment_method: Payment_method.toLowerCase(),
      order_status: "processing",
    }
    if (Payment_method.toLowerCase() == "bank") {
      dataOrder.order_status = "confirm_bank"
      dataOrder.payment_status = "confirm_bank"
    }

    dispatch(setLoading(true))
    try {
      const response = await axios.post(SummaryApi.checkout.url, dataOrder, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        toast.success(response.data.success || "Đặt Hàng thành công") // Sửa từ `cuccess` thành `success`
        if (payment_type === "bank") {
          setIsBank(true)
        }
        clearState()
        navigate("/user/orders")
        dispatch(setLoading(false))
      }
    } catch (error: any) {
      dispatch(setLoading(false)) // Đảm bảo gọi đúng `data.dispatch`
      console.log(error)
      if (error.response) {
        toast.error(error.response?.data.error || error.response?.data?.error || "Lưu thất bại")
      } else if (error.request) {
        toast.error("Server không phản hồi.")
      } else {
        toast.error("Có lỗi xảy ra.")
      }
    }
  }
  const clearState = () => {
    setMessage("")
    setDelivered_date(null)
    setProvince("")
    setPayment_method("")
    setpayment_type("")
    setTaxs(null)
    setUserAddr(null)
    setShipfees(null)
    dispatch(setLoading(false)) // đảm bảo gọi đúng `data.dispatch`
    handleRemoveAll()
  }
  const handleRemoveAll = async () => {
    if (!cart) {
      return
    }
    dispatch(setLoading(true))
    try {
      const dataResponse = await axios.delete(SummaryApi.removeCartbyId.url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (dataResponse.status === 200) {
        dispatch(setLoading(false))
        Cookies.remove("bank_id")
      }
    } catch (error) {
      dispatch(setLoading(false))
      console.error("Error deleting cart item:", error)
       
    }
  }
  const handleClose = () => {
    setIsBank(false)
    Cookies.remove("bank_id")
    clearState()
    navigate("/user/orders")
  }
  return (
    <div className='py-6 px-16 '>
      {!isBank && (
        <div>
          <DeliveryAddress
            fetchUserAddress={fetchUserAddress}
            UserAddr={UserAddr}
            setProvince={setProvince}
            Province={Province}
          />
          <ProductPayments />
          <MessageShop
            setDelivered_date={setDelivered_date}
            delivered_date={delivered_date}
            delivery_type={delivery_type}
            setDelivery_type={setDelivery_type}
            setMessage={setMessage}
            message={message}
          />
          {/* <VoucherPayment /> */}
          <PaymentMethod
            tax={taxs}
            floatTotal={floatTotal}
            total_amount={total_amount}
            shipfeeTotal={shipfeeTotal}
            Shipfees={Shipfees}
            handlePayment={handlePayment}
            setPayment_method={setPayment_method}
            Payment_method={Payment_method}
            setpayment_type={setpayment_type}
            payment_type={payment_type}
          />
        </div>
      )}
      {isBank && <DisplayInforBank infor={settings?.infor_bank} onClose={handleClose} />}
    </div>
  ) 
  
  
}

export default Checkout
