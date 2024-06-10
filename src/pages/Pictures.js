import { useNavigate } from "react-router-dom"
import { Navbar2 } from "./Navbar2"
import { useEffect } from "react";
import axios from "axios";

export const Pictures=()=>{
  
    const navigate=useNavigate();
    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    })
    return (
 
     <div>

     <Navbar2/>
     <div className="container mt-5" >
 
         
         <div className="row">
             <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center mt-5 mb-5">
             <img src="../img/picture.png" style={{width:"160px",height:"160px"}} alt=""/>
             <p style={{fontWeight:'100',fontSize:"1.7rem"}}>Pictures</p>
 
             </div>
             
             <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                 <img src="../img/display.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={()=>window.location.href="http://localhost:3000/DisplayPictures"} alt=""/>
                 <p style={{cursor:"pointer",fontWeight:'100',fontSize:"1.2rem"}} onClick={()=>navigate('/DisplayPictures')}>Display</p>
             </div>
             <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                 <img src="../img/update.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={()=>window.location.href="http://localhost:3000/UpdatePictures"} alt=""/>
                 <p style={{cursor:"pointer",fontWeight:'100',fontSize:"1.2rem"}} onClick={()=>navigate('/UpdatePictures')}>Update</p>
             </div>
             <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                 <img src="../img/delete.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={()=>window.location.href="http://localhost:3000/DeletePictures"}alt=""/>
                 <p style={{cursor:"pointer",fontWeight:'100',fontSize:"1.2rem"}} onClick={()=>navigate('/DeletePictures')}>Delete</p>
             </div>
             <div className="col-6 col-sm-6 col-md-3 col-lg-3 text-center mt-5 mb-5">
                 <img src="../img/report_icon.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={()=>window.location.href="http://localhost:3000/reports"} alt=""/>
                 <p style={{cursor:"pointer",fontWeight:'100',fontSize:"1.2rem"}} onClick={()=>window.location.href="http://localhost:3000/reports"}>Report</p>
             </div>
         </div>
     </div>
     </div>
    )
 }
 