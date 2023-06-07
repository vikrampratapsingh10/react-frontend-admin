import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../../webApi/api";

function SellerDetail() {
    const [orderDetail, setOrderDetail] = useState([]);
    const [separateArray, setSeparateArray] = useState([]);
    const [customerCount, setCustomerCount] = useState([]);
    const navigate = useNavigate()
    const location = useLocation()
    const sellerId = location.state.sellerId;
    const fetchOrderBySeller = async () => {
        try {
            let response = await axios.get(api.ORDER_BY_SELLER + `${sellerId}`);
            if (response.data.status)
                setOrderDetail(response.data.sellerOrder);
            localStorage.setItem('orderDetail', JSON.stringify(response.data.sellerOrder))
        }
        catch (err) {
            console.log(err);
        }
    }
    let elementCounts = {};
    orderDetail.forEach(element => {
        (element.OrderItems?.quantity >= 1) ?

            elementCounts[element.productDetails.title] = (elementCounts[element.productDetails.title] || 0) + 1 * element.OrderItems?.quantity
            : elementCounts[element.productDetails.title] = (elementCounts[element.productDetails.title] || 0) + 1;

    })
    var newArray = Object.entries(elementCounts);
    // console.log(orderDetail)
    // console.log(newArray)

    const addPrice = () => {
        let i = 0;
        newArray.map((arr, index) => {
            arr.push(separateArray[i++]);
            return arr;
        })
    }
    console.log(addPrice())

    useEffect(() => {
        var uniqueIndices = [];
        orderDetail.forEach(index => {
            if (!uniqueIndices.includes(index.productDetails.price)) {
                uniqueIndices.push(index.productDetails.price);
            }
        });
        setSeparateArray(uniqueIndices);
    }, [orderDetail]);

    useEffect(() => {
        var uniqueIndices = [];
        orderDetail.forEach(index => {
            if (!uniqueIndices.includes(index.customerid)) {
                uniqueIndices.push(index.customerid);
            }
        });
        setCustomerCount(uniqueIndices);
    }, [orderDetail]);

    useEffect(() => {
        fetchOrderBySeller();
    }, []);

    let billAmount = 0, count = 0;
    orderDetail.forEach(element => {
        billAmount += element.billAmount
        count++;
    });

    const SellerByCustomer = (customerId) => {
        navigate("/home/sellerviewcustomer", { state: { customerId: customerId } })
    }

    return <>
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Seller Details</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
                            </div>
                        </div><br />
                        <div className="col-md-12">
                            <div className="row ">
                                <div className="col-3 box m-auto" id="box" style={{ backgroundColor: "rgb(103,119,239)" }}>

                                    <div className="row">
                                        <div className="col-5"> <p id="text"><i class="fa-solid fa-money-bill"></i>Earning</p></div>
                                        <div className="col-4 offset-2"><p id="no">&#8377;{billAmount}</p></div>
                                    </div>
                                </div>
                                <div className="col-3 box m-auto" id="box" style={{ backgroundColor: "#f7931a" }}>
                                    <div className="row">
                                        <div className="col-6" > <p id="text" ><button onClick={() => SellerByCustomer(customerCount)} style={{ color: "white", textDecoration: "none", border: "none", backgroundColor: "#f7931a" }}><i class="fa fa-user-circle size" aria-hidden="true"></i> Customer</button></p></div>
                                        <div className="col-4 offset-2" ><p id="no">{customerCount.length}</p></div>
                                    </div>
                                </div>
                                <div className="col-3 offset-1 m-auto" id="box" style={{ backgroundColor: "#e55353" }}>
                                    <div className="row">
                                        <div className="col-6"><p id="text"><i class="fa-solid fa-cart-shopping"></i><br />Orders</p></div>
                                        <div className="col-4 offset-2"><p id="no">{count}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sno</th>
                                            <th>Product</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newArray.map((order, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td>{order[0]}</td>
                                            <td>{order[1]}</td>
                                            <td>{order[2] * order[1]}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}

export default SellerDetail;