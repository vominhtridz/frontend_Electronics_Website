import  { useEffect, useState } from "react"
import { AiFillStar } from "react-icons/ai"
import {  useSearchParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { FilterProductType } from "../typescript/ContextType"
import { Link } from "react-router-dom"
import { server } from "../common/path"
import displayINRCurrency from "../helpers/displayCurrency"
import { CategoryType } from "../typescript/HomeType"
import axios from "axios"
import SummaryApi from "../common"

// Dữ liệu mẫu sản phẩm


const ProductFilterPage = () => {
  // State cho tìm kiếm và lọc
   const [searchParams] = useSearchParams()
   const searchQuery = searchParams.get("q") || ''
   const searchQuery1 = searchParams.get("category") || ""
  const Filter_Product = useSelector(
    (Filter_Product: {
      FilterProduct: {
        FilterProduct: FilterProductType|any
      }
    }) => Filter_Product?.FilterProduct?.FilterProduct,
  )
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState<CategoryType[]>([])
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000000);
  // const [rating, setRating] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState<any>(Filter_Product)
   const fetchCategoryProduct = async () => {
     try {
       const response = await axios.get(SummaryApi.categoryProduct.url, {
         headers: {
           "Content-Type": "application/json",
           Accept: "application/json",
         },
       })
       if (response.status === 200) {
         setCategories(response.data)
       }
     } catch (err) {
       console.error("Lỗi khi tải dữ liệu danh mục:", err)
     } 
   }

  
  // Hàm lọc sản phẩm dựa trên từ khóa và bộ lọc
  const filterProducts = () => {
    const products = Filter_Product?.filter(
      (FilterProduct: FilterProductType) =>
        FilterProduct.name.toLowerCase().includes(searchQuery?.toLowerCase()) &&
        (category ? FilterProduct?.categories?.name === category : true) &&
 
        FilterProduct.price >= minPrice &&
        FilterProduct.price <= maxPrice
        
    )
    setFilteredProducts(products)
  }
  // Gọi hàm lọc khi các điều kiện thay đổi
  useEffect(() => {
    filterProducts()
  }, [searchQuery, category, minPrice, maxPrice, Filter_Product, categories])
  useEffect(() => {
    fetchCategoryProduct()
  }, [])
  
  return (
    <div className='p-6 flex gap-6 bg-gray-50 min-h-screen'>
      {/* Sidebar */}
      <aside className='w-1/4 bg-white p-6 shadow rounded-md'>
        <h2 className='text-xl font-semibold mb-4'>Bộ lọc sản phẩm</h2>

        {/* Bộ lọc danh mục */}
        <div className='mb-6'>
          <label className='block mb-2 font-medium'>Danh mục</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className='w-full border p-2 rounded'
            
          >
            <option value=''>Tất cả</option>
            {categories?.map(cat => (
              <option key={cat.id}   value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Bộ lọc giá */}
        <div className='mb-6'>
          <label className='block mb-2 font-medium'>Khoảng giá (VNĐ)</label>
          <input
            type='number'
            placeholder='Giá thấp nhất'
            className='w-full border p-2 rounded mb-2'
            value={minPrice}
            onChange={e => setMinPrice(Number(e.target.value))}
          />
          <input
            type='number'
            placeholder='Giá cao nhất'
            className='w-full border p-2 rounded'
            value={maxPrice}
            onChange={e => setMaxPrice(Number(e.target.value))}
          />
        </div>

        {/* Bộ lọc xếp hạng */}
        {/* <div className='mb-6'>
          <label className='block mb-2 font-medium'>Xếp hạng</label>
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`text-xl ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
              >
                <AiFillStar />
              </button>
            ))}
          </div>
        </div> */}
      </aside>

      {/* Content - Danh sách sản phẩm */}
      <main className='flex-1 bg-white p-6 shadow rounded-md'>
        <h2 className='text-xl font-semibold mb-6'>Kết quả tìm kiếm</h2>
        {filteredProducts?.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredProducts?.map((product: any) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className='group block border p-4 rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-1 hover:border-blue-500'
              >
                <div className='relative'>
                  <img
                    src={server + product?.image}
                    alt={product?.name}
                    className='w-full h-56 object-cover rounded-lg group-hover:opacity-90 transition duration-300'
                  />
                  <span className='absolute top-2 right-2 bg-blue-500 text-white text-sm px-2 py-1 rounded'>
                    {displayINRCurrency(parseInt(product.price))} VNĐ
                  </span>
                </div>
                <h3 className='font-semibold text-lg mt-4 text-gray-800 group-hover:underline group-hover:text-blue-600 transition duration-300'>
                  {product.name}
                </h3>
                <p className='text-gray-600 mt-1'>
                  Giá: {displayINRCurrency(parseInt(product.price))} VNĐ
                </p>
                {/* <div className='flex items-center mt-2'>
                  {[...Array(product.rating)].map((_, i) => (
                    <AiFillStar key={i} className='text-yellow-500' />
                  ))}
                </div> */}
              </Link>
            ))}
          </div>
        ) : (
          <p className='text-gray-500 text-center'>Không có sản phẩm phù hợp.</p>
        )}
      </main>
    </div>
  )
}

export default ProductFilterPage
