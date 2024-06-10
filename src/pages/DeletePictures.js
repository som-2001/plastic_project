import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css'
import { Navbar2 } from "./Navbar2";

export const DeletePictures = () => {
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
  const delete2=(e)=>{
    axios.post("http://localhost:3001/api/delete_pictures",{id:e})
    setResults([...results.filter((value) => value.picture_id !== e)]); //delete the picture id from the result array
  }
  useEffect(() => {
    axios.get("http://localhost:3001/api/read_pictures_v3")
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
          <h2>Delete Pictures</h2>
          <button className="btn btn-warning mb-2 me-2" onClick={(e)=>navigate('/Deleteplastic')}>Plastic</button>
          <button className="btn btn-success mb-2" onClick={(e)=>navigate('/Deletepaper')}>Others</button>
          <table width="80%" border="1" className="table align-middle">
            <thead>
              <tr>
                <th><center><b>Picture ID</b></center></th>
                <th><center><b>Image</b></center></th>
                <th><center><b>Type</b></center></th>
                <th><center><b>Member ID</b></center></th>
                <th><center><b>Longitude</b></center></th>
                <th><center><b>Latitude</b></center></th>
                <th><center><b>Address</b></center></th>
                <th><center><b>Status</b></center></th>
                <th><center><b>Date</b></center></th>
                <th><center><b>verify</b></center></th>
                <th><center><b>Delete</b></center></th>
                
              </tr>
            </thead>
            <tbody>
            {results?(results.map((result, index) => (
                  <tr key={index}>
                    <td><center>{result.picture_id }</center></td>
                    <td><center><img id="pictureId" src={`../images/${result.image_file}`} alt="" style={{width:"150px",height:"150px",cursor:"pointer"}} onClick={()=>{
                     navigate(`/zoom/${result.picture_id}`)
                    }}/></center></td>
                    <td><center>{result.type}</center></td>
                    <td><center>{result.member_id}</center></td>
                    <td><center>{result.longitude}</center></td>
                    <td><center>{result.latitude}</center></td>
                    <td><center>{result.address}</center></td>
                    <td><center>{result.status}</center></td>
                    <td><center>{result.date}</center></td>
                    <td><center>{result.verify}</center></td>
                    <td><center><button onClick={()=>{delete2(result.picture_id)}} className="btn btn-danger">Delete</button></center></td>
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
