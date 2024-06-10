import { React } from "react";
import { Navbar } from "./Navbar.js";
import { Footer } from "./Footer.js";
import { GrLinkTop } from "react-icons/gr";
import "../App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


Axios.defaults.baseURL = 'http://localhost:3001';

export const Home = () => {

  const navigate=useNavigate();
  const [file, setFile] = useState("");
  const [result, setResult] = useState([]);
  const [hide, setHide] = useState(false);
  const [id,setId]=useState(0);
  const [theme,setTheme]=useState(false);
  const [number,setNumber]=useState(12);

  const loadMore=()=>{
    setNumber((prev)=>(prev+12));
  }
  useEffect(() => {
    const handleScroll = () => {
      // Check the scroll position, update hide state accordingly
      if (window.scrollY > 320) {
        setHide(true);
      } else {
        setHide(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run thi

  useEffect(() => {

    Axios.post("/api/getResult").then(res => {
      if(res.data!=='you have to login in first')
      setResult(res.data.reverse());
      else{
        
        navigate('/');
      }
    });
  }, []);
  var latitude;
  var longitude;
  navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  });
  const handleFileChange = (e) => {
    if (e.target.files.length > 0 && longitude && latitude) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append('image', selectedFile);

      Axios.post("/api/saveImage", formData).then(res=>{
        console.log(res.data.insertedId);
        setId(res.data.insertedId);
      })

    } else {
      alert('something went wrong.')
    }
  };
  const Top = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  const darktheme=()=>{
  
    var div = document.getElementById('visiblelog');
    if (div) {
      div.style.boxShadow='0 0 0 0';
    }
    const famoon=document.querySelector('.famoon');
    const color=document.querySelectorAll('p');
    console.log(color);
    for(let i=0;i<3;i++){
     color[i].style.transition='2s ease-in-out';
     color[i].style.color='white';
    }
   
    console.log(color);
    famoon.style.transition='2s ease-in-out'
    famoon.style.transform='translateX(150%)';
    if(!theme){
    document.body.style.transition='2s ease-in-out';
    document.body.style.backgroundColor = "#181a21";
    document.body.style.color='white';
   
    setTheme(!theme);
    }else{
      document.body.style.backgroundColor = "white";
      const color=document.querySelectorAll('p');
      for(let i=0;i<3;i++){
       color[i].style.color='grey';
      }
      const famoon=document.querySelector('.famoon');
      famoon.style.transition='2s ease-in-out'
      famoon.style.transform='translateX(0%)';
     
      document.body.style.color='black';
      setTheme(!theme);
    }
}
  const onclick = async() => {
    const formData = new FormData();
    console.log(id);
    formData.append('image', file);
    formData.append('id',id);
    Axios.post('/api/coins');
    window.location.replace('/success');
    navigate('/success');
   await Axios.post("/api/plastic_insert", formData, {
      params: {
        latitude: latitude,
        longitude: longitude,
      },
    }).then(res=>{
      const newData = {
        image_file: res.data[0].image_file,
        status: res.data[0].status,
        address: res.data[0].address,
        date: res.data[0].date,
      };
  
      // Update the result array by adding the new data at the beginning
      setResult((prevResult) => [newData, ...prevResult]);
      console.log(result);
    })
   
  };

  return (
    <div>

      <>
        <Navbar className="mb-5" />
      </>
      <div className="mt-5" style={{ overflow: "hidden", fontWeight: "100" }}>
      <button className="toggleButton" style={{position:"fixed",right:"10px",top:"10px"}} onClick={(e)=>darktheme()}><span className="mt-1" style={{float:'left',color:'white'}}><img src="../img/moon.png" style={{position:"fixed",top:"1px",right:"52px",width:"70px",height:"70px"}} alt=""/></span><span className="famoon"/><span className="mt-1 me-1" style={{float:"right",color:'black'}}><img src="../img/sun.png" style={{width:"60px",height:"60px",position:"fixed",top:"2px",right:"4px"}} alt=""/></span></button>
        <p className="text-center mt-5 mb-5" style={{ color: "grey", fontWeight: "100", fontSize: "1.8rem" }}>
          Turning Plastic Pollution into Progress!
        </p>
        <div className="row">
          <div class="col-12 col-md-6 col-sm-12 col-lg-7 text-center" >
            <img style={{ width: "70%" }} src="../img/adminIntro.jpg" alt="" />
          </div>
          <div className="col-12 col-md-6 col-sm-12 col-lg-5 text-center">
            <p className="mt-5" style={{ color: "grey", fontWeight: "100", fontSize: "1.2rem" }}>
              Transforming plastic waste into sustainable solutions for a cleaner, greener future.
            </p>

            <div className='mt-2 ' style={{ display: "flex", gap: "5px", justifyContent: "center" }} >
              <input type="file" className="form-control" name='profile' id="inputProfile" onChange={handleFileChange} style={{ maxWidth: "16rem", minWidth: "12rem" }} />
              <button className='btn btn-outline-success' onClick={onclick}>Submit</button>
            </div>

          </div>
        </div>
      </div>
      <center>
        <hr className="text-center" style={{ width: "70%" }} />
      </center>
      <div className="container">
        <div className="text-center mt-5">
          <p style={{ fontSize: "1.5rem", fontWeight: "100", color: "grey" }}>Uploaded Files</p>
        </div>
        <div className="row">
          {result.length!==0 ? result.slice(0, number).map((data, index) => (
            
            <div key={index} className="col-12 col-sm-12 col-md-6 col-lg-4 mb-3" >
              <center>
                <div className="card " style={{ width: "18rem", marginRight: "15px" }}>
                  {data.image_file !== "" ? (
                    <img
                      className="card-img-top"
                      src={`/images/${data.image_file}`}
                      style={{ width: "18rem", height: "20rem" }}
                      alt=""

                    />
                  ) : (
                    <>
                      <h5>No Files Available!</h5>
                    </>
                  )}

                  <div className="card-body">
                    <p className="card-text" style={{ fontWeight: "100", fontSize: "1rem" }}>Status: {data.status}<br />id: {data.picture_id}<br />Catagory: {data.type} <br />Location: {data.address}<br />Uploaded on: {data.date}</p>
                  </div>
                </div>
              </center>
            </div>

            )):(
            <>
            <p className="mt-5 mb-5 text-center" style={{fontWeight:"100",fontSize:"1.5rem"}}>No Files Available!</p>
          </>
          )}
        </div>
        {result.length > number && (
          <div className="text-center mt-2 mb-2">
            <button className="btn btn-outline-primary" onClick={loadMore}>Load More</button>
          </div>
        )}
      </div>

      {hide && <button onClick={Top} id="Top" className="btn btn-warning" ><GrLinkTop /></button>}
      <div>
        <Footer />
      </div>
      </div> 

  )
}