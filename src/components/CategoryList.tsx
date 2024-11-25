import { useEffect, useState } from "react"
import SummaryApi from "../common"
import { Link } from "react-router-dom"
import axios from "axios"
import { CategoryType } from "../typescript/HomeType"
import { server } from "../common/path"

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(8).fill(null) // Giảm số lượng placeholder khi loading

  const fetchCategoryProduct = async () => {
    setLoading(true)
    try {
      const response = await axios.get(SummaryApi.categoryProduct.url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      if (response.status === 200) {
        setCategoryProduct(response.data)
      }
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu danh mục:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  // Component hiển thị loading skeleton
  const LoadingCategories = () =>
    loadingList.map((_, index) => (
      <div
        className='w-20 h-20 md:w-24 md:h-24 bg-gray-200 rounded-full animate-pulse flex items-center justify-center'
        key={`categoryLoading-${index}`}
      ></div>
    ))

  // Component hiển thị danh mục sản phẩm
  const getCategories = () =>
    categoryProduct.map(product => (
      <Link
        to={`/search?category=${product.name}`}
        className='cursor-pointer text-center group'
        key={product.name}
      >
        <div className='w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-full bg-gray-100 p-2 flex items-center justify-center shadow-sm transition-transform group-hover:scale-105'>
          <img
            src={`${server}${product.image}`}
            alt={product.name}
            className='h-full object-scale-down mix-blend-multiply transition-transform duration-300 group-hover:scale-110'
          />
        </div>
        <p className='mt-2 text-sm md:text-base font-medium capitalize whitespace-nowrap'>
          {product.name}
        </p>
      </Link>
    ))

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-3xl font-semibold py-4'>Danh Mục</h2>

      <div className='flex items-center gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
        {loading ? LoadingCategories() : getCategories()}
      </div>
    </div>
  )
}

export default CategoryList
