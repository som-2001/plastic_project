import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import '../App.css';
import { Slider } from "./Slider";

export const RegisterRider=()=>{
   
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const  [password, setPassword] = useState(''); 
    const [name,setName]=useState('');
    const [address,setAddress]=useState('');
    const [age,setAge]=useState(0);
    const [phone,setPhone]=useState('');
    const [pincode,setPincode]=useState(0);
    const [profile,setProfile]=useState([]);
    const [adharcard,setAdhar]=useState([]);
    const [text,setText]=useState(false);
    const [err,SetErr]=useState();
    const [errPass,setErrPass]=useState('');
    const [errAge,setErrAge]=useState('')
    const [errPhn,setErrPhn]=useState('');
    const [errPin,setErrPin]=useState('');
    const swiperRef = useRef(null);
    useEffect(() => {
        // Initialize Swiper when the component mounts
        swiperRef.current= new Swiper('.swiper', {
          direction: 'horizontal',
          loop: true,
          
          pagination: {
            el: '.swiper-pagination',
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
    
        // Destroy Swiper instance when the component unmounts
        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
        };
      }, []); // Empty dependency array to run the effect only once
    
      const renderError = () => {
        if (err) {
          return <span className="text-center" style={{ color: "red", fontWeight: 100, fontSize: "1.2rem" }}>{err}</span>;
        } else if (errPass) {
          return <span className="text-center" style={{ color: "red", fontWeight: 100, fontSize: "1.2rem" }}>{errPass}</span>;
        } else if (errAge) {
          return <span className="text-center" style={{ color: "red", fontWeight: 100, fontSize: "1.2rem" }}>{errAge}</span>;
        } else if (errPhn) {
          return <span className="text-center" style={{ color: "red", fontWeight: 100, fontSize: "1.2rem" }}>{errPhn}</span>;
        } else if (errPin) {
          return <span className="text-center" style={{ color: "red", fontWeight: 100, fontSize: "1.2rem" }}>{errPin}</span>;
        } else {
          return null; // Return null when there are no errors
        }
      };
    const submit = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('age', age);
        formData.append('phone', phone);
        formData.append('pincode', pincode);
        formData.append('address', address);
        formData.append('profile', profile);
        formData.append('adharcard', adharcard);
        if(errPass==='' && errAge==='' && errPhn==='' && errPin==='' && name!=='' && email!=='' && password!=='' && age!==0 && phone!=='' && pincode!==0 && address!=='' && profile.length!==0 && adharcard.length!==0){
            axios.post("http://localhost:3001/RegisterRider", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Specify the content type
                },
            }).then(res => {
                toast.success(res.data,{
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    
                })
            }).catch(error => {
                console.error(error);
                alert('Registration failed');
            })
        }else{
            if(name==='' || age===0 || password==='' || phone==='' || pincode===0 || address==='' || email===''){
                toast.success('Must fill all the fields',{
                    position:"top-right",
                    autoClose:3000
            })}else{
            if(profile.length===0)
            {
                toast.success('Submit your image',{
                    position:"top-right",
                    autoClose:3000
                })  
            }else if(adharcard.length===0)
            {
                toast.success('Submit your Adhar card',{
                    position:"top-right",
                    autoClose:3000
                })  
            }
           
        }
        }
    };
  
   return (
   <div class="mx-lg-5 rounded-3">
    <p class="text-center mt mb py"  style={{fontSize:"2rem",fontWeight:"100"}}>Sign Up</p>
    <div class="row justify-content-center">
    
      {/* <img style={{width:"auto",height:"300px"}} src="https://img.freepik.com/premium-vector/illustration-vector-graphic-cartoon-character-login_516790-1261.jpg" alt=""/> */}
      
     
      <div style={{width:"30rem",height:"23rem"}} className="row col-12 col-md-4 col-sm-12 col-lg-4 mb-5"> <center>
      <Slider />
      </center>
      </div>
  
      
        <div class="row col-md-8 col-sm-12 col-lg-7 g-3 justify-content-center">
            <ToastContainer/>
            {renderError()}
            <div class="row justify-content-center">
            <div class="col-10 col-lg-3 col-md-4 col-sm-4">
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="john@gmail.com" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div class="col-10 col-lg-3 col-md-4 col-sm-4">
            <label for="inputPassword4" class="form-label">Password</label>
            <div style={{display: "flex"}}>
            <input type={text?'text':'password'} class="form-control" id="inputPassword" placeholder="asdb1234" onChange={(e)=>{setPassword(e.target.value)
            if(e.target.value.length<8) SetErr('password must greater than 8 characters')
            else SetErr('')
            }}/>
            <div style={{border:'0.2px solid black',borderRadius:"0px 9px 9px 0px"}}>
               <button onClick={()=>{setText(!text)}} style={{border:"none",background:"none",fontSize:"1.4rem"}}>{text?<FaEye/>:<FaEyeSlash/>}</button>
            </div>
        </div>
            </div>
            </div>
            <div class="row justify-content-center col-lg-12">
            <div class="col-10 col-lg-6 col-md-8 col-sm-8">
                    <label for="inputAddress" class="form-label">Address</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" onChange={(e)=>setAddress(e.target.value)}/>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-10 col-lg-6 col-md-8 col-sm-8">
                    <label for="inputAddress" class="form-label">name</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" onChange={(e)=>setName(e.target.value)}/>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-10 col-lg-6 col-md-8 col-sm-8">
                    <label for="inputCity" class="form-label">age</label>
                    <input type="number" class="form-control" id="inputAge" placeholder="New York" onChange={(e)=>{setAge(e.target.value)
                    if(e.target.value<18 || e.target.value>50) setErrAge('Age must be between 18 and 50')
                    else setErrAge('')
                    }} required/>
            </div>
        </div>
        <div class="row justify-content-center">
                <div class="col-10 col-lg-3 col-md-4 col-sm-4">
                <label for="inputState" class="form-label">phone No.</label>
                <input type="number" class="form-control" placeholder="63203" onChange={(e)=>{setPhone(e.target.value)
                if(e.target.value.length!==10) setErrPhn('Phone No. must be of 10 digits ')
                else setErrPhn('')
                }} required/>

                </div>
                <div class="col-10 col-md-4 col-lg-3 col-sm-4">
                    <label for="inputZip" class="form-label">pincode</label>
                    <input type="number" class="form-control" placeholder="63203" onChange={(e)=>{setPincode(e.target.value)
                    if(e.target.value.length!==6) setErrPin('Phone No. must be of 6 digits ')
                    else setErrPin('')
                    }}/>
                </div>
        </div>
        <div class="row justify-content-center col-lg-12">
            <div class="col-10 col-lg-6 col-md-8 col-sm-8">
                    <label for="inputAddress"  class="form-label">Profile Picture</label>
                    <input type="file" class="form-control" name='profile' id="inputProfile" onChange={(e)=>setProfile(e.target.files[0])}/>
            </div>
        </div>
        <div class="row justify-content-center col-lg-12">
            <div class="col-10 col-lg-6 col-md-8 col-sm-8">
                    <label for="inputAddress"  class="form-label">Adhar Card Picture</label>
                    <input type="file" class="form-control" name='adharcard' id="inputAdhar" onChange={(e)=>setAdhar(e.target.files[0])}/>
            </div>
        </div>
            <div class="col-5 text-center">
            <button class="btn btn-primary" onClick={submit}>Sign up</button>
            </div>
            <center><h6>Already Registered? sign in <span onClick={()=>{navigate('/Riderlogin')}} style={{textDecoration:"underline",cursor:"pointer"}}>here</span></h6></center>
        </div>
        
    </div>
    
</div>
)
}