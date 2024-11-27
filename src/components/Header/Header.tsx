import { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { GrSearch } from "react-icons/gr"
import { Link, useLocation, useNavigate } from "react-router-dom"
import UserHeader from "./UserHeader"
import { FilterProductType } from "../../typescript/ContextType"
import { useSelector } from "react-redux"
import { SettingType } from "../../typescript/HomeType"
import SummaryApi from "../../common"
import axios from "axios"
import { server } from "../../common/path"
import { loadImage } from "../../common/svgImage" 
const Header = () => {
  const navigate = useNavigate()
  const [settings,setSettings] = useState<SettingType>()
  const Filter_Product = useSelector(
    (state: { FilterProduct: { FilterProduct: FilterProductType | any } }) =>
      state.FilterProduct.FilterProduct,
  )
  const location = useLocation()
  const URLSearch = new URLSearchParams(location.search)
  const searchQuery = URLSearch.get("q") || ""
  const [search, setSearch] = useState(searchQuery)
  const [history, setHistory] = useState<string[]>([]) // Khởi tạo lịch sử tìm kiếm
  const [isFocused, setIsFocused] = useState(false)
  // Lưu lịch sử tìm kiếm
  useEffect(() => {
    if (search) {
      setHistory(prevHistory => {
        if (!prevHistory.includes(search)) {
          return [search, ...prevHistory].slice(0, 6) // Giới hạn tối đa 5 lịch sử
        }
        return prevHistory
      })
    }
  }, [search])
   const fetchSettings = async () => {
     try {
       const dataResponse = await axios.get(SummaryApi.get_settings.url, {
         headers: {
           accept: "application/json",
         },
       })
       if (dataResponse.status === 200) {
        
         const settings = dataResponse?.data?.data[0]
         setSettings(settings)
       }
     } catch (error) {
       console.error("Error fetching user details:", error)
     }
  }
 useEffect(() => {
   fetchSettings();
   if (settings) {
     const logo = document.querySelector("#logoIcon") as any;
     const titleWebsite = document.querySelector("#titleWebsite") as any
     if (logo) {
       logo.href = server + settings?.logo
       titleWebsite.innerHTML = settings?.web_name
     }
   }
 }, [settings])
  // Hàm xử lý tìm kiếm
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (search) {
      navigate(`/search?q=${search}`)
      setSearch('')
    }
  }

  // Xử lý khi click vào lịch sử tìm kiếm
  const handleHistoryClick = (term: string) => {
    setSearch(term)
    setIsFocused(false) // Ẩn lịch sử khi chọn
    navigate(`/search?q=${term}`)
  }

  // Hàm thay đổi giá trị input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className='h-full'>
          <Link to='/' className='h-full'>
            {settings ? (
              <img src={server + settings?.logo} className='h-full min-w-20' alt='' />
            ) : (
              loadImage
            )}
          </Link>
        </div>

        <div className='relative w-full max-w-sm'>
          <form
            action='#'
            onSubmit={handleSearch}
            autoComplete='off'
            className='flex items-center h-10 w-full border border-gray-300 rounded-full shadow-sm focus-within:shadow-lg'
          >
            <input
              type='text'
              placeholder='Tìm kiếm sản phẩm...'
              className='w-full py-2 pl-5 pr-14 h-full rounded-l-full outline-none text-sm text-gray-700 placeholder-gray-500 focus:ring-1 focus:ring-red-500 transition-all'
              onChange={handleChange}
              value={search}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay để không bị ẩn quá nhanh
            />
            <button
              type='submit'
              className='text-lg min-w-[50px] h-full bg-red-600 flex items-center justify-center rounded-r-full text-white hover:bg-red-700 transition-all'
            >
              <GrSearch />
            </button>
          </form>

          {/* Hiển thị lịch sử tìm kiếm */}
          {isFocused && search && (
            <div className='absolute left-0 right-0 bg-white shadow-lg rounded-lg max-h-40 overflow-auto z-10'>
              <h2 className='text-base pl-4 pt-2 font-bold text-blue-600 drop-shadow-lg'>
                Tìm kiếm
              </h2>

              <ul className='text-sm text-gray-700'>
                {history
                  .filter(term => term.toLowerCase().includes(search.toLowerCase()))
                  .map((term, index) => (
                    <li
                      key={index}
                      className='px-5 py-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => handleHistoryClick(term)}
                    >
                      {term}
                    </li>
                  ))}
                {history.filter(term => term.toLowerCase().includes(search.toLowerCase()))
                  .length === 0 && (
                  <li className='px-5 py-2 text-gray-500'>Không có kết quả tìm kiếm</li>
                )}
              </ul>
            </div>
          )}
        </div>

        <UserHeader />
      </div>
    </header>
  )
}

export default Header
