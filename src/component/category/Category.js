import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Category.css";
import api from "../../webApi/api";


function Category() {
    const navigate = useNavigate();
    const [categories, setcategory] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const loadCategory = async () => {
        try {
            let response = await axios.get(api.CATEGORY_LIST);
            if (response.data.status) {
                setcategory(response.data.categories)
                setIsLoading(false);
            }
        }
        catch (err) {
            setError("Oops! something went wrong..");
        }
    }

    const deleteCategory = async (category) => {
        if (window.confirm("are you sure")) {
            setcategory(categories.filter((cate) => cate._id != category._id));
            await axios.delete(`${api.CATEGORY_DELETE}/${category._id}`);
        }
    };

    useEffect(() => {
        loadCategory();
    }, []);

    return <>
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row page-title-header">
                            <div className="col-12">
                                <h1>Categories</h1><hr style={{ color: "#1c45ef", height: "3px" }} />
                                {/* {isLoading && <Spinner />} */}
                                <button
                                    onClick={() => navigate("/home/addcategory/new")}
                                    className="btn btn-primary mb-4"
                                >Add Category
                                </button>
                            </div>
                        </div>
                        <div className="col-md-12 posts" >
                            <table className="table">
                                <thead style={{ backgroundColor: "whitesmoke" }}>
                                    <tr>
                                        <th className="col-1">Sno.</th>
                                        <th className="col-2">CategoryName</th>
                                        <th className="col-2">Edit</th>
                                        <th className="col-2">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!error && categories.map((category, index) => <tr>
                                        <td>{index + 1}</td>
                                        <td style={{ fontStyle: "normal", fontSmooth: "bold" }}>{category.categoryName.toUpperCase()}</td>
                                        <td><button onClick={() => navigate(`/home/addcategory/${category._id}`)} className="btn btn-outline-primary"><i class="fa-solid fa-pen-to-square"></i>edit</button></td>
                                        <td><button onClick={() => deleteCategory(category)} className="btn btn-outline-danger"><i class="fa-solid fa-trash"></i> delete</button></td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </>
}
export default Category;