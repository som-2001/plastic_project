import { useEffect, useState } from "react"
import { Navbar2 } from "./Navbar2"
import { useNavigate } from "react-router-dom";
import { TbReport } from "react-icons/tb";
import axios from "axios";
export const Reports=()=>{

    const navigate=useNavigate();
    const [results,setResults]=useState([]);

    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    },[])
    useEffect(()=>{
        axios.post('http://localhost:3001/verifiedPics').then(res=>{
            setResults(res.data);
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
            <h2>Verified Garbages</h2><br />
            <button className="btn btn-warning mb-2 me-2" onClick={(e)=>navigate('/Updateplastic')}>Plastic</button>
          <button className="btn btn-success mb-2" onClick={(e)=>navigate('/Updatepaper')}>Others</button>
            <table width="80%" border="1" className="table align-middle">
              <thead>
                <tr>
                  <th><center><b>Garbage Picture</b></center></th>
                  <th><center><b>Address</b></center></th>
                  <th><center><b>Verified By</b></center></th>
                  <th><center><b>Verified By</b></center></th>
                  <th><center><b>Status</b></center></th>
                  <th><center><b>Report</b></center></th>
                  <th><center><b>Mail</b></center></th>
                </tr>
              </thead>
              <tbody>
                {results?(results.map((result, index) => (
                  <tr key={index}>
                  
                    <td><center><img id="pictureId" src={`../images/${result.garbage_picture}`} alt="" style={{width:"150px",height:"150px",cursor:"pointer"}} onClick={()=>{
                     navigate(`/zoom/${result.picture_id}`)
                    }}/></center></td>
                    <td><center>{result.address}</center></td>
                    <td><center>{result.rider_name}</center></td>
                    <td><center>{result.rider_phn}</center></td>
                    <td><center>{result.verify}</center></td>
                    <td><center style={{fontSize:"2.5rem",cursor:"pointer"}}><TbReport onClick={(e)=>navigate(`/GenerateReport/${result.picture_id}`)}/></center></td>
                    <td><center><button className="btn btn-outline-dark" onClick={(e)=>(navigate(`/reportMail/${result.picture_id}`))}>Mail</button></center></td>
                  </tr>
                ))):(
                  <div>
                    <h2>No Data available to show</h2>
                  </div>  
                )}
              </tbody>
            </table>
          </center>
        </div>
    </div>
     
    )
 }
 