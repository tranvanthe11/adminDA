import React, { useContext, useState, useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import { MyContext } from '../../App';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button } from '@mui/material';
import { IoMdCloudUpload } from "react-icons/io";
import CircularProgress from '@mui/material/CircularProgress';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


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


const AddProductSize = () => {

    const context = useContext(MyContext);

    const formdata = new FormData();

    const history = useNavigate();

    const [editId, setEditId] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [productSizeData, setProductSizeData] = useState([]);

    const [formFields, setFormFields] = useState({
        productSize:''
    });

    useEffect(()=>{
        fetchDataFromApi("/api/productSize").then((res)=>{
            setProductSizeData(res);
        })
    }, [])



    const inputChange = (e)=>{
        setFormFields(()=>(
            {
                ...formFields,
                [e.target.name]:e.target.value
            }
        ))
    }

    const addProductSIze = (e) => {

        e.preventDefault();

        formdata.append('productSize', formFields.productSize);

        if(formFields.productSize===""  ){
            context.setAlertBox({
                open:true,
                error: true,
                msg: "Vui lòng thêm size"
            });
            return false;
        }
        setIsLoading(true);

        if(editId==""){
            postData('/api/productSize/create', formFields).then((res)=>{
                context.setAlertBox({
                    open:true,
                    error: false,
                    msg: "Them size thanh cong"
                });
                setFormFields({
                    productSize: "",
                })
                fetchDataFromApi("/api/productSize").then((res)=>{
                    setProductSizeData(res);
                })
                setIsLoading(false);
            })

        }else{
            editData(`/api/productSize/${editId}`, formFields).then((res)=>{
                fetchDataFromApi("/api/productSize").then((res)=>{
                    setProductSizeData(res);
                    setEditId("");
                    setIsLoading(false)
                    setFormFields({
                        productSize: "",
                    })
                })
                context.setAlertBox({
                    open:true,
                    error: false,
                    msg: "Cap nhat size thanh cong"
                });
            })
        }
    }

    const deleteItem=(id)=>{
        deleteData(`/api/productSize/${id}`).then((res)=>{
            context.setAlertBox({
                open:true,
                error: false,
                msg: "Xoa size thanh cong"
            });
            fetchDataFromApi("/api/productSize").then((res)=>{
                setProductSizeData(res);
            })
        })
    }

    const updateData=(id)=>{
        fetchDataFromApi(`/api/productSize/${id}`).then((res)=>{
            setEditId(id);
            setFormFields({
                productSize: res.productSize
            })
        })
    }

    return(
        <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Thêm Size</h5>
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
                        label="Size"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb 
                        label="Thêm Size"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={addProductSIze} >
                    <div className='row'>
                        <div className='col-sm-8'>
                            <div className='card p-4 mt-0'>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Size sản phẩm</h6>
                                            <input type='text' name='productSize' value={formFields.productSize} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" className='btn-blue btn-lg btn-big w-100'>
                                    <IoMdCloudUpload /> &nbsp;{isLoading===true ? 
                                    <CircularProgress color="inherit" className=' loader' /> : 'Thêm size'}
                                </Button>
                            </div>
                        </div>
                    </div>

                </form>

                {
                    productSizeData?.length!==0 &&
                    <div className='row'>
                        <div className='col-md-8'>

                            <div className='card p-4 mt-0'>
                                <div className="table-reponsive mt-3">
                                        <table className="table table-bordered v-align">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th >Size sản phẩm</th>
                                                    <th width="30%">Hành động</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    productSizeData?.map((item, index)=>{
                                                        return(

                                                            <tr>
                                                                <td>{item?.productSize}</td>
                                                                <td>
                                                                        <div className="actions d-flex align-items-center">
                                                                            <Button
                                                                            onClick={()=>updateData(item.id)}><FaPencilAlt /></Button>
                                                                            <Button color="error" onClick={()=>deleteItem(item.id)}
                                                                            ><MdDelete /></Button>
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
                    </div>
                }



        </div>
    )
}

export default AddProductSize;