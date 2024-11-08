import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-am-ban.jpg"
import Button from '@mui/material/Button';
import { MdMenuOpen } from "react-icons/md";
import { MdOutlineMenu } from "react-icons/md";
import SearchBox from "../SearchBox";
import { MdLightMode } from "react-icons/md";
import { MdNightlightRound } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import React, { useContext } from 'react';
import { useState } from "react";
import { IoShieldHalfSharp } from "react-icons/io5";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { MyContext } from "../../App";
import UserAvatar from "../userAvatar";



const Header = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const context = useContext(MyContext);

    const handleOpenMyAccDrop = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null);
    };
    return(
        <>
            <header className="d-flex align-items-center">
                <div className="container-fluid w-100">
                    <div className="row d-flex align-items-center w-100">
                        <div className="col-sm-2 part1">
                            <Link to={'/'} className="d-flex align-items-center logo">
                                <img src={logo} />
                                <span>PANDA</span>
                            </Link>
                        </div>

                        <div className="col-sm-3 d-flex align-items-center part2">
                            <Button className="rounded-circle mr-3"
                            onClick={()=>context.setIsToggleSidebar(!context.isToggleSidebar)}>
                                {
                                    context.isToggleSidebar===false ?
                                    <MdMenuOpen /> 
                                    :
                                    <MdOutlineMenu />
                                }
                            </Button>
                            <SearchBox />
                        </div>

                        <div className="col-sm-7 d-flex align-items-center part3 justify-content-end">
                            <Button className="rounded-circle mr-3"><MdLightMode /></Button>
                            <Button className="rounded-circle mr-3"><FaRegBell /></Button>

                            {
                                context.isLogin!==true ? 
                                <Link to={'/login'}>
                                    <Button className="btn-blue btn-lg btn-round">Đăng nhập</Button>
                                </Link> :
                                <div className="myAccWrapper">
                                    <Button className="myAcount d-flex align-items-center" onClick={handleOpenMyAccDrop}>
                                        <UserAvatar img={"https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/383007770_1343105983301466_455739966004467731_n.jpg?stp=dst-jpg_p526x296&_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=C2vtNprX_LwQ7kNvgG0VEJU&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=AwTYlgz-2KoHZDO1yNNoht6&oh=00_AYCge1xBY3kLg3Y3RYkSgNGhGJQLa0C-JDjN4xeJSG_m5w&oe=6728EEB6"}/>

                                        <div className="userInfo">
                                            <h4>Trần Văn Thế</h4>
                                            <p className="mb-0">tranvanthe@gmail.com</p>
                                        </div>
                                    </Button>

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleCloseMyAccDrop}
                                        onClick={handleCloseMyAccDrop}
                                        slotProps={{
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <ListItemIcon>
                                                <PersonAdd fontSize="small" />
                                            </ListItemIcon>
                                            My Account
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <ListItemIcon>
                                                <IoShieldHalfSharp />
                                            </ListItemIcon>
                                            Reset Password
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseMyAccDrop}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </div>
                            }


                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;