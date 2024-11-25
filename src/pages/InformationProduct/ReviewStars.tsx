import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import { ReviewType, customers } from '../../typescript/customerType'
import SummaryApi from '../../common'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../store/PageSlice'
import { toast } from 'react-toastify'
import imageTobase64 from '../../helpers/imageTobase64'
import uploadImage from '../../helpers/uploadImage'
import { Link } from 'react-router-dom'
function ReviewStars() {
  const user = useSelector((user: { user: { user: customers } }) => user?.user?.user)
  const [reviews, setReviews] = useState<ReviewType[]>([])
  const [content, setContent] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [image, setImage] = useState<string>('')
  const token = Cookies.get('token')
  const total_star = reviews.reduce((total, review) => total + review.rating, 0) 
  const user_id = Cookies.get("id")
  const dispatch = useDispatch();
  const { id } = useParams();

  const fetchReviews = async () => {
   try {
     const dataResponse = await axios.get(SummaryApi.get_review.url + "/" + id, {
       headers: {
         accept: "application/json",
       },
     })
     console.log(dataResponse)
     if (dataResponse.status === 200) { 
        const reviews = dataResponse?.data?.data
       setReviews(reviews)
     }
   } catch (error) {
     console.error("Error fetching user details:", error)
   }
  }
  useEffect(() => {
    fetchReviews()
  }, [reviews])
  const hadleAddReview = async(e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault()
    const URLPicture = image != '' ? await uploadImage(image): null
   const dataBank = {
     customer_id: user_id,
     content: content,
     product_id: id,
     rating: rating,
     images: URLPicture,
   }

   dispatch(setLoading(true))
   try {
     const response = await axios.post(SummaryApi.add_review.url, dataBank, {
       headers: {
         "Content-Type": "application/json",
         Accept: "application/json",
         Authorization: `Bearer ${token}`,
       },
     })
     if (response.status === 201) {
       toast.success(response.data.cuccess)
       dispatch(setLoading(false))
       fetchReviews()
       //clear state
       clearState()
     }
   } catch (error: any) {
     dispatch(setLoading(false))
     console.log(error)
     if (error.response) {
       toast.error(error.response?.data.error || error.response?.data?.error || "Lưu thất bại")
     } else if (error.request) {
       // Request was made but no response was received
       toast.error("server không phản hồi.")
     } else {
       // Something else happened
       toast.error("có lỗi xảy ra.")
     }
   }
  }
  const ChangeFile = async(e:any) => {
     const file = e.currentTarget?.files[0]
     const imagePic = await imageTobase64(file)
     setImage(imagePic as string)
  }
  const clearState = () => {
    setContent('')
    setImage('')
    setRating(0)
  }
  const handleRating = (index:number) => {
    setRating(index)
  }
  const ChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
  return (
    <section className='w-full  mx-auto bg-white  shadow-lg  mt-10  text-[14px] p-4 rounded-sm'>
      {/* Tiêu đề đánh giá */}
      <h2 className='text-3xl font-bold mb-6'>Đánh giá sản phẩm</h2>

      {/* Tổng quan đánh giá */}
      <div className='flex items-center space-x-6 mb-8'>
        <div className='flex items-center'>
          <span className='text-5xl font-bold text-yellow-500'>
            {reviews.length > 0 ? Math.round(total_star / reviews.length) : 5}
          </span>
          <span className='text-gray-600 ml-2'>/ 5</span>
        </div>
        <div className='flex'>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns='http://www.w3.org/2000/svg'
              fill={index < Math.floor(total_star / reviews.length) ? "#fbbf24" : "#e5e7eb"}
              viewBox='0 0 24 24'
              className='w-6 h-6'
            >
              <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
            </svg>
          ))}
        </div>
        <span className='text-gray-600'>({reviews?.length} đánh giá)</span>
      </div>

      {/* Danh sách đánh giá */}
      {reviews?.length > 0 ? (
        reviews.map((review: ReviewType, id) => {
          return (
            <div className='space-y-6' key={id}>
              <div className='border-b pb-6'>
                <div className='flex items-center justify-between'>
                  <h4 className='font-semibold flex items-center py-2'>
                    <img
                      className='w-12 h-12 p-0.5 rounded-full mr-2 ring-1 ring-gray-300 dark:ring-gray-500'
                      src={review?.customers?.image}
                      alt='Bordered avatar'
                    />
                    {review?.customers.name}
                  </h4>
                  <span className='text-sm text-gray-500'>{review?.updated_at}</span>
                </div>
                <div className='flex items-center mt-2'>
                  {[...Array(review?.rating)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns='http://www.w3.org/2000/svg'
                      fill={index < 5 ? "#fbbf24" : "#e5e7eb"}
                      viewBox='0 0 24 24'
                      className='w-5 h-5'
                    >
                      <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                    </svg>
                  ))}
                </div>
                <span className='mt-3 text-gray-700'>{review?.content}</span>
                {review?.images && (
                  <img
                    src={review?.images}
                    alt='Image preview'
                    className='w-24 h-24 my-2 object-cover rounded-lg max-w-xs max-h-xs'
                  />
                )}
              </div>
            </div>
          )
        })
      ) : (
        <div className='text-center text-2xl font-medium'>Chưa có đánh giá nào</div>
      )}
      {/* Form đánh giá mới */}
      {user_id && token ? (
        <form className='mt-8' onSubmit={hadleAddReview}>
          <h3 className='text-2xl font-bold mb-4'>Viết đánh giá của bạn</h3>

          <div className='mb-4'>
            <h4 className='font-semibold flex items-center '>
              <img
                className='w-12 h-12 p-0.5 rounded-full mr-2 ring-1 ring-gray-300 dark:ring-gray-500'
                src={user?.image}
                alt='Bordered avatar'
              />
              {user?.name}
            </h4>
          </div>

          <div className='mb-4'>
            <label className='block font-medium mb-2'>Đánh giá</label>
            <div className='flex items-center'>
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  onClick={() => handleRating(index + 1)}
                  className={`w-6 h-6 cursor-pointer hover:fill-yellow-500  ${rating >= index + 1 ? "fill-yellow-500" : ""}`}
                  fill='#e5e7eb'
                >
                  <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                </svg>
              ))}
            </div>
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2'>Hình Ảnh</label>
            {image && (
              <img
                src={image}
                alt='Image preview'
                className='w-24 h-24 my-2 object-cover rounded-lg max-w-xs max-h-xs'
              />
            )}
            <input
              type='file'
              onChange={ChangeFile}
              className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500'
              placeholder='Nhập bình luận của bạn'
            />
          </div>
          <div className='mb-4'>
            <label className='block font-medium mb-2'>Bình luận</label>
            <textarea
              rows={4}
              value={content}
              onChange={ChangeContent}
              className='w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500'
              placeholder='Nhập bình luận của bạn'
            />
          </div>

          <button
            type='submit'
            onClick={hadleAddReview}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300'
          >
            Gửi đánh giá
          </button>
        </form>
      ) : (
        <Link
          to={`/login`}
          className=' px-6 py-4  my-4 text-base block text-center text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300'
        >
          Đăng Nhập Để Đánh Giá Sản Phẩm 
        </Link>
      )}
    </section>
  )
}

export default ReviewStars
