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
import { useState } from 'react';
import { Button } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoCloseSharp } from "react-icons/io5";
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

const ProductUpload = () => {

    const [categoryVal, setCategoryVal] = useState('');
    const [subCatVal, setSubCatVal] = useState('');
    const [productSizes, setProductSizes] = useState([]);
    const [isFeaturedValue, setIsFeaturedValue] = useState('');
    const [ratingValue, setRatingValue] = useState(1);

    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
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

    const handleChangeisFeaturedValue = (event) => {
        setIsFeaturedValue(event.target.value);
    };

    const addProduct = () => {

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

                <form className='form'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='card p-4 mt-0'>
                                <h5 className='mb-4'>Basic information</h5>

                                <div className='form-group'>
                                    <h6>Ten san pham</h6>
                                    <input type='text' name='name' />
                                </div>

                                <div className='form-group'>
                                    <h6>Mo ta</h6>
                                    <textarea row={5} cols={10} name='description' />
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
                                            <MenuItem className='text-capitalize' value="hoodie">hoodie</MenuItem>
                                            <MenuItem className='text-capitalize' value="bo">bo</MenuItem>
                                        </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Sub category</h6>
                                            <Select
                                                value={subCatVal}
                                                onChange={handleChangeSubCategory}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                className='w-100'
                                                >
                                                <MenuItem value="">
                                                    <em value={null}>None</em>
                                                </MenuItem>
                                                <MenuItem className='text-capitalize' value='ten'>Ten</MenuItem>
                                                <MenuItem className='text-capitalize' value='for'>For</MenuItem>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>gia moi</h6>
                                            <input type='text' name='price' />
                                        </div>
                                    </div>

                                </div>

                                {/* <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>gia cu</h6>
                                            <input type='text' />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>gia moi</h6>
                                            <input type='text' />
                                        </div>
                                    </div>
                                </div> */}

                                <div className='row'>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>gia cu</h6>
                                            <input type='text' name='oldPrice' />
                                        </div>
                                    </div>
                                    {/* <div className='col'>
                                        <div className='form-group'>
                                            <h6>Rating</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={ratingValue}
                                                onChange={(event, newValue) => {
                                                setRatingValue(newValue);
                                                }}
                                            />
                                        </div>
                                    </div> */}

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>is Featured</h6>
                                            <Select
                                                // value={isFeaturedValue}
                                                onChange={handleChangeisFeaturedValue}
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
                                            <input type='text' name='countInStock' />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>discount</h6>
                                            <input type='text' name='discount' />
                                        </div>
                                    </div>

                                    <div className='col'>
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
                                            <h6>gia moi</h6>
                                            <input type='text' name='price' />
                                        </div>
                                    </div>

                                </div>

                                <div className='row'>

                                    <div className='col-md-4'>
                                        <div className='form-group'>
                                            <h6>Rating</h6>
                                            <Rating
                                                name="simple-controlled"
                                                // value={ratingValue}
                                                // onChange={(event, newValue) => {
                                                // setRatingValue(newValue);
                                                // }}
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
                                <div className='uploadBox'>
                                    <span className='remove'><IoCloseSharp /></span>
                                    <div className='box'>
                                        <LazyLoadImage
                                        alt={"image"}
                                        effect="blur"
                                        className="w-100"
                                        src={'https://mironcoder-hotash.netlify.app/images/product/single/01.webp'}
                                        />
                                    </div>
                                </div>

                                <div className='uploadBox'>
                                    <input type='file' multiple name='images' />
                                    <div className='info'>
                                        <FaRegImages />
                                        <h5>image upload</h5>
                                    </div>
                                </div>

                            </div>
                            <br />

                            <Button type="button" className='btn-blue btn-lg btn-big w-100'>
                                 <IoMdCloudUpload /> &nbsp;Xuat ban va xem
                             </Button>
                        </div>
                    </div>
               </form>

                {/* <form className='form'>
                    <div className='row'>
                        <div className='col-sm-9'>
                            <div className='card p-4'>
                                <h5 className='mb-4'>Basic information</h5>
                                <div className='form-group'>
                                    <h6>Ten san pham</h6>
                                    <input type='text' />
                                </div>

                                <div className='form-group'>
                                    <h6>Mo ta</h6>
                                    <textarea row={5} cols={10} />
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
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Brand</h6>
                                            <Select
                                            value={categoryVal}
                                            onChange={handleChangeCategory}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className='w-100'
                                            >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                        </div>
                                    </div>

                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>gia cu</h6>
                                            <input type='text' />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>gia moi</h6>
                                            <input type='text' />
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Rating</h6>
                                            <Rating
                                                name="simple-controlled"
                                                value={ratingValue}
                                                onChange={(event, newValue) => {
                                                setRatingValue(newValue);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>So luong</h6>
                                            <input type='text' />
                                        </div>
                                    </div>
                                </div>

                                <br />

                                <Button className='btn-blue btn-lg btn-big'>
                                    <IoMdCloudUpload /> &nbsp;Xuat ban va xem
                                </Button>
                            </div>
                        </div>

                    </div>
               </form> */}
            </div>
        </>
    )
}

export default ProductUpload;