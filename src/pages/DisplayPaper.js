import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css'
import { useEffect, useState } from "react";
import { Navbar2 } from "./Navbar2";

export const DisplayPaper=()=>{
    let  navigate = useNavigate();
    const [results, setResults] = useState([]);
    

    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    })
    useEffect(() => {
      axios.get("http://localhost:3001/api/read_paper_all")
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
              <h2>Pictures</h2>
              <button className="btn btn-warning mb-2 me-2" onClick={(e)=>navigate('/plastic')}>Plastic</button>
              <button className="btn btn-success mb-2" onClick={(e)=>navigate('/paper')}>Others</button>
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
                    <td><center><b>verify</b></center></td>
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
}