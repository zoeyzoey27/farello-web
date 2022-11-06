import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

const Routers = () => {
  const tokenAdmin = localStorage.getItem("token_admin")
  const token = localStorage.getItem("token")
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/admin/login" element = {<AdminLogin />} />
              <Route path="/admin/dashboard" element = {tokenAdmin ? <Dashboard /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/categoryManagement" element = {tokenAdmin ? <CategoryManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addCategory" element = {tokenAdmin ? <AddCategory /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/productManagement" element = {tokenAdmin ? <ProductManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addProduct" element = {tokenAdmin ? <AddProduct /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/productDetail" element = {tokenAdmin ? <ProductDetail /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/adminList" element = {tokenAdmin ? <AdminManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addAdmin" element = {tokenAdmin ? <AddAdmin /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/adminInfo" element = {tokenAdmin ? <AdminInformation /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/deleteAccount" element = {tokenAdmin ? <DeleteAccount /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/deleteAccountConfirm" element = {tokenAdmin ? <DeleteAccountComfirm /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/orderManagement" element = {tokenAdmin ? <OrderManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/orderDetail" element = {tokenAdmin ? <OrderDetail /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/userList" element = {tokenAdmin ? <UserManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/postManagement" element = {tokenAdmin ? <PostManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/postCategory" element = {tokenAdmin ? <PostCategory /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addPost" element = {tokenAdmin ? <AddPost /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/postDetail" element = {tokenAdmin ? <PostDetail /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/inquiryManagement" element = {tokenAdmin ? <InquiryManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/product" element = {<ProductDetailPage/>} />
              <Route path="/cart" element = {token ? <Cart/> : <Navigate to="/login" />} />
              <Route path="/products" element = {<Product/>} />
              <Route path="/listProduct" element = {<SearchProductsResult/>} />
              <Route path="/login" element = {!token ? <Login/> : <Navigate to="/" />} />
              <Route path="/signup" element = {!token ? <Register/> : <Navigate to="/" />} />
              <Route path="/userInfo" element = {token ? <UserInfo/> : <Navigate to="/login" />} />
              <Route path="/userDeleteAccount" element = {token ? <UserDeleteAccount /> : <Navigate to="/login" />} />
              <Route path="/userDeleteAccountCompleted" element = {token ? <UserDeleteAccountCompleted /> : <Navigate to="/login" />} />
              <Route path="/listOrderUser" element = {token ? <ListOrderUser/> : <Navigate to="/login" />} />
              <Route path="/orderDetail" element = {token ? <UserOrderDetail/> : <Navigate to="/login" />} />
              <Route path="/userOrderProduct" element = {token ? <UserOrderPage/> : <Navigate to="/login" />} />
              <Route path="/paymentCompleted" element = {token ? <UserPaymentCompleted/> : <Navigate to="/login" />} />
              <Route path="/aboutus" element = {<AboutUsPage/>} />
              <Route path="/posts" element = {<Posts/>} />
              <Route path="/postDetail" element = {<PostDetailUser/>} />
              <Route path="/forgotPassword" element = {!token ? <ForgotPassword/> : <Navigate to="/" />} />
              <Route path="/resetPassword" element = {!token ? <ResetPassword/> : <Navigate to="/login" />} />
              <Route path="/contact" element = {<Contact/>} />
              <Route path="/" element = {<Home/>} />
              <Route path="*" element = {<NotFound/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default Routers