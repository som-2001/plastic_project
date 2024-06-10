import {Login} from './Login.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminLogin } from './AdminLogin.js';
import { useEffect, useState } from 'react';

export const Homepage=()=>{

  const [theme,setTheme]=useState(false);
  useEffect(() => {
    const updateIds = () => {
      const row = document.querySelectorAll('.row');
      const postThumbnail = document.querySelector('.post-thumbnail');
      const postThumbnail1 = document.querySelector('.post-thumbnail1');
      const postThumbnail2 = document.querySelector('.post-thumbnail2');
      const postThumbnail3 = document.querySelector('.post-thumbnail3');
      const postThumbnail4 = document.querySelector('.post-thumbnail4');
      const postThumbnail5 = document.querySelector('.post-thumbnail5');
      const postThumbnail6 = document.querySelector('.post-thumbnail6');
      const postThumbnail7 = document.querySelector('.post-thumbnail7');
      const postThumbnail8 = document.querySelector('.post-thumbnail8');

      if (window.scrollY >= 250) {
        row.id = 'form-visible';
        postThumbnail.id =  'form-right1';
        postThumbnail1.id = 'form-right2';
        postThumbnail2.id = 'form-right3';
        postThumbnail3.id = 'form-right4';
        postThumbnail4.id = 'form-right5';
        postThumbnail5.id = 'form-right6';
        postThumbnail6.id = 'form-right7';
        postThumbnail7.id = 'form-right8';
        postThumbnail8.id = 'form-right9';
      
      } else {
        row.id = '';
        postThumbnail.id = '';
        postThumbnail1.id = '';
        postThumbnail2.id = '';
        postThumbnail3.id = '';
        postThumbnail4.id = '';
        postThumbnail5.id = '';
        postThumbnail6.id = '';
        postThumbnail7.id = '';
        postThumbnail8.id = '';
       
      }
    };

    // Call updateIds initially
    updateIds();

    window.addEventListener('scroll', updateIds);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', updateIds);
    };
  }, []); 
  
  const darktheme=()=>{
    const FaEyeSlash=document.getElementById('FaEyeSlash');
    const FaEye=document.getElementById('FaEye');    
    const border=document.getElementById('border');
    if(!theme){
   
    document.body.style.backgroundColor = "#181a21";
    document.body.style.color='white';
    if(FaEyeSlash !==null)
    FaEyeSlash.style.color='blue';
    if(FaEye!==null)
    FaEye.style.color='blue';
    
    border.style.border='1px solid white';
    setTheme(!theme);
    }else{
      document.body.style.backgroundColor = "white";
      if(FaEyeSlash !==null)
      FaEyeSlash.style.color='blue';
      if(FaEye!==null)
      FaEye.style.color='blue';
      document.body.style.color='black';

      border.style.border='1px solid black';
      setTheme(!theme);
    }
}
  useEffect(() => {
    const updateIds = () => {
      
      const rider=document.querySelector('.rider');

      if (window.scrollY >= 700) {
     
        rider.id='rider-show'
      } else {
       
        rider.id='';
      }
    };

    // Call updateIds initially
    updateIds();

    window.addEventListener('scroll', updateIds);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', updateIds);
    };
  }, []); 





const navigate=useNavigate();

