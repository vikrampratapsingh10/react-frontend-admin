import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import "./signin.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchAdmin, setAdmin } from '../../../redux-config/adminSlice';
import "react-toastify/dist/ReactToastify.css";
import api from '../../../webApi/api';

function SignIn() {
  const { admin } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(api.ADMIN_SIGNIN1, { email, password });
      if (response.data.status)
        dispatch(setAdmin(response.data.admin));
      navigate("/home");
      console.log(email + "dfdfdf");
    }
    catch (err) {
      console.log(err);
      window.alert("Oops! something went wrong")
      toast.error("Oops! something went wrong");
    }
  }
  // ----------------------------------------------------------------------------------
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        let data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", { headers: { "Authorization": `Bearer ${tokenResponse.access_token}` } })
        dispatch(fetchAdmin(data.data.email));
        toast.success("Sign In Success");
        // let response = await axios.post(api.SIGNIN, { email: data.data.email });
        navigate("/home");
      } catch (err) {
        if (err.request.status == 400) {
          window.alert("User not found , SignUp First");
        }
        else
          window.alert("Something went wrong . . .");
      }
    }
  });

  return <>
    {/* <div className='container-fluid' id='login-bg'>
    </div> */}
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#ffffff", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container-fluid container1" id='login-bg'>
        <div className="row row1" style={{ height: 400 }}>
          <div className="col-6" id="msg" style={{ backgroundColor: "white", height: 400 }}>
            <h2 id="heading">Hello, Admin!</h2>
            <p style={{ color: "black", marginTop: "2vw" }}>
              To keep connected with us please login with your personal info
            </p>
            <button id="google-login-btn" className='btn-block mb-4' onClick={login}>
              Continue with Google
            </button>
          </div>
          <div className="col-md-4" style={{ backgroundColor: "white", height: 400 }}>
            <form onSubmit={handleSubmit} >
              <h2 id="heading">Sign In</h2>
              <span>Or use your account</span>
              <input className="ps-3 input1" onChange={(event) => setEmail(event.target.value)} type="email mt-2" required placeholder="Enter Email" />
              <input className="ps-3 input1" onChange={(event) => setPassword(event.target.value)} type="password" required placeholder="Enter Password" />
              <a id="a" href="" className="link">
                {" "}
                <small>forgot Password?</small>
              </a>
              <button type="submit" className="btn btn-dark btn-success1">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default SignIn;
