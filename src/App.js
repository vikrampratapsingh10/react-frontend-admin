import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './component/home/Home';
import Category from './component/category/Category';
import Product from './component/product/Product';
import Customer from './component/customer/Customer';
import Seller from './component/seller/Seller';

import AddCategory from './component/category/AddCategory';
import PendingSeller from './component/seller/PendingSeller';
import MainContent from './component/main-content/MainContent';
import SellerProducts from './component/seller/SellerProducts';
import CustomerProductList from './component/customer/CustomerProductList';
import ProductDescription from './component/product/ProductDescription';
import SignIn from './component/admin/signin/signin';
import Order from './component/orders/order';
import OrderList from './component/orders/OrderList';
import UpdateProduct from './component/product/UpdataProduct';
import SellerDetail from './component/seller/SellerDetail';
import SellerViewCustomer from './component/seller/SellerViewCustomer';
import CustomerOrderItem from './component/customer/CustomerOrderItem';



function App() {
  return <>
    <Routes>
      
      <Route path='/' element={<SignIn/>} /> 
      <Route path='/home' element={<Home />} >
        <Route path='/home' element={<MainContent />} />
        <Route path='/home/category' element={<Category />} />
        <Route path='/home/product' element={<Product />} />
        <Route path='/home/updateproduct' element={<UpdateProduct/>} />
        <Route path='/home/customer' element={<Customer />} />
        <Route path='/home/seller' element={<Seller />} />
        <Route path='/home/order' element={<Order/>} />
        <Route path='/home/orderlist' element={<OrderList/>} />
        <Route path='/home/addcategory' element={<AddCategory />} />
        <Route path="/home/addcategory/:id" element={<AddCategory />} />
        <Route path='/home/pendingseller' element={<PendingSeller />} />
        <Route path='/home/sellerlist' element={<SellerProducts/>} />
        <Route path='/home/sellerdetail' element={<SellerDetail/>} />
        <Route path="/home/sellerviewcustomer" element={<SellerViewCustomer/>} />
        <Route path='/home/customerproductlist' element={<CustomerProductList/>} />
        <Route path='/home/customerorderitem' element={<CustomerOrderItem/>} />
        <Route path='/home/productdescription' element={<ProductDescription/>}/>
      </Route>

    </Routes>
  </>
}

export default App;
