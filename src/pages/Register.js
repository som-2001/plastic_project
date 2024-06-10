// import axios from "axios";
import axios from "axios";
import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaMoon } from "react-icons/fa6";


export const Register=()=>{
   
   
    const [theme,setTheme]=useState(false);
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState(''); 
    const [text,setText]=useState(false);
    const [name,setName]=useState('support');
    const [phone,setPhone]=useState('');
    const [err,setErr]=useState('');
    const [errPass,setErrPass]=useState(false);
   

    const darktheme=()=>{
        const FaEyeSlash=document.getElementById('FaEyeSlash');
        const famoon=document.querySelector('.famoon');
        famoon.style.transition='2s ease-in-out'
        famoon.style.transform='translateX(150%)';
        const FaEye=document.getElementById('FaEye');    
        const border=document.getElementById('border');
        if(!theme){
        document.body.style.transition='2s ease-in-out';
        document.body.style.backgroundColor = "#181a21";
        document.body.style.color='white';
        if(FaEyeSlash !==null)
        FaEyeSlash.style.color='blue';
        if(FaEye!==null)
        FaEye.style.color='blue';
        
        border.style.border='1px solid white';
        setTheme(!theme);
        }else{
          document.body.style.backgroundColor = "white";
          const famoon=document.querySelector('.famoon');
          famoon.style.transition='2s ease-in-out'
          famoon.style.transform='translateX(0%)';
          if(FaEyeSlash !==null)
          FaEyeSlash.style.color='blue';
          if(FaEye!==null)
          FaEye.style.color='blue';
          document.body.style.color='black';

          border.style.border='1px solid black';
          setTheme(!theme);
        }
    }
    const submit = () => {
       
        if(errPass==="" && err==="" && email!=="" && password!=="" && name!=="" && phone!==""){
        axios.post("http://localhost:3001/api/insert", {name:name,email:email,password:password,phone:phone}, {
           
        }).then(res => {
            toast.success(`${res.data}`,{
                position:"top-right",
                autoClose:3000,
            });
        
        }).catch(error => {
            console.error(error);
            alert('Registration failed');
        });
       }else{
        setErr('You have to fill all the fields');
       }
    };
    
   return (
   <div class="mx-lg-5 rounded-3">
    <p class="text-center mt-3 mb-2 py-3"  style={{fontSize:"2rem",fontWeight:"100"}}>Sign Up</p>
    <button className="toggleButton" style={{position:"fixed",right:"10px",top:"10px"}} onClick={(e)=>darktheme()}><span className="mt-1" style={{float:'left',color:'white'}}><img src="../img/moon.png" style={{position:"fixed",top:"1px",right:"52px",width:"70px",height:"70px"}} alt=""/></span><span className="famoon"/><span className="mt-1 me-1" style={{float:"right",color:'black'}}><img src="../img/sun.png" style={{width:"60px",height:"60px",position:"fixed",top:"2px",right:"4px"}} alt=""/></span></button>
    <div class="row justify-content-center">
        <ToastContainer/>
      <div class="col-12 col-md-5 col-sm-5 col-lg-3 mt-5 text-center">
        <div className="mt-5"></div>
        <img style={{width:"auto",height:"300px",borderRadius:"50% 50% 50% 50%"}} src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-login_516790-1261.jpg" alt=""/>
      </div>
        <div class="row col-md-7 col-sm-7 col-lg-6 g-3 justify-content-center mt-5">
        <div className="mt-3"></div>
            <div class="row justify-content-center">
            <p style={{fontWeight:300,fontSize:'1rem',color:'red'}} className="mt-2 mb-2 me-4 text-center">{err}</p>
            <p style={{fontWeight:300,fontSize:'1rem',color:'red'}} className="mt-2 mb-2 me-4 text-center">{errPass}</p>
            <div class="col-10 col-lg-3 col-md-4 col-sm-4">
            
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="john@gmail.com" onChange={(e)=>{setEmail(e.target.value)}} required/>
            </div>
            <div class="col-10 col-lg-3 col-md-4 col-sm-4">
            <label for="inputPassword4" class="form-label">Password</label>
            <div style={{display: "flex"}}>
            <input type={text?'text':'password'} class="form-control" id="inputPassword" placeholder="asdb1234" onChange={(e)=>{setPassword(e.target.value)
            if(e.target.value.length<8) setErrPass('password must be of 8 characters')
            else setErrPass('')
            }} required/>
            <div id="border" style={{border:'0.2px solid black',borderRadius:"0px 9px 9px 0px"}}>
               <button onClick={()=>{setText(!text)}} style={{border:"none",background:"none",fontSize:"1.4rem"}}>{text?<FaEye id="FaEye" style={{color:'#6e54d7'}}/>:<FaEyeSlash id="FaEyeSlash" style={{color:'#6e54d7'}}/>}</button>
            </div>
        </div>
            </div>
            </div>
       
        <div class="row justify-content-center">
                
                <div class="col-10 col-md-8 col-lg-6 col-sm-8">
                    <label for="inputZip" class="form-label">phone</label>
                    <input type="number" class="form-control" placeholder="632037" onChange={(e)=>{setPhone(e.target.value)
                     if(e.target.value.length!==10) setErr('phone no must be of 10 digits')
                     else setErr('')    
                }} 
                     required/>
                </div>
        </div>
      
        <div class="row justify-content-center">
                
                <div class="col-10 col-md-8 col-lg-6 col-sm-8">
                    <label for="inputZip" class="form-label">name</label><br/>
                    
                   <input className="form-control" placeholder="john Doe" onChange={(e)=>setName(e.target.value)}/>
                </div>
        </div>
            <div class="col-5 text-center mb-3">
            <button class="btn btn-outline-primary" onClick={submit}>Register</button>
            </div>
           
        </div>
        
    </div>
    
</div>
)
}