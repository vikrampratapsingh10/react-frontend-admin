import "./Home.css";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-bootstrap";

function Home() {
    return <>
        <ToastContainer />
        <div id="app" className="mt-4">
            <div className="main-wrapper main-wrapper-1">
                {/* navbar */}
                <Navbar />
                <Sidebar />
                <Outlet />
            </div>
        </div>
        <Footer />
    </>
}

export default Home;