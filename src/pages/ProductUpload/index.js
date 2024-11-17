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
import { fetchDataFromApi, postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

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

const ProductUpload = () => {

    const history = useNavigate();

    //Size và color
    const [sizesAndColors, setSizesAndColors] = useState([{ size: '', color: '', countInStock: 0 }]);

    
    const [categoryVal, setCategoryVal] = useState('');
    const [brandVal, setBrandVal] = useState('');
    const [subCatVal, setSubCatVal] = useState('');
    const [productSize, setProductSize] = useState([]);
    const [productSizeData, setProductSizeData] = useState([]);
    const [productColor, setProductColor] = useState([]);
    const [productColorData, setProductColorData] = useState([]);
    const [files, setFiles] = useState([]);
    const [productImagesArr, setproductImagesArr] = useState([]);
    const [isNewProductValue, setIsNewProductValue] = useState('');
    const [catData, setCatData] = useState([]);
    const [imgFiles, setImgFiles] = useState();
    const [previews, setPreviews] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [isSelectdFiles,setIsSelectdFiles] = useState(false);

    const [ratingValue, setRatingValue] = useState(1);

    const [formFields, setFormFields] = useState({
            name:'',
            description:'',
            price:null,
            discount:0,
            catName:'',
            // brandName:'',
            category:'',
            brand:'',
            rating:0,
            isNewProduct:null,
            sizesAndColors: [],
    });
    
    const context = useContext(MyContext);

    const formdata = new FormData();


    useEffect(()=>{
        window.scrollTo(0,0);

        setCatData(context.catData);

        fetchDataFromApi('/api/productSize').then((res)=>{
            setProductSizeData(res)
        })
        fetchDataFromApi('/api/productColor').then((res)=>{
            setProductColorData(res)
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

    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                category:event.target.value
            }
        ))
    };

    // const selectCatName=(cat)=>{
    //     formFields.catName=cat;
    // }

    const removeDiacriticsAndSpaces = (str) => {
        return str
            .normalize('NFD') // Chuẩn hóa chuỗi Unicode
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
            .replace(/\s+/g, '') // Loại bỏ khoảng cách
            .toLowerCase(); // Chuyển thành chữ thường nếu cần
    };
    
    const selectCatName = (catName) => {
        const processedCatName = removeDiacriticsAndSpaces(catName);
        console.log(processedCatName); // Kiểm tra kết quả, ví dụ: "quanjeans"
        formFields.catName=processedCatName;
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

    // const handleChangeProductSizes = (event) => {
    //     const {
    //         target: {value},
    //     } = event;
    //     setProductSize(
    //         typeof value === 'string' ? value.split(',') : value ,
    //     )

    //     formFields.productSize=value;

    // };

    // const handleChangeProductColor = (event) => {
    //     const {
    //         target: {value},
    //     } = event;
    //     setProductColor(
    //         typeof value === 'string' ? value.split(',') : value ,
    //     )

    //     formFields.productColor=value;
    // };

    const handleChangeProductSizes = (event) => {
        const { target: { value } } = event;
        const selectedSizes = typeof value === 'string' ? value.split(',') : value;
        setProductSize(selectedSizes);
    
        setFormFields((prev) => ({
            ...prev,
            productSize: selectedSizes,
            sizesAndColors: [
                ...(prev.sizesAndColors || []), // Đảm bảo `sizesAndColors` là mảng
                ...selectedSizes?.flatMap((size) => 
                    productColor?.map((color) => ({
                        size,
                        color,
                        countInStock: 0, // Mặc định
                    }))
                ).filter(
                    (item) =>
                        !prev.sizesAndColors.some(
                            (existing) =>
                                existing.size === item.size && existing.color === item.color
                        )
                ),
            ],
        }));
    };
    
    const handleChangeProductColor = (event) => {
        const { target: { value } } = event;
        const selectedColors = typeof value === 'string' ? value.split(',') : value;
        setProductColor(selectedColors);
    
        setFormFields((prev) => ({
            ...prev,
            productColor: selectedColors,
            sizesAndColors: [
                ...(prev.sizesAndColors || []), // Đảm bảo `sizesAndColors` là mảng
                ...productSize?.flatMap((size) =>
                    selectedColors?.map((color) => ({
                        size,
                        color,
                        countInStock: 0, // Mặc định
                    }))
                ).filter(
                    (item) =>
                        !prev.sizesAndColors.some(
                            (existing) =>
                                existing.size === item.size && existing.color === item.color
                        )
                ),
            ],
        }));
    };
    

    const handleStockChange = (index, value) => {
        setFormFields((prev) => ({
            ...prev,
            sizesAndColors: prev.sizesAndColors.map((item, i) =>
                i === index ? { ...item, countInStock: parseInt(value) } : item
            ),
        }));
    };
    

    const handleChangeisNewProductValue = (event) => {
        setIsNewProductValue(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                isNewProduct:event.target.value
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
                    setImgFiles(files)

                    const file = files[i];
                    imgArr.push(file);
                    formdata.append(`images`, file)
                    }else{
                        context.setAlertBox({
                            open: true,
                            error: true,
                            msg: "vui long them anh"
                        });
                    }


                    
                }
                setIsSelectdFiles(true);
                setFiles(imgArr);
                postData(apiEndPoint, formdata).then((res)=>{
                })

        } catch(error){
            console.log(error)
        }
    }
    
    const addProduct = (e) => {
        e.preventDefault();
        
        formdata.append('name', formFields.name);
        formdata.append('description', formFields.description);
        formdata.append('catName', formFields.catName);
        formdata.append('category', formFields.category);
        formdata.append('brand', formFields.brand);
        formdata.append('price', formFields.price);
        // formdata.append('countInStock', formFields.countInStock);
        formdata.append('discount', formFields.discount);
        formdata.append('rating', formFields.rating);
        formdata.append('isNewProduct', formFields.isNewProduct);
        // formdata.append('productSize', formFields.productSize);
        // formdata.append('productColor', formFields.productColor);
        formdata.append("sizesAndColors", JSON.stringify(formFields.sizesAndColors));

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
        if(formFields.category===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm category",
                error: true
            })
            return false;
        }
        if(formFields.brand===""){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng chọn brand",
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
        if(formFields.isNewProduct===null){
            context.setAlertBox({
                open: true,
                msg: "Vui lòng thêm isNew",
                error: true
            })
            return false;
        }
        if (!formFields.sizesAndColors || formFields.sizesAndColors.length === 0) {
            context.setAlertBox({
                open: true,
                msg: "Vui lòng chọn size và màu sắc với số lượng tương ứng.",
                error: true,
            });
            return false;
        }

        setIsLoading(true);


        

        postData('/api/products/create', formFields).then((res)=>{
            context.setAlertBox({
                open: true,
                msg: "Thêm sản phẩm thành công",
                error: false
            })
            setIsLoading(false);
            // setPreviews([]); 
            setImgFiles(null); 
            // setFiles([]);      
            // setIsSelectdFiles(false)

            history('/products')
        })
    }
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
                    <h5 className="mb-0">Thêm sản phẩm</h5>
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
                        label="Thêm sản hẩm"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={addProduct}>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='card p-4 mt-0'>
                                {/* <h5 className='mb-4'>Basic information</h5> */}

                                <div className='form-group'>
                                    <h6>Tên sản phẩm</h6>
                                    <input type='text' name='name' value={formFields.name} onChange={inputChange} />
                                </div>

                                <div className='form-group'>
                                    <h6>Mô tả</h6>
                                    <textarea row={5} cols={10} name='description' value={formFields.description} onChange={inputChange} />
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Loại sản phẩm</h6>
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
                                                        <MenuItem className='text-capitalize' 
                                                        value={cat.id} key={index} 
                                                        onClick={()=>selectCatName(cat.name)}
                                                        >{cat.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Thương hiệu</h6>
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
                                            <h6>Giá</h6>
                                            <input type='text' name='price' value={formFields.price} onChange={inputChange} />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Giảm giá</h6>
                                            <input type='text' name='discount' value={formFields.discount} onChange={inputChange} />
                                        </div>
                                    </div>


                                    {/* <div className='col'>
                                        <div className='form-group'>
                                            <h6>Số lượng</h6>
                                            <input type='text' name='countInStock' value={formFields.countInStock} onChange={inputChange} />
                                        </div>
                                    </div> */}
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Sản phẩm mới</h6>
                                            <Select
                                                value={isNewProductValue}
                                                onChange={handleChangeisNewProductValue}
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

                                <div className='row'>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Kích cỡ</h6>
                                            <Select
                                                multiple
                                                value={productSize}
                                                onChange={handleChangeProductSizes}
                                                displayEmpty
                                                className='w-100'
                                                MenuProps={MenuProps}
                                                >
                                                    {
                                                        productSizeData?.length!==0 && productSizeData?.map((item, index)=>{

                                                            return(
                                                                <MenuItem key={index} value={item.productSize}>{item.productSize}</MenuItem>
                                                            )
                                                        })
                                                    }
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Màu</h6>
                                            <Select
                                                multiple
                                                value={productColor}
                                                onChange={handleChangeProductColor}
                                                displayEmpty
                                                className='w-100'
                                                MenuProps={MenuProps}
                                                >
                                                {
                                                        productColorData?.length!==0 && productColorData?.map((item, index)=>{

                                                            return(
                                                                <MenuItem key={index} value={item.productColor}>{item.productColor}</MenuItem>
                                                            )
                                                        })
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                    


                                </div>

                                <h5>Danh sách Size và Màu</h5>
                                <div className='row'>
                                    <div className='p-3 mt-0 col-sm-6' >
                                        <div className=" mt-3">
                                            <table className="table table-bordered v-align">
                                                <thead>
                                                    <tr>
                                                        <th>Size</th>
                                                        <th>Màu</th>
                                                        <th>Số lượng</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {formFields?.sizesAndColors?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.size}</td>
                                                            <td>{item.color}</td>
                                                            <td>
                                                                <input
                                                                    type="text"
                                                                    value={item.countInStock}
                                                                    onChange={(e) => handleStockChange(index, e.target.value)}
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>

                                </div>
                                

                            </div>
                        </div>

                    </div>


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
                                            <input type='file' multiple name='images' 
                                            onChange={(e)=>onChangeFile(e, '/api/products/upload')}/>
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

               </form>

            </div>
        </>
    )
}

export default ProductUpload;