import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';

import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import Pagination from '@mui/material/Pagination';
import Checkbox from '@mui/material/Checkbox';
import { useContext, useEffect, useState } from 'react';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';

import { MyContext } from '../../App';

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

const Brand = () => {

    const [brand, setBrand] = useState([]);

    const context = useContext(MyContext);


    useEffect(()=>{
        window.scrollTo(0,0);

        context.setProgress(30)

        fetchDataFromApi('/api/brand').then((res)=>{
            setBrand(res);
            context.setProgress(100)
        })
    }, []);

    

    const deleteBrand=(id)=>{
        deleteData(`/api/brand/${id}`).then((res)=>{
            fetchDataFromApi('/api/brand').then((res)=>{
                setBrand(res);
            })
        })
    }


    return(
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Danh sách Thương hiệu</h5>

                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Bảng điều khiển"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            label="Thương hiệu"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                        <Link to="/brand/add">
                            <Button className='btn-blue ml-3 pl-3 pr-3'>Thêm thương hiệu</Button>
                        </Link>

                    </div>
                </div>

                <div className="card shadow border-0 p-3">

                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{width: '300px'}}>Loại sản phẩm</th>
                                    <th>Ảnh</th>
                                    <th>Thương hiệu</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    brand?.length!==0 && brand?.map((item, index)=>{
                                        return(
                                            <tr>
                                                <td>{item.category.name}</td>
                                                <td>
                                                    <div className="d-flex align-items-center productBox">
                                                        <div className="imgWrapper">
                                                            <div className="img">
                                                                <img className="w-100"
                                                                src={item?.category?.images[0]} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.brand}</td>
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to={`/brand/edit/${item.id}`} >
                                                            <Button className='success' ><FaPencilAlt /></Button>
                                                        </Link>
                                                        <Button className='error' color="error" onClick={()=>deleteBrand(item.id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })
                                }


                            </tbody>

                        </table>

                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Brand;