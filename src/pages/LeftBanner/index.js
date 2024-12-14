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

const LeftBanner = () => {

    const [slideList, setSlideList] = useState([]);
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);


    const context = useContext(MyContext);



    useEffect(()=>{
        window.scrollTo(0,0);

        context.setProgress(30)

        fetchDataFromApi('/api/leftBanner').then((res)=>{
            setSlideList(res);
            context.setProgress(100)
        })
    }, []);

    

    const deleteSlide=(id)=>{
        deleteData(`/api/leftBanner/${id}`).then((res)=>{
            fetchDataFromApi('/api/leftBanner').then((res)=>{
                setSlideList(res);
            })
        })
    }

    return(
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Danh sách Banner</h5>

                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Bảng điều khiển"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            label="Banner bên trái"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                        <Link to="/leftBanner/add">
                            <Button className='btn-blue ml-3 pl-3 pr-3'>Thêm Banner</Button>
                        </Link>

                    </div>
                </div>

                <div className="card shadow border-0 p-3">

                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th style={{width: '800px'}}>Banner</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    slideList?.length!==0 && slideList?.map((item, index)=>{
                                        return(
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center productBox">
                                                        <div className="imgWrapper" style={{width: '200px', flex: '0 0 200px'}}>
                                                            <div className="img">
                                                                <img className="w-100"
                                                                src={item.images} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <Link to={`/leftBanner/edit/${item.id}`} >
                                                            <Button className='success' ><FaPencilAlt /></Button>
                                                        </Link>
                                                        <Button className='error' color="error" onClick={()=>deleteSlide(item.id)}><MdDelete /></Button>
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

export default LeftBanner;