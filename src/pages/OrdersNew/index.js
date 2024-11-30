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


const OrdersNew = () => {

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const [singleOrder, setSingleOrder] = useState();

    useEffect(()=>{
        window.scrollTo(0,0);

        fetchDataFromApi(`/api/orders?status=pending`).then((res)=>{
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
                fetchDataFromApi(`/api/orders?status=pending`).then((res)=>{
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
                            label="Đơn mới"
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
                                    <th>Hành động</th>
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
                                                >Nhấn để xem</span>
                                            </td>
                                            <td>{order?.name}</td>
                                            <td>{order?.phone}</td>
                                            <td>{order?.address}</td>
                                            <td>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order?.amount)}
                                            </td>
                                            <td>{order?.email}</td>
                                            <td>
                                                <span className=' badge badge-success cursor'
                                                onClick={()=>orderStatus("shipped", order?._id)}>Xác nhận</span>
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
                                    <th>Tên sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Số lượng</th>
                                    <th>Size, Màu</th>
                                    <th>Tổng giá</th>
                                    <th>ProductId</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    products?.length!==0 && products?.map((product, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{product?.productTitle}</td>
                                                <td>
                                                    <div className='img'>
                                                        <img src={product?.images} />
                                                    </div>
                                                </td>
                                                <td>{product?.quantity}</td>
                                                <td>{product?.size},{product?.color}</td>
                                                <td>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product?.subTotal)}
                                                </td>
                                                <td>{product?.productId}</td>
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

export default OrdersNew;