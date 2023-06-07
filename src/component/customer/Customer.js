import { useDispatch, useSelector } from "react-redux";
import "./Customer.css"
import { useEffect } from "react";
import { fetchCustomer } from "../../redux-config/customerSlice";
import { useNavigate } from "react-router-dom";


function Customer() {
    const navigate = useNavigate();
    const { customers } = useSelector(state => state.customers);

    const customerProductList = (customerId) => {
        navigate("/home/customerproductlist", { state: { customerId: customerId } })
    }

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCustomer());
    }, [dispatch]);
    return <>

        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Customers</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
                            </div>
                        </div>
                        <div class="container">
                            <ul class="responsive-table uline">
                                <li class="table-header de">
                                    <div class="col col-1">Sno</div>
                                    <div class="col col-3">Name</div>
                                    <div class="col col-3">Email</div>
                                    <div class="col col-4">Contact</div>
                                </li>
                                {customers.map((customer, index) => <li class="table-row de">
                                    <div class="col col-1" >{index + 1}</div>
                                    <div class="col col-3" ><button onClick={() => customerProductList(customer._id)} className=" border-0" style={{ backgroundColor: "white" }} >{customer.customerName}</button></div>
                                    <div class="col col-3">{customer.customerEmail}</div>
                                    <div class="col col-4">{customer.customerContact}</div>
                                </li>)}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </div>

    </>
}

export default Customer;