import { useEffect } from "react";
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";
import api from "../../webApi/api";
import { Spinner, ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function Product() {
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const navigate = useNavigate();

    const productsDescription = (productData) => {
        navigate(("/home/productdescription"), { state: { productData: productData } });
    }

    const deleteProduct = async (id) => {
        try {
            if (window.confirm("are you sure")) {
                let response = await axios.post(api.PRODUCT_DELETE + `${id}`);
                if (response.data.status)
                    toast.success("Successfully deleted");   
                    fetchProduct(); 
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    
    const UpdateProduct = (productDetail) => {
        navigate(("/home/updateproduct"), { state: { productDetail: productDetail } });
    }

    const fetchProduct = async () => {
        try {
            const response = await axios.get(api.PRODUCT_LIST);
            if (response.data.status)
                setData(response.data.products);
        }
        catch (error) {
            console.log(error);
        }
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
        fetchProduct();
    }, [page]);

    useEffect(() => {
        const pagedatacount = Math.ceil(data.length / 10);
        setPageCount(pagedatacount);

        if (page) {
            const LIMIT = 10;
            const skip = LIMIT * page // 5 *2 = 10
            const dataskip = data.slice(page === 1 ? 0 : skip - LIMIT, skip);
            setPageData(dataskip)
        }
    }, [data])

    return <>
        <ToastContainer />
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="container">
                            <h1>Products</h1>
                            <div className="row">
                                <div className='table_div mt-3 mb-4 col-md-12'>
                                    <Table >
                                        <thead>
                                            <tr>
                                                <th className="col-1">Sno.</th>
                                                <th className="col-2">Image</th>
                                                <th className="col-1">Title</th>
                                                <th className="col-1">Stock</th>
                                                <th className="col-1">Price</th>
                                                <th className="col-1">Edit</th>
                                                <th className="col-1">Delete</th>
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
                                                                    <td>{product.title.substring(0, 10)}</td>
                                                                    <td>{product.stock}</td>
                                                                    <td>{product.price}</td>
                                                                    <td><button className="btn btn-outline-success" onClick={() => (UpdateProduct(product))} ><i class="fa-solid fa-pen-to-square"></i>edit</button></td>
                                                                    <td><button className="btn btn-outline-danger" onClick={() => deleteProduct(product._id)} ><i class="fa-solid fa-trash"></i>delete</button></td>
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
                                <div className='d-flex justify-content-end col-md-12'>
                                    <Pagination style={{ maxWidth: "100vw" }} >
                                        <Pagination.Prev onClick={handlePrevios} disabled={page === 1} />
                                        {
                                            Array(pageCount).fill(null).map((ele, index) => {
                                                return (
                                                    <>
                                                        <Pagination.Item style={{ maxWidth: "100vw" }} active={page === index + 1 ? true : false} onClick={() => setPage(index + 1)}>{index + 1}</Pagination.Item>
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
                </div>
            </section>
        </div>

    </>
}

export default Product;