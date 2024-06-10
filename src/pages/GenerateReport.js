import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const GenerateReport = () => {
  
  const [result,setResult]=useState([]);
  const [date,setDate]=useState([]);
  const {picture_id}=useParams();

  const navigate=useNavigate();
  useEffect(()=>{
      axios.post('http://localhost:3001/api/assign').then(res=>{
          if(res.data==='Invalid session data')
          {
              navigate('/');
          }
      })
  },[])
  useEffect(()=>{
  axios.post('http://localhost:3001/getDate',{picture_id:picture_id}).then(res=>{
    setDate(res.data[0]);
  })
  axios.post('http://localhost:3001/getReportDetails',{picture_id:picture_id}).then(res=>{
    console.log(res.data[0]);
    setResult(res.data[0]);
  })

  },[]);


  return (
    <div>
    <div className='m-5 border-1 rounded' style={{overflowX:'hidden',padding:"2% 2% 2% 2%",border:"2px solid rgb(182, 175, 175)"}}>
      <p className='text-center' style={{fontSize:'2.9rem',color:'#634dc7',fontWeight:100}}>Plastic Recycling Report</p>

      <p style={{fontWeight:100,fontSize:"2.5rem",color:'#5945b4'}}>Executive Summary</p>
      <p style={{fontWeight:100,fontSize:"1.2rem",margin:"1% 0% 0% 5%",textAlign: 'justify'}}>
        This comprehensive report outlines the successful efforts and achievements in plastic recycling in West Bengal.
        Leveraging cutting-edge AI technology, we have achieved a remarkable accuracy rate of 95% in identifying plastic waste.
        The report details the collaboration between our AI system, dedicated riders, and concerned citizens in the quest for a greener and more sustainable environment.
      </p>

   
      <p style={{fontWeight:300,fontSize:"2.5rem",color:'#5945b4'}}>Reporting Process</p>
        
      <p style={{fontWeight:300,fontSize:"1.8rem",color:'#6153a0',margin:"1% 0% 0% 3%"}}>User Reporting</p> 
      <p style={{fontWeight:100,fontSize:"1.2rem",margin:"1% 0% 0% 5%",textAlign: 'justify'}}>Users contribute significantly to our initiative by reporting instances of plastic waste through our user-friendly platform. The information they provide includes the location of the waste, a brief description, and an optional image.</p>

      <p style={{fontWeight:300,fontSize:"1.8rem",color:'#6153a0',margin:"1% 0% 0% 3%"}}>AI & Admin Analysis</p>
      <p style={{fontWeight:100,fontSize:"1.2rem",margin:"1% 0% 0% 5%",textAlign: 'justify'}}>Upon receiving user reports, our AI system analyzes the images and other relevant information to determine the nature of the waste. The AI's accuracy ensures reliable identification, distinguishing between recyclable and non-recyclable plastics.</p>  

      <p style={{fontWeight:100,fontSize:"1.8rem",color:'#6153a0',margin:"1% 0% 0% 3%"}}>Rider Verification</p>
      <p style={{fontWeight:100,fontSize:"1.2rem",margin:"1% 0% 0% 5%",textAlign: 'justify'}}>
        Our dedicated team of riders, equipped with smartphones and an unwavering commitment to environmental sustainability,
        actively contributes to the success of our initiative.
        They play a crucial role in the identification process, capturing images of the waste, its surroundings, and collecting geographical coordinates.
      </p>
      <p style={{fontWeight:100,fontSize:"2.5rem",color:'#5945b4'}}>Case Study: Successful Plastic Recycling Operation</p>
      <p style={{fontWeight:100,fontSize:"1.8rem",color:'#6153a0',margin:"1% 0% 0% 3%"}}>Incident Details</p>
      {/* <p>Date:{date.date}</p> */}
     
      <div className='row' style={{margin:"1% 0% 0% 5%"}}>
      <p ><b>Date:</b> {date.date}</p>
      <div className=' col-12 col-sm-12 col-md-6 col-lg-6'>
      <p><b>Longitude & latitude according to User:</b> {date.longitude} {date.latitude}</p>
      <p><b>Location:</b> {date.address}</p>
      
      </div>
      <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
      <p><b>Longitude & latitude according to Rider:</b> {result.rider_longitude} {result.rider_latitude}</p>
      <p><b>Address given by rider:</b> {result.rider_address}</p>
      </div>
      </div>

      <p style={{fontWeight:100,fontSize:"1.8rem",color:'#6153a0',margin:"1% 0% 0% 3%"}}>Rider Information</p>

      <div className='row' style={{margin:"1% 0% 0% 5%"}}>
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 text-center">
        <p><b>Rider Name:</b> {result.rider_name}</p>
        <p><b>Adhar Card Image:</b> </p><img src={`../../img/${result.rider_adhar_card}`} alt='' style={{width:"200px"}}/>
        </div>
        <div className="text-center col-12 col-sm-12 col-md-6 col-lg-6">
        <p><b>Rider phone_no:</b> {result.rider_phn}</p>
        <p><b>Rider Picture:</b> </p> <img src={`../../img/${result.rider_picture}`} alt='' style={{width:"200px"}} />
        </div>
      </div>
      
     
      <p style={{fontWeight:100,fontSize:"1.8rem",color:'#6153a0',margin:"1% 0% 0% 3%"}}>Visual Evidence</p>
      <div className='row' style={{margin:"1% 0% 0% 5%"}}>
       <div className='col-12 col-sm-12 col-md-6 col-lg-6 text-center'>
       <p> <b>Picture taken by Rider:</b></p>
      <img src={`../../img/${result.image_file}`} alt="" style={{width:"200px",height:"200px"}}/>
       </div>
       <div className='text-center col-12 col-sm-12 col-md-6 col-lg-6'>
       <p><b>Garbage Image taken by User:</b></p>
      <img src={`../../images/${result.garbage_picture}`} alt="" style={{width:"200px",height:"200px"}}/>
       </div>
      </div>
    
      <p style={{fontWeight:100,fontSize:"1.8rem",color:'#6153a0',margin:"1% 0% 0% 3%"}}>AI Detection Result</p>
      <div className='row' style={{margin:"1% 0% 0% 5%"}}>
      <div className='text-center col-12 col-sm-12 col-md-6 col-lg-6'>
      <p><b>Identification:</b> Recyclable Plastic</p>
      </div>
      <div className='text-center col-12 col-sm-12 col-md-6 col-lg-6'>
      <p><b>Accuracy:</b> 95%</p>
      </div>
      </div>

      <p style={{fontWeight:100, fontSize:"2.5rem",color:'#5945b4'}}>Conclusion</p>
      <p style={{fontWeight:100,fontSize:"1.2rem",margin:"1% 0% 0% 5%",textAlign: 'justify'}}>
        Our plastic recycling initiative stands as a testament to the power of technology, community engagement, and environmental stewardship.
        The successful collaboration between our AI system, dedicated riders, and proactive citizens marks a significant step towards a sustainable and eco-friendly future for West Bengal.
      </p>

      <p className="text-center mt-2" style={{fontWeight:100,fontSize:"1.2rem"}}>For inquiries or further information, please email us on <b>PlasticWasteManagement@email.com.</b> </p>

     
    </div>
    <center><button id="btn" className='btn btn-outline-warning mb-5 w-24' onClick={(e)=>{
      const btn=document.getElementById('btn');
      btn.style.display='none';
      window.print();
    }}>Print</button></center>
    </div>
  );
};
