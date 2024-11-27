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
import { useContext, useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Pagination from '@mui/material/Pagination';
import { MyContext } from "../../App";
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { deleteData, fetchDataFromApi } from '../../utils/api';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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


const Products = () => {

    const [showby, setShowby] = useState('');
    const [catby, setCatby] = useState('');

    const [productList, setProductList] = useState([]);

    const context = useContext(MyContext);

    useEffect(()=>{
        window.scrollTo(0,0);

        context.setProgress(30)

        fetchDataFromApi('/api/products').then((res)=>{
            setProductList(res);
            context.setProgress(100)
        })
    }, []);

    const deleteProduct = (id) => {
        context.setProgress(30);
        deleteData(`/api/products/${id}`).then((res)=>{
            context.setProgress(100);
            context.setAlertBox({
                open: true,
                msg: "Xóa sản phẩm thành công",
                error: false
            })
            fetchDataFromApi('/api/products').then((res)=>{
                setProductList(res);
            })
        })
    }

    const handleChange = (event, value) => {
        context.setProgress(30)
        fetchDataFromApi(`/api/products?page=${value}`).then((res)=>{
            setProductList(res);
            context.setProgress(100)
        })
    }

    return(
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Danh sách sản phẩm</h5>

                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Bảng điều khiển"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            label="Sản phẩm"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                        <Link to="/product/upload">
                            <Button className='btn-blue ml-3 pl-3 pr-3'>Thêm sản phẩm</Button>
                        </Link>

                    </div>
                </div>

                <div className="card shadow border-0 p-3">
                    <h3 className="hd">Sản phẩm</h3>

                    <div className="row cardFilters mt-2">
                        <div className="col-md-3">
                            <h4>Show</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                value={showby}
                                onChange={(e)=>setShowby(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                labelId="demo-select-small-label"
                                className="w-100"
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
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>Loại</h4>

                            <FormControl size="small" className="w-100">
                                <Select
                                value={catby}
                                onChange={(e)=>setCatby(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                labelId="demo-select-small-label"
                                className="w-100"
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
                            </FormControl>
                        </div>
                    </div>

                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Loại sản phẩm</th>
                                    <th>Thương hiệu</th>
                                    {/* <th>Thương hiệu</th> */}
                                    <th>Giá</th>
                                    {/* <th>Sao</th> */}
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    productList?.products?.length!==0 && productList?.products?.map((item,index)=>{
                                        return(
                                            <tr>
                                            {/* <td>
                                                <div className="d-flex align-items-center">
                                                <Checkbox {...label} /><span>1</span>
                                                </div>
                                            </td> */}
                                            <td>
                                                <div className="d-flex align-items-center productBox">
                                                    <div className="imgWrapper">
                                                        <div className="img">
                                                            <img className="w-100" 
                                                            src={item.images[0]} />
                                                        </div>
                                                    </div>
                                                    <div className="info pl-1">
                                                        <h6>{item.name}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.category.name}</td>
                                            <td>{item.brand.brand}</td>
                                            <td>
                                                <del className="old">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.oldPrice)}
                                                </del>
                                                <span className="new text-danger">
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}

                                                </span>
                                            </td>
                                            {/* <td><Rating name='read-only' defaultValue={item.rating} precision={0.5} size='small' readOnly /></td> */}
                                            <td>
                                                {[...new Set(item?.sizesAndColors?.map((entry) => entry.size))].map((uniqueSize, index) => (
                                                    <span className="badge badge-primary mr-2" key={index}>
                                                        {uniqueSize}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>
                                                {[...new Set(item?.sizesAndColors?.map((entry) => entry.color))].map((uniqueColor, index) => (
                                                    <span className="badge badge-primary mr-2" key={index}>
                                                        {uniqueColor}
                                                    </span>
                                                ))}
                                            </td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Link to={`/product/details/${item?.id}`}>
                                                        <Button><FaEye /></Button>
                                                    </Link>
                                                    <Link to={`/product/edit/${item.id}`}>
                                                        <Button><FaPencilAlt /></Button>
                                                    </Link>
                                                    <Button color="error"
                                                    onClick={()=>deleteProduct(item.id)}><MdDelete /></Button>
                                                </div>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }

                            </tbody>

                        </table>

                        {

                            productList?.totalPages > 1 &&
                            <div className="d-flex tableFooter">
                                <Pagination count={productList?.totalPages} color="primary" className="pagination"
                                showFirstButton showLastButton onChange={handleChange}/>
                            </div>
                        }

                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Products;