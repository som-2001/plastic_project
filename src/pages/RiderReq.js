import axios from "axios"
import  { useState, useEffect } from 'react'
import { Footer } from "./Footer"
import { Navbar2 } from "./Navbar2"
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export const RiderReq=()=>{
  
    const [results,setResult]=useState([]);

    const success=(e)=>{
        axios.post('http://localhost:3001/api/successs',{id:e})
        setResult([...results.filter((value) => value.id !== e)])
    }
    const remove=(e)=>{
        axios.post('http://localhost:3001/api/remove',{id:e})
        setResult([...results.filter((value) => value.id !== e)])
    }
    useEffect(()=>{
       axios.post("http://localhost:3001/api/RiderReq")
       .then(res=>{
        setResult(res.data);
       })
    },[])
  return(
  <div>
    <div className="mb-5">
    <Navbar2 />
    </div>
    
    <div className="mt-5">
    <h1 className="text-center" style={{fontFamily:"cursive",marginTop:"9%"}}>Rider Requests</h1>
    </div>
    
    <div>
        <center>
    <table width="80%" border="1" className="table align-middle">
              <thead>
                <tr>
                  <th><center><b>Id</b></center></th>
                  <th><center><b>Picture</b></center></th>
                  <th><center><b>Name</b></center></th>
                  <th><center><b>Address</b></center></th>
                  <th><center><b>Phone</b></center></th>
                  <th><center><b>Email</b></center></th>
                  <th><center><b>Age</b></center></th>
                  <th><center><b>Adhar Card</b></center></th>
                  <th><center><b>Pincode</b></center></th>
                  <th><center><b>Action</b></center></th>
                </tr>
              </thead>
              <tbody>
                {results && (results.map((result, index) => (
                  <tr key={index}>
                  
                    <td><center>{result.id}</center></td>
                    <td><center><img src={`../img/${result.picture}`} alt="" style={{width:"150px",height:"150px"}}/></center></td>
                    <td><center>{result.name}</center></td>
                    <td><center>{result.address}</center></td>
                    <td><center>{result.phn}</center></td>
                    <td><center>{result.email}</center></td>
                    <td><center>{result.age}</center></td>
                    <td><center><img src={`../img/${result.adharcard}`} style={{width:"150px",height:"150px"}} alt=""/></center></td>
                    <td><center>{result.pincode}</center></td>
                    <td><center>
                    <button className="btn btn-success me-1 mb-1" onClick={()=>success(result.id)}><TiTick/></button>
                    <button className="btn btn-danger" onClick={()=>remove(result.id)}><ImCross/></button>
                    </center>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
            {!results &&  
                <div className="text-center mt-5 mb-5" style={{fontFamily:"cursive",fontWeight:"100",fontSize:"1.5rem"}}>
                  <p>No Results to Display</p>
                </div>}
    </center>
    </div>
  </div>
  )
}