return (
<div style={{overflowX:'hidden'}}>
<div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/" style={{ position: "relative", top: "-18px" }}>
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-3 mb-lg-3" style={{ gap: "5px" }} id="buttons">
                <li className="nav-item" style={{fontWeight:"100",border:'none',background:"none"}}>
                  <Login />
                </li>
                <li className="nav-item  mt-md-2 me-md-1" style={{color:'white',textDecoration:"none",cursor:"pointer",paddingLeft:"10px",fontWeight:"100"}}
                onClick={() => navigate('/Register')}>
                Register
                </li>
            
						    <li className="nav-item mt-1 mt-md-2 me-md-1" style={{color:'white',textDecoration:"none",cursor:"pointer",paddingLeft:"10px",fontWeight:"100"}}
                onClick={() => navigate('/mail')}>
                Contact Us
                </li>
                
                <li className='nav-item'>
                 <AdminLogin />
                
                </li>
              </ul>
          </div>
          </div>
        </nav>
      </div>
      
     
<div class="container mt-2" style={{}}>
    <div class="jumbotron">
        <p className='text-center' style={{fontWeight:"100",fontSize:"1.8rem"}}>Welcome to Plastic Waste Management</p>
        
       
        <div class="slides" style={{borderRadius:"10px"}} >
            <div class="slide" style={{display:"flex"}}>
              <img src="../img/bg-img/banner.jpg" alt="Slide 1" id='image1'/>
              <img src="../img/bg-img/banner2.jpg" alt="Slide 1" id='image2'/>
              <img src="../img/bg-img/banner.jpg" alt="Slide 1" id='image3' style={{width:"100%"}}/>
            </div>
        </div>
     
    </div>
     
    <div class="container">
        <div class="border-top mt-3 mb-3"></div>
    </div>
    <div className='row'>
    <div className='row col-12 col-sm-12 col-md-6 col-lg-6'> 
    <iframe style={{borderRadius:"10px"}} width="560" height="315" src="https://www.youtube.com/embed/WsSJvfpehAk?si=oazf_1IxDDtkv6s_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
    <div className='row col-12 col-sm-12 col-md-6 col-lg-6 text-center mt-5'>
      <p style={{fontWeight:100,fontSize:"1.2rem",textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, tenetur omnis. Eum, amet sunt recusandae reiciendis maiores unde illum vero sit nisi fugit?Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, tenetur omnis. Eum, amet sunt recusandae reiciendis maiores unde illum vero sit nisi fugit
      </p>
    </div>
    </div>
    <div class="row" style={{textDecoration:"none"}}>
        
        <div class="col-md-12" >
          <ToastContainer/>
            <p className='text-center mt-5' style={{fontWeight:"100",fontSize:"1.4rem"}}>Some points about plastic waste management</p>
            <ul style={{fontSize:"1.2rem",fontWeight:"100",textAlign:"justify"}}>
                <li>we believe that change starts with individual actions that ripple into collective impact.  Thank you for join with us and creating a world where plastic waste is minimized, and our planet thrives.</li>
                <li>Discover local happenings, from neighborhood clean-ups to cultural festivals, and create a sense of togetherness.</li>
                <li>Empowering local communities through education programs on proper waste disposal and organizing clean-up initiatives fosters a sense of responsibility and encourages sustainable practices.</li>
                <li>Effective plastic waste management is crucial for environmental sustainability. Implementing recycling programs, promoting reusable alternatives, and raising awareness about responsible disposal are essential components. Governments, industries, and individuals must collaborate to reduce plastic pollution, protect ecosystems, and create a more sustainable future for the planet.</li>
            </ul>
        </div>
    </div>
     
    <section class="akame-blog-area section-padding-80-0 clearfix">
    
        <div class=" container">
            <div class="row">
              
                <div class="col-12">
                    <div class="section-heading text-center">
                                               
                    </div>
                </div>
            </div>

            <div className='post-thumbnail107' style={{margin:"20px"}}> {/* id='form-visible' */}

            <div>
            <div class="slides1" >
            <div id="slideeer" style={{gap:'15px'}}>
                <div class="post-thumbnail100 col-12 col-md-6 col-lg-4 "  >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="200ms">
                    
                        <div class="post-thumbnail" >{/*id='form-right1'*/}
                       
                            <a href="single-blog.html"><img src="img/bg-img/1.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            <p>Reducing plastic waste is not just a choice; it's a responsibility we owe to our planet. Let's strive for a future where our actions speak louder than the disposable conveniences of today, creating a world where plastic pollution becomes a thing of the past.</p>
                        </div>
                    </div>
                </div>

                <div class="post-thumbnail101 col-12 col-md-6 col-lg-4 "  >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="400ms">
                        <div class="post-thumbnail1"> {/* id='form-visible' */}
                            <a href="single-blog.html"><img src="img/bg-img/2.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            
                            <p>Every plastic bottle saved is a step towards a cleaner Earth. Together, let's rewrite the narrative of sustainability and make a lasting impact on our environment. Small choices today can create a big, plastic-free tomorrow.</p>
                        </div>
                    </div>
                </div>

                <div class="post-thumbnail102 col-12 col-md-6 col-lg-4 " >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="600ms">
                        <div class="post-thumbnail2" >{/*id='form-right3' */}
                            <a href="single-blog.html"><img src="img/bg-img/3.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            
                            <p>Plastic-free living is not a trend; it's a commitment to preserving our planet. Embrace the power of sustainable choices, and let's weave a future where the only thing plastic touches is history.</p>
                        </div>
                    </div>
                </div>
                <div class="post-thumbnail103 col-12 col-md-6 col-lg-4 " >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="600ms">
                        <div class="post-thumbnail3" >{/*id='form-right3' */}
                            <a href="single-blog.html"><img src="img/bg-img/3.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            
                            <p>Plastic-free living is not a trend; it's a commitment to preserving our planet. Embrace the power of sustainable choices, and let's weave a future where the only thing plastic touches is history.</p>
                        </div>
                    </div>
                </div>
                <div class="post-thumbnail104 col-12 col-md-6 col-lg-4 ">
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="600ms">
                        <div class="post-thumbnail4" >{/*id='form-right3' */}
                            <a href="single-blog.html"><img src="img/bg-img/3.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            
                            <p>Plastic-free living is not a trend; it's a commitment to preserving our planet. Embrace the power of sustainable choices, and let's weave a future where the only thing plastic touches is history.</p>
                        </div>
                    </div>
                </div>
                <div class="post-thumbnail105 col-12 col-md-6 col-lg-4 " >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="600ms">
                        <div class="post-thumbnail5" >{/*id='form-right3' */}
                            <a href="single-blog.html"><img src="img/bg-img/3.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            
                            <p>Plastic-free living is not a trend; it's a commitment to preserving our planet. Embrace the power of sustainable choices, and let's weave a future where the only thing plastic touches is history.</p>
                        </div>
                    </div>
                </div>
                  <div class="post-thumbnail100 col-12 col-md-6 col-lg-4 "  >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="200ms">
                    
                        <div class="post-thumbnail6" >{/*id='form-right1'*/}
                       
                            <a href="single-blog.html"><img src="img/bg-img/1.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            <p>Reducing plastic waste is not just a choice; it's a responsibility we owe to our planet. Let's strive for a future where our actions speak louder than the disposable conveniences of today, creating a world where plastic pollution becomes a thing of the past.</p>
                        </div>
                    </div>
                </div>

                <div class="post-thumbnail101 col-12 col-md-6 col-lg-4 "  >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="400ms">
                        <div class="post-thumbnail7"> {/* id='form-visible' */}
                            <a href="single-blog.html"><img src="img/bg-img/2.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            
                            <p>Every plastic bottle saved is a step towards a cleaner Earth. Together, let's rewrite the narrative of sustainability and make a lasting impact on our environment. Small choices today can create a big, plastic-free tomorrow.</p>
                        </div>
                    </div>
                </div>

                <div class="post-thumbnail102 col-12 col-md-6 col-lg-4 " >
                    <div class="single-post-area mb-80 wow fadeInUp" data-wow-delay="600ms">
                        <div class="post-thumbnail8" >{/*id='form-right3' */}
                            <a href="single-blog.html"><img src="img/bg-img/3.jpg" style={{width:"100%"}} alt=""/></a>
                        </div>
                        <div class="post-content" style={{fontWeight:"100",textAlign:"justify"}}>
                            
                            <p>Plastic-free living is not a trend; it's a commitment to preserving our planet. Embrace the power of sustainable choices, and let's weave a future where the only thing plastic touches is history.</p>
                        </div>
                    </div>
                </div>



              </div>
            </div>
            </div>  
            </div>
           
        </div>
        
    </section>
  
    <div className='row'>
       <div className=' col-12 col-sm-12 col-md-6 col-lg-6'  >
         <img src='../img/rider.png' alt='' class='rider' />
       </div>
       <div className='col-12 col-sm-12 col-md-6 col-lg-6'>
        <h2 style={{color:"purple",fontFamily:"cursive"}}>
          <center><span>
          <img src="../img/introPic.jpg"    alt=''/>
          </span></center><br/> 
          <center ><span className='text-center mb-2' ><img onClick={()=>{navigate('/registerRider')}} src='../img/registerNow.png' style={{width:"300px",height:"140px",cursor:"pointer"}} alt=''/></span></center>
        </h2>
        <center><p style={{fontWeight:"100"}}>Already Registered? sign in <span onClick={()=>{navigate('/Riderlogin')}}style={{textDecoration:"underline",cursor:"pointer"}}>here</span></p></center>
        <center>
    
        </center>
       </div>
    </div>
    <div class="row text-center mt-4">
        <p style={{fontSize:"1.2rem",fontWeight:"100"}}>You can also be a part of this plastic free community</p>
    </div>
</div>
<footer class="bg-dark text-light py-5">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h5>Contact Us</h5>
        <p>Email: PlasticWasteManagement@email.com</p>
        <p>Phone: +(91) 23456-7890</p>
      </div>
      <div class="col-md-6">
        <h5>Follow Us</h5>
        <ul class="list-unstyled">
          <li style={{textDecoration:"none"}}>Facebook</li>
          <li>Twitter</li>
          <li>Instagram</li>
        </ul>
      </div>
    </div>
  </div>
</footer>
</div>

)

}