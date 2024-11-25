import { ProductType } from "./HomeType"

export interface CartType {
  id: number
  customer_id: number
  quantity: number
  price: string |any
  discount: number
  products: ProductType
  total_price: number
  product_id: number
  session_id: number
  created_at: string
  updated_at: string
}