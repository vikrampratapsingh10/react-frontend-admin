import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../webApi/api";
import Footer from "../footer/Footer";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../navbar/Navbar";

function AddCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [category, setCategory] = useState({ categoryName: "" });

    useEffect(() => {
        if (!id) return;
        const fetchCategory = async () => {
            const response = await axios.get(`${api.CATEGORY_LIST}/${id}`);
            setCategory(response.data.categories);
        };
        fetchCategory();
    }, []);

    const handleChange = (e) => {
        const categoryClone = { ...category }
        categoryClone[e.target.name] = e.target.value;
        setCategory(categoryClone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id == "new") {
            await axios.post(api.CATEGORY_ADD, category);
            return navigate("/categorylist");
        }
        else {
            await axios.put(`${api.CATEGORY_UPDATE}/${id}`, category)
            return navigate("/categorylist");
        }
    }
    return <>
        <div id="app" className="mt-4">
            <div className="main-wrapper main-wrapper-1">
                <div className="navbar-bg" />
                {/* navbar */}
                <Navbar />
                <Sidebar />
                {/* Main Content */}
                <br /><br /><br />
                <div className="main-content">
                    <section className="section">
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="row page-title-header">
                                    <div className="col-12">
                                        <h1>Add Category</h1><hr style={{ color: "#1c45ef", height: "3px" }} />
                                    </div>
                                    <form className="post">
                                        <div className="row mt-5 mb-5">
                                            <p style={{ fontSize: "18px" }}>Add Category</p>
                                            <div className="col-md-5">
                                                <input value={category.categoryName} onChange={handleChange} type="text" className="form-control" name="categoryName" placeholder="Enter Category Name" />
                                            </div>
                                            <div className="col-md-1">
                                                <button onClick={handleSubmit} type="submit" className="btn btn-primary">{id === "new" ? "addcategory" : "Update"}</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <Footer />
    </>
}

export default AddCategory;