import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { MdLogout } from "react-icons/md";
import { MyContext } from "../../App";
import { BiSolidCategory } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { PiFlagBannerFill } from "react-icons/pi";



const Sidebar = () => {
  const history = useNavigate()


    const context = useContext(MyContext);

    const [activeTab, setActiveTab] = useState(0);
  const [isLogin, setIsLogin] = useState(false);

    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const isOpenSubmenu=(index)=>{
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token!==null && token!=="" && token!==undefined){
          setIsLogin(true)
        }else
        {
          history('/login')
        }
      }, [])

    return(
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="/">
                            <Button className={`w-100 ${activeTab===0 ? 'active' : ''}`}
                            onClick={()=>isOpenSubmenu(0)}>
                                <span className='icon'><MdDashboard /></span>
                                Bảng điều khiển
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===1 ? 'active' : ''}`}
                         onClick={()=>isOpenSubmenu(1)} >
                            <span className='icon'><FaUserCircle /></span>
                                Người dùng
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===1 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="/userList">Danh sách người dùng</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===2 ? 'active' : ''}`}
                         onClick={()=>isOpenSubmenu(2)} >
                            <span className='icon'><FaProductHunt /></span>
                            Sản phẩm
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===2 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="/products">Danh sách sản phẩm</Link>
                                </li>
                                <li>
                                    <Link to="/product/upload">Thêm sản phẩm</Link>
                                </li>
                                <li>
                                    <Link to="/productSize/add">Thêm Size</Link>
                                </li>
                                <li>
                                    <Link to="/productColor/add">Thêm Color</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===3 && isToggleSubmenu===true ? 'active' : ''}`}
                        onClick={()=>isOpenSubmenu(3)}>
                            <span className='icon'><BiSolidCategory /></span>
                            Loại sản phẩm
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===3 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="/category">Danh sách loại sản phẩm</Link>
                                    <Link to="/category/add">Thêm loại sản phẩm</Link>
                                    <Link to="/brand">Danh sách thương hiệu</Link>
                                    <Link to="/brand/add">Thêm thương hiệu</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===4 && isToggleSubmenu===true ? 'active' : ''}`}
                        onClick={()=>isOpenSubmenu(4)}>
                            <span className='icon'><FaShoppingCart /></span>
                            Đơn hàng
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===4 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="/ordersNew">Đơn mới</Link>
                                </li>
                                <li>
                                    <Link to="/orders">Danh sách đơn hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===5 && isToggleSubmenu===true ? 'active' : ''}`}
                        onClick={()=>isOpenSubmenu(5)}>
                            <span className='icon'><PiFlagBannerFill /></span>
                            Banner
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===5 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="/homeBanner">Danh sách Banner</Link>
                                </li>
                                <li>
                                    <Link to="/homeBanner/add">Thêm Banner</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <br />

                <div className='logoutWrapper'>
                    <div className='logoutBox'>
                        <Button variant="contained"><MdLogout />Đăng xuất</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;