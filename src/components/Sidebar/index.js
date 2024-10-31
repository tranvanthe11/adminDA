import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MdLogout } from "react-icons/md";

const Sidebar = () => {

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
                                Dashboard
                                <span className='arrow'><FaAngleRight /></span>
                            </Button>
                        </Link>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===1 ? 'active' : ''}`}
                         onClick={()=>isOpenSubmenu(1)} >
                            <span className='icon'><FaProductHunt /></span>
                            Products
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===1 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="#">Product List</Link>
                                </li>
                                <li>
                                    <Link to="#">Product Upload</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <Button className={`w-100 ${activeTab===2 && isToggleSubmenu===true ? 'active' : ''}`}
                        onClick={()=>isOpenSubmenu(2)}>
                            <span className='icon'><FaShoppingCart /></span>
                            Order
                            <span className='arrow'><FaAngleRight /></span>
                        </Button>
                        <div className={`submenuWrapper ${activeTab===2 && isToggleSubmenu===true ? 'colapse' : 'colapsed'}`}>
                            <ul className='submenu'>
                                <li>
                                    <Link to="#">Order List</Link>
                                </li>
                                <li>
                                    <Link to="#">Product Upload</Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <br />

                <div className='logoutWrapper'>
                    <div className='logoutBox'>
                        <Button variant="contained"><MdLogout />Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;