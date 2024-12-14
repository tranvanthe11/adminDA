import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Dashboard = () => {

    const context = useContext(MyContext);
    const [productList, setProductList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [columnChartData, setColumnChartData] = useState(null);
    const [categoryChartData, setCategoryChartData] = useState(null);
    const [viewMode, setViewMode] = useState("month");
    const [selectedMonth, setSelectedMonth] = useState("");  // Để lưu tháng đã chọn
    const [selectedWeek, setSelectedWeek] = useState(""); 
    const [years, setYears] = useState([]); 
    const [selectedYear, setSelectedYear] = useState(""); 
    const [totalStock, setTotalStock] = useState(0);
    const [totalSold, setTotalSold] = useState(0);

    const fetchChartData = async (year) => {
        try {
            const data = await fetchDataFromApi(`/api/revenue-and-profit?year=${year}`);
    
            const labels = data.map(item => item.month); 
            const revenues = data.map(item => item.revenue); 
            const profits = data.map(item => item.profit); 
    
            setColumnChartData({
                labels,
                datasets: [
                    {
                        label: "Doanh thu",
                        data: revenues,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                    {
                        label: "Lợi nhuận",
                        data: profits,
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                    },
                ],
            });
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
        }
    };

    const fetchCategoryChartData = async (year, mode) => {
        try {
            const url = mode === "week" && selectedWeek 
                ? `/api/revenue-and-profit/by-category?year=${year}&week=${selectedWeek}` 
                : `/api/revenue-and-profit/by-category?year=${year}&month=${selectedMonth}`;
        
            const response = await fetchDataFromApi(url);
            console.log(response)
        
            const categoryLabels = response.map(item => item.category);
            const monthlyData = response.map(item => {
                const monthsData = item.months.map(month => {
                    let totalRevenue = 0;
                    let totalProfit = 0;
                    if (mode === "week") {
                        // Tính doanh thu và lợi nhuận theo tuần
                        const weekData = month.weeks.map(week => {
                            totalRevenue += week.revenue;
                            totalProfit += week.profit;  // Giả sử có trường lợi nhuận
                        });
                    } else {
                        // Tính doanh thu và lợi nhuận theo tháng
                        month.weeks.forEach(week => {
                            totalRevenue += week.revenue;
                            totalProfit += week.profit;  // Giả sử có trường lợi nhuận
                        });
                    }
                    return { revenue: totalRevenue, profit: totalProfit };
                });
                return monthsData;
            });
        
            const monthlyLabels = response[0]?.months?.map(month => month.month) || [];
        
            setCategoryChartData({
                labels: monthlyLabels,
                datasets: [
                    // Dataset cho doanh thu
                    ...categoryLabels.map((category, index) => ({
                        label: `${category} - Doanh thu`,
                        data: monthlyData[index].map(item => item.revenue),
                        backgroundColor: `rgba(${(index + 1) * 30}, 99, 132, 0.6)`,
                    })),
                    // Dataset cho lợi nhuận
                    ...categoryLabels.map((category, index) => ({
                        label: `${category} - Lợi nhuận`,
                        data: monthlyData[index].map(item => item.profit),
                        backgroundColor: `rgba(${(index + 1) * 30}, 99, 132, 0.6)`, // Màu khác biệt
                    })),
                ],
            });
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu biểu đồ theo loại sản phẩm:", error);
        }
    };
    
    useEffect(() => {
        if (selectedYear) {
            fetchCategoryChartData(selectedYear, viewMode);
        }
    }, [selectedYear, viewMode, selectedMonth, selectedWeek]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const allYears = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
        setYears(allYears);
        setSelectedYear(currentYear.toString());
        fetchChartData(currentYear.toString());
    }, []);
    
    useEffect(() => {
        if (selectedYear) {
            fetchChartData(selectedYear);
        }
    }, [selectedYear]);

    const handleYearChange = (e) => {
        const year = e.target.value;
        setSelectedYear(year);
    };


    useEffect(()=>{
        context.setIsHideSidebarAndHeader(false);
        context.setProgress(30)

        fetchDataFromApi('/api/user').then((res)=>{
            setUserList(res);
        })

        fetchDataFromApi('/api/orders').then((res)=>{
            setOrderList(res.ordersList);
        })

        fetchDataFromApi('/api/products').then((res)=>{
            const products = res.products || [];
                
            let stock = 0;
                let sold = 0;

                products.forEach((product) => {
                    // Tổng tồn kho cho sản phẩm
                    const productStock = product.sizesAndColors.reduce(
                        (sum, item) => sum + item.countInStock,
                        0
                    );
                    stock += productStock;

                    // Tổng đã bán
                    sold += product.sold || 0; // `sold` mặc định là 0 nếu không tồn tại
                });

            setTotalStock(stock);
            setTotalSold(sold);
            setProductList(res);
            context.setProgress(100)
        })
    }, [])


    return(
        <>
            <div className="right-content w-100">
                <div className="row dashboardBoxWrapperRow">
                    <div className="col-md-12">
                        <div className="dashboardBoxWrapper d-flex ">
                            <div className="dashboardBox" style={{
                                backgroundImage: `linear-gradient(to right, #1da256, #48d483)`
                            }}>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Tổng người dùng</h4>
                                        <span className="text-white">{userList?.length}</span>
                                    </div>

                                    <div className="ml-auto">
                                            <span className="icon">
                                            <FaUserCircle />
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboardBox" style={{
                                backgroundImage: `linear-gradient(to right, #2c78e5, #60aff5)`
                            }}>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Tổng đơn hàng</h4>
                                        <span className="text-white">{orderList?.length}</span>
                                    </div>

                                    <div className="ml-auto">
                                            <span className="icon">
                                            <FaShoppingCart />
                                            </span>
                                    </div>
                                </div>
                            </div>
                            <div className="dashboardBox" style={{
                                backgroundImage: `linear-gradient(to right, #c012e2, #eb64fe)`
                            }}>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Tổng sản phẩm</h4>
                                        <span className="text-white">{productList?.products?.length}</span>
                                    </div>

                                    <div className="ml-auto">
                                            <span className="icon">
                                            <FaBagShopping />
                                            </span>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboardBox" style={{
                                backgroundImage: `linear-gradient(to right, #c012e2, #eb64fe)`
                            }}>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Số lượng đã bán</h4>
                                        <span className="text-white">{totalSold}</span>
                                    </div>

                                    <div className="ml-auto">
                                            <span className="icon">
                                            <FaBagShopping />
                                            </span>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboardBox" style={{
                                backgroundImage: `linear-gradient(to right, #c012e2, #eb64fe)`
                            }}>
                                <div className="d-flex w-100">
                                    <div className="col1">
                                        <h4 className="text-white mb-0">Số lượng tồn kho</h4>
                                        <span className="text-white">{totalStock}</span>
                                    </div>

                                    <div className="ml-auto">
                                            <span className="icon">
                                            <FaBagShopping />
                                            </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-md-12 pl-0 mt-4">
                        <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "20px" }}>
                            {columnChartData ? (
                                <Bar
                                    data={columnChartData}
                                    options={{
                                        indexAxis: "x",
                                        plugins: {
                                            legend: { position: "right", display: true },
                                        },
                                        scales: {
                                            x: { stacked: false },
                                            y: { stacked: false },
                                        },
                                    }}
                                />
                            ) : (
                                <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
                            )}
                            <select
                                style={{ display: "block", margin: "auto", marginTop: "8px" }}
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                                {years.map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12 pl-0 mt-4">
                        <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "20px" }}>
                            {categoryChartData ? (
                                <Bar
                                    data={categoryChartData}
                                    options={{
                                        indexAxis: "x",
                                        plugins: {
                                            legend: { position: "right", display: true },
                                        },
                                        scales: {
                                            x: { stacked: false },
                                            y: { stacked: false },
                                        },
                                    }}
                                />
                            ) : (
                                <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
                            )}

                            {/* {categoryChartData ? (
                                <Bar
                                    data={categoryChartData}
                                    options={{
                                        indexAxis: "x",
                                        plugins: {
                                            legend: { position: "right", display: true },
                                        },
                                        scales: {
                                            x: { stacked: false },
                                            y: { stacked: false },
                                        },
                                    }}
                                />
                            ) : (
                                <p style={{ textAlign: "center" }}>Đang tải dữ liệu...</p>
                            )} */}

                            
                            <div className="d-flex">

                                <select
                                    style={{ display: "block", margin: "auto", marginTop: "8px" }}
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value)} 
                                >
                                    <option value="month">Theo Tháng</option>
                                    <option value="week">Theo Tuần</option>
                                </select>
                                {viewMode === "month" && (
                                    <select
                                        style={{ display: "block", margin: "auto", marginTop: "8px" }}
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                    >
                                        <option value="">Chọn tháng</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i} value={i + 1}>
                                                {`Tháng ${i + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {viewMode === "week" && (
                                    <select
                                        style={{ display: "block", margin: "auto", marginTop: "8px" }}
                                        value={selectedWeek}
                                        onChange={(e) => setSelectedWeek(e.target.value)}
                                    >
                                        <option value="">Chọn tuần</option>
                                        {Array.from({ length: 52 }, (_, i) => (
                                            <option key={i} value={i + 1}>
                                                {`Tuần ${i + 1}`}
                                            </option>
                                        ))}
                                    </select>
                                )}
                                <select
                                    style={{ display: "block", margin: "auto", marginTop: "8px" }}
                                    value={selectedYear}
                                    onChange={handleYearChange}
                                >
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;