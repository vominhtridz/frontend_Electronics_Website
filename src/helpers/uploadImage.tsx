const url = `https://api.cloudinary.com/v1_1/dte1f6lzw/image/upload`

const uploadImage = async (image: string) => {
  const formData = new FormData()
  formData.append("file", image)
  formData.append("upload_preset", "uploadImage")
  formData.append("cloud_name", "dte1f6lzw")

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  })
  const uploadImageURL = await dataResponse.json()
  return uploadImageURL.url
}

export default uploadImage
