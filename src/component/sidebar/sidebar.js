import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../redux-config/adminSlice";

function Sidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signout = () => {
        dispatch(signOut());
        navigate("/")
    }

    return <div className="main-sidebar sidebar-style-2">
        <aside id="sidebar-wrapper">
            <div className="sidebar-brand">
                <a href="#">Handcraft</a>
            </div>
            <div className="sidebar-brand sidebar-brand-sm">
                <a href="index.html">HC</a>
            </div>
            <ul className="sidebar-menu">
                <li className="menu-header">Dashboard</li>
                <li className="dropdown active">
                    <a href="#" className="nav-link has-dropdown">
                        <i className="fas fa-fire" />
                        <span>Dashboard</span>
                    </a>
                    <ul className="dropdown-menu">
                        <li>
                            <Link to="/home" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/home/product" className="nav-link" >
                                Products
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/home/category" className="nav-link" >
                                Category
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/home/customer" className="nav-link" >
                                Customers
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/home/seller" className="nav-link" >
                                Sellers
                            </Link>
                        </li>
                        <li className="active">
                            <Link to="/home/order" className="nav-link" >
                                Orders
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
            <li className="active">
                <button onClick={signout} className="mt-3 ml-2" style={{border:"none",backgroundColor:"white",color:"blue"}} >
                    Logout
                </button>
            </li>
        </aside>
    </div>
}
export default Sidebar;