import { FC, useEffect, useState } from "react"
import { ProductType } from "../../../typescript/HomeType"
import SummaryApi from "../../../common"
import axios from "axios"
import { server } from "../../../common/path"
import { Link, useNavigate } from "react-router-dom"
import displayINRCurrency from "../../../helpers/displayCurrency"
interface MoreProductsType { id?: number  ,fetchProductDetail:()=>void}
const MoreProducts = ({ id, fetchProductDetail }: MoreProductsType) => {
  const [Products, setProducts] = useState<ProductType[]>([])
  const navigate = useNavigate();
  const fetchProduct = async () => {
    try {
      const dataResponse = await axios.get(SummaryApi.getAllProductCategoryById.url + "/" + id, {
        headers: {
          accept: "application/json",
        },
      })
      
      if (dataResponse.status === 200) {
        const product = dataResponse?.data;
        setProducts(product)
      }
    } catch (error) {
      console.error("Error fetching user details:", error)
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [id])
  const handleSeemore = () => {
    navigate(`/search`)
  }
  return (
    <section className='w-full my-4'>
      <div className=''>
        <h1 className='px-4 py-2 text-xl mt-14 font-bold uppercase border-b-2 border-slate-300'>
          Sản Phẩm Liên Quan
        </h1>
        <div className='flex items-center flex-wrap my-4'>
          {Products?.map((Product: ProductType) => {
        return (
          <Link
            to={`/product/${Product.id}`}
            className='relative w-1/5 '
            key={Product.id}
            onClick={() => {
              window.scrollTo(0, 0)
              window.location.reload();
            }}
          >
            <div className='my-2   bg-white  rounded-sm  hover:shadow-lg border border-gray-200 mx-2 cursor-pointer hover:ransition-all duration-200'>
              <img src={server + Product?.image} alt='' className='w-full h-1/2' />
              <label
                htmlFor=''
                className='absolute top-1 rounded-sm left-0 text-white bg-green-500 px-4 py-0.5 text-[12px]'
              >
                Hàng mới
              </label>
              <p className='rounded-full px-2 py-4 text-left text-ellipsis overlow-hidden max-h-[70px] text-sm '>
                {Product?.name}
              </p>
              <nav className='px-2 py-2 flex items-center justify-between '>
                <p className='text-sm text-green-600  '>{displayINRCurrency(Product?.price)} VNĐ</p>
                <div className='text-base flex items-center'>
                  <p className='text-sm pr-1'>Đã bán</p>
                  <p className='text-sm text-gray-500'>100</p>
                </div>
              </nav>
            </div>
          </Link>
        )
      })}
        </div>
      </div>
      <div className='flex justify-center'>
        <button onClick={handleSeemore} className='bg-blue-500 w-full hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out'>
          Xem thêm
        </button>
      </div>
    </section>
  )
}
export default MoreProducts
