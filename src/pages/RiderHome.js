import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const RiderHome=()=>{

    const[result,setResult]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
    axios.post('http://localhost:3001/taskAssign').then(res=>{
        if(res.data!=='you have to login first')
        setResult(res.data);
        else{
          navigate('/');
        }
    })
    },[])

    return (
        <div className="container">
       
         <p className="m-2 mt-3 mb-3" style={{fontWeight:"200",fontSize:"1.2rem"}}>Assigned locations</p>
            
            <div className="row">
            {result.length!==0 ? (result.map((data,index)=>(
              <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-3 mb-3" onClick={()=>navigate(`/map/${data.longitude}/${data.latitude}/${data.picture_id}`)}> 
              <center>
               <div class="card m-2" style={{width:"16rem",marginRight: "15px"}} >
                <center><img src={`../images/${data.image_file}`} style={{width:"250px",height:"300px"}}class="card-img-top" alt="..."/></center>
                <div class="card-body">
                  <p class="card-text text-center" style={{fontWeight:"200"}}>Address: {data.address}<br/>Status: {data.verify}<br/>picture Id: {data.picture_id}<br/>
                  Reported By:{data.reported_by}<br/>phone no:{data.phone_no}</p>
                </div>
              </div>
              </center>
              </div>
              
            ))):(
              <center> <div className="card mt-5" style={{width:'18rem',height:"10rem"}}>
               <p style={{fontSize:"1.4rem",fontWeight:'100'}}>Wohoooo!!! You Have completed your tasks for today.</p>
              </div>
              </center>
            )}
            </div>
        </div>
    )
}