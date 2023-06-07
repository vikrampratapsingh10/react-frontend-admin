import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, Spinner, Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../webApi/api";

function SellerProducts() {
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const sellerId = location.state.sellerId;

    const productsDescription = (productData) => {
        navigate(("/home/productdescription"), { state: { productData: productData } });
    }

    const fetchSellerProducts = async () => {
        let response = await axios.get(api.SELLER_PRODUCT + `${sellerId}`);
        if (response.data.status)
            setData(response.data.productsList);
        console.log(response.data.productsList);
    }

    const handleNext = () => {
        if (page === pageCount) return page;
        setPage(page + 1)
    }

    const handlePrevios = () => {
        if (page === 1) return page;
        setPage(page - 1)
    }

    useEffect(() => {
        fetchSellerProducts();
    }, [page]);

    useEffect(() => {
        const pagedatacount = Math.ceil(data.length / 5);
        setPageCount(pagedatacount);

        if (page) {
            const LIMIT = 5;
            const skip = LIMIT * page // 5 *2 = 10
            const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
            setPageData(dataskip)
        }
    }, [data])

    return <>
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="container">
                            <h1>Products</h1>
                            <div className='table_div mt-3 mb-4'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th className="col-2">Sno.</th>
                                            <th className="col-3">Image</th>
                                            <th className="col-3">Title</th>
                                            <th className="col-2">Stock</th>
                                            <th className="col-2">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            pageData.length > 0 ?
                                                pageData.map((product, index) => {
                                                    return (
                                                        <>
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td><button style={{ backgroundColor: "white", borderRadius: "50%", color: "white", border: "none" }} className="btn btn-sm btn-light" onClick={() => productsDescription(product)}><img src={product.thumbnail} style={{ width: 100, height: 100, borderRadius: "50%" }} alt="" /></button></td>

                                                                {/* <td><img src={product.thumbnail} style={{ width: 80, height: 80, borderRadius:"50%" }} alt="" /></td> */}
                                                                <td>{product.title.substring(0, 10)}</td>
                                                                <td>{product.stock}</td>
                                                                <td>{product.price}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                }) : <div className='d-flex justify-content-center mt-4'>
                                                    Loading... <Spinner animation="border" variant='danger' />
                                                </div>
                                        }

                                    </tbody>
                                </Table>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <Pagination >
                                    <Pagination.Prev onClick={handlePrevios} disabled={page === 1} />
                                    {
                                        Array(pageCount).fill(null).map((ele, index) => {
                                            return (
                                                <>
                                                    <Pagination.Item style={{ maxWidth: "100%" }} active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
                                                </>
                                            )
                                        })
                                    }
                                    <Pagination.Next onClick={handleNext} disabled={page === pageCount} />
                                </Pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    </>
}

export default SellerProducts;