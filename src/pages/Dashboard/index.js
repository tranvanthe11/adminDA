import DashboardBox from "./components/dashboardBox";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";

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
import { fetchDataFromApi } from "../../utils/api";
import { Link } from 'react-router-dom';
import { deleteData } from '../../utils/api';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



const Dashboard = () => {

    const context = useContext(MyContext);

    useEffect(()=>{
        context.setIsHideSidebarAndHeader(false);
        context.setProgress(30)

        fetchDataFromApi('/api/products').then((res)=>{
            setProductList(res);
            context.setProgress(100)
        })
    }, [])

    const deleteProduct = (id) => {
        context.setProgress(30);
        deleteData(`/api/products/${id}`).then((res)=>{
            context.setProgress(100);
            context.setAlertBox({
                open: true,
                msg: "Xóa sản phẩm thành công",
                error: true
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

    const [showby, setShowby] = useState('');
    const [catby, setCatby] = useState('');
    const [productList, setProductList] = useState([]);
    return(
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-8">
                        <div className="dashboardBoxWrapper d-flex">
                            <DashboardBox color={["#1da256", "#48d483"]} icon={<FaUserCircle />} />
                            <DashboardBox color={["#2c78e5", "#60aff5"]} icon={<FaShoppingCart />} />
                            <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<FaBagShopping />} />
                            <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<MdRateReview />} />

                        </div>
                    </div>

                    <div className="col-md-4 pl-0">
                        <div className="box graphBox">
                            
                        </div>
                    </div>
                </div>


                <div className="card shadow border-0 p-3">
                    <h3 className="hd">Best Selling Products</h3>

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
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>Category</h4>

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
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Loại</th>
                                    <th>Thương hiệu</th>
                                    <th>Giá</th>
                                    <th>Sao</th>
                                    <th>Trong kho</th>
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
                                                            src={`${context.baseUrl}/upload/${item.images[0]}`} />
                                                        </div>
                                                    </div>
                                                    <div className="info pl-1">
                                                        <h6>{item.name}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.category.name}</td>
                                            <td>{item.brand}</td>
                                            <td>
                                                <del className="old">{item.oldPrice}</del>
                                                <span className="new text-danger">{item.price}</span>
                                            </td>
                                            {/* <td>{item.rating}</td> */}
                                            <td><Rating name='read-only' defaultValue={item.rating} precision={0.5} size='small' readOnly /></td>
                                            <td>{item.countInStock}</td>
                                            <td>
                                                <div className="actions d-flex align-items-center">
                                                    <Link to="/product/details">
                                                        <Button><FaEye /></Button>
                                                    </Link>
                                                    <Button><FaPencilAlt /></Button>
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

export default Dashboard;