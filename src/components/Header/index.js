import { Link, useNavigate } from "react-router-dom";
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

    const history = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    const context = useContext(MyContext);

    const handleOpenMyAccDrop = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMyAccDrop = () => {
        setAnchorEl(null);
    };

    const logout=()=>{
        localStorage.clear();

        setAnchorEl(null);

        context.setAlertBox({
            open: true,
            msg: "Đăng xuất thành công",
            error: false
        })

        setTimeout(() => {
            history("/login");
        }, 2000);
    }
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
                                        {/* <UserAvatar img={context?.user?.name?.charArt(0)}/> */}
                                        <div className="userImg">
                                            <span className="rounded-circle">
                                            {context?.user?.name?.charAt(0)}
                                            </span>
                                        </div>

                                        <div className="userInfo">
                                            <h4>{context.user?.name}</h4>
                                            <p className="mb-0">{context.user?.email}</p>
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
                                        <MenuItem onClick={logout}>
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