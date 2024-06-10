import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';
import axios from "axios";

Axios.defaults.baseURL='http://localhost:3001';
export const Navbar = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hide,setHide]=useState(false);

  const navigate=useNavigate();

  const submit = () => {
    Axios.post('/api/details', { name, phone, email})
      .then(res => {
        if (res.data === "successful") {
          console.log("Update successful");
        }
      })
      .catch(error => {
        console.error("Error updating details:", error);
      });
  };

  const details = () => {
    return (
      <div>
        <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" >
                <h5 className="modal-title" id="loginModalLabel" style={{ color: "black" }}>Details</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div>
                <label htmlFor="email" className="form-label" style={{color:"black"}}>Name</label>   
                     <input type="text" style={{height: '50px',marginBottom:'14px'}}className="form-control" placeholder='Enter your Name' onChange={(e) => setName(e.target.value)} />
                     <label htmlFor="password" className="form-label" style={{color:"black"}}>Phone</label>   
                     <input type="text" style={{height: '50px',marginBottom:'14px'}} className="form-control" placeholder="Enter your Phone" onChange={(e) => setPhone(e.target.value)} />
                     <label htmlFor="password" className="form-label" style={{color:"black"}}>Email</label>   
                     <input type="text" style={{height: '50px',marginBottom:'14px'}} className="form-control" placeholder="Enter your Pin" onChange={(e) => setEmail(e.target.value)} />
                  <button type="button" className='btn btn-primary' onClick={submit}>Update</button>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const mail=()=>{
     navigate('/mail');
  }


  
 const logout1=()=>{
  axios.post('/logout');
  window.location.href='http://localhost:3000/'
 }

 const close = () => {
  var div = document.getElementById('visiblelog');
  
  if (div) {
    setHide(false);
  }
  
}

const open = () => {
  var div = document.getElementById('logout');
  
  setHide(true);
  if (div) {
    div.id = 'visiblelog';
  } 
}
  return (
    <div className="Navbar" >
      <nav class="navbar navbar-light bg-light fixed-top" >
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span>
              <img src="../img/user2.png" style={{width:"30px",height:"30px"}} alt=""/>
            </span>
          </button>
          <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header" style={{height:"57px"}}>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" style={{fontWeight:"100"}}></button>
            </div>
           
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3" style={{backgroundColor:"whitesmoke"}}>
              <li class="nav-item" style={{ color:'grey',position: "relative", bottom: "24.5rem", fontSize: "1.5rem", fontWeight: "100", margin: "3px",left:"9px"}}>Update Your Profile</li>
              <button className="btn btn-outline-primary" style={{ position: "relative", height: "2rem", paddingBottom: "2.2rem", bottom: "26rem", fontSize: "1.3rem", fontWeight: "100",  margin: "12px" }} data-bs-toggle="modal" data-bs-target="#loginModal">Click Here</button>
              <li class="nav-item" style={{ position: "relative",height: "2rem", border:"none",color:"grey", paddingBottom: "2rem", bottom: "26.6rem", fontSize: "1.3rem", fontWeight: "100",margin: "12px" }} onClick={mail}>Contact Us</li>
              <li class="nav-item" style={{ position: "relative",height: "2rem", border:"none",color:"grey", paddingBottom: "2rem", bottom: "27.6rem", fontSize: "1.3rem", fontWeight: "100",margin: "12px",cursor:'pointer' }} onClick={open} >Log out</li>
              <li class="nav-item" style={{ position: "relative",height: "2rem", border:"none",color:"grey", paddingBottom: "2rem", bottom: "28.4rem", fontSize: "1.3rem", fontWeight: "100",margin: "12px",cursor:'pointer' }} onClick={()=>{window.location.href="http://localhost:3000"}} >Home page</li>
            </ul>
            
          </div>
        </div>
        
      </nav>
      {details()}

<div id="logout" style={{ display: hide ? 'block' : 'none',transition:'2s ease-in-out' }}>
      {hide && <div id="row1">
          <span style={{fontWeight:100,fontSize:"1.06rem",color:'black'}}>ohh no!! you're leaving...are you sure?</span>
          <center><img src="../img/logout.png" className='mb-2' style={{width:"100px",height:"100px"}} alt=""/>
          <div className="flex">
          <button id='button1' className="btn btn-btn-outline-secondary me-2" onClick={close}>cancel</button>
          <button id='button2' className="btn btn-btn-outline-danger" onClick={logout1}style={{cursor:'pointer'}}>logout</button>
          </div>
          </center>
        </div>
       }
</div>      
    </div>
  );
};
