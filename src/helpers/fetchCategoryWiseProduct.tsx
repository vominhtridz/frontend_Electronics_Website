import axios from "axios"
import SummaryApi from "../common"

const fetchCategoryWiseProduct = async(category:string)=>{
    const response = await axios.get(SummaryApi.categoryProduct.url + category, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response
}

export default fetchCategoryWiseProduct