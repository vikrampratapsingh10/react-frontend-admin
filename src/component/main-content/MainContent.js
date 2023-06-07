import "../home/Home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { fetchProduct } from "../../redux-config/productSlice";
import { fetchSeller } from "../../redux-config/sellerSlice";
import { fetchOrder } from "../../redux-config/orderSlice";
import { fetchCustomer } from "../../redux-config/customerSlice";
import { ToastContainer } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';

export default function MainContent() {

    const { productList, error, isLoading } = useSelector(state => state.productList);
    const { sellers } = useSelector(state => state.sellers);
    const { orders } = useSelector(state => state.orders);
    const { customers } = useSelector(state => state.customers);

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchSeller());
        dispatch(fetchOrder());
        dispatch(fetchCustomer());

    }, [dispatch]);

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.billAmount;
        });

    let pending = "Inactive";
    let count = 0;
    sellers.forEach((item) => {
        if (pending == item.status)
            count++;
    })

    return <>
        <ToastContainer />
        <div className="main-content" style={{height:"10vh"}}>
            <section className="section">
                <div className="container">
                    <div className="row rowButtom">
                        <div className="col-md-12">
                            <div className="row ">
                                <div className="col-3 box m-auto" id="box" style={{ backgroundColor: "#f7931a" }}>
                                    <div className="row">
                                        <div className="col-6" > <p id="text" ><Link to="/home/customer" style={{ color: "white", textDecoration: "none" }}><i class="fa fa-user-circle size" aria-hidden="true"></i> Customer</Link></p></div>
                                        <div className="col-4 offset-2" ><p id="no">{!error && customers.length}</p></div>
                                    </div>
                                </div>
                                <div className="col-3 offset-1 m-auto" id="box" style={{ backgroundColor: "rgb(103,119,239)" }}>
                                    <div className="row">
                                        <div className="col-6"> <p id="text"><Link to="/home/seller" style={{ color: "white", textDecoration: "none" }}><i class="fa-solid fa-user-tag"></i><br /> Seller</Link></p></div>
                                        <div className="col-4 offset-2"><p id="no"> {!error && sellers.length}</p></div>
                                    </div>
                                </div>
                                <div className="col-3 offset-1 m-auto" id="box" style={{ backgroundColor: "#e55353" }}>
                                    <div className="row">
                                        <div className="col-6"><p id="text"><i class="fa-solid fa-cart-shopping"></i><br />Orders</p></div>
                                        <div className="col-4 offset-2"><p id="no">{!error && orders.length}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-3 box m-auto" id="box" style={{ backgroundColor: "#f7931a" }}>

                                    <div className="row">
                                        <div className="col-5"> <p id="text"><i class="fa-solid fa-money-bill"></i>Total Earning</p></div>
                                        <div className="col-4 offset-2"><p id="no">&#8377;{totalAmount}</p></div>
                                    </div>
                                </div>
                                <div className="col-3 offset-1 m-auto" id="box" style={{ backgroundColor: "rgb(103,119,239)" }}>
                                    <div className="row">
                                        <div className="col-6"> <p id="text"><Link to="/home/product" style={{ textDecoration: "none", color: "white" }}><i class="fa-brands fa-product-hunt"></i>Prodcuts</Link></p></div>
                                        <div className="col-4 offset-2"><p id="no">{productList.length}</p></div>
                                    </div>
                                </div>
                                <div className="col-3 offset-1 m-auto" id="box" style={{ backgroundColor: "#e55353" }}>
                                    <div className="row">
                                        <div className="col-6"><p id="text"><Link to="/home/pendingseller" style={{ textDecoration: "none", color: "white" }}><i class="fa-solid fa-pen-to-square"></i>Request Seller</Link></p></div>
                                        <div className="col-4 offset-2"><p id="no">{count}</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}