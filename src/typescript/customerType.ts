export interface OrderType {
  order_id: number
  name: string
  description: string
  image: string
  category_id: number
  color: number
  price: number
  status: string
}
export interface BankType {
  id: number
  name: string
  default: boolean
  bank_name: string
  branch_name: number
  cccd: number
  stk: number
  customer_id: number
}
export interface ProductType {
  id: number
  category_id: number
  price: number | string
  quantity: number
  image: string
  color: string
  name: string
  description: string
  status: string
}
export interface AddressType {
  id: number
  name: string
  default: boolean
  detail_address: string
  city_address?: string
  postal_code: number | string
  phonenumber: number | string
  customer_id: number
}
export interface customers {
  customer_id: number
  name: string
  email: string
  password: string
  phonenumber?: string
  address: string
  zip_code: number
  image: string
  status: string
  birthday: string
}
export interface ReviewType {
  id: number
  content: string
  customers: customers
  images: string
  rating: number
  product_id: number
  customer_id: number
  updated_at: string
  created_at: string
}
export interface taxType {
  id: number
  tax_rate: number
  name: string
  description: string
  tax_type: string
  start_date: Date
  end_date: Date
  currency: string
  region: string
  exemption_criteria: string
  is_vat: boolean
  applicable_to: string
  status: string
  updated_at: string
  created_at: string
}
export interface ShipfeeType {
  id: number
  shipping_fee: number
  shipfee_type: string
  discount_amount: number
  is_free_shipping: boolean
  status: string
  updated_at: string
  created_at: string
}
export interface OrderType {
  order_id: number
  customer_id: number
  order_date: Date
  payment_date: Date
  shipped_date: Date
  delivered_date: Date
  order_status: string
  payment_status?: string
  shipping_address: string
  shipping_method: string
  payment_method: string
  total_amount: number
  notes: string
  order_items: any
  customers: customers
}