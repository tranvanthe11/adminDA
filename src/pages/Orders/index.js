import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import { editData, fetchDataFromApi } from '../../utils/api';
import Dialog from '@mui/material/Dialog';
import { IoClose } from "react-icons/io5";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';


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


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [singleOrder, setSingleOrder] = useState();

    useEffect(()=>{
        window.scrollTo(0,0);

        fetchDataFromApi(`/api/orders`).then((res)=>{
            setOrders(res?.ordersList);
        })
    }, [])

    const showProducts=(id)=>{
        fetchDataFromApi(`/api/orders/${id}`).then((res)=>{
            setIsOpenModal(true);
            setProducts(res?.products);
        })
    }

    const orderStatus=(status, id)=>{
        fetchDataFromApi(`/api/orders/${id}`).then((res)=>{

            const order = {
                    name: res.name,
                    phone: res.phone,
                    address: res.address,
                    amount: parseInt(res.amount),
                    email: res.email,
                    userId: res.userId,
                    products: res.products,
                    paymentId: res.id,
                    status: status
            }
            console.log(order)

            editData(`/api/orders/${id}`, order).then((res)=>{
                fetchDataFromApi(`/api/orders`).then((res)=>{
                    setOrders(res?.ordersList);
                })
            })
            setSingleOrder(res?.products);
        })
    }
    return(
        <>
        <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Danh sách đơn mua</h5>

                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Bảng điều khiển"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            label="Danh sách đơn mua"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                    </div>
                </div>

                <div className="card shadow border-0 p-3">
                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered table-responsive v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Tên</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Tổng giá</th>
                                    <th>Email</th>
                                    <th>Trạng thái</th>
                                    <th>User Id</th>
                                    <th>Payment Id</th>
                                    <th>Ngày</th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                orders?.length!==0 && orders?.map((order, index)=>{
                                    return(
                                        <tr>
                                            <td>
                                                <span className='text-red font-weight-bold cursor'
                                                onClick={()=>showProducts(order?._id)}
                                                >Click here to view</span>
                                            </td>
                                            <td>{order?.name}</td>
                                            <td>{order?.phone}</td>
                                            <td>{order?.address}</td>
                                            <td>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order?.amount)}
                                            </td>
                                            <td>{order?.email}</td>
                                            <td>
                                            <FormControl size="small" className="w-100">
                                                <Select
                                                    value={order?.status}
                                                    onChange={(e)=>orderStatus(e.target.value, order?._id)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    className='w-100'
                                                    name='status'
                                                    >
                                                    {/* <MenuItem value="">
                                                        <em value={null}>None</em>
                                                    </MenuItem> */}
                                                    <MenuItem className='text-capitalize' value="pending" >Chờ xác nhận</MenuItem>
                                                    <MenuItem className='text-capitalize' value="confirm" >Xác nhận</MenuItem>
                                                    <MenuItem className='text-capitalize' value="shipped" >Đang giao</MenuItem>
                                                    <MenuItem className='text-capitalize' value="done" >Hoàn thành</MenuItem>
                                                    <MenuItem className='text-capitalize' value="refund" >Hoàn hàng</MenuItem>
                                                    <MenuItem className='text-capitalize' value="cancel" >Đã hủy</MenuItem>
                                                </Select>
                                            </FormControl>
                                            </td>
                                            <td>{order?.userId}</td>
                                            <td>{order?.paymentId}</td>
                                            <td>{order?.date}</td>
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

        </div>
                <Dialog open={isOpenModal} className='productModal' >
                    <Button className="close_" onClick={()=>setIsOpenModal(false)}><IoClose /></Button>
                    <h4 className='mb-1 font-weight-bold mb-3'>Products</h4>

                    <div className='table-responsive orderTable'>
                        <table className='table table-striped table-bordered'>
                            <thead className='thead-light'>
                                <tr>
                                    <th>ProductId</th>
                                    <th>ProductTitle</th>
                                    <th>Images</th>
                                    <th>Quantity</th>
                                    <th>Size, Màu</th>
                                    <th>subTotal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products?.length!==0 && products?.map((product, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{product?.productId}</td>
                                                <td>{product?.productTitle}</td>
                                                <td>
                                                    <div className='img'>
                                                        <img src={product?.images} />
                                                    </div>
                                                </td>
                                                <td>{product?.quantity}</td>
                                                <td>{product?.size}, {product?.color}</td>
                                                <td>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.subTotal)}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            </Dialog>
        </>
    )
}

export default Orders;