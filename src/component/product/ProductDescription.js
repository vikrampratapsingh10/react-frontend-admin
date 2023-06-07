import { useLocation } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify"

function ProductDescription() {
    const location = useLocation();
    let productData = location.state.productData;
    const imageArray = productData.images

    function changeImage(currentImageObject) {
        // var mainImage = document.getElementById("mainImage");
        // var temp = mainImage.src;
        // mainImage.src = currentImageObject.src;
        // currentImageObject.src = temp;
    }

    return <>
        <div className="main-content">
            <section className="section">
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 d-flex" >
                                    <div className="col-md-2 " >
                                        <div className="col-lg-12 col-md-12">
                                            {imageArray.map((singleImage, index) => (
                                                <img onClick={changeImage(this)} src={singleImage} id="smallimage" style={{ height: 70, width: 70 }} className="mb-3 mt-3" />
                                            ))}
                                        </div>
                                        <div id="lens" />
                                    </div>
                                    <div className="col-md-5">
                                        <ReactImageMagnify
                                            {...{
                                                smallImage: {
                                                    alt: "Wristwatch by Ted Baker London",
                                                    isFluidWidth: true,
                                                    src: productData.thumbnail,
                                                },
                                                largeImage: {
                                                    src: productData.thumbnail,
                                                    width: 1500,
                                                    height: 2000,
                                                },
                                            }}
                                            style={{ zIndex: "2" }}
                                        />
                                        {/* <img id="mainImage" src={productData.thumbnail} style={{ height: 300, width: 300 }} /> */}
                                    </div>
                                    <div className="col-md-5">
                                        <div className="col-lg-12 col-md-12 col-md-12">
                                            <h6 className="disabled">{productData.categoryId?.categoryName}</h6>
                                            <h4 className="title" style={{ color: "black" }}>
                                                {productData.title}

                                            </h4>
                                            <h6>
                                                rating:{productData.rating}
                                                <div style={{ color: "goldenrod" }}>
                                                    <i className="fa fa-star fa-xs" aria-hidden="true" />
                                                    <i className="fa fa-star fa-xs" aria-hidden="true" />
                                                    <i className="fa fa-star fa-xs" aria-hidden="true" />
                                                    <i className="fa fa-star fa-xs" aria-hidden="true" />
                                                </div>
                                            </h6>
                                            <h6 style={{ color: "brown" }}> Deal of the day ₹{(productData.price - (productData.price * productData.discountPercentage) / 100).toFixed(1)}</h6>
                                            <del><small style={{ color: "brown" }}>Price:₹{productData.price}</small></del>
                                            <small className="title" style={{ color: "black" }}><br />
                                                <i class="fa fa-check-circle" aria-hidden="true"></i> Made in India<br />
                                                <small><i class="fas fa-dot-circle    " style={{ color: "green" }}></i>In Stock({productData.stock})</small>
                                            </small>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title"> Description:<br />
                                </h5>
                                {productData.description}
                                <div>
                                    <main className="container mt-2">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h5 className="card-text">Product Reviews<i className="fa fa-star" aria-hidden="true"></i>
                                                </h5>
                                                <div className="d-flex align-items-center p-3 my-3 text-dark-50 bg-purple rounded shadow-sm">
                                                    <img className="mr-3" style={{ width: "50px", height: "50px" }} src={productData.thumbnail} />
                                                    <div className="lh-1">
                                                        <h6 className="mb-1 text-dark lh-2">Rating:</h6>
                                                        <small className="text-sm-left lh-base font-normal text-lowercase text-decoration-none text-reset">
                                                            Learn Modern JavaScript, from an Open Source Book that teaches anyone how to code with JavaScript using the node.js runtime environment rather than a browser and by the end, you will build a server and a website using JavaScript.
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    </>
}
export default ProductDescription;