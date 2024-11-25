
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div className=''>
      <BannerProduct />
      <CategoryList />
      <HorizontalCardProduct category_slug={"dien-thoai"} heading={"Điện thoại di động"} />
      <HorizontalCardProduct category_slug={"ti-vi"} heading={"Màn Hình Tivi"} />
      <HorizontalCardProduct category_slug={"xe-dap-dien"} heading={"Xe Đạp Điện"} />
      <HorizontalCardProduct category_slug={"lap-top"} heading={"Máy Tính Xách Tay"} />
    </div>
  )
}

export default Home