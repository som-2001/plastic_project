import React, { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


Axios.defaults.withCredentials=true;

export const AdminLogin = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    

    const submit=()=>{
        Axios.post('http://localhost:3001/api/adminLogin',{email,password}).then((res)=>{
            if(res.data.message==="Admin Logged In"){
            alert("Logged in Successfully");
            window.location.href = "http://localhost:3000/adminHome"; 
            }else{
                setErr(res.data.message);
            }
            })
        }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1" style={{fontWeight:"100",border:'none',background:'none',marginTop:'1.5px'}}>
                Admin            
            </button>

            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-title" id="loginModalLabel" style={{color:"black",fontWeight:'100',fontSize:"1.7rem"}}>Admin Login</span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <center><span style={{color:'red'}} className='text-center'>{err}</span></center>
                            <div>
                            <label htmlFor="email" className="form-label" style={{color:"black"}}>Email</label>   
                            <input type="text" style={{height: '50px',marginBottom:'14px'}}className="form-control" placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} />

                            <label htmlFor="password" className="form-label" style={{color:"black"}}>Password</label>   
                            <input type="password" style={{height: '50px',marginBottom:'14px'}} className="form-control" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                             <span style={{fontWeight:"100",fontSize:"1rem",float:"right",color:'blue',cursor:"pointer"}} onClick={(e)=>window.location.href='http://localhost:3000/OTP'}>Forget your password?</span><br/>
                           
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
