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
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Pagination from '@mui/material/Pagination';
import { MyContext } from "../../App";
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

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

    return(
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Danh sách sản phẩm</h5>
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
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={30}>30</MenuItem>
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
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Hoodie</MenuItem>
                                <MenuItem value={20}>Quần</MenuItem>
                                <MenuItem value={30}>Áo</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>UID</th>
                                    <th>Sản phẩm</th>
                                    <th>Loại</th>
                                    <th>Thương hiệu</th>
                                    <th>Giá</th>
                                    <th>Sao</th>
                                    <th>Đã bán</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <Checkbox {...label} /><span>1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img">
                                                    <img className="w-100"
                                                    src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thu-dong-nu-co-lo-yody-atn6078-tra-2.jpg" />
                                                </div>
                                            </div>
                                            <div className="info pl-0">
                                                <h6>day la ao hoodie cua nha teela ne la khong ban</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Nam</td>
                                    <td>Teelab</td>
                                    <td>
                                        <del className="old">20.000</del>
                                        <span className="new text-danger">19.000</span>
                                    </td>
                                    <td>4(16)</td>
                                    <td>380</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                                <Button><FaEye /></Button>
                                            </Link>
                                            <Button><FaPencilAlt /></Button>
                                            <Button color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <Checkbox {...label} /><span>1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img">
                                                    <img className="w-100"
                                                    src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thu-dong-nu-co-lo-yody-atn6078-tra-2.jpg" />
                                                </div>
                                            </div>
                                            <div className="info pl-0">
                                                <h6>day la ao hoodie cua nha teela ne la khong ban</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Nam</td>
                                    <td>Teelab</td>
                                    <td>
                                        <del className="old">20.000</del>
                                        <span className="new text-danger">19.000</span>
                                    </td>
                                    <td>4(16)</td>
                                    <td>380</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Link to="/product/details">
                                            <Button><FaEye /></Button>
                                            </Link>
                                            <Button><FaPencilAlt /></Button>
                                            <Button color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <Checkbox {...label} /><span>1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img">
                                                    <img className="w-100"
                                                    src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thu-dong-nu-co-lo-yody-atn6078-tra-2.jpg" />
                                                </div>
                                            </div>
                                            <div className="info pl-0">
                                                <h6>day la ao hoodie cua nha teela ne la khong ban</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Nam</td>
                                    <td>Teelab</td>
                                    <td>
                                        <del className="old">20.000</del>
                                        <span className="new text-danger">19.000</span>
                                    </td>
                                    <td>4(16)</td>
                                    <td>380</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Button><FaEye /></Button>
                                            <Button><FaPencilAlt /></Button>
                                            <Button color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="d-flex align-items-center">
                                        <Checkbox {...label} /><span>1</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center productBox">
                                            <div className="imgWrapper">
                                                <div className="img">
                                                    <img className="w-100"
                                                    src="https://m.yodycdn.com/fit-in/filters:format(webp)/products/ao-thu-dong-nu-co-lo-yody-atn6078-tra-2.jpg" />
                                                </div>
                                            </div>
                                            <div className="info pl-0">
                                                <h6>day la ao hoodie cua nha teela ne la khong ban</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>Nam</td>
                                    <td>Teelab</td>
                                    <td>
                                        <del className="old">20.000</del>
                                        <span className="new text-danger">19.000</span>
                                    </td>
                                    <td>4(16)</td>
                                    <td>380</td>
                                    <td>
                                        <div className="actions d-flex align-items-center">
                                            <Button><FaEye /></Button>
                                            <Button><FaPencilAlt /></Button>
                                            <Button color="error"><MdDelete /></Button>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                        <div className="d-flex tableFooter">
                            <p>Show <b>4</b> of <b>60</b> results</p>
                            <Pagination count={10} color="primary" className="pagination"
                            showFirstButton showLastButton/>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Products;