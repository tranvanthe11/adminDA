import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";
import { editData, fetchDataFromApi, postData, postDataImg } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { FaRegImages } from "react-icons/fa";
import {Link, useParams} from 'react-router-dom';


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

const CategoryEdit = () => {

    const history = useNavigate();

    const context = useContext(MyContext);

    const [imgFiles, setImgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState([]);

    let {id} = useParams();

    const formdata = new FormData();

    const [isLoading, setIsLoading] = useState(false);

    // const [isSelectedImages, setIsSelectedImages] = useState(false);
    const [isSelectdFiles,setIsSelectdFiles] = useState(false);

    const [formFields, setFormFields] = useState({
        name: '',
        color: '',
        images: []
    });

    useEffect(()=>{
        if(!imgFiles) return;
        let tmp = [];
        for(let i=0; i<imgFiles.length; i++){
            tmp.push(URL.createObjectURL(imgFiles[i]));
        }

        const objectUrls = tmp;
        setPreviews(objectUrls);

        for(let i=0; i<objectUrls.length; i++){
            return()=>{
                URL.revokeObjectURL(objectUrls[i])
            }
        }
    }, [imgFiles])

    useEffect(()=>{
        context.setProgress(30);
        fetchDataFromApi(`/api/category/${id}`).then((res)=>{
            setCategory(res)
            setFormFields({
                name: res.name,
                brand: res.brand,
                color: res.color,
                images: res.images || []
            });
            // setPreviews(res.images);
            setPreviews(res.images || []); 
            context.setProgress(100);
        })
    }, [])

    const changeInput = (e)=>{
        setFormFields(()=>(
            {
                ...formFields,
                [e.target.name]:e.target.value
            }
        ))
    }

    // const onChangeFile = async(e, apiEndPoint) => {
    //     try {
    //         const imgArr = [];
    //         const files = e.target.files;
    //         // setImgFiles(e.target.files)
    //         for(var i=0; i<files.length; i++){
    //             if(files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' 
    //                 || files[i].type === 'image/png' || files[i].type === 'image/webp')) {
    //                 setImgFiles(e.target.files)

    //                 const file = files[i];
    //                 imgArr.push(file);
    //                 formdata.append(`images`, file)

    //                 setFiles(imgArr);


    //                 setIsSelectedImages(true);

    //                 postData(apiEndPoint, formdata).then((res)=>{
    //                     context.setAlertBox({
    //                         open: true,
    //                         error: false,
    //                         msg: "Them anh thanh cong"
    //                     });
    //                 })
    //             } else{
    //                 context.setAlertBox({
    //                     open: true,
    //                     error: true,
    //                     msg: "vui long them anh"
    //                 });
    //             }
    //         }

    //     } catch(error){
    //         console.log(error)
    //     }
    // }

    const onChangeFile = async (e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
    
            for (let i = 0; i < files.length; i++) {
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' || files[i].type === 'image/png' || files[i].type === 'image/webp')) {
                    const file = files[i];
                    imgArr.push(file);
                    formdata.append('images', file);  // Cập nhật ảnh mới
                }
            }
    
            setImgFiles(e.target.files);
            setIsSelectdFiles(true);
    
            context.setAlertBox({
                open: true,
                error: false,
                msg: "Thêm ảnh thành công"
            });
    
            postDataImg(apiEndPoint, formdata).then((res) => {
                if (res && res.images) {
                    setFormFields({
                        ...formFields,
                        images: res.images  // Cập nhật URL ảnh vào formFields
                    });
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Lỗi tải ảnh lên Cloudinary."
                    });
                }
            }).catch((error) => {
                context.setAlertBox({
                    open: true,
                    error: true,
                    msg: "Đã có lỗi xảy ra khi tải ảnh."
                });
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    
    const editCategory = (e) => {
        e.preventDefault();

        formdata.append('name', formFields.name);
        formdata.append('color', formFields.color);

        if(formFields.name!=="" && formFields.color!=="" && formFields.brand!==""){
            setIsLoading(true);
    
            editData(`/api/category/${id}`, formFields).then((res)=>{
                setIsLoading(false);
                history('/category')
            })

        }else{
            context.setAlertBox({
                open:true,
                error: true,
                msg: "Vui lòng điền đày đủ thông tin"
            });
            return false;
        }
    }

    return(
        <>  
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Chỉnh sửa loại sản phẩm</h5>
                    <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                        <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Bảng điều khiển"
                        icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb
                        component="a" 
                        href="#"
                        label="Loại sản phẩm"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb 
                        label="Chỉnh sửa loại sản phẩm"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={editCategory}>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='card p-4 mt-0'>

                                <div className='form-group'>
                                    <h6>Tên loại sản phẩm</h6>
                                    <input type='text' name='name' value={formFields.name} onChange={changeInput} />
                                </div>

                                <div className='form-group'>
                                    <h6>Màu</h6>
                                    <input type='text' name='color' value={formFields.color} onChange={changeInput} />
                                </div>

                                <div className='imageUploadSec'>
                                    <h5 className='mb-4'>Ảnh</h5>

                                    <div className='imgUploadBox d-flex align-items-center'>
                                        {
                                            previews?.length !== 0 && previews?.map((img, index)=>{
                                                return(
                                                    <div className='uploadBox' key={index}>
                                                        {
                                                            isSelectdFiles === true ?
                                                            <img src={`${img}`} className='w-100' />
                                                            :
                                                            <img src={img} className='w-100' />

                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        {/* <div className='uploadBox'>
                                            <span className='remove'><IoCloseSharp /></span>
                                            <div className='box'>
                                                <LazyLoadImage
                                                alt={"image"}
                                                effect="blur"
                                                className="w-100"
                                                src={'https://mironcoder-hotash.netlify.app/images/product/single/01.webp'}
                                                />
                                            </div>
                                        </div> */}

                                        <div className='uploadBox'>
                                            <input type='file' name='images' 
                                            onChange={(e)=>onChangeFile(e, '/api/category/upload')}/>
                                            <div className='info'>
                                                <FaRegImages />
                                                <h5>Tải ảnh</h5>
                                            </div>
                                        </div>

                                    </div>
                                    <br />

                                    <Button type="submit" className='btn-blue btn-lg btn-big w-100'>
                                        <IoMdCloudUpload /> &nbsp;{isLoading===true ? <CircularProgress color="inherit" className=' loader' /> : 'Cập nhật'}
                                    </Button>
                                </div>

                            </div>

                        </div>

                    </div>
               </form>

            
            </div>
        </>
    )
}

export default CategoryEdit;