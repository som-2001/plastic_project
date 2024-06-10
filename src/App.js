import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import './App.css';
import {Homepage} from "./pages/Homepage.js";
import {Home} from "./pages/Home.js";
import { CaptureImage } from "./pages/captureImage.js";
import {Success} from "./pages/Success.js";
import {Mail} from "./pages/Mail.js";
import {AdminHome} from "./pages/AdminHome.js";
import {DryWasteLocation} from "./pages/DryWasteLocation.js"
import {Pictures} from "./pages/Pictures.js"
import {Reports} from "./pages/Reports.js"
import {AdminRegister} from "./pages/AdminRegister.js"
import { DisplayPictures } from "./pages/DisplayPictures.js";
import { DecodeLocation } from "./pages/DecodeLocation.js";
import {Map} from "./pages/Map.js";
import {Zoom} from "./pages/Zoom.js";
import {UpdatePictures} from "./pages/UpdatePictures.js"
import { DisplayPlastic } from "./pages/DisplayPlastic.js";
import { DisplayPaper } from "./pages/DisplayPaper.js";
import { UpdatePlastic } from "./pages/UpdatePlastic.js";
import { UpdatePaper } from "./pages/UpdatePaper.js";
import {DeletePictures} from "./pages/DeletePictures.js"
import {Deleteplastic} from "./pages/Deleteplastic.js"
import {Deletepaper} from "./pages/Deletepaper.js"
import {RiderReq} from "./pages/RiderReq.js"
import {RegisterRider} from "./pages/RegisterRider.js";
import {AssignRider} from "./pages/AssignRider.js";
import {Riderlogin} from "./pages/Riderlogin.js";
import {RiderHome} from "./pages/RiderHome.js";
import {TrackRider} from "./pages/TrackRider.js";
import {GenerateReport} from "./pages/GenerateReport.js"
import { ReportMail } from "./pages/ReportMail.js";
import {AdminCreate} from "./pages/AdminCreate.js";
import {AdminDisplay} from "./pages/AdminDisplay.js";
import {AdminDelete} from "./pages/AdminDelete.js";
import { Register } from "./pages/Register.js";
import {ChangePassword} from "./pages/ChangePassword.js";
import {OTP} from "./pages/OTP.js";
import {RecoverPassword}from './pages/RecoverPassword.js'
function App() {
  return (
   <>
    <Router>
     <Routes>
     <Route path="/mail" element={<Mail/>} />
     <Route path="/success" element={<Success/>} />
     <Route path="/capture" element={<CaptureImage/>} />
     <Route path="/" element={<Homepage/>}/>
     <Route path="/home" element={<Home/>}/>
     <Route path="/adminHome" element={<AdminHome/>}/>
     <Route path="/map/:longitude/:latitude/:picture_id" element={<Map />}/>
     <Route path="/DryWasteLocation" element={<DryWasteLocation />}/>
     <Route path="/Pictures" element={<Pictures />}/>
     <Route path="/Reports" element={<Reports />}/>
     <Route path="/AdminRegister" element={<AdminRegister />}/>
     <Route path="/DisplayPictures" element={<DisplayPictures/>}/>
     <Route path="/DecodeLocation" element={<DecodeLocation/>}/>
     <Route path="/Zoom/:picture_id" element={<Zoom/>}/>
     <Route path="/UpdatePictures" element={<UpdatePictures/>}/>
     <Route path="/Plastic" element={<DisplayPlastic/>}/>
     <Route path="/Paper" element={<DisplayPaper/>}/>
     <Route path="/updatePlastic" element={<UpdatePlastic/>}/>
     <Route path="/updatePaper" element={<UpdatePaper/>}/>
     <Route path="/DeletePictures" element={<DeletePictures/>}/>
     <Route path="/Deleteplastic" element={<Deleteplastic/>}/>
     <Route path="/DeletePaper" element={<Deletepaper/>}/>
     <Route path="/RiderReq" element={<RiderReq/>} />
     <Route path="/registerRider" element={<RegisterRider/>}/>
     <Route path="/AssignRider" element={<AssignRider/>}/>
     <Route path="/Riderlogin" element={<Riderlogin/>}/>
     <Route path="/RiderHome" element={<RiderHome/>}/>
     <Route path="/TrackRider" element={<TrackRider/>}/>
     <Route path="/AdminCreate" element={<AdminCreate/>}/>
     <Route path="/AdminDisplay" element={<AdminDisplay/>}/>
     <Route path="/AdminDelete" element={<AdminDelete/>}/>
     <Route path="/GenerateReport/:picture_id" element={<GenerateReport/>} />
     <Route path="/reportMail/:picture_id" element={<ReportMail/>} />
     <Route path="/Register" element={<Register/>} />
     <Route path="/ChangePassword" element={<ChangePassword/>} />
     <Route path="/OTP" element={<OTP/>} />
     <Route path="/RecoverPassword" element={<RecoverPassword/>} />
    </Routes>
    </Router>
   </>
  );
}

export default App;
