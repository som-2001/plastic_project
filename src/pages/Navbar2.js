import { useNavigate } from "react-router-dom"
import '../App.css';

export const Navbar2=()=>{
    let navigate = useNavigate();
    return (
        
    <div>
        
    <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container-fluid">

        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header">
            <p class="offcanvas-title" id="offcanvasDarkNavbarLabel" style={{fontSize:"1.4rem",fontWeight:"100"}}>Pages</p>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            
            <li class="nav-item mb-2">
           
           <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
           onClick={()=>navigate('/adminHome')}><i class="far fa-circle nav-icon me-2"></i>
           Admin Home</p>
           
           </li>

            <li class="nav-item mb-2">
           
            <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
            onClick={()=>navigate('/AdminRegister')}><i class="far fa-circle nav-icon me-2"></i>
            Admin Register</p>
            
            </li>
            
            <li class="nav-item mb-2">

                <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
                onClick={()=>navigate('/pictures')}><i class="far fa-circle nav-icon me-2"></i>
            Pictures</p>
            
            </li>

            <li class="nav-item mb-2">
           
           <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
           onClick={()=>navigate('/mail')}><i class="far fa-circle nav-icon me-2"></i>
           Contact Us</p>
           
           </li>

           <li class="nav-item mb-2">
           
           <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
           onClick={()=>navigate('/RiderReq')}><i class="far fa-circle nav-icon me-2"></i>
           Rider Request</p>
           
           </li>
           
           <li class="nav-item mb-2">
           
           <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
           onClick={()=>window.location.href='http://localhost:3000/AssignRider'}><i class="far fa-circle nav-icon me-2"></i>
           Assign Rider</p>
           
           </li>
          
           <li class="nav-item mb-2">
           
           <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
           onClick={()=>navigate('/TrackRider')}><i class="far fa-circle nav-icon me-2"></i>
           Track Rider</p>
           
           </li>

           <li class="nav-item mb-2">
           
           <p style={{fontSize:"1.2rem",fontWeight:"100",cursor:"pointer"}}
           onClick={()=>window.location.href='http://localhost:3000/ChangePassword'}><i class="far fa-circle nav-icon me-2"></i>
           Change Password</p>
           
           </li>
         </ul>
        </div>
        </div>
    </div>
    </nav>
    </div>
    )
}