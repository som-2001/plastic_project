import { useEffect } from "react"
import { Footer } from "./Footer"
import { Navbar2 } from "./Navbar2"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Slider } from "./Slider"
import { Slider1 } from "./Slider1"




export const AdminHome=()=>{

    const navigate=useNavigate();
    useEffect(()=>{
        axios.post('http://localhost:3001/api/assign').then(res=>{
            if(res.data==='Invalid session data')
            {
                navigate('/');
            }
        })
    })
    return(
            <div>
              <Navbar2 />
              <div className="m-5">
                <div className="row text-center mx-auto mt-5">
                  <p style={{ fontWeight: 400, fontSize: '2.5rem' }} className="mt-2 text-center">Admin Home</p>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                   <Slider/>
                  </div>
        
                  <div className="col-12 col-md-12 col-lg-12 mt-lg-4">
                    <div className="mb-4 mt-3">
                      <p style={{ fontSize: '1.2rem', fontWeight: 100 }}>Empower your voice, click your choice! Welcome to the future of democracy – where every click counts. Cast your vote online and let your voice resonate on the front lines of change.</p>
                    </div>
                    <button className="btn btn-outline-primary mb-4 me-2" onClick={(e)=>navigate('/AdminCreate')}>Create Admin</button>
                   
                  </div>
                </div>
              </div>
        
              <div>
                <p className="text-center mb-5" style={{ fontSize: '1.8rem', fontWeight: 400 }}>Voting made simple while still being<br /> fully <span style={{ color: 'rgb(89, 89, 190)' }}>Secure and Reliable</span></p>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <center><img src="../img/admin.png" style={{ width: '380px', height: '330px' }} alt="" className="" /></center>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 p-5">
                  
                    <span style={{ fontSize: '1.8rem', fontWeight: 400 }}>TrustWorthy</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 100 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, error?</p>
                    
                    <span style={{ fontSize: '1.8rem', fontWeight: 400}}>Safe and Secure Voting System</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 100 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, error?</p>
                   
                    <span style={{ fontSize: '1.8rem', fontWeight: 400}}>Result Analysis</span>
                    <p style={{ fontSize: '1.2rem', fontWeight: 100 }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, error?</p>
                    <p style={{ color: 'blue' }}>Learn more </p>
                  </div>
                  <div style={{ marginTop: '6.19%' }}>
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          );
}