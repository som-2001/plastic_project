import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import "../App.css";
import Axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


export const Success=()=>{

  const[result,setResult]=useState([]);
  const [hide,setHide]=useState(false);
  const [timer,setTimer]=useState(5);
  const navigate=useNavigate();

 setTimeout(()=>{
 setHide(true)
 },5000);

 useEffect(() => {
  if (!hide) {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

  }
}, [hide]);


  useEffect(()=>{
    
    window.history.pushState(null, null, null);
  },[]);

  useEffect(()=>{
   Axios.get('http://localhost:3001/member').then(res=>{
  
    if(res.data!=='you have to login')
     setResult(res.data[0].total_coins); 
    else{
     navigate('/'); 
    }
   })

  },[]);


return(

<div className="success">
 <div className="mb-5">
 

  <Navbar/>
  </div>
    <div className="text-center" style={{marginTop:"4rem",overflowX:"hidden"}} >
        <img  src={`../img/coin.png`} alt="" style={{width:"300px",height:"300px"}} id='coin'  /><span style={{fontWeight:600,fontSize:'2.5rem',color:'green'}}>+5</span>
        <p className="text-center" style={{fontWeight:'100',fontSize:"1.2rem"}}>You have got 5 points. Keep it up!</p>
        <center><p style={{fontWeight:'100',fontSize:"1.2rem"}}>By gaining enough points you can buy products with this coins in our store.</p></center>
        <p>Total Coins: {result}</p>
    </div>
    <div>
    {!hide && <p className="text-center">
       Please wait  for a while...
       {timer}
      </p>}
    {hide && <center> <button className="btn btn-outline-dark" onClick={(e)=>{window.location.href="http://localhost:3000/home"}}>Back to Home</button></center>}
    </div>
  
 </div>

)
}