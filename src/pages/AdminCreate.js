import axios from "axios";
import { useEffect, useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const AdminCreate=()=>{
   
   
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState(''); 
    const [text,setText]=useState('');
    const [role,setRole]=useState('support');
    const [pincode,setPincode]=useState('');
    const [err,setErr]=useState('');
    const [errPass,setErrPass]=useState(false);

    const navigate=useNavigate();
    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    })
    useEffect(()=>{
        
        const call=()=>{
            toast.warning("Only a super admin can create another admin", {
            position:'top-right',
            autoClose:3000,
            })
        }
        call();
        
    },[])

    const submit = () => {
       
        if(errPass==="" && err==="" && email!=="" && password!=="" && role!=="" && pincode!==""){
        axios.post("http://localhost:3001/AdminCreate", {email:email,password:password,text:role,pincode:pincode}, {
           
        }).then(res => {
            toast.success(`${res.data}`,{
                position:"top-right",
                autoClose:3000,
            });
        
        }).catch(error => {
            console.error(error);
            toast.error('Registration failed',{
                position:"top-right",
                autoClose:3000,
            });
        });
       }else{
        setErr('You have to fill all the fields');
       }
    };
    
   return (
   <div class="mx-lg-5 rounded-3">
    <p class="text-center mt-3 mb-2 py-3"  style={{fontSize:"2rem",fontWeight:"100"}}>Admin Create</p>
    <div class="row justify-content-center">
        <ToastContainer/>
      <div class="col-12 col-md-5 col-sm-5 col-lg-3 mt-3 text-center">
        <img style={{width:"auto",height:"300px"}} src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-login_516790-1261.jpg" alt=""/>
      </div>
        <div class="row col-md-7 col-sm-7 col-lg-6 g-3 justify-content-center">
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
            if(e.target.value.length!==8) setErrPass('password must be of 8 characters')
            else setErrPass('')
            }} required/>
            <div style={{border:'0.2px solid black',borderRadius:"0px 9px 9px 0px"}}>
               <button onClick={()=>{setText(!text)}} style={{border:"none",background:"none",fontSize:"1.4rem"}}>{text?<FaEye/>:<FaEyeSlash/>}</button>
            </div>
        </div>
            </div>
            </div>
       
        <div class="row justify-content-center">
                
                <div class="col-10 col-md-8 col-lg-6 col-sm-8">
                    <label for="inputZip" class="form-label">pincode</label>
                    <input type="number" class="form-control" placeholder="632037" onChange={(e)=>{setPincode(e.target.value)
                     if(e.target.value.length!==6) setErr('pincode must be of 6 digits')
                     else setErr('')    
                }} 
                     required/>
                </div>
        </div>
      
        <div class="row justify-content-center">
                
                <div class="col-10 col-md-8 col-lg-6 col-sm-8">
                    <label for="inputZip" class="form-label">Role</label><br/>
                    
                    <select onChange={(e)=>setRole(e.target.value)} className="form-control" required>
                      <option>Select Admin Role</option>
                      <option value='super'>super</option>
                      <option value='support'>support</option>  
                    </select>
                </div>
        </div>
            <div class="col-5 text-center mb-3">
            <button class="btn btn-outline-primary" onClick={submit}>Create</button>
            </div>
           
        </div>
        
    </div>
    
</div>
)
}