import zIndex from "@mui/material/styles/zIndex"

function Footer() {
    return <>
        <footer className="main-footer bg-primary" style={{position: "fixed",bottom:"0%", zIndex:"10"}}>
            <div className="footer-left">
                Copyright © 2023

            </div>
            <div className="footer-right"></div>
        </footer>
    </>
}

export default Footer