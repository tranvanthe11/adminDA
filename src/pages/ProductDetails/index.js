import React, { useRef, useEffect, useState } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { emphasize, styled } from '@mui/material/styles';
import { FaShirt } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { IoIosColorPalette } from "react-icons/io";
import { RiPriceTag3Fill } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import Rating from '@mui/material/Rating';
import { MdDiscount } from "react-icons/md";
import Slider from "react-slick";
import UserAvatar from "../../components/userAvatar";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";


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

const ProductDetails = () => {

    const {id} = useParams();

    const [productData, setProductData] = useState([]);
    const [reviewsData, setReviewsData] = useState([]);




    const productSliderBig = useRef();
    const productSliderSml = useRef();

    var productSliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
      };

      var productSliderSmlOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
      };

    const goToSlide=(index)=>{
        productSliderBig.current.slickGoTo(index);
        productSliderSml.current.slickGoTo(index);
    }

    useEffect(()=>{
        window.scrollTo(0,0);

        fetchDataFromApi(`/api/products/${id}`).then((res)=>{
            setProductData(res);
        })

        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res)=>{
            setReviewsData(res)
        })
    }, [id])

    const uniqueSizes = [...new Set(productData?.sizesAndColors?.map(item => item.size))];
    const uniqueColors = [...new Set(productData?.sizesAndColors?.map(item => item.color))];

    return(
        <>
            <div className="right-content w-100">
                <div className="card shadow border-0 w-100 flex-row p-4">
                    <h5 className="mb-0">Xem sản phẩm</h5>
                    <Breadcrumbs aria-label="breadcrumb" className='ml-auto breadcrumbs_'>
                        <StyledBreadcrumb
                        component="a"
                        href="#"
                        label="Dashboard"
                        icon={<HomeIcon fontSize="small" />}
                        />
                        <StyledBreadcrumb 
                        component="a"
                        href="#"
                        label="Products"
                        deleteIcon={<ExpandMoreIcon />}
                        />
                        <StyledBreadcrumb 
                        label="Product View"
                        />
                    </Breadcrumbs>
                </div>

                <div className='card productDetailsSection'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className="sliderWrapper p-4">
                                <h6 className="mb-4">Ảnh sản phẩm</h6>
                            <Slider {...productSliderOptions} ref={productSliderBig} className="sliderBig">
                                {
                                    productData?.images?.length!==0 && productData?.images?.map((img, index)=>{
                                        return(
                                            <div className="item" key={index}>
                                                <img src={img}
                                                className="w-100"/>
                                            </div>

                                        )
                                    })
                                }
                            </Slider>
                            <Slider {...productSliderSmlOptions} ref={productSliderSml} className="sliderSml">
                                {
                                    productData?.images?.length!==0 && productData?.images?.map((img, index)=>{
                                        return(
                                            <div className="item" key={index} onClick={()=>goToSlide(index)}>
                                                <img src={img}
                                                className="w-100"/>
                                            </div>

                                        )
                                    })
                                }
                            </Slider>
                            </div>
                        </div>

                        <div className='col-md-7'>
                            <div className="p-4">
                                <h6 className="mb-4">Chi tiết sản phẩm</h6>
                                <h4>{productData?.name}</h4>

                                <div className="productInfo">
                                    <div className="row">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><FaShirt /></span>
                                            <span className="name ml-2">Thương hiệu</span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>{productData?.brandName}</span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><MdCategory /></span>
                                            <span className="name ml-2">Loại</span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>{productData?.category?.name}</span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><IoIosColorPalette /></span>
                                            <span className="name ml-2">Màu</span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>
                                                <ul className="list list-inline tags sml">
                                                    {
                                                        uniqueColors?.length!==0 && uniqueColors?.map((color, index)=>{
                                                            return(
                                                                <li className="list-inline-item" key={index}>
                                                                    <span>{color}</span>
                                                                </li>

                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><MdCategory /></span>
                                            <span className="name ml-2">Size</span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>
                                            <ul className="list list-inline tags sml">
                                                    {
                                                        uniqueSizes?.length!==0 && uniqueSizes?.map((size, index)=>{
                                                            return(
                                                                <li className="list-inline-item" key={index}>
                                                                    <span>{size}</span>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><RiPriceTag3Fill /></span>
                                            <span className="name ml-2">Giá</span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>{productData?.price}</span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><MdDiscount  /></span>
                                            <span className="name ml-2">Giảm giá</span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>- {productData?.discount}%</span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><FaCartArrowDown /></span>
                                            <span className="name ml-2">Đã bán</span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>60</span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><MdRateReview /></span>
                                            <span className="name ml-2">Đánh giá </span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>{reviewsData?.length} danh gia</span>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-sm-4 d-flex align-items-center">
                                            <span className="icon"><MdDateRange /></span>
                                            <span className="name ml-2">Ngày </span>
                                        </div>

                                        <div className="col-sm-8">
                                            <span>{productData?.dateCreated}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4">
                        <h6 className="mt-4 mb-3">Mô tả sản phẩm</h6>
                        <p>{productData?.description}
                        </p>

                        <br />

                        {/* <h6 className="mt-4 mb-4">Danh gia</h6> */}

                        {/* <div className="ratingSection">
                            <div className="ratingrow d-flex align-items-center">
                                <span className="col1">
                                    5 star
                                </span>

                                <div className="col2">
                                    <div className="progress">
                                    <   div className="progress-bar" style={{width: '70%'}}></div>
                                    </div>
                                </div>

                                <span className="col3">
                                    (22)
                                </span>
                            </div>

                            <div className="ratingrow d-flex align-items-center">
                                <span className="col1">
                                    4 star
                                </span>

                                <div className="col2">
                                    <div className="progress">
                                    <   div className="progress-bar" style={{width: '50%'}}></div>
                                    </div>
                                </div>

                                <span className="col3">
                                    (12)
                                </span>
                            </div>

                            <div className="ratingrow d-flex align-items-center">
                                <span className="col1">
                                    3 star
                                </span>

                                <div className="col2">
                                    <div className="progress">
                                    <   div className="progress-bar" style={{width: '70%'}}></div>
                                    </div>
                                </div>

                                <span className="col3">
                                    (22)
                                </span>
                            </div>

                            <div className="ratingrow d-flex align-items-center">
                                <span className="col1">
                                    2 star
                                </span>

                                <div className="col2">
                                    <div className="progress">
                                    <   div className="progress-bar" style={{width: '70%'}}></div>
                                    </div>
                                </div>

                                <span className="col3">
                                    (22)
                                </span>
                            </div>

                            <div className="ratingrow d-flex align-items-center">
                                <span className="col1">
                                    1 star
                                </span>

                                <div className="col2">
                                    <div className="progress">
                                    <   div className="progress-bar" style={{width: '70%'}}></div>
                                    </div>
                                </div>

                                <span className="col3">
                                    (22)
                                </span>
                            </div>
                        </div> */}

                        {/* <br /> */}

                        <h6 className="mt-4 mb-4">Review</h6>

                        <div className="reviewsSection">
                            {
                                reviewsData?.length!==0 && reviewsData?.map((review, index)=>{
                                    return(
                                        <div className="reviewsRow">
                                            <div className="row">
                                                <div className="col-sm-7 d-flex">
                                                    <div className="d-flex flex-column">

                                                        <div className="userInfo d-flex align-items-center mb-3">
                                                            <UserAvatar lg={true} img={"https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/428179812_1422408578704539_3659365527880145355_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHUqoQM6XdywYT75wMKhcrCWbiv8foSd31ZuK_x-hJ3fWE2dDNyIyrJOjz_-QqZniE1q55SNpeJoSxtqJwe4Lyf&_nc_ohc=_LhJznMkd6wQ7kNvgGPCUJt&_nc_zt=24&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A7L4N7lFiVg2_OAqeNOG4oY&oh=00_AYBLs9dxfpgi13NQG4FijtvY3_8D8aWQ7bwSlX5kDO82wQ&oe=67324429"}/>
                                                            <div className="info pl-3" >
                                                                <h6>{review?.customerName}</h6>
                                                                <span>{review?.dateCreated}</span>
                                                            </div>
                                                        </div>
                                                        <Rating name="read-only" value={review?.customerRating} readOnly  />
                                                    </div>

                                                </div>

                                                <div className="col-md-5 d-flex alin-items-center">
                                                    {/* <div className="ml-auto">
                                                        <Button className="btn-blue btn-lg ml-auto btn-big">Tra loi</Button>
                                                    </div> */}

                                                </div>
                                                <p className="mt-3">{review?.review}</p>
                                            </div>
                                        </div>

                                    )
                                })
                            }

                            {/* <div className="reviewsRow reply">
                                <div className="row">
                                    <div className="col-sm-7 d-flex">
                                        <div className="d-flex flex-column">

                                            <div className="userInfo d-flex align-items-center mb-3">
                                                <UserAvatar lg={true} img={"https://scontent.fhan14-5.fna.fbcdn.net/v/t39.30808-1/428179812_1422408578704539_3659365527880145355_n.jpg?stp=cp6_dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeHUqoQM6XdywYT75wMKhcrCWbiv8foSd31ZuK_x-hJ3fWE2dDNyIyrJOjz_-QqZniE1q55SNpeJoSxtqJwe4Lyf&_nc_ohc=_LhJznMkd6wQ7kNvgGPCUJt&_nc_zt=24&_nc_ht=scontent.fhan14-5.fna&_nc_gid=A7L4N7lFiVg2_OAqeNOG4oY&oh=00_AYBLs9dxfpgi13NQG4FijtvY3_8D8aWQ7bwSlX5kDO82wQ&oe=67324429"}/>
                                                <div className="info pl-3" >
                                                    <h6>Tran Van The</h6>
                                                    <span>25 phut truoc</span>
                                                </div>
                                            </div>
                                            <Rating name="read-only" value={4.5} readOnly precision={0.5} />
                                        </div>

                                    </div>

                                    <div className="col-md-5 d-flex alin-items-center">
                                        <div className="ml-auto">
                                            <Button className="btn-blue btn-lg ml-auto btn-big">Tra loi</Button>
                                        </div>

                                    </div>
                                    <p className="mt-3">Danh gia nay rat khach quan nen moi nguoi khong phai lo</p>
                                </div>
                            </div> */}

                        </div>

                        <br />

                        {/* <h6 className="mt-4 mb-4">review reply form</h6> */}

                        {/* <form className="reviewForm">
                            <textarea placeholder="viet o day">

                            </textarea>

                            <Button className="btn-blue btn-nig btn-lg w-100 mt-3">Nop tra loi</Button>
                        </form> */}

                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductDetails;