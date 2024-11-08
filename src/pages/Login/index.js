import logo from '../../assets/images/logo-am-ban.jpg';
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from 'react';
import patern from '../../assets/images/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import googleIcon from '../../assets/images/Google_Icons-09-512.webp'

const Login = () => {

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const context = useContext(MyContext);

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(true);
    }, [])

    const focusInput=(index)=>{
        setInputIndex(index);
    }


    return(
        <>
            <img src={patern} className='loginPatern' />
            <section className="loginSection">
                <div className="loginBox">
                    <div className="logo text-center">
                        <Link to={'/'}>
                            <img src={logo} width="100px" className="img-circle"/>
                        </Link>
                        <h5 className='font-weight-bold'>Đăng Nhập</h5>
                    </div>

                    <div className='wrapper mt-3 card border'>
                        <form>
                            <div className={`form-group position-relative ${inputIndex===0 && 'focus'}`}>
                                <span className='icon'>< MdEmail /></span>
                                <input type='text' className='form-control' placeholder='Nhập email' 
                                onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} />
                            </div>

                            <div className={`form-group position-relative ${inputIndex===1 && 'focus'}`}>
                                <span className='icon'>< RiLockPasswordFill /></span>
                                <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='Nhập mật khẩu' 
                                onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)} />

                                <span className='toggleShowPassword' onClick={()=>setIsShowPassword(!isShowPassword)} >
                                    {
                                        isShowPassword===true ? <LuEyeOff /> : <LuEye />
                                    }
                                    
                                </span>
                            </div>

                            <div className='form-group'>
                                <Button className='btn-blue btn-big w-100'>Đăng nhập</Button>
                            </div>

                            <div className='form-group text-center'>
                                <Link to={'/forgot-password'} className='link'>Quên mật khẩu</Link>

                                <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
                                    <span className='line'></span>
                                    <span className='txt'>hoặc</span>
                                    <span className='line'></span>
                                </div>

                                <Button variant="outlined" className='btn-lg w-100 loginWithGoogle btn-big'>
                                <img src={googleIcon} width='30px' className='mr-1' />Đăng nhập với google
                                </Button>
                                
                            </div>

                            <div className='footer p-2 text-center'>
                                <span className='text-center'>
                                    Bạn chưa có tài khoản?
                                    <Link to={'/signUp'} className='link color ml-1'>Đăng ký</Link>
                                </span>
                            </div>


                        </form>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;