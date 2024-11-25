const GoogleMap = () => {
  return (
    <div className='w-full '>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.083407994102!2d108.22699121033834!3d16.06116098455303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219d2f38ce45d%3A0xbfa47dd116d4db88!2zQ-G6p3UgUuG7k25nLCBBbiBI4bqjaSBUw6J5LCBTxqFuIFRyw6AsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1712286930947!5m2!1svi!2s'
        className='w-full h-[24rem]'
        style={{ border: 0 }}
        loading='lazy'
      ></iframe>
    </div>
  )
}

export default GoogleMap
