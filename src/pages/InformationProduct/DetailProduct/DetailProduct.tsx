import Describe from "./Describe"
import Detail from "./Detail"

const DetailProduct = ({...items}) => {
  return (
    <div className='p-4 border border-gray-200 text-[13.5px] shadow bg-white rounded-sm my-2'>
      {/* <Detail /> */}
      <Describe description={items?.description} />
    </div>
  )
}
export default DetailProduct
