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

const Routers = () => {
  const token_admin =  localStorage.getItem("token_admin")
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/admin/login" element = {<AdminLogin />} />
              <Route path="/admin/dashboard" element = {token_admin ? <Dashboard /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/categoryManagement" element = {token_admin ? <CategoryManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addCategory" element = {token_admin ? <AddCategory /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/productManagement" element = {token_admin ? <ProductManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addProduct" element = {token_admin ? <AddProduct /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/productDetail" element = {token_admin ? <ProductDetail /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/adminList" element = {token_admin ? <AdminManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addAdmin" element = {token_admin ? <AddAdmin /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/adminInfo" element = {token_admin ? <AdminInformation /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/deleteAccount" element = {token_admin ? <DeleteAccount /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/deleteAccountConfirm" element = {token_admin ? <DeleteAccountComfirm /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/orderManagement" element = {token_admin ? <OrderManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/orderDetail" element = {token_admin ? <OrderDetail /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/userList" element = {token_admin ? <UserManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/postManagement" element = {token_admin ? <PostManagement /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/postCategory" element = {token_admin ? <PostCategory /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/addPost" element = {token_admin ? <AddPost /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/postDetail" element = {token_admin ? <PostDetail /> : <Navigate to="/admin/login" />} />
              <Route path="/product" element = {<ProductDetailPage/>} />
              <Route path="/cart" element = {<Cart/>} />
              <Route path="/products" element = {<Product/>} />
              <Route path="/listProduct" element = {<SearchProductsResult/>} />
              <Route path="/login" element = {<Login/>} />
              <Route path="/signup" element = {<Register/>} />
              <Route path="/userInfo" element = {<UserInfo/>} />
              <Route path="/userDeleteAccount" element = {<UserDeleteAccount />} />
              <Route path="/userDeleteAccountCompleted" element = {<UserDeleteAccountCompleted />} />
              <Route path="/listOrderUser" element = {<ListOrderUser/>} />
              <Route path="/orderDetail" element = {<UserOrderDetail/>} />
              <Route path="/userOrderProduct" element = {<UserOrderPage/>} />
              <Route path="/paymentCompleted" element = {<UserPaymentCompleted/>} />
              <Route path="/aboutus" element = {<AboutUsPage/>} />
              <Route path="/posts" element = {<Posts/>} />
              <Route path="/postDetail" element = {<PostDetailUser/>} />
              <Route path="/" element = {<Home/>} />
              <Route path="*" element = {<NotFound/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default Routers