import { Link, useLocation } from "react-router-dom"

const getItemsOfAccount = [
  {
    route: "/profile",
    title: "Hồ sơ",
  },
  {
    route: "/bank",
    title: "Ngân Hàng",
  },
  {
    route: "/address",
    title: "Địa chỉ",
  },
  {
    route: "/changepwd",
    title: "Đổi mật khẩu",
  },
 
]
const ItemsOfAccount = () => {
  const path = useLocation().pathname
  const getItems = () =>
    getItemsOfAccount.map(voucher => {
      const CheckPath = `/user/account${voucher.route}`

      return (
        <Link
          to={`/user/account${voucher.route}`}
          key={voucher.title}
          className={`py-1 hover:text-green-500 ${CheckPath === path ? "text-green-500" : ""} `}
        >
          {voucher?.title}
        </Link>
      )
    })
  return <nav className='flex flex-col animation duration-300 transition-all text-sm  text-slate-600 ml-8 py-1'>{getItems()}</nav>
}
export default ItemsOfAccount
