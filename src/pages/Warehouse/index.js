import React, { useContext, useEffect, useState } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import { editData, fetchDataFromApi, postDataUser } from '../../utils/api';
import Dialog from '@mui/material/Dialog';
import { IoClose } from "react-icons/io5";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { MyContext } from '../../App';
import { IoSearch } from "react-icons/io5";


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


const Warehouse = () => {

    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClearStockModalOpen, setIsClearStockModalOpen] = useState(false);
    const [selectedSizeColor, setSelectedSizeColor] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [promotionQuantity, setPromotionQuantity] = useState('');
    const [promotionDiscount, setPromotionDiscount] = useState('');

    const [sortByStock, setSortByStock] = useState('');
    const [sortByDate, setSortByDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const context = useContext(MyContext);


    useEffect(()=>{
        window.scrollTo(0,0);

        fetchDataFromApi('/api/products').then((res) => {
            setProducts(res?.products);
        });
    }, [])

    const handleStockIn = async () => {
        if (quantity <= 0) {
            context.setAlertBox({
                open: true,
                msg: "Số lượng phải lớn hơn 0",
                error: true
            })
            return;
        }

        const { size, color, product } = selectedSizeColor;
        
        const response = await editData(`/api/products/stock-in/${product._id}`, {
            size: size,
            color: color,
            quantity: quantity,
        });

        if (response.success) {
            context.setAlertBox({
                open: true,
                msg: "Đã nhập hàng vào kho",
                error: false
            })
            fetchDataFromApi('/api/products').then((res) => {
                setProducts(res?.products);
            });
            setIsModalOpen(false);
            setQuantity('');
        } else {
            context.setAlertBox({
                open: true,
                msg: "Có lỗi khi nhập kho",
                error: true
            })
        }
    };

    const handleApplyPromotion = async () => {
        const { size, color, product } = selectedSizeColor;
    
        const response = await postDataUser(`/api/products/promote/${product._id}`, {
            size: size,
            color: color,
            promotionDiscount: promotionDiscount,
            promotionQuantity: promotionQuantity,
        });
    
        if (response.success) {
            context.setAlertBox({
                open: true,
                msg: `Khuyến mãi đã được áp dụng cho ${size} - ${color} thành công!`,
                error: false,
            });
            fetchDataFromApi('/api/products').then((res) => {
                setProducts(res?.products);
            });
            setIsClearStockModalOpen(false);
            setPromotionQuantity('');
            setPromotionDiscount('')
        } else {
            context.setAlertBox({
                open: true,
                msg: `Lỗi: ${response.message}`,
                error: true,
            });
        }
    };

    const getSortedProducts = () => {
        let allSizesAndColors = [];
    
        products.forEach((product) => {
            product.sizesAndColors.forEach((sizeColor) => {
                allSizesAndColors.push({
                    ...sizeColor,
                    product,
                });
            });
        });

        if (searchTerm) {
            allSizesAndColors = allSizesAndColors.filter((item) =>
                item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
    
        if (sortByStock) {
            allSizesAndColors.sort((a, b) =>
                sortByStock === 'asc'
                    ? a.countInStock - b.countInStock
                    : b.countInStock - a.countInStock
            );
        }
    
        if (sortByDate) {
            allSizesAndColors.sort((a, b) =>
                sortByDate === 'asc'
                    ? new Date(a.dateStockIn) - new Date(b.dateStockIn)
                    : new Date(b.dateStockIn) - new Date(a.dateStockIn)
            );
        }
        console.log(allSizesAndColors)
        return allSizesAndColors;
    };

    return(
        <>
        <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Kho hàng</h5>

                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Bảng điều khiển"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            label="Kho hàng"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                    </div>
                </div>

                <div className="card shadow border-0 p-3">
                    <div className="row cardFilters mt-2">
                        <div className="col-md-3">
                            <h4>Sắp xếp theo tồn kho</h4>
                            <FormControl size="small" className="w-100">
                                <Select
                                    value={sortByStock}
                                    onChange={(e) => setSortByStock(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="sort-stock-label"
                                    className="w-100"
                                >
                                    <MenuItem value="">
                                        <em value={null}>None</em>
                                    </MenuItem>
                                    <MenuItem value="asc">Thấp đến cao</MenuItem>
                                    <MenuItem value="desc">Cao đến thấp</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="col-md-3">
                            <h4>Sắp xếp theo ngày nhập</h4>

                            <FormControl size="small" className="w-100">
                                <Select
                                    value={sortByDate}
                                    onChange={(e) => setSortByDate(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    labelId="sort-date-label"
                                    className="w-100"
                                >
                                    <MenuItem value="">
                                        <em value={null}>None</em>
                                    </MenuItem>
                                    <MenuItem value="asc">Thấp đến cao</MenuItem>
                                    <MenuItem value="desc">Cao đến thấp</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className='col-md-3 mt-4'>

                            <div className="searchBox posotion-relative d-flex align-items-center">
                                <IoSearch className="mr-2"/>
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm ở đây" 
                                    value={searchTerm} 
                                    onChange={(e) => setSearchTerm(e.target.value)} 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered table-responsive v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Mã hàng</th>
                                    <th>Sản phẩm</th>
                                    <th>Size</th>
                                    <th>Màu</th>
                                    <th>Giá bán</th>
                                    <th>Giá nhập</th>
                                    <th>Tồn kho</th>
                                    <th>Thời gian nhập</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                getSortedProducts()?.length !== 0 && getSortedProducts().map((item) => {
                                    return (
                                        // product.sizesAndColors.map((sizeColor, index) => (
                                            <tr key={item._id} className={item.countInStock < 10 ? 'low-stock' : ''}>
                                                <td>{item.product.name.slice(-5)}</td>
                                                <td>
                                                    <div className="d-flex align-items-center productBox warehouse">
                                                        <div className="imgWrapper">
                                                            <div className="img">
                                                                <img
                                                                    className="w-100"
                                                                    src={item.product.images[0]}
                                                                    alt={item.product.name}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="info pl-1">
                                                            <h6>
                                                                {item.product.name}
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.size}</td>
                                                <td>{item.color}</td>
                                                <td>
                                                {item.isPromotion
                                                ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.pricePromotion)
                                                : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.price)}
                                                </td>
                                                <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product.costPrice)}</td>
                                                <td>{item.countInStock}</td>
                                                <td>
                                                    {new Date(item.dateStockIn).toLocaleString('vi-VN', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                                <td>
                                                <Button
                                                    className='btn-blue pl-3 pr-3'
                                                    onClick={() => {
                                                        setSelectedSizeColor({ ...item, product: item.product });
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    Nhập kho
                                                </Button>
                                                <Button className='btn-blue pl-3 pr-3 ml-3'
                                                onClick={() => {
                                                    setSelectedSizeColor({ ...item, product: item.product });
                                                    setIsClearStockModalOpen(true)
                                                }}
                                                >Khuyến mãi</Button>
                                                </td>
                                            </tr>
                                        // ))
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

        </div>
        

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className='productModal'>
            <Button className="close_" onClick={()=>setIsModalOpen(false)}><IoClose /></Button>
            <h4 className='mb-1 font-weight-bold mb-3'>Nhập kho cho sản phẩm</h4>
            <p>Bạn có chắc chắn muốn nhập kho cho size <b>{selectedSizeColor?.size}</b> và màu <b>{selectedSizeColor?.color}</b>?</p>
                    <div className="form-group">
                        <TextField
                            label="Số lượng"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            fullWidth
                        />
                    </div>
                    <Button className='btn-blue pl-3 pr-3 w-100' onClick={handleStockIn}>
                        Xác nhận
                    </Button>
            </Dialog>

            <Dialog open={isClearStockModalOpen} onClose={() => setIsClearStockModalOpen(false)} className="productModal">
                <Button className="close_" onClick={() => setIsClearStockModalOpen(false)}>
                    <IoClose />
                </Button>
                <h4 className="mb-1 font-weight-bold mb-3">Xác nhận áp dụng khuyến mãi</h4>
                <p>Bạn có chắc chắn muốn áp dụng khuyến mãi cho size <b>{selectedSizeColor?.size}</b> và màu <b>{selectedSizeColor?.color}</b>?</p>
                    <div className="form-group">
                        <TextField
                            label="Giảm giá (%)"
                            type="number"
                            value={promotionDiscount}
                            onChange={(e) => setPromotionDiscount(e.target.value)}
                            fullWidth
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            label="Số lượng khuyến mãi"
                            type="number"
                            value={promotionQuantity}
                            onChange={(e) => setPromotionQuantity(e.target.value)}
                            fullWidth
                        />
                    </div>

                <Button className="btn-blue pl-3 pr-3 w-100" onClick={handleApplyPromotion}>
                    Xác nhận
                </Button>
            </Dialog>
        </>
    )
}

export default Warehouse;