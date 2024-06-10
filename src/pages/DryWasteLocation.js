import axios from "axios"
import { Navbar2 } from "./Navbar2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const DryWasteLocation=()=>{

    const navigate=useNavigate();
    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    })
    const display=()=>{
       window.location.href="http://localhost:3000/DisplayDrywastelocation"; 
    }
   return (

    <div>
        <div className="mb-5">
      <Navbar2/>
      </div>
    <div className="container mt-5" >

        
        <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center mt-5 mb-5">
            <img src="../img/dryWaste.png" style={{width:"160px",height:"160px"}} alt=""/>
            <h2>Dry Waste Location</h2>

            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                <img src="../img/create.png" style={{width:"80px",height:"80px"}} alt=""/>
                <h6>create</h6>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                <img src="../img/display.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={display} alt=""/>
                <h6 onClick={display} style={{cursor:"pointer"}}>display</h6>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                <img src="../img/update.png" style={{width:"80px",height:"80px"}} alt=""/>
                <h6>update</h6>
            </div>
            <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                <img src="../img/delete.png" style={{width:"80px",height:"80px"}} alt=""/>
                <h6>delete</h6>
            </div>
        </div>
    </div>
    
    </div>
    
   )
}
