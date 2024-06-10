import axios from "axios"
import { useEffect, useState } from "react"
import '../App.css';
import { Navbar2 } from "./Navbar2";
import { useNavigate } from "react-router-dom";
export const AssignRider=()=>{
    
    const[result,setResult]=useState([]);
    const[result1,setResult1]=useState([]);
 
    const navigate=useNavigate();
    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    })
    const handleDropDownChange = (id, e) => {
      
        axios.post('http://localhost:3001/assignRider', {
            rider_id: e.target.value.split(',')[1],
            picture_id: e.target.value.split(',')[0]
          })
        setResult1([...result1.filter((item)=> Number(item.picture_id) !== Number(e.target.value.split(',')[0]))]);  
      };
       
      useEffect(()=>{
        axios.post('http://localhost:3001/api/assign')
         .then(res => setResult(res.data))
         .catch((err)=>console.log("Error Occured!"+ err)); 
   
         axios.post('http://localhost:3001/api/getLocations')
         .then(res => setResult1(res.data))
         .catch((err)=>console.log("Error Occured!"+ err));  
       },[]);
   
    // useEffect(()=>{
        
    //    },[change,setResult1])

    return (
        <div style={{overflow:'hidden'}}>

          <div className="mb-3">
            <Navbar2/>
          </div>
            <p className="text-center pt-5" style={{fontSize:"1.5rem",fontFamily:"cursive"}}>Assign Riders for verification</p>
            <h5 className="m-2">Available Riders in this area</h5>
            {/* divs for Rider */}


            <div style={{display:"flex", overflowX: "scroll",height:"15rem",overfloxY:'none' }}>
            {result &&
              result.map((data, index) => (
                <div key={index} >
                  
                    <div class="card m-2" style={{ width: "15rem" }}>
                      <center><img src={data.picture ? `../img/${data.picture}`: '../img/user.png'} style={{width:"100px",height:"100px"}} class="card-img-top" alt="..." /></center>
                      <div class="card-body" style={{textAlign:"justify"}}>
                        <p class="card-text text-center" >
                          Name: {data.name}<br />
                          pincode: {data.pincode} <br />
                          Phone No.: {data.phn}
                        </p>
                      </div>
                    </div>
              
                </div>
              ))}
            </div>

            
              {/* divs for Locations */}


            <h5 className="m-2">Available locations</h5>
            
            <div className="row">
            {result1 && result1.map((data,index)=>(
              <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-3 mb-3"> 
              <center>
               <div class="card m-2" style={{width:"16rem",marginRight: "15px"}} >
                <center><img src={`../images/${data.image_file}`} style={{width:"250px",height:"250px"}}class="card-img-top" alt="..."/></center>
                <div class="card-body">
                  <p class="card-text text-center">Address:{data.address}<br/>
                  Type:{data.type}<br/>Status: {data.status}</p>
                  
                  <select id={`dropdown_${result1.picture_id}`}  onChange={(e) => handleDropDownChange(result1.picture_id, e)}>
                   
                    <option value="selectRider" selected>Select Rider</option>
                    {result.map((data1, index) => (
                        <option key={index} value={`${data.picture_id},${data1.id}`}>
                        {data1.name}
                        </option>
                    ))}
                    </select>
                </div>
              </div>
              </center>
              </div>
              
            ))}
            </div>
          
        </div>
    )
}