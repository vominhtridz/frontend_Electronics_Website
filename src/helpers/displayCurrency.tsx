const displayINRCurrency = (num:number) => {
    const formatter = new Intl.NumberFormat('vn',{
  
        minimumFractionDigits : 0
    })

    return formatter.format(num)

}

export default displayINRCurrency