import axios from "axios";
import { useState } from "react"
import "../App.css"
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Slider } from "./Slider";
import { RiderSlider } from "./RiderSlider";

export const Riderlogin=()=>{
   
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState(''); 
    const [text,setText]=useState(false);
    const [err,setErr]=useState('');
    const submit = () => {
       
        axios.post("http://localhost:3001/LoginRider", {email:email,password:password})
        .then(res => {
            setErr(res.data);
            if(res.data==='Successfully Logged In')
            navigate('/RiderHome')
        }).catch(error => {
            console.error(error);
            alert('login failed');
        });
    };
    
   return (
   <div class=" mx-2 mx-lg-5 rounded-3 mt-5 mb-5" >
    <p class="text-center mt mb py" style={{fontWeight:"100",fontSize:"1.9rem"}}>Sign in</p>
    <div class="row justify-content-center">
   
      
    <div style={{width:"30rem",height:"23rem"}} className="mb-5"> <center>
      <RiderSlider />
      </center>
      </div>
  
        <div class="row col-12 col-md-6 col-sm-7 col-lg-4 g-3 mt-5 justify-content-center">
            <div className="mt-5"></div>
        <center><p style={{fontWeight:300,fontSize:'1rem',color:'red'}} className="mt-2 mb-2 me-4">{err}</p></center>
            <div class="row justify-content-center ">
            <div class="col-10 col-lg-11 col-md-11 col-sm-11">
            <label for="inputEmail4" class="form-label" style={{fontWeight:"100"}}>Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="john@gmail.com" style={{maxWidth:"365px"}} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div class="col-10 col-lg-11 col-md-11 col-sm-11">
            <label for="inputPassword4" class="form-label"  style={{fontWeight:"100"}}>Password</label>
            <div id="eye" style={{display: "flex"}} >
            <input type={text ? 'text':'password'} class="form-control" id="inputPassword" placeholder="asdb1234" style={{maxWidth:"330px"}} onChange={(e)=>setPassword(e.target.value)}
            />
            <div style={{border:'0.2px solid black',borderRadius:"0px 9px 9px 0px"}}>
            <button onClick={()=>{setText(!text)}} style={{border:"none",background:"none",fontSize:"1.4rem"}}>{text?<FaEye/>:<FaEyeSlash/>}</button>
            </div>
            </div>
            </div>
            
            </div>
            
            <div class="col-5 text-center">
            <button class="btn btn-primary"  style={{fontWeight:"100"}} onClick={submit}>Sign in</button>
            </div>
            <center className="mb-4" ><p  style={{fontWeight:"100"}}>Already Registered? sign up <span onClick={()=>{navigate('/RegisterRider')}} style={{textDecoration:"underline",cursor:"pointer"}}>here</span></p></center>
        </div>
        
    </div>
    
</div>
)
}