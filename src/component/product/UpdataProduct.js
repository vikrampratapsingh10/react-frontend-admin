import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../webApi/api";
import 'react-toastify/dist/ReactToastify.css';

function UpdateProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [discountPercentage, setDiscount] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const productDetail = location.state.productDetail

    const Update = async (event) => {
        try {
            event.preventDefault(location.state._id);
            let response = await axios.post(api.PRODUCT_UPDATE + `${productDetail._id}`, { title: title, description: description, price: price, stock: stock, discountPercentage: discountPercentage });
            if (response.data.status)
                toast.info("Product update successfully");
            navigate("/home/product")
        } catch (err) {
            console.log(err);
        }
    }
    return <>
        <ToastContainer />
        <div className="main-content" style={{ height: "100vh" }}>
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h2>Product Update</h2><hr style={{ color: "#1c45ef", height: "3px" }} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="offset-2 col-md-8 bg-light">
                                <form className="mt-5">
                                    <div className="user-box form-group">
                                        <label>Title</label><br />
                                        <input onChange={(event) => setTitle(event.target.value)} defaultValue={productDetail.title} type="text" className="form-control" /><br />
                                    </div>
                                    <div className="user-box form-group">
                                        <label>Price</label><br />
                                        <input onChange={(event) => setPrice(event.target.value)} defaultValue={productDetail.price} type="text" className="form-control" /><br />
                                    </div>
                                    <div className="user-box form-group">
                                        <label>Stock</label><br />
                                        <input type="text" className="form-control" onChange={(event) => setStock(event.target.value)} defaultValue={productDetail.stock} name="contact" required="" /><br />
                                    </div>
                                    <div className="user-box form-group">
                                        <label>Discount</label><br />
                                        <input onChange={(event) => setDiscount(event.target.value)} defaultValue={productDetail.discountPercentage} type="text" className="form-control" /><br />
                                    </div>
                                    <div className="user-box form-group">
                                        <label>Description</label><br />
                                        <textarea onChange={(event) => setDescription(event.target.value)} defaultValue={productDetail.description} type="text" className="form-control" /><br />
                                    </div>
                                    <button type="submit" className="btn btn-outline-primary mt-2 mb-5" onClick={Update} style={{ borderRadius: "5%" }}>
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >

    </>
}

export default UpdateProduct;