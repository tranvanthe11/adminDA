import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { createContext,  useEffect,  useRef, useState } from 'react';
import SignUp from './pages/SignUp';
import Products from './pages/Products';
import Category from './pages/Category/index';
import ProductDetails from './pages/ProductDetails';
import ProductUpload from './pages/ProductUpload';
import CategoryAdd from './pages/CategoryAdd';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LoadingBar from 'react-top-loading-bar'
import CategoryEdit from './pages/CategoryEdit';
import ProductEdit from './pages/ProductEdit';
import { fetchDataFromApi } from './utils/api';
import AddBrand from './pages/Category/addBrand';
import Brand from './pages/Category/brandList';
import EditBrand from './pages/Category/editBrand';
import AddProductSize from './pages/Products/addProductSize';
import AddProductColor from './pages/Products/addProductColor';
import Orders from './pages/Orders';
import OrdersNew from './pages/OrdersNew';
import AddHomeBanner from './pages/HomeBanner/addHomeBanner';
import HomeBanner from './pages/HomeBanner/index';
import EditHomeBanner from './pages/HomeBanner/editHomeBanner';
import UserList from './pages/UserList';
import Warehouse from './pages/Warehouse';

const MyContext = createContext();

function App() {

  const [progress, setProgress] = useState(0)
  const [catData, setCatData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [user, setUser] = useState({
    name:"",
    email:"",
    userId:""
  })
  const [baseUrl, setBaseUrl] = useState("http://localhost:4000");
  const [alertBox, setAlertBox] = useState({
    msg:'',
    error: false,
    open:false
  })

  useEffect(()=>{
    setProgress(30)
    fetchCategory();
    fetchBrand();

  }, [])

  const fetchCategory = () => {
    fetchDataFromApi('/api/category').then((res)=>{
      setCatData(res);
      setProgress(100)
    })
  }

  const fetchBrand = () => {
    fetchDataFromApi('/api/brand').then((res)=>{
      setBrandData(res);
      setProgress(100)
    })
  }
  

  const values={
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin, 
    setIsLogin,
    isHideSidebarAndHeader, 
    setIsHideSidebarAndHeader,
    alertBox, 
    setAlertBox,
    progress, 
    setProgress,
    baseUrl, 
    setBaseUrl,
    catData,
    setCatData,
    brandData, 
    setBrandData,
    fetchCategory,
    fetchBrand,
    user, 
    setUser
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token!==null && token!=="" && token!==undefined){
      setIsLogin(true)
      const userData = JSON.parse(localStorage.getItem("user"));
      
      setUser(userData)
    }else{
      setIsLogin(false)
    }

  },[isLogin])


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertBox({
      open:false
    })


  };


  return (
    <BrowserRouter>
      <MyContext.Provider value={values} >
      <LoadingBar
        color='#0858f7'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        className='topLoadingBar'
      />
      <Snackbar open={alertBox.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertBox.error===false ? "success" : "error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertBox.msg}
        </Alert>
      </Snackbar>
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
              <Route path="/product/details/:id" exact={true} element={<ProductDetails />} />
              <Route path="/product/upload" exact={true} element={<ProductUpload />} />
              <Route path="/product/edit/:id" exact={true} element={<ProductEdit />} />
              <Route path="/category" exact={true} element={<Category />} />
              <Route path="/category/add" exact={true} element={<CategoryAdd />} />
              <Route path="/brand/edit/:id" exact={true} element={<EditBrand />} />
              <Route path="/brand/add" exact={true} element={<AddBrand />} />
              <Route path="/brand" exact={true} element={<Brand />} />
              <Route path="/category/edit/:id" exact={true} element={<CategoryEdit />} />
              <Route path="/productSize/add" exact={true} element={<AddProductSize />} />
              <Route path="/productColor/add" exact={true} element={<AddProductColor />} />
              <Route path="/orders" exact={true} element={<Orders />} />
              <Route path="/ordersNew" exact={true} element={<OrdersNew />} />
              <Route path="/homeBanner/add" exact={true} element={<AddHomeBanner />} />
              <Route path="/homeBanner/edit/:id" exact={true} element={<EditHomeBanner />} />
              <Route path="/homeBanner" exact={true} element={<HomeBanner />} />
              <Route path="/userList" exact={true} element={<UserList />} />
              <Route path="/warehouse" exact={true} element={<Warehouse />} />

            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export {MyContext};
