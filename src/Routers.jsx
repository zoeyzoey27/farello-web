import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/user/HomePage'
import Product from './pages/user/Products'
import ProductDetailPage from './pages/user/ProductDetailPage'
import Cart from './pages/user/Cart'
import NotFound from './pages/common/NotFound'
import AdminLogin from './pages/admin/AdminLogin'
import CategoryManagement from './pages/admin/CategoryManagement'
import AddCategory from './pages/admin/AddCategory'
import ProductManagement from './pages/admin/ProductManagement'
import AddProduct from './pages/admin/AddProduct'
import ProductDetail from './pages/admin/ProductDetail'
import AdminManagement from './pages/admin/AdminManagement'
import AddAdmin from './pages/admin/AddAdmin'
import AdminInformation from './pages/admin/AdminInformation'
import DeleteAccount from './pages/admin/DeleteAccount'
import DeleteAccountComfirm from './pages/admin/DeleteAccountComfirm'
import OrderManagement from './pages/admin/OrderManagement'
import OrderDetail from './pages/admin/OrderDetail'
import UserManagement from './pages/admin/UserManagement'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import UserInfo from './pages/user/UserInfo'
import ListOrderUser from './pages/user/ListOrderUser'
import UserOrderDetail from './pages/user/UserOrderDetail'
import UserDeleteAccount from './pages/user/UserDeleteAccount'
import UserDeleteAccountCompleted from './pages/user/UserDeleteAccountCompleted'
import UserOrderPage from './pages/user/UserOrderPage'
import UserPaymentCompleted from './pages/user/UserPaymentCompleted'
import AboutUsPage from './pages/user/AboutUsPage'
import SearchProductsResult from './pages/user/SearchProductsResult'
import Dashboard from './pages/admin/Dashboard'
import PostManagement from './pages/admin/PostManagement'
import PostCategory from './pages/admin/PostCategory'
import AddPost from './pages/admin/AddPost'
import PostDetail from './pages/admin/PostDetail'
import Posts from './pages/user/Posts'
import PostDetailUser from './pages/user/PostDetail'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'
import Contact from './pages/user/Contact'
import InquiryManagement from './pages/admin/InquiryManagement'
import { PrivateRoutes, UserRoutes, UnLoggedRoutes } from './PrivateRoutes'

const Routers = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/admin/login" element = {<AdminLogin />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/admin/dashboard" element = {<Dashboard />} />
                <Route path="/admin/categoryManagement" element = {<CategoryManagement />} />
                <Route path="/admin/addCategory" element = {<AddCategory />} />
                <Route path="/admin/productManagement" element = {<ProductManagement />} />
                <Route path="/admin/addProduct" element = {<AddProduct />} />
                <Route path="/admin/productDetail" element = {<ProductDetail />} />
                <Route path="/admin/adminList" element = {<AdminManagement />} />
                <Route path="/admin/addAdmin" element = {<AddAdmin />} />
                <Route path="/admin/adminInfo" element = {<AdminInformation />} />
                <Route path="/admin/deleteAccount" element = {<DeleteAccount />} />
                <Route path="/admin/deleteAccountConfirm" element = {<DeleteAccountComfirm />} />
                <Route path="/admin/orderManagement" element = {<OrderManagement />} />
                <Route path="/admin/orderDetail" element = {<OrderDetail />} />
                <Route path="/admin/userList" element = {<UserManagement />} />
                <Route path="/admin/postManagement" element = {<PostManagement />} />
                <Route path="/admin/postCategory" element = {<PostCategory />} />
                <Route path="/admin/addPost" element = {<AddPost />} />
                <Route path="/admin/postDetail" element = {<PostDetail />} />
                <Route path="/admin/inquiryManagement" element = {<InquiryManagement />} />
              </Route>
              <Route element={<UserRoutes />}>
                 <Route path="/cart" element = {<Cart/>} />
                 <Route path="/userInfo" element = {<UserInfo/>} />
                 <Route path="/userDeleteAccount" element = {<UserDeleteAccount />} />
                 <Route path="/userDeleteAccountCompleted" element = {<UserDeleteAccountCompleted />} />
                 <Route path="/listOrderUser" element = {<ListOrderUser/>} />
                 <Route path="/orderDetail" element = {<UserOrderDetail/>} />
                 <Route path="/userOrderProduct" element = {<UserOrderPage/>} />
                 <Route path="/paymentCompleted" element = {<UserPaymentCompleted/>} />
              </Route>
              <Route element={<UnLoggedRoutes />}>
                 <Route path="/login" element = {<Login/>} />
                 <Route path="/signup" element = {<Register/>} />
                 <Route path="/forgotPassword" element = {<ForgotPassword/>} />
                 <Route path="/resetPassword" element = {<ResetPassword/>} />
              </Route>
              <Route path="/product" element = {<ProductDetailPage/>} />
              <Route path="/products" element = {<Product/>} />
              <Route path="/listProduct" element = {<SearchProductsResult/>} />
              <Route path="/aboutus" element = {<AboutUsPage/>} />
              <Route path="/posts" element = {<Posts/>} />
              <Route path="/postDetail" element = {<PostDetailUser/>} />
              <Route path="/contact" element = {<Contact/>} />
              <Route path="/" element = {<Home/>} />
              <Route path="*" element = {<NotFound/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default Routers