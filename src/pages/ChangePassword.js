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
export const ChangePassword=()=>{

   const navigate=useNavigate();
   const [email,setEmail]=useState('');
   const [password, setPassword] = useState('');
   const [newPassword,setNewPassword]=useState('')
   const [text,setText]=useState(false);

   useEffect(()=>{
      axios.post('http://localhost:3001/api/assign').then(res=>{
          if(res.data==='Invalid session data')
          {
              navigate('/');
          }
      })
  })
   const submit=()=>{
      axios.post('http://localhost:3001/changePassword',{email:email,password:password,newPassword:newPassword}).then(res=>{
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
    <p class="text-center mt mb py" style={{fontWeight:"100",fontSize:"1.9rem"}}>Change Password</p>
    <div class="row justify-content-center">
   
      
    <div style={{width:"30rem",height:"23rem"}} className="mb-5"> <center>
      <div className="mt-5"></div>
      <Slider1 />
      </center>
      </div>
  
        <div class="row col-12 col-md-6 col-sm-7 col-lg-4 g-3  justify-content-center">
            <div className="mt-5"></div>
            <ToastContainer/>
            <div class="row justify-content-center ">
            <div class="col-10 col-lg-11 col-md-11 col-sm-11">
            <label for="inputEmail4" class="form-label" style={{fontWeight:"100"}}>Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="john@gmail.com" style={{maxWidth:"365px"}} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div class="col-10 col-lg-11 col-md-11 col-sm-11">
            <label for="inputPassword4" class="form-label"  style={{fontWeight:"100"}} >Current Password</label>
            <div id="eye" style={{display: "flex"}} >
            <input type={text ? 'text':'password'} class="form-control" id="inputPassword" placeholder="your current password" style={{maxWidth:"330px"}} onChange={(e)=>setPassword(e.target.value)}
            />
            <div style={{border:'0.2px solid black',borderRadius:"0px 9px 9px 0px"}}>
            <button onClick={()=>{setText(!text)}} style={{border:"none",background:"none",fontSize:"1.4rem"}}>{text?<FaEye/>:<FaEyeSlash/>}</button>
            </div>
            </div>
            </div>
            <div class="col-10 col-lg-11 col-md-11 col-sm-11">
            <label for="inputPassword4" class="form-label"  style={{fontWeight:"100"}} >New Password</label>
            <div id="eye" style={{display: "flex"}} >
            <input type={text ? 'text':'password'} class="form-control" id="inputPassword" placeholder="your new password" style={{maxWidth:"330px"}} onChange={(e)=>setNewPassword(e.target.value)}
            />
            <div style={{border:'0.2px solid black',borderRadius:"0px 9px 9px 0px"}}>
            <button onClick={()=>{setText(!text)}} style={{border:"none",background:"none",fontSize:"1.4rem"}}>{text?<FaEye/>:<FaEyeSlash/>}</button>
            </div>
            </div>
            </div>
            </div>
            
            <div class="col-5 text-center">
            <button class="btn btn-outline-primary"  style={{fontWeight:"100"}} onClick={submit}>Change</button>
            </div>
            
        </div>
        
    </div>
    
</div>
 )

}