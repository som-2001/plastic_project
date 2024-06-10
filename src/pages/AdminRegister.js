import { useNavigate } from "react-router-dom"
import { Navbar2 } from "./Navbar2"

export const AdminRegister=()=>{

    const navigate=useNavigate();
    return (
 
     <div>
     <div className="mb-5">
      <Navbar2/>
      </div>
     <div className="container mt-5" >
 
         
         <div className="row">
             <div className="col-12 col-sm-12 col-md-12 col-lg-12 text-center mt-5 mb-5">
             <img src="../img/dryWaste.png" style={{width:"160px",height:"160px"}} alt=""/>
             <p style={{fontSize:"1.9rem",fontWeight:"100"}}>Admin Register</p>
 
             </div>
             <div className="col-12 col-sm-6 col-md-4 col-lg-4 text-center mt-5 mb-5">
                 <img src="../img/create.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={(e)=>navigate('/adminCreate')}alt=""/>
                 <p onClick={(e)=>navigate('/adminCreate')} style={{cursor:"pointer"}}>create</p>
             </div>
             <div className="col-12 col-sm-6 col-md-4 col-lg-4 text-center mt-5 mb-5">
                 <img src="../img/display.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={(e)=>navigate('/adminDisplay')} alt=""/>
                 <p onClick={(e)=>navigate('/adminDisplay')} style={{cursor:"pointer"}}>display</p>
             </div>
            
             <div className="col-12 col-sm-6 col-md-4 col-lg-4 text-center mt-5 mb-5">
                 <img src="../img/delete.png" style={{width:"80px",height:"80px",cursor:"pointer"}} onClick={(e)=>navigate('/adminDelete')} alt=""/>
                 <p onClick={(e)=>navigate('/adminDelete')} style={{cursor:"pointer"}} >delete</p>
             </div>
         </div>
     </div>
     </div>
    )
 }
 