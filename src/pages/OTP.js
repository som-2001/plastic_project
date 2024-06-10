import { useEffect, useState } from "react";
import { Slider } from "./Slider"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Slider1 } from "./Slider1";
export const OTP=()=>{

   const navigate=useNavigate();
   const [email,setEmail]=useState('');
   const [hide,setHide]=useState(false);
   const [otp,setOtp]=useState("");
 
   const change=()=>{
    axios.post('http://localhost:3001/match',{email:email,otp:otp}).then(res=>{

        if(res.data==='login')
        {
           toast.success('Wrong email',{
            position:"top-right",
            autoClose:3000
           })
           navigate('/OTP');
        }
        else{
            navigate('/RecoverPassword');
        }
     })
   }
   const submit=()=>{
      axios.post('http://localhost:3001/OTP',{email:email}).then(res=>{
         setHide(true);
         if(res.data==='login')
         {
            navigate('/');
         }
         toast.success(res.data,{
            position: "top-right",
            autoClose: 5000,
         })
      })
   }
 return (
   <div class=" mx-2 mx-lg-5 rounded-3 mt-5 mb-5" >
    <p class="text-center mt mb py" style={{fontWeight:"100",fontSize:"1.9rem"}}>Recover Password</p>
    <div class="row justify-content-center">
   
      
    <div style={{width:"30rem",height:"23rem"}} className="mb-5"> <center>
      <Slider1 />
      </center>
      </div>
  
        <div class="row col-12 col-md-6 col-sm-7 col-lg-4 g-3 mt-3 justify-content-center">
            <div className="mt-5"></div>
            <ToastContainer/>
            <div class="row justify-content-center ">
            <div class="col-10 col-lg-11 col-md-11 col-sm-11">
            <label for="inputEmail4" class="form-label" style={{fontWeight:"100"}}>Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="john@gmail.com" style={{maxWidth:"365px"}} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
           
            {hide && <div class="col-10 col-lg-11 col-md-11 col-sm-11">
            <label for="inputPassword4" class="form-label"  style={{fontWeight:"100"}} >Otp</label>
            <div id="eye" style={{display: "flex"}} >
            <input type='number' class="form-control" id="inputPassword" placeholder="Enter your otp" style={{maxWidth:"330px"}} onChange={(e)=>setOtp(e.target.value)}
            />
            
            </div>
            </div>}
            </div>
            
            <div class="col-5 text-center">
            <button class="btn btn-outline-dark"  style={{fontWeight:"100"}} onClick={hide?change:submit}>{hide?'Change':'Submit'}</button>
            </div>
            
        </div>
        
    </div>
    
</div>
 )

}