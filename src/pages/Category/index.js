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

const Category = () => {

    const [catData, setCatData] = useState([]);
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    const context = useContext(MyContext);



    // const [formFields, setFormFields] = useState({
    //     name: '',
    //     brand: '',
    //     images: [],
    //     color: ''
    // });

    useEffect(()=>{
        window.scrollTo(0,0);

        context.setProgress(30)

        fetchDataFromApi('/api/category').then((res)=>{
            setCatData(res);
            context.setProgress(100)
        })
    }, []);

    //   const changeInput = (e)=>{
    //     setFormFields(()=>(
    //         {
    //             ...formFields,
    //             [e.target.name]:e.target.value
    //         }
    //     ))
    // }
    

    const deleteCat=(id)=>{
        deleteData(`/api/category/${id}`).then((res)=>{
            fetchDataFromApi('/api/category').then((res)=>{
                setCatData(res);
            })
        })
    }

    const handleChange = (event, value) => {
        context.setProgress(30)
        fetchDataFromApi(`/api/category?page=${value}`).then((res)=>{
            setCatData(res);
            context.setProgress(100)
        })
    }

    return(
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Danh sách loại sản phẩm</h5>

                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Bảng điều khiển"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            label="Loại sản phẩm"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                        <Link to="/category/add">
                            <Button className='btn-blue ml-3 pl-3 pr-3'>Thêm loại sản phẩm</Button>
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
                                    <th>Màu</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    catData?.categoryList?.length!==0 && catData?.categoryList?.map((item, index)=>{
                                        return(
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>
                                                    <div className="d-flex align-items-center productBox">
                                                        <div className="imgWrapper">
                                                            <div className="img">
                                                                <img className="w-100"
                                                                src={item.images} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.color}</td>
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to={`/category/edit/${item.id}`} >
                                                            <Button className='success' ><FaPencilAlt /></Button>
                                                        </Link>
                                                        <Button className='error' color="error" onClick={()=>deleteCat(item.id)}><MdDelete /></Button>
                                                    </div>
                                                </td>
                                            </tr>

                                        )
                                    })
                                }


                            </tbody>

                        </table>
                        {
                            catData?.totalPages>1 &&
                            <div className="d-flex tableFooter">
                                <Pagination count={catData?.totalPages} color="primary" className="pagination"
                                showFirstButton showLastButton onChange={handleChange}/>
                            </div>
                        }

                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Category;