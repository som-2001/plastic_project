import Axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Navbar2 } from "./Navbar2";
import axios from "axios";

export const UpdatePaper=()=>{
    const[change,setChange]=useState(false);
    const [results, setResults] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});

    const navigate=useNavigate();

    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    })

    const handleChangeType=(e)=>{

      setResults(results.filter(item=>item.picture_id!==e));
      axios.post('http://localhost:3001/api/updateType',{id:e}).then(res=>{
        alert('success');
      })
      
    }
    
    useEffect(() => {
      Axios.get("http://localhost:3001/api/read_paper_v2")
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
            <h2>Update Pictures</h2>
            <button className="btn btn-warning mb-2 me-2" onClick={(e)=>navigate('/Updateplastic')}>Plastic</button>
          <button className="btn btn-success mb-2" onClick={(e)=>navigate('/Updatepaper')}>Others</button>
            <table width="90%" border="1" className="table align-middle">
              <thead>
                <tr>
                  <th><center><b>Image</b></center></th>
                  <th><center><b>Type</b></center></th>
                  <th><center><b>User ID</b></center></th>
                  <th><center><b>Longitude</b></center></th>
                  <th><center><b>Latitude</b></center></th>
                  <th><center><b>Address</b></center></th>
                  <th><center><b>Date</b></center></th>
                  <th><center><b>Status</b></center></th>
                  <th><center><b>Type Update</b></center></th>
                </tr>
              </thead>
              <tbody>
                {results.length>0 ?(results.map((result, index) => (
                  <tr key={index}>
                  
                    <td><center><img id="pictureId" src={`../images/${result.image_file}`} alt="" style={{width:"150px",height:"150px",cursor:"pointer"}} onClick={()=>{
                     navigate(`/zoom/${result.picture_id}`)
                    }}/></center></td>
                    <td><center>{result.type}</center></td>
                    <td><center>{result.member_id}</center></td>
                    <td><center>{result.longitude}</center></td>
                    <td><center>{result.latitude}</center></td>
                    <td><center>{result.address}</center></td>
                    <td><center>{result.date}</center></td>
                    <td><center>{result.status}</center></td>
                    <td><center><button onClick={(e)=>handleChangeType(result.picture_id)} className="btn btn-success">Change to Plastic</button></center></td>
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
         <Footer/>
        </div>
      </div>
    );
}