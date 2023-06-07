import axios from "axios";
import api from "../../webApi/api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../redux-config/orderSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Order() {
    const { orders } = useSelector(state => state.orders);
    const [order, setOrder] = useState([]);
    const dispatch = useDispatch();

    const activeOrder = async (orderId, index) => {
        try {
            if (window.confirm('Are you sure ?')) {
                let response = await axios.put(api.ORDER_STATUS + `${orderId}`);
                if (response.data.status) {
                    setOrder([...orders, response.data.Order]);
                    toast.success("Order updated successfully");
                }
            }
        }
        catch (err) {
            console.log(err);
            window.alert("Oops! something wrong...");
        }
    }
    useEffect(() => {
        dispatch(fetchOrder());

        // const sortedData = orders.sort((a, b) => new Date(a.date) - new Date(b.date));
        // setOrder(sortedData);
    },[orders]);
    return <>
        <ToastContainer />
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Orders</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Link to="/home/orderlist" className="btn btn-outline-primary mb-3">Shipped Orders</Link>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>SNo</th>
                                            <th>OrderId</th>
                                            <th>Date</th>
                                            <th>Customer</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.filter((list) => list.status == "pending").map((order, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td>{order._id}</td>
                                            <td>{order.date.toString().substring(0, 10).replaceAll(' ', '-')}</td>
                                            <td>{order.contactPerson}</td>
                                            <td>{order.deliveryAddress}</td>
                                            <td><button onClick={() => activeOrder(order._id, index)} className="btn btn-outline-primary">{order.status}</button></td>
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
export default Order;