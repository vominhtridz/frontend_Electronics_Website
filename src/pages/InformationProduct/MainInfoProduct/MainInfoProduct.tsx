import { ProductType } from "../../../typescript/HomeType"
import ImageItems from "./ImageItems"
import InforItems from "./InforItems/InforItems"

const MainInfoProduct = ({...items}) => {
  return (
    <section className=' flex shadow w-full bg-white border border-gray-200 text-slate-700 px-4 pt-6 rounded-md'>
      <ImageItems {...items} />
      <InforItems {...items} />
    </section>
  )
}
export default MainInfoProduct
