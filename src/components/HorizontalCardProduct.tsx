import { MouseEvent, useContext, useEffect, useRef, useState } from "react"
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct"
import displayINRCurrency from "../helpers/displayCurrency"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { Link } from "react-router-dom"
import addToCart from "../helpers/addToCart"
import Context from "../context"
import { ProductType } from "../typescript/HomeType"
import { server } from "../common/path"
import { handleBuyOrAddCart } from "./BuyOrAddCart"
import { useDispatch } from "react-redux"

interface HorizontalCardProductType {
  category_slug: string
  heading: string
}

const HorizontalCardProduct = ({ category_slug, heading }: HorizontalCardProductType) => {
  const [data, setData] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(5).fill(null) // Giảm số lượng placeholder khi loading
  const scrollElement = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const { fetchUserAddToCart }: any = useContext(Context)

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category_slug)
    setLoading(false)
    setData(categoryProduct?.data || [])
  }

  useEffect(() => {
    fetchData()
  }, [category_slug])

  const scrollRight = () => {
    if (scrollElement.current) scrollElement.current.scrollLeft += 300
  }

  const scrollLeft = () => {
    if (scrollElement.current) scrollElement.current.scrollLeft -= 300
  }

  const LoadingProduct = () =>
    loadingList.map((_, index) => (
      <div
        key={index}
        className='w-full min-w-[400px] h-40 bg-gray-100 rounded-md shadow animate-pulse flex items-center justify-center'
      >
        <div className='w-[120px] h-full bg-gray-200 animate-pulse'></div>
        <div className='p-4 flex flex-col gap-2 w-full'>
          <div className='h-4 bg-gray-300 rounded'></div>
          <div className='h-4 bg-gray-300 rounded w-2/3'></div>
          <div className='h-4 bg-gray-300 rounded w-1/2'></div>
        </div>
      </div>
    ))

  const getProduct = () =>
    data.map((product, index) => (
      <Link
        key={index}
        to={`/product/${product?.id}`}
        className='w-1/3 min-w-[100px] border border-gray-50 overflow-hidden h-44 bg-white rounded-md shadow flex transition-transform hover:shadow-lg'
      >
        <div className='bg-gray-100 h-full p-4 min-w-[120px] md:min-w-[145px]'>
          <img
            src={`${server}${product?.image}`}
            className='object-scale-down h-full w-full hover:scale-105 transition-transform duration-300'
            alt={product?.name}
          />
        </div>
        <div className='p-4 flex flex-col justify-between w-full'>
          <h2 className='font-medium text-lg text-gray-800 hover:underline line-clamp-1'>
            {product?.name}
          </h2>
          <p className='text-sm text-gray-600'>
            <strong>Màu Sắc:</strong> {product?.color}
          </p>
          <div className='flex gap-2 items-center'>
            <p className='text-red-600 font-semibold'>{displayINRCurrency(product?.price)}</p>
            <p className='text-gray-400 line-through'>
              {displayINRCurrency(product?.price)}
            </p>
          </div>
          <button
            className='text-sm z-10 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full transition-all'
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault()
              e.stopPropagation()
              handleBuyOrAddCart(false, {
                dispatch,
                product_id: product?.id,
                quantity: 1,
                price: product?.price,
                total_price: product?.price + 5000,
                fetchUserAddToCart,
              })
            }}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </Link>
    ))

  return (
    <div className='container mx-auto px-4 my-8 relative'>
      <h2 className='text-3xl font-semibold py-4'>{heading}</h2>

      <div
        className='flex items-center gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'
        ref={scrollElement}
      >
        <button
          className={`${data?.length > 3 ? "visible" : "hidden"} bg-white shadow-lg hover:scale-105 z-20 rounded-full p-3 absolute left-0 text-xl transition-transform`}
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>

        {loading ? LoadingProduct() : getProduct()}

        <button
          className={`${data?.length > 3 ? "visible" : "hidden"}  bg-white shadow-lg hover:scale-105 z-20 rounded-full p-3 absolute right-0 text-xl transition-transform`}
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

export default HorizontalCardProduct
