import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../webApi/api";
import { Spinner } from "react-bootstrap";

function CustomerOrderItem() {
    const [orderItem, setOrderItem] = useState([]);
    const location = useLocation([]);
    const id = location.state.customerOrders
    var count = 1;

    const fetchOrderItem = async () =>{
        const response = await axios.post(api.CUSTOMERS_ORDER_ITEM,{id})
        if(response.data.status)
         setOrderItem(response.data.order);
    }

    useEffect(()=>{
        fetchOrderItem()
    },[]);

    console.log(orderItem);

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
                                    <th>Sno.</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                           
                                {orderItem && orderItem.map((order, index) =>
                                    order.orderItem?.filter((filterItem) => filterItem.product).map((item) => <tr>
                                        <td>{count++}</td>
                                        <td>{item.product.title.substring(0, 25) + "..."}</td>
                                        <td><img src={item.product.thumbnail} style={{ width: "100px", height: "100px", borderRadius: "50px" }} /></td>
                                        <td>{item.quantity}</td>
                                        <td>{item.product.price*item.quantity}</td>
                                    </tr>)
                                )}
                                
                            </tbody>
                        </table>
                    </div >
                </div>
            </section>
        </div>
    </>
}

export default CustomerOrderItem;