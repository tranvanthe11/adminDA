import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext, useEffect, useState } from 'react';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import ProductUpload from './pages/ProductUpload';

const MyContext = createContext();

function App() {

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);


  const values={
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin, 
    setIsLogin,
    isHideSidebarAndHeader, 
    setIsHideSidebarAndHeader
  }


  return (
    <BrowserRouter>
      <MyContext.Provider value={values} >
        {
          isHideSidebarAndHeader!==true &&
          <Header />
        }
        <div className='main d-flex'>
          {
            isHideSidebarAndHeader!==true &&
            <div className={`sidebarWrapper ${isToggleSidebar===true ? 'toggle' : ''}`}>
              <Sidebar />
            </div>
          }

          <div className={`content ${isHideSidebarAndHeader===true && 'full'} ${isToggleSidebar===true ? 'toggle' : ''}`}>
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/login" exact={true} element={<Login />} />
              <Route path="/signUp" exact={true} element={<SignUp />} />
              <Route path="/products" exact={true} element={<Products />} />
              <Route path="/product/details" exact={true} element={<ProductDetails />} />
              <Route path="/product/upload" exact={true} element={<ProductUpload />} />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export {MyContext};
