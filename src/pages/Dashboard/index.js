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
import { useState } from "react";
import { Button } from "@mui/material";
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Pagination from '@mui/material/Pagination';



const Dashboard = () => {

    const [showby, setShowby] = useState('');
    const [catby, setCatby] = useState('');
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
                                    <th>UID</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Rating</th>
                                    <th>Order</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
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
                                    <td>19</td>
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
                                    <td>1</td>
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
                                    <td>19</td>
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
                                    <td>1</td>
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
                                    <td>19</td>
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
                                    <td>1</td>
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
                                    <td>19</td>
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
                                    <td>1</td>
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
                                    <td>19</td>
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
                                    <td>1</td>
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
                                    <td>19</td>
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
                                    <td>1</td>
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
                                    <td>19</td>
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
                            <p>Show <b>12</b> of <b>60</b> results</p>
                            <Pagination count={10} color="primary" className="pagination"
                            showFirstButton showLastButton/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;