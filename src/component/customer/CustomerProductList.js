import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../webApi/api";
import { useEffect, useState } from "react";


function CustomerProductList() {
    const [customerOrders, setCustomerOrdes] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state.customerId

    const fetchCustomerByOrders = async () => {
        const response = await axios.post(api.CUSTOMERS_ORDER, { id });
        if (response.data.status)
            setCustomerOrdes(response.data.order);
        
    }

    const customerOrderItem = (customerOrders) => {
        navigate("/home/customerorderitem", { state: { customerOrders: customerOrders } })
    }

    useEffect(() => {
        fetchCustomerByOrders();
    }, []);

    return <>
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Customer Orders</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>OrderId</th>
                                    <th>Date</th>
                                    <th>CustomerName</th>
                                    <th>Address</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                    <th>View Product</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerOrders.map((order, index) => <tr>
                                    <td>{order._id}</td>
                                    <td>{order.date.substring(0, 10)}</td>
                                    <td>{order.contactPerson}</td>
                                    <td>{order.deliveryAddress}</td>
                                    <td>{order.billAmount}</td>
                                    <td>{order.status}</td>
                                    <td><button onClick={() => customerOrderItem(order._id)} style={{border:"none", backgroundColor:"rgb(240,243,241)"}} ><i class="fa-solid fa-eye"></i></button></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div >
                </div>
            </section>
        </div>
    </>
}

export default CustomerProductList;