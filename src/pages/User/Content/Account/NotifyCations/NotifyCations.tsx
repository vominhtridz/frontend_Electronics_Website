
import ItemsNotifyCations from "./ItemsNotifyCations"

export const PageUserNotifyCations = () => {
  return (
    <section className='text-[17px] font-sans bg-white w-full p-4'>
      <div className='flex justify-between px-2 text-[20px] text-black    uppercase'>Cài đặt thông báo</div>
      <nav className='px-2 p-4'>
        <ItemsNotifyCations />
      </nav>
    </section>
  )
}
export default PageUserNotifyCations
