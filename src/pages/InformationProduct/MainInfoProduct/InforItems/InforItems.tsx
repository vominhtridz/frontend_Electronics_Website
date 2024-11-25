import NecessaryInfor from "./NecessaryInfo/NecessaryInfo"
import ProductPrices from "./ProductPrices"
import ShopEnsure from "./ShopEnsure"

const InforItems = ({...items}) => {
  return (
    <div className='text-slate-700 w-full text-[11px] px-10'>
      <h2 className='text-[23px] font-semibold   text-slate-600'>{items.name}</h2>
      <ProductPrices price={items?.price} />
      <NecessaryInfor {...items} />
      <ShopEnsure  />
    </div>
  )
}
export default InforItems
