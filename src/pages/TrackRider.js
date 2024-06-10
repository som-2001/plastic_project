import { useEffect, useState } from "react";
import { Navbar2 } from "./Navbar2"
import axios from "axios";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";

export const TrackRider=()=>{
   
    const[result,setResult]=useState([]);
   
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
    axios.post('http://localhost:3001/taskAssign1').then(res=>{
        
        setResult(res.data);
    })
    },[])

    return (
        <div>
        <div className="mb-5">
        <Navbar2/>
        </div>
           
            <center><img src="./img/location.jpg" style={{width:"240px"}} className="mt-5 mb-5" alt="Location"/><br /></center>
        <div id="app">
          <center>
          <p className="text-center" style={{fontSize:"2.2rem",fontWeight:"100"}}>Track Rider</p>
            <table width="80%" border="1" className="table align-middle">
              <thead>
                <tr>
                  <th><center><b>Image</b></center></th>
                  <th><center><b>Garbage Picture</b></center></th>
                  <th><center><b>Picture Id</b></center></th>
                  <th><center><b>Address</b></center></th>
                  <th><center><b>Rider Longitude</b></center></th>
                  <th><center><b>Rider latitude</b></center></th>
                  <th><center><b>Garbage Longitude</b></center></th>
                  <th><center><b>Garbage latitude</b></center></th>
                  <th><center><b>Verify</b></center></th>
                  <th><center><b>Rider Id</b></center></th>
                  <th><center><b>Rider Name</b></center></th>
                  <th><center><b>Rider Picture</b></center></th>
                  
                  <th><center><b>Rider Phone</b></center></th>
                  <th><center><b>Rider Adhar Card</b></center></th>
                  <th><center><b>Rider Address</b></center></th>
                </tr>
              </thead>
              <tbody>
                {result && result.map((result, index) => (
                  <tr key={index}>
                  
                    <td><center><img id="pictureId" src={`../img/${result.image_file}`} alt="" style={{width:"150px",height:"150px",cursor:"pointer"}} /></center></td>
                    <td><center><img id="pictureId" src={`../images/${result.garbage_picture}`} alt="" style={{width:"150px",height:"150px",cursor:"pointer"}} /></center></td>
                    <td><center>{result.picture_id}</center></td>
                    <td><center>{result.address}</center></td>
                    <td><center>{result.rider_longitude}</center></td>
                    <td><center>{result.rider_latitude}</center></td>
                    <td><center>{result.garbage_longitude}</center></td>
                    <td><center>{result.garbage_latitude}</center></td>
                    <td><center>{result.verify}</center></td>
                    <td><center>{result.rider_id}</center></td>
                    <td><center>{result.rider_name}</center></td>
                    <td><center><img id="pictureId" src={`../img/${result.rider_picture}`} alt="" style={{width:"150px",height:"150px",cursor:"pointer"}} /></center></td>

                    <td><center>{result.rider_phn}</center></td>
                    <td><center><img id="pictureId" src={`../img/${result.adharcard}`} alt="" style={{width:"150px",height:"150px",cursor:"pointer"}} /></center></td>
                    <td><center>{result.rider_address}</center></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </center>
        </div>
       
      
       
      </div>
        
    )
}