import React, { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

Axios.defaults.baseURL='http://localhost:3001';
Axios.defaults.withCredentials=true;

export const Login = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const submit = () => {
        Axios.post("/api/login",{
            email: email,
            password: password
        }).then(res => {
            if (res.data.message === "successfull") {
                toast.success("you have logged in successfully",{
                    position:"top-right",
                    autoClose:3000,
                   });
                   window.location.href = "http://localhost:3000/Home";
                localStorage.setItem('unique_id',res.data.res);
            } else {
                setErr(res.data.message);
            }
        });
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal" style={{fontWeight:"100",border:'none',background:'none',marginTop:'1.5px'}}>
                Login
            </button>

            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel" style={{color:"black"}}>Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <center><span style={{color:'red'}}>{err}</span></center>
                            <div>
                            <label htmlFor="email" className="form-label" style={{color:"black"}}>Email</label>   
                            <input type="text" style={{height: '50px',marginBottom:'14px'}}className="form-control" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="password" className="form-label" style={{color:"black"}}>Password</label>   
                            <input type="password" style={{height: '50px',marginBottom:'14px'}} className="form-control" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                            <button type="button" className='btn btn-primary' onClick={submit}>Login</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
