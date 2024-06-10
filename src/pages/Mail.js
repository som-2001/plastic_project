
import Axios from "axios";
import {Footer} from './Footer.js';
import { useState } from "react";
import {useNavigate } from "react-router-dom";


Axios.defaults.baseURL='http://localhost:3001';
Axios.get.defaults=true;

export const Mail=()=>{
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [comment,setComment]=useState('');

    const navigate=useNavigate();

    const send=()=>{
        Axios.post("/api/sendMail",{name:name,email:email,comment:comment});
        navigate("/home");
     
    }
   return(
    <div>
    <header class="header-area">
        
    <div class="main-header-area">
        <div class="classy-nav-container breakpoint-off">
            <div class="container">
               
                <nav class="classy-navbar justify-content-between" id="akameNav">

                   
                    <div class="classy-navbar-toggler">
                        <span class="navbarToggler"><span></span><span></span><span></span></span>
                    </div>

                   
                    <div class="classy-menu">
                        
                        <div class="classycloseIcon">
                            <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                        </div>
                   
                        <div class="classynav">
  
                        </div>
                        
                    </div>
                </nav>
            </div>
        </div>
    </div>
</header>

<section class="akame-contact-area bg-gray section-padding-80" style={{paddingBottom:"2rem"}} className="mt-4">
    <div class="container">
        <div class="row">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4372.943757831281!2d87.0357068738122!3d23.247593249943982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7af376000eb9f%3A0xb807e0906c513511!2sKatjuridanga%2C%20Bankura%2C%20West%20Bengal%20722101!5e0!3m2!1sen!2sin!4v1701506015505!5m2!1sen!2sin" width="600" height="450"  title="Maps" style={{border:"0",paddingBottom:"20px",borderShadow:"12px 4px 2px 4px"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div class="col-12">
                <div class="section-heading text-center">
                    <h2>Leave message</h2>
                    <p>Our staff will call back later and answer your questions.</p>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                
                <form action="#" method="post" class="akame-contact-form border-0 p-0">
                    <div class="row">
                        <div class="col-lg-6" style={{paddingBottom:"5px"}}>
                            <input type="text" name="message-name" class="form-control mb-30"  placeholder="Your Name" onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div class="col-lg-6" style={{paddingBottom:"5px"}}>
                            <input type="email" name="message-email" class="form-control mb-30" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div class="col-12" style={{paddingBottom:"20px"}}>
                            <textarea name="message" class="form-control mb-30" placeholder="Your Message..." onChange={(e)=>setComment(e.target.value)}></textarea>
                        </div>
                        <div class="col-12 text-center">
                            <button type="submit" class="btn btn-success" style={{margin:"12px"}} onClick={send}>Post Comment</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

  <Footer />
</div>
   )
}
