import { Link } from "react-router-dom"
const NavLinkPage = ({...Product}) => {
  return (
    <nav className='flex my-4 items-center  text-sm text-green-600  py-1'>
      <Link to={`/`} className='hover:underline'>
        Trang Chủ
      </Link>
      <p className='px-2 text-[12.5px] text-black'>/</p>
      <Link to={`/product/${Product?.id}`} className='hover:underline'>
        {Product?.name}
      </Link>
    </nav>
  )
}
export default NavLinkPage
