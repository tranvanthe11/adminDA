import logo from '../../assets/images/logo-am-ban.jpg';
import { MyContext } from "../../App";
import { useContext, useEffect, useState } from 'react';
import patern from '../../assets/images/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg'
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../../assets/images/Google_Icons-09-512.webp'
import { postData, postDataUser } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';


const Login = () => {

    const history = useNavigate();

    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [formfields, setFormfields] = useState({
        email:"",
        password:"",
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

    const signin = (e) => {
        setIsLoading(true);

        e.preventDefault();

        if(formfields.email===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm email",
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

        postDataUser("/api/user/signin", formfields).then((res)=>{
            try{
                if(res.status!==false){

                    localStorage.setItem("token", res.token);
        
                    const user = {
                        name:res.user?.name,
                        email:res.user?.email,
                        userId:res.user?.id,
                    }
                    localStorage.setItem("user", JSON.stringify(user));
    
                    context.setAlertBox({
                        open: true,
                        msg: "Đăng nhập thành công",
                        error: false
                    })
        
                    setTimeout(()=>{
                    setIsLoading(false);

                        // history("/dashboard")
                        window.location.href = "/dashboard"
                    }, 2000)
                }else{
                    setIsLoading(false);

                    context.setAlertBox({
                        open: true,
                        msg: res.msg,
                        error: true
                    })
                }

            }catch(error){
                console.log(error)
            }
        })

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
                        <form onSubmit={signin}>
                            <div className={`form-group position-relative ${inputIndex===0 && 'focus'}`}>
                                <span className='icon'>< MdEmail /></span>
                                <input type='text' className='form-control' placeholder='Nhập email' 
                                onFocus={()=>focusInput(0)} onBlur={()=>setInputIndex(null)} 
                                name='email' onChange={onchangeInput}/>
                            </div>

                            <div className={`form-group position-relative ${inputIndex===1 && 'focus'}`}>
                                <span className='icon'>< RiLockPasswordFill /></span>
                                <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='Nhập mật khẩu' 
                                onFocus={()=>focusInput(1)} onBlur={()=>setInputIndex(null)} 
                                name='password' onChange={onchangeInput}/>

                                <span className='toggleShowPassword' onClick={()=>setIsShowPassword(!isShowPassword)} >
                                    {
                                        isShowPassword===true ? <LuEyeOff /> : <LuEye />
                                    }
                                    
                                </span>
                            </div>

                            <div className='form-group'>
                                <Button type='submit' className='btn-blue btn-big w-100'>
                                {isLoading===true ? <CircularProgress color="inherit" className=' loader' /> : 'Đăng nhập'}

                                </Button>
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