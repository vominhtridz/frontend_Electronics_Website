const backendDomin = "https://laravel-server-electronics-website.onrender.com"

const SummaryApi = {
  signUP: {
    url: `${backendDomin}/api/customers/register`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomin}/api/orders/getall`,
    method: "post",
  },
  cancelled_OrderById: {
    url: `${backendDomin}/api/orders/handle_cancel`,
    method: "post",
  },
  tax: {
    url: `${backendDomin}/api/customers/tax/get`,
    method: "get",
  },
  shipfee: {
    url: `${backendDomin}/api/customers/shipfee/get`,
    method: "get",
  },
  checkout: {
    url: `${backendDomin}/api/orders/add`,
    method: "post",
  },
  signIn: {
    url: `${backendDomin}/api/customers/login`,
    method: "post",
  },
  current_user: {
    url: `${backendDomin}/api/customers/profile`,
    method: "post",
  },
  get_settings: {
    url: `${backendDomin}/api/settings/get`,
    method: "get",
  },
  forget_password: {
    url: `${backendDomin}/api/customers/verify`,
    method: "post",
  },
  reset_password: {
    url: `${backendDomin}/api/customers/resetpwd`,
    method: "post",
  },
  change_password: {
    url: `${backendDomin}/api/customers/changepwd`,
    method: "post",
  },
  add_bank: {
    url: `${backendDomin}/api/banks/add`,
    method: "post",
  },
  get_bank: {
    url: `${backendDomin}/api/banks`,
    method: "get",
  },
  get_review: {
    url: `${backendDomin}/api/reviews`,
    method: "get",
  },
  add_review: {
    url: `${backendDomin}/api/reviews/add`,
    method: "post",
  },
  edit_review: {
    url: `${backendDomin}/api/reviews/edit`,
    method: "post",
  },
  remove_review: {
    url: `${backendDomin}/api/reviews/delete`,
    method: "delete",
  },
  edit_bank: {
    url: `${backendDomin}/api/banks/edit`,
    method: "post",
  },
  remove_bank: {
    url: `${backendDomin}/api/banks/delete`,
    method: "delete",
  },
  filterProduct: {
    url: `${backendDomin}/api/customers/filter_product`,
    method: "get",
  },
  add_address: {
    url: `${backendDomin}/api/address/add`,
    method: "post",
  },
  get_address: {
    url: `${backendDomin}/api/address`,
    method: "get",
  },
  edit_address: {
    url: `${backendDomin}/api/address/edit`,
    method: "post",
  },
  remove_address: {
    url: `${backendDomin}/api/address/delete`,
    method: "delete",
  },
  logout_user: {
    url: `${backendDomin}/api/customers/logout`,
    method: "post",
  },
  refresh: {
    url: `${backendDomin}/api/customers/refresh`,
    method: "post",
  },
  allUser: {
    url: `${backendDomin}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomin}/api/customers/edit`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomin}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomin}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomin}/api/update-product`,
    method: "post",
  },
  categoryProduct: {
    url: `${backendDomin}/api/customers/categories/`,
    method: "get",
  },
  getAllProductCategoryById: {
    url: `${backendDomin}/api/customers/products/categories`,
    method: "get",
  },
  categoryWiseProduct: {
    url: `${backendDomin}/api/category-product`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomin}/api/customers/product`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomin}/api/cart/add`,
    method: "post",
  },
  removeCartbyId: {
    url: `${backendDomin}/api/cart/delete`,
    method: "post",
  },
  getCustomerCart: {
    url: `${backendDomin}/api/cart`,
    method: "get",
  },
  addToCartProductView: {
    url: `${backendDomin}/api/view-card-product`,
    method: "get",
  },
  getBanner: {
    url: `${backendDomin}/api/customers/banners`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomin}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${backendDomin}/api/delete-cart-product`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomin}/api/search`,
    method: "get",
  },
}

export default SummaryApi
