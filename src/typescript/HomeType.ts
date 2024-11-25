export interface CategoryType {
  id: number
  name: string
  slug: string
  description: string
  image: string
  parent_id: number
}
export interface ProductType {
  id: number
  name: string
  quantity:number
  description: string
  image: string
  category_id: number
  color: string
  price: number
  status: string
}

export interface bannerType {
  id: number
  name: string
  image_url: string
  link_url: string
  start_date: Date
  end_date: Date
  status: string
  description: string
}
export interface SettingType {
  web_name: string
  email: string
  logo: string
  create_at: Date
  update_at: Date
}