import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { MdLogout } from "react-icons/md";
import { MyContext } from "../../App";
import { BiSolidCategory } from "react-icons/bi";

const Sidebar = () => {

    const context = useContext(MyContext);

    const [activeTab, setActiveTab] = useState(0);
    const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

    const isOpenSubmenu=(index)=>{
        setActiveTab(index);
        setIsToggleSubmenu(!isToggleSubmenu);
    }

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
                            <span className='icon'><FaProductHunt /></span>
                            Sản phẩm
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===1 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="/products">Danh sách sản phẩm</Link>
                                </li>
                                <li>
                                    <Link to="/product/details">Xem sản phẩm</Link>
                                </li>
                                <li>
                                    <Link to="/product/upload">Thêm sản phẩm</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===2 && isToggleSubmenu===true ? 'active' : ''}`}
                        onClick={()=>isOpenSubmenu(2)}>
                            <span className='icon'><BiSolidCategory /></span>
                            Loại sản phẩm
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===2 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
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
                    {/* <li>
                        <Button className={`w-100 ${activeTab===2 && isToggleSubmenu===true ? 'active' : ''}`}
                        onClick={()=>isOpenSubmenu(2)}>
                            <span className='icon'><FaShoppingCart /></span>
                            Đơn hàng
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===2 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="#">Danh sách đơn hàng</Link>
                                </li>
                            </ul>
                        </div>
                    </li> */}
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