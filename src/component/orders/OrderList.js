import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder } from "../../redux-config/orderSlice";
import { Link } from "react-router-dom";

function OrderList() {
    const { orders } = useSelector(state => state.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrder());
    }, []);

    return <>
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Order List</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            <Link to="/home/order" className="btn btn-outline-primary mb-3">Pending Orders</Link>
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
                                        {orders.filter((list) => list.status == "shipped").map((order, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td>{order._id}</td>
                                            <td>{order.date.toString().substring(0, 10).replaceAll(' ', '-')}</td>
                                            <td>{order.contactPerson}</td>
                                            <td>{order.deliveryAddress}</td>
                                            <td><button className="btn btn-outline-primary" disabled>{order.status}</button></td>
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
export default OrderList;