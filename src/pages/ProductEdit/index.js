import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoCloseSharp } from "react-icons/io5";
import { FaRegImages } from "react-icons/fa";
import { editData, fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
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

const ProductEdit = () => {

    const history = useNavigate();

    
    const [categoryVal, setCategoryVal] = useState('');
    const [brandVal, setBrandVal] = useState('');
    const [subCatVal, setSubCatVal] = useState('');
    const [productSizes, setProductSizes] = useState([]);
    const [files, setFiles] = useState([]);
    const [productImagesArr, setproductImagesArr] = useState([]);
    const [isPromotionValue, setIsPromotionValue] = useState('');
    const [catData, setCatData] = useState([]);
    const [product, setProducts] = useState([]);
    const [imgFiles, setImgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [isSelectdImages,setIsSelectdImages] = useState(false);

    const [ratingValue, setRatingValue] = useState(1);

    const [formFields, setFormFields] = useState({
            name:'',
            description:'',
            // brand:'',
            price:null,
            discount:null,
            category:'',
            brand:'',
            countInStock:null,
            rating:0,
            isPromotion:null,
    });
    
    const productImages = useRef();

    const context = useContext(MyContext);

    const formdata = new FormData();

    let {id} = useParams();


    useEffect(()=>{
        window.scrollTo(0,0);

        context.setProgress(30)

        setCatData(context.catData);

        fetchDataFromApi(`/api/products/${id}`).then((res)=>{
            setProducts(res)
            setFormFields({
                name:res.name,
                description:res.description,
                // brand:res.brand,
                price:res.price,
                discount:res.discount,
                category:res.category,
                brand:res.brand,
                countInStock:res.countInStock,
                rating:res.rating,
                isPromotion:res.isPromotion,
                dateCreated:res.dateCreated,
            });
            setRatingValue(res.rating);
            setCategoryVal(res.category.id);
            setIsPromotionValue(res.isPromotion);
            setBrandVal(res.brand.id);
            setPreviews(res.images);
            context.setProgress(100);
        })
    }, []);

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

    const imagesArr = [];
    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                category:event.target.value
            }
        ))
    };

    const handleChangeBrand = (event) => {
        setBrandVal(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                brand:event.target.value
            }
        ))
    };

    const handleChangeSubCategory = (event) => {
        setSubCatVal(event.target.value);
    };
    
    const handleChangeProductSizes = (event) => {
        const {
            target: {value},
        } = event;
        setProductSizes(
            typeof value === 'string' ? value.split(',') : value ,
        )
    };

    const handleChangeisPromotionValue = (event) => {
        setIsPromotionValue(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                isPromotion:event.target.value
            }
        ))
    };

    const inputChange = (e)=>{
        setFormFields(()=>(
            {
                ...formFields,
                [e.target.name]:e.target.value
            }
        ))
    }

    const onChangeFile = async(e, apiEndPoint) => {
        try {
            const imgArr = [];
            const files = e.target.files;
            // setImgFiles(e.target.files)
            for(var i=0; i<files.length; i++){
                if(files[i] && (files[i].type === 'image/jpeg' || files[i].type === 'image/jpg' 
                    || files[i].type === 'image/png' || files[i].type === 'image/webp')) {
                    setImgFiles(e.target.files)

                    const file = files[i];
                    imgArr.push(file);
                    formdata.append(`images`, file)

                } else{
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: "vui long them anh"
                    });
                }
            }
                    setIsSelectdImages(true);
                    setFiles(imgArr);

                    postData(apiEndPoint, formdata ).then((res)=>{
                        context.setAlertBox({
                            open: true,
                            error: false,
                            msg: "Them anh thanh cong"
                        });
                    })

        } catch(error){
            console.log(error)
        }
    }
    
    const editProduct = (e) => {
        e.preventDefault();
        
        formdata.append('name', formFields.name);
        formdata.append('description', formFields.description);
        // formdata.append('brand', formFields.brand);
        formdata.append('category', formFields.category);
        formdata.append('brand', formFields.brand);
        formdata.append('price', formFields.price);
        formdata.append('countInStock', formFields.countInStock);
        formdata.append('discount', formFields.discount);
        formdata.append('rating', formFields.rating);
        formdata.append('isPromotion', formFields.isPromotion);

        if(formFields.name===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm tên",
                error: true
            })
            return false;
        }
        if(formFields.description===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm description",
                error: true
            })
            return false;
        }
        // if(formFields.brand===""){
        //     context.setAlertBox({
        //         open: true,
        //         msg: "Vui lòng thêm brand",
        //         error: true
        //     })
        //     return false;
        // }
        if(formFields.brand===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm brand",
                error: true
            })
            return false;
        }
        if(formFields.category===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm category",
                error: true
            })
            return false;
        }
        if(formFields.price===null){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm gia",
                error: true
            })
            return false;
        }
        if(formFields.countInStock===null){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm countInStock",
                error: true
            })
            return false;
        }
        if(formFields.discount===null){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm discount",
                error: true
            })
            return false;
        }
        if(formFields.rating===0){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm rating",
                error: true
            })
            return false;
        }
        if(formFields.isPromotion===null){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm isPromotion",
                error: true
            })
            return false;
        }

        setIsLoading(true);

        

        editData(`/api/products/${id}`, formFields).then((res)=>{
            context.setAlertBox({
                open: true,
                msg: "Thay doi san pham thanh cong",
                error: false
            })
            setIsLoading(false);

            history('/products')
        })
    }

    console.log(context.catData.categoryList)
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                with: 250,
            }
        }
    }

    return(
        <>  
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Chỉnh sửa sản phẩm</h5>
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
                        label="Sản phẩm"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb 
                        label="Chỉnh sửa sản phẩm"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={editProduct}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card p-4 mt-0'>
                                <h5 className='mb-4'>Basic information</h5>

                                <div className='form-group'>
                                    <h6>Ten san pham</h6>
                                    <input type='text' name='name' value={formFields.name} onChange={inputChange} />
                                </div>

                                <div className='form-group'>
                                    <h6>Mo ta</h6>
                                    <textarea row={5} cols={10} name='description' value={formFields.description} onChange={inputChange} />
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Loai san pham</h6>
                                            <Select
                                            value={categoryVal}
                                            onChange={handleChangeCategory}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className='w-100'
                                            >
                                            <MenuItem value="">
                                                <em value={null}>None</em>
                                            </MenuItem>
                                            {
                                                context.catData?.categoryList?.length!==0 && context.catData?.categoryList?.map((cat,index)=>{
                                                    return(
                                                        <MenuItem className='text-capitalize' value={cat.id} key={index}>{cat.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Brand</h6>
                                            <Select
                                            value={brandVal}
                                            onChange={handleChangeBrand}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className='w-100'
                                            >
                                            <MenuItem value="">
                                                <em value={null}>None</em>
                                            </MenuItem>
                                            {
                                                context.brandData?.length!==0 && context.brandData?.map((brand,index)=>{
                                                    return(
                                                        <MenuItem className='text-capitalize' value={brand.id} key={index}>{brand.brand}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        </div>
                                    </div>

                                </div>


                                <div className='row'>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>gia</h6>
                                            <input type='text' name='price' value={formFields.price} onChange={inputChange} />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>is Promotion</h6>
                                            <Select
                                                value={isPromotionValue}
                                                onChange={handleChangeisPromotionValue}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                                >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                <MenuItem  value={true}>True</MenuItem>
                                                <MenuItem  value={false}>False</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>So luong</h6>
                                            <input type='text' name='countInStock' value={formFields.countInStock} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>discount</h6>
                                            <input type='text' name='discount' value={formFields.discount} onChange={inputChange} />
                                        </div>
                                    </div>

                                    {/* <div className='col'>
                                        <div className='form-group'>
                                            <h6>Size</h6>
                                            <Select
                                                multiple
                                                value={productSizes}
                                                onChange={handleChangeProductSizes}
                                                displayEmpty
                                                className='w-100'
                                                MenuProps={MenuProps}
                                                >
                                                <MenuItem value="M">M</MenuItem>
                                                <MenuItem value="L">L</MenuItem>
                                                <MenuItem value="XL">XL</MenuItem>
                                                <MenuItem value="XXL">XXL</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Mau</h6>
                                            <Select
                                                multiple
                                                value={productSizes}
                                                onChange={handleChangeProductSizes}
                                                displayEmpty
                                                className='w-100'
                                                MenuProps={MenuProps}
                                                >
                                                <MenuItem value="M">M</MenuItem>
                                                <MenuItem value="L">L</MenuItem>
                                                <MenuItem value="XL">XL</MenuItem>
                                                <MenuItem value="XXL">XXL</MenuItem>
                                            </Select>
                                        </div>
                                    </div> */}


                                </div>

                                <div className='row'>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>Rating</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={ratingValue}
                                                onChange={(event, newValue) => {
                                                setRatingValue(newValue);
                                                setFormFields(()=>(
                                                    {
                                                        ...formFields,
                                                        rating: newValue
                                                    }
                                                ))
                                                }}
                                            />
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>

                    </div>

                    <div className='card p-4 mt-0'>
                                <div className='imageUploadSec'>
                                    <h5 className='mb-4'>Media and published</h5>

                                    <div className='imgUploadBox d-flex align-items-center'>
                                    {
                                            previews?.length !== 0 && previews?.map((img, index)=>{
                                                return(
                                                    <div className='uploadBox' key={index}>
                                                        {
                                                            isSelectdImages === true ?
                                                            <img src={`${img}`} className='w-100' />
                                                            :
                                                            <img src={`${context.baseUrl}/upload/${img}`} className='w-100' />

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
                                            <input type='file' multiple name='images' 
                                            onChange={(e)=>onChangeFile(e, '/api/products/upload')}/>
                                            <div className='info'>
                                                <FaRegImages />
                                                <h5>image upload</h5>
                                            </div>
                                        </div>

                                    </div>
                                    <br />

                                    <Button type="submit" className='btn-blue btn-lg btn-big w-100'>
                                        <IoMdCloudUpload /> &nbsp;{isLoading===true ? <CircularProgress color="inherit" className=' loader' /> : 'xuat ban va xem'}
                                    </Button>
                                </div>
                            </div>

               </form>

            </div>
        </>
    )
}

export default ProductEdit;