import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";
import { postData, postDataImg, postDataUser } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { FaRegImages } from "react-icons/fa";


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

const AddLeftBanner = () => {

    const history = useNavigate();

    const context = useContext(MyContext);

    const [imgFiles, setImgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [files, setFiles] = useState([]);
    const [isSelectdFiles,setIsSelectdFiles] = useState(false);

    const formdata = new FormData();

    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
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

    const onChangeFile = async(e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
            for (var i = 0; i < files.length; i++) {
                if (files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' 
                    || files[i].type === 'image/png' || files[i].type === 'image/webp')) {
                    setImgFiles(e.target.files)
                    const file = files[i];
                    imgArr.push(file);
                    formdata.append(`images`, file)
    
                    setFiles(imgArr);
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "Thêm ảnh thành công"
                    });
    
                    setIsSelectdFiles(true);
    
                    postDataImg(apiEndPoint, formdata).then((res) => {
                        if (res && res.images) { 
                            const { images } = res;
                            setFormFields({
                                ...formFields,
                                images: images
                            });
                        } else {
                            context.setAlertBox({
                                open: true,
                                error: true,
                                msg: "Lỗi tải ảnh lên Cloudinary."
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                        context.setAlertBox({
                            open: true,
                            error: true,
                            msg: "Đã có lỗi xảy ra khi tải ảnh."
                        });
                    });
                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "Vui lòng thêm ảnh"
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    
    const addHomeBanner = (e) => {
        e.preventDefault();

        if( isSelectdFiles!==false){
            setIsLoading(true);
    
            postData('/api/leftBanner/create', formFields).then((res)=>{
                setIsLoading(false);
                history('/leftBanner')
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
                    <h5 className="mb-0">Thêm Banner</h5>
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
                        label="Banner bên trái"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb 
                        label="Thêm Banner"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={addHomeBanner}>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='card p-4 mt-0'>

                                <div className='imageUploadSec'>
                                    <h5 className='mb-4'>Ảnh</h5>

                                    <div className='imgUploadBox d-flex align-items-center'>
                                        {
                                            previews?.length !== 0 && previews?.map((img, index)=>{
                                                return(
                                                    <div className='uploadBox' key={index}>
                                                        <img src={img} className='w-100' />
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className='uploadBox'>
                                            <input type='file' name='images' 
                                            onChange={(e)=>onChangeFile(e, '/api/leftBanner/upload')}/>
                                            <div className='info'>
                                                <FaRegImages />
                                                <h5>Tải ảnh</h5>
                                            </div>
                                        </div>

                                    </div>
                                    <br />

                                    <Button type="submit" className='btn-blue btn-lg btn-big w-100'>
                                        <IoMdCloudUpload /> &nbsp;{isLoading===true ? <CircularProgress color="inherit" className=' loader' /> : 'Thêm và xem'}
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

export default AddLeftBanner;