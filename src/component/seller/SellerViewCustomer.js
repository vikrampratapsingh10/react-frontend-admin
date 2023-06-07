import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../webApi/api";
import { useLocation } from "react-router-dom";

function SellerViewCustomer() {
    const [sellerCustomer, setSellerCustomer] = useState([])
    const location = useLocation()
    const customerId = location.state.customerId;
    let arr = [];
    const fetchCustomer = async () => {
        try {
            arr = await Promise.all(customerId.map(async (customerId, index) => {
                return await axios.get(api.SELLER_VIEW_CUSTOMER + `${customerId}`);
            }))
            arr = arr.map(res => {
                return res.data.customers
            })
            setSellerCustomer(arr)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchCustomer();
    }, []);




    return <>
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Sellers Customer</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Sno.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellerCustomer.map((customer, index) => <tr>
                                            <td>{index+1}</td>
                                            <td>{customer.customerName}</td>
                                            <td>{customer.customerEmail}</td>
                                            <td>{customer.customerContact}</td>
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

export default SellerViewCustomer;