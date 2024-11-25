const Describe = ({ description }: { description: string }) => {
  return (
    <section className='w-full '>
      <h2 className='px-4 py-2 text-base font-semibold bg-slate-50 uppercase '>MÔ TẢ SẢN PHẨM</h2>
      <div className='text-base py-4' dangerouslySetInnerHTML={{ __html: description?.replace(/^"|"$/g, "") }}></div>
    </section>
  )
}

export default Describe
