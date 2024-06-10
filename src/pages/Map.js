import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer } from './Footer';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Map = () => {
  const { longitude, latitude, picture_id } = useParams();
  const [profile, setProfile] = useState();
  const [result, setResult] = useState([]);
  const [rider, setRider] = useState(null);
  const [address,setAddress]=useState();
  const navigate=useNavigate();

  useEffect(() => {
    axios.post('http://localhost:3001/taskAssignOne', { picture_id: picture_id }).then(res => {
      if(res.data!=='you have to login first'){
      console.log(res);
      setResult(res.data);
    }else{
      navigate('/');
    }
    });
  }, []);

  useEffect(() => {
    const fetchRiderLocation = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setRider({ lat: position.coords.latitude, lng: position.coords.longitude });
      } catch (error) {
        console.log("Error fetching rider's location", error);
      }
    };

    fetchRiderLocation();
  }, []);

  const riderLocation = rider ? { lat: rider.lat, lng: rider.lng } : null;
  const garbageLocation = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${riderLocation.lat},${riderLocation.lng}&destination=${garbageLocation.lat},${garbageLocation.lng}&travelmode=driving`;
    window.open(googleMapsUrl, '_blank');
  };
  
  const Accept=(e)=>{
    alert(e);
   axios.post('http://localhost:3001/Accept',{picId:e});
   setResult(...[result.filter((item)=>item.verify='Verfied')])
  }
  const Decline=(e)=>{
    axios.post('http://localhost:3001/Decline',{picId:e});
    setResult(...[result.filter((item)=>item.verify='Declined')])
  }
  const handleUpload = async (e) => {
    try {
      const formData = new FormData();
      formData.append('profile', profile);
      formData.append('longitude',rider.lng);
      formData.append('latitude',rider.lat);
      formData.append('Rider_Address',address);
      formData.append('picture_id',e);
      // Send the file to the server
      axios.post('http://localhost:3001/Riderupload', formData);
      
      toast.success("you have uploaded successfully",{
        position:"top-right",
        autoClose:3000,
       });

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='mt-5' style={{ overflowX: "hidden" }}>
     
      <div className="row mt-2 mb-3 me-5" style={{ marginLeft: "5%" }}>
        <ToastContainer/>
        {result && result.map((data, index) => (
          <div className='row' key={index}>
            <div className='col-12 col-sm-12 col-md-5 col-lg-5'>
              <p className='text-center'>Image</p>
             <center><img  src={`../../../images/${data.image_file}`} style={{ width: "150px", height: "150px" }} alt="..." /></center> 
            </div>
            <div className="col-12 col-sm-12 col-md-7 col-lg-7 mb-3">
              <p className='mt-3' style={{ fontSize: "1.2rem" }}>Details</p>
              <div style={{ width: "21rem" }}>
                <div className="card-body">
                  <p className="card-text" style={{ fontWeight: "200" }}>
                 
                    <b>Address:</b> {data.address}<br />
                    <b>Status:</b> {data.verify}<br />
                    <b>Picture Id:</b> {data.picture_id}<br />
                    <b>Reported By:</b> {data.reported_by}<br />
                    <b>Phone no:</b> {data.phone_no}<br />
                    <div className='mt-2'>
                    <p className='mt-2' style={{ fontWeight: 100, fontSize: "1.2rem" }}>Upload the details regarding garbage</p>  
                    <button className='btn btn-outline-dark me-2' onClick={(e)=>Accept(data.picture_id)}>verified</button>
                    <button className='btn btn-outline-danger' onClick={(e)=>Decline(data.picture_id)}>Decline</button>
                    </div>
                    <div className='mt-2' >

                    <input type='text' className='form-control me-2 mb-2' id="inputText" placeholder='Road no.,city,District' style={{ maxWidth:"16rem",minWidth:"12rem"}} onChange={(e)=>setAddress(e.target.value)}/>
                    <input type="file" className="form-control" name='profile' id="inputProfile" onChange={(e) => setProfile(e.target.files[0])} style={{ maxWidth:"16rem",minWidth:"12rem"}}/>
                    <button className='btn btn-outline-success mt-2' onClick={(e)=>handleUpload(picture_id)}>Submit</button>
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <center><hr style={{width:"75%"}}/></center>
      <div className='text-center mt-5 mb-4'>
        <button onClick={openGoogleMaps} className='btn btn-outline-primary'>Open in Google Maps</button>
      </div>
      <div style={{display:"fixed",bottom:"10px"}}>
        <Footer/>
      </div>
    </div>
  );
};
