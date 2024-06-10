import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import { Navbar2 } from "./Navbar2";
import { useNavigate } from "react-router-dom";

export const AdminDisplay = () => {

const [results, setResults] = useState([]);

const navigate=useNavigate();
useEffect(()=>{
    axios.post('http://localhost:3001/api/assign').then(res=>{
        if(res.data==='Invalid session data')
        {
            navigate('/');
        }
    })
})
  useEffect(() => {
    axios.get("http://localhost:3001/api/admin")
      .then((response) => {
        console.log(response);
        setResults(response.data);
      });
  }, []);

  return (
    <div className="card-body">
    <div className="mb-5">
      <Navbar2/>
      </div>
      <center><img src="./img/location.jpg" style={{width:"240px"}} className="mt-5 mb-5" alt="Location"/><br /></center>
      <div id="app">
        <center>
          <p style={{fontWeight:100,fontSize:"1.8rem"}}>Admins</p>
          <table width="80%" border="1" className="table align-middle">
            <thead>
              <tr>
                <th><center><b>ID</b></center></th>
                <th><center><b>Email</b></center></th>
                <th><center><b>Role</b></center></th>
                <th><center><b>Pincode</b></center></th>
              </tr>
            </thead>
            <tbody>
            {results?(results.map((result, index) => (
                  <tr key={index}>
                    <td><center>{result.id }</center></td>
                    <td><center>{result.adminemail}</center></td>
                    <td><center>{result.role}</center></td>
                    <td><center>{result.pincode}</center></td>
                   
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

      <div className="card-footer">
        {/* Add any additional content for the footer if needed */}
      </div>
    </div>
  );
};
