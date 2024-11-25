import { CategoryType } from "./HomeType"
import { ReviewType } from "./customerType"

export interface ContextType {
  fetchUserDetails: ()=>void
  fetchUserAddToCart: ()=>void
}
export  interface FilterProductType {
  id: number
  name: string
  quantity: number
  description: string
  image: string
  category_id: number
  color: string
  price: number
  status: string
  reviews: ReviewType[]
  categories: CategoryType
}