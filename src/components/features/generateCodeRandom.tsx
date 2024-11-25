// utils/randomCodeGenerator.js
export const generateRandomCode = (length = 8) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!_+"
  let code = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    code += characters[randomIndex]
  }

  return code
}
export const formatDate = (dateString:Date) => {
  const date = new Date(dateString)
  const day = parseInt(date.getDate().toString().padStart(2, "0")) // Lấy ngày, thêm '0' nếu cần
  const month = parseInt((date.getMonth() + 1).toString().padStart(2, "0")) // Lấy tháng (0-11), thêm '0' nếu cần
  const year = date.getFullYear() // Lấy năm
  const data = {
    day,
    month,
    year,
  }
  return data;
}
