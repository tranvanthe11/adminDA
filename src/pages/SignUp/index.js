import logo from '../../assets/images/logo-am-ban.jpg';
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from 'react';
import patern from '../../assets/images/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoShieldCheckmark } from "react-icons/io5";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/images/Google_Icons-09-512.webp'
import { postData, postDataUser } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';


const SignUp = () => {

    const history = useNavigate();

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [formfields, setFormfields] = useState({
        name:"",
        email:"",
        phone:"",
        password:"",
        confirmPassword:"",
        isAdmin: true

    });

    const context = useContext(MyContext);

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(true);
    }, [])

    const focusInput=(index)=>{
        setInputIndex(index);
    }

    const onchangeInput = (e) => {
        setFormfields(()=>({
            ...formfields,
            [e.target.name]:e.target.value
        }))
    }

    const signup = (e) => {
        setIsLoading(true);
        e.preventDefault();

        try{

            if(formfields.name===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm tên",
                    error: true
                })
                return false;
            }
            if(formfields.email===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm email",
                    error: true
                })
                return false;
            }
            if(formfields.phone===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm phone",
                    error: true
                })
                return false;
            }
            if(formfields.password===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm password",
                    error: true
                })
                return false;
            }
            if(formfields.confirmPassword===""){
                context.setAlertBox({
                    open: true,
                    msg: "Vui lòng thêm confirmPassword",
                    error: true
                })
                return false;
            }
            if(formfields.confirmPassword!==formfields.password){
                context.setAlertBox({
                    open: true,
                    msg: "Mật khẩu không đúng",
                    error: true
                })
                return false;
            }

            
            postDataUser("/api/user/signup", formfields).then((res)=>{
                if(res.status!==false){

                    context.setAlertBox({
                        open: true,
                        msg: "Đăng ký thành công",
                        error: false
                    })
                    
                    
                    setTimeout(()=>{
                        setIsLoading(false);
                        history("/login")
                    }, 2000)
                }else{
                    context.setAlertBox({
                        open: true,
                        msg: res.msg,
                        error: true
                    })
                }
            }).catch(error => {
                console.error('Error posting data:', error)
            })
        }catch(error){
            console.log(error)
        }

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
                        <h5 className='font-weight-bold'>Đăng Ký</h5>
                    </div>

                    <div className='wrapper mt-3 card border'>
                        <form onSubmit={signup}>

                            <div className={`form-group position-relative ${inputIndex===0 && 'focus'}`}>
                                <span className='icon'>< FaUserCircle /></span>
                                <input type='text' className='form-control' placeholder='Nhập tên' 
                                onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} 
                                name='name' onChange={onchangeInput}/>
                            </div>

                            <div className={`form-group position-relative ${inputIndex===1 && 'focus'}`}>
                                <span className='icon'>< MdEmail /></span>
                                <input type='text' className='form-control' placeholder='Nhập email' 
                                onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)} 
                                name='email' onChange={onchangeInput}/>
                            </div>

                            <div className={`form-group position-relative ${inputIndex===2 && 'focus'}`}>
                                <span className='icon'><FaPhoneAlt /></span>
                                <input type='text' className='form-control' placeholder='Nhập phone' 
                                onFocus={()=>focusInput(2)} onBlur={()=>setInputIndex(null)} 
                                name='phone' onChange={onchangeInput}/>
                            </div>

                            <div className={`form-group position-relative ${inputIndex===3 && 'focus'}`}>
                                <span className='icon'>< RiLockPasswordFill /></span>
                                <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='Nhập mật khẩu' 
                                onFocus={()=>focusInput(3)} onBlur={()=>setInputIndex(null)} 
                                name='password' onChange={onchangeInput}/>

                                <span className='toggleShowPassword' onClick={()=>setIsShowPassword(!isShowPassword)} >
                                    {
                                        isShowPassword===true ? <LuEyeOff /> : <LuEye />
                                    }
                                    
                                </span>
                            </div>

                            <div className={`form-group position-relative ${inputIndex===4 && 'focus'}`}>
                                <span className='icon'>< IoShieldCheckmark /></span>
                                <input type={`${isShowConfirmPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='Xác nhận mật khẩu' 
                                onFocus={()=>focusInput(4)} onBlur={()=>setInputIndex(null)} 
                                name='confirmPassword' onChange={onchangeInput}/>

                                <span className='toggleShowPassword' onClick={()=>setIsShowConfirmPassword(!isShowConfirmPassword)} >
                                    {
                                        isShowConfirmPassword===true ? <LuEyeOff /> : <LuEye />
                                    }
                                    
                                </span>
                            </div>

                            <FormControlLabel control={<Checkbox />} 
                            label="Tôi đồng ý với tất cả các Điều khoản" />

                            <div className='form-group'>
                                <Button type='submit' className='btn-blue btn-big w-100'>
                                {isLoading===true ? <CircularProgress color="inherit" className=' loader' /> : 'Đăng ký'}
                                </Button>
                            </div>

                            <div className='form-group text-center'>

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
                                    Bạn đã có tài khoản?
                                    <Link to={'/login'} className='link color ml-1'>Đăng nhập</Link>
                                </span>
                            </div>



                        </form>

                    </div>

                </div>
            </section>
        </>
    )
}

export default SignUp;