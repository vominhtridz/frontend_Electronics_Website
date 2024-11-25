import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from "../pages/Login/Login"
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/Signup/SignUp'
import PageCart from '../pages/cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import PageInformationProduct from '../pages/InformationProduct/InformationProduct'
import PageUsers from '../pages/User/PageUser'
import PageProfile from '../pages/User/Content/Account/PageProfile/PageProfile'
import PageUserNotifyCations from '../pages/User/Content/Account/NotifyCations/NotifyCations'
import PageBank from '../pages/User/Content/Account/Bank/Bank'
import PageAddress from '../pages/User/Content/Account/Address/Adress'
import UserNotifyCations from '../pages/User/Content/NotifiCations/NotifyCations'
import PageVoucherStore from '../pages/User/Content/SpecialOffers/VoucherStore/PageVoucherStore'
import PageOrder from '../pages/User/Content/PageOrder'
import {  UserChangePassword } from '../pages/User/Content/Account/reset_password'
import ProductFilterPage from '../pages/ProductFilterPage'
import { Reset_password } from '../pages/Login/reset_password'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/reset_password/:code",
        element: <Reset_password />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassowrd />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "product/:id",
        element: <PageInformationProduct />,
      },
      {
        path: "cart",
        element: <PageCart />,
      },
      {
        path: "search",
        element: <ProductFilterPage />,
      },
      {
        path: "user",
        element: <PageUsers />,
        children: [
          {
            path: "account/profile",
            element: <PageProfile />,
          },
          {
            path: "account/notifications",
            element: <PageUserNotifyCations />,
          },
          {
            path: "account/bank",
            element: <PageBank />,
          },
          {
            path: "account/changepwd",
            element: <UserChangePassword />,
          },
          {
            path: "account/address",
            element: <PageAddress />,
          },
          {
            path: "orders",
            element: <PageOrder />,
          },
          {
            path: "vouchers",
            element: <PageVoucherStore />,
          },
          {
            path: "notifications",
            element: <UserNotifyCations />,
          },
        ],
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
])


export default router