import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import axios from "axios";

export const Zoom = () => {
  const { picture_id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const [type, setType] = useState(null);

  const navigate=useNavigate();
  useEffect(()=>{
      axios.post('http://localhost:3001/api/assign').then(res=>{
          if(res.data==='Invalid session data')
          {
              navigate('/');
          }
      })
  })
  useEffect(() => {
    Axios.post('http://localhost:3001/api/read_one_pictures', { picture_id })
      .then((res) => {
        setImageFile(res.data.image_file);
        setType(res.data.type);
      });
  }, [picture_id]);

  return (
    <div>
     <center>
     {imageFile && <img src={`../images/${imageFile}`} alt="" style={{ width: "500px", height: "500px" }} />}
     {type && <h1>Catagory: {type}</h1>}
    </center> 
    </div>
  );
};
