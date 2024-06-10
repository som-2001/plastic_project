import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css'
import { Navbar2 } from "./Navbar2";
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const AdminDelete = () => {

const [results, setResults] = useState([]);
const [role,setRole]=useState('');

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
      axios.get("http://localhost:3001/api/admin_details")
      .then((response) => {
  
        setRole(response.data[0].role);
      });

  }, []);
    const deleteAdmin=(e)=>{

        setResults([...results.filter((item)=>item.id!==e)]);
        axios.post('http://localhost:3001/api/adminDelete',{id : e}).then(res=>{
            toast.success(`${res.data}`,{
                position:"top-right",
                autoClose:3000,
            });
        })
        
    } 
  return (
    <div className="card-body">
    <div className="mb-5">
      <Navbar2/>
      </div>
      <center><img src="./img/location.jpg" style={{width:"240px"}} className="mt-5 mb-5" alt="Location"/><br /></center>
      <div id="app">
        <ToastContainer/>
        <center>
          <p style={{fontWeight:100,fontSize:"1.8rem"}}>Admin Delete</p>
          <table width="80%" border="1" className="table align-middle">
            <thead>
              <tr>
                <th><center><b>ID</b></center></th>
                <th><center><b>Email</b></center></th>
                <th><center><b>Role</b></center></th>
                <th><center><b>Pincode</b></center></th>
                <th><center><b>Delete</b></center></th>
              </tr>
            </thead>
            <tbody>
            {results?(results.map((result, index) => (
                  <tr key={index}>
                    <td><center>{result.id }</center></td>
                    <td><center>{result.adminemail}</center></td>
                    <td><center>{result.role}</center></td>
                    <td><center>{result.pincode}</center></td>
                    {role==='super'?(
                    <td><center><button className="btn btn-outline-danger" onClick={(e)=>(deleteAdmin(result.id))}>Delete</button></center></td>
                    ):(
                       <td><center><button  className="btn btn-outline-danger" onClick={(e)=>(deleteAdmin(result.id))} disabled>Delete</button></center></td> 
                    )
                    }
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
