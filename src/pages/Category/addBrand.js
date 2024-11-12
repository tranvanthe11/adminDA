import React, { useContext, useState } from 'react';
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
import { postData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';




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


const AddBrand = () => {

    const context = useContext(MyContext);

    const formdata = new FormData();

    const history = useNavigate();

    const [categoryVal, setCategoryVal] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [formFields, setFormFields] = useState({
        category:'',
        brand:''
});


    const handleChangeCategory = (event) => {
        setCategoryVal(event.target.value);
        setFormFields(()=>(
            {
                ...formFields,
                category:event.target.value
            }
        ))
    };

    const inputChange = (e)=>{
        setFormFields(()=>(
            {
                ...formFields,
                [e.target.name]:e.target.value
            }
        ))
    }

    const addBrand = (e) => {
        e.preventDefault();

        formdata.append('category', formFields.category);
        formdata.append('brand', formFields.brand);

        if(formFields.category===""  ){
            context.setAlertBox({
                open:true,
                error: true,
                msg: "Vui lòng chọn loại sản phẩm"
            });
            return false;
        }

        if(formFields.brand===""  ){
            context.setAlertBox({
                open:true,
                error: true,
                msg: "Vui lòng nhập thương hiệu"
            });
            return false;
        }

        postData('/api/brand/create', formFields).then((res)=>{
            setIsLoading(false);
            history('/brand')
        })

    }

    return(
        <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Thêm thương hiệu</h5>
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
                        label="Thương hiệu"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb 
                        label="Thêm thương hiệu"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                    </Breadcrumbs>
                </div>

                <form className='form' onSubmit={addBrand} >
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='card p-4 mt-0'>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Loại sản phẩm</h6>
                                            <Select
                                            value={categoryVal}
                                            onChange={handleChangeCategory}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            className='w-100'
                                            name='category'
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
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <h6>Thương hiệu</h6>
                                            <input type='text' name='brand' value={formFields.brand} onChange={inputChange} />
                                        </div>
                                    </div>
                                </div>

                                <Button type="submit" className='btn-blue btn-lg btn-big w-100'>
                                    <IoMdCloudUpload /> &nbsp;{isLoading===true ? 
                                    <CircularProgress color="inherit" className=' loader' /> : 'Thêm thương hiệu'}
                                </Button>
                            </div>
                        </div>
                    </div>

                </form>
        </div>
    )
}

export default AddBrand;