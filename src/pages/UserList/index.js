import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useContext, useEffect, useState } from 'react';
import { deleteData, editData, fetchDataFromApi } from '../../utils/api';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

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

const UserList = () => {

    const [userList, setUserList] = useState([]);
    const [isAdmintValue, setIsAdminValue] = useState('');

    const context = useContext(MyContext);

    const [isLocked, setIsLocked] = useState(true);

    useEffect(()=>{
        window.scrollTo(0,0);

        context.setProgress(30)

        fetchDataFromApi('/api/user').then((res)=>{
            setUserList(res);
            context.setProgress(100)
        })
    }, []);
    

    const changeRole=(role, id)=>{
        fetchDataFromApi(`/api/user/${id}`).then((res)=>{

            const roles = {
                    name: res.name,
                    phone: res.phone,
                    email: res.email,
                    isAdmin: role,
                    isBlock:res.isBlock
            }
            editData(`/api/user/status/${id}`, roles).then((res)=>{
                fetchDataFromApi(`/api/user`).then((res)=>{
                    setUserList(res);
                })
            })
        })
    }

    const changeBlock = (id) => {
        fetchDataFromApi(`/api/user/${id}`).then((res)=>{

            const item = {
                    name: res.name,
                    phone: res.phone,
                    email: res.email,
                    isAdmin: res.isAdmin,
                    isBlock:!res.isBlock
            }
            editData(`/api/user/status/${id}`, item).then((res)=>{
                fetchDataFromApi(`/api/user`).then((res)=>{
                    setUserList(res);
                })
            })
        })
    };

    return(
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Danh sách người dùng</h5>

                    <div className='ml-auto d-flex align-items-center'>

                        <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                            <StyledBreadcrumb
                            component="a"
                            href="#"
                            label="Bảng điều khiển"
                            icon={<HomeIcon fontSize="small" />}
                            />
                            <StyledBreadcrumb 
                            label="Danh sách người dùng"
                            deleteIcon={<ExpandMoreIcon />}
                            />
                        </Breadcrumbs>

                    </div>
                </div>

                <div className="card shadow border-0 p-3">

                    <div className="table-reponsive mt-3">
                        <table className="table table-bordered v-align">
                            <thead className="thead-dark">
                                <tr>
                                    <th>UserId</th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Vai trò</th>
                                    <th>Block/UnBlock</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    userList?.length!==0 && userList?.map((item, index)=>{
                                        return(
                                            <tr>
                                                <td>{item._id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>
                                                <FormControl size="small" className="w-100">
                                                    <Select
                                                        value={item?.isAdmin}
                                                        onChange={(e)=>changeRole(e.target.value, item?._id)}
                                                        displayEmpty
                                                        inputProps={{ 'aria-label': 'Without label' }}
                                                        className='w-100'
                                                        name='status'
                                                        >
                                                        <MenuItem className='text-capitalize' value={false} >Người dùng</MenuItem>
                                                        <MenuItem className='text-capitalize' value={true} >Admin</MenuItem>
                                                        
                                                    </Select>
                                                </FormControl>
                                                </td>
                                                <td>
                                                <Box
                                                    onClick={()=>changeBlock(item._id)}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        cursor: 'pointer',
                                                        width: 100,
                                                        height: 40,
                                                        borderRadius: 20,
                                                        backgroundColor: item.isBlock ? 'red' : 'green',
                                                        justifyContent: item.isBlock ? 'flex-start' : 'flex-end',
                                                        padding: '0 8px',
                                                        transition: 'all 0.3s ease',
                                                    }}
                                                    >
                                                    {item.isBlock ? (
                                                        <LockIcon sx={{ color: 'white' }} />
                                                    ) : (
                                                        <LockOpenIcon sx={{ color: 'white' }} />
                                                    )}
                                                    </Box>
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

export default UserList;