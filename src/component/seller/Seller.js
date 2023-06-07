import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeller } from "../../redux-config/sellerSlice";
import { useNavigate } from "react-router-dom";
import api from "../../webApi/api";
import axios from "axios";


function Seller() {
    const navigate = useNavigate();
    const { sellers } = useSelector(state => state.sellers);
    const [seller, setSeller] = useState([]);

    const SellerList = (sellerId) => {
        navigate("/home/sellerlist", { state: { sellerId: sellerId } });
    };
    const SellerByOrder = (sellerId)=>{
        navigate("/home/sellerdetail",{state:{sellerId: sellerId}})
    }
    const activeSeller = async (sellerId, index) => {
        try {
            if (window.confirm('Are you sure ?')) {
                let response = await axios.put(api.SELLER_STATUS1+`${sellerId}`);
                if (response.data.status) {
                    setSeller([...sellers, response.data.seller]);
                }
            }
        }
        catch (err) {
            console.log(err);
            window.alert("Oops! something wrong...");
        }
    }

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSeller());
    });

    return <>

        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Sellers</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
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
                                            <th>View Order</th>
                                            <th>Active/Deactive</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellers.filter((list) => list.status == "Active").map((seller, index) => <tr>
                                            <td>{index + 1}</td>
                                            <td><button onClick={() => SellerList(seller._id)} className=" border-0" style={{backgroundColor:"rgb(250,253,251)"}} > {seller.sellerName}</button></td>
                                            <td>{seller.sellerEmail}</td>
                                            <td>{seller.sellerContact}</td>
                                            <td><button onClick={() => SellerByOrder(seller._id)} className="btn btn-outline-primary">Orders</button></td>
                                            <td><button onClick={() => activeSeller(seller._id, index)} className="btn btn-outline-primary">Deactive</button></td>
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

export default Seller;