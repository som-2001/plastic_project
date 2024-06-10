const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
const mysql=require('mysql');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const multer=require('multer');
const nodemailer=require('nodemailer');
const path = require('path');
const util = require('util');
const Axios=require("axios");
const execAsync = util.promisify(require('child_process').exec);

const storage=multer.diskStorage({

  destination:(req,file,cb)=>{
      cb(null,'../public/images');
  },
  filename:(req,file,cb)=>{
      cb(null,`${Date.now()}_${file.originalname}`)
  }

})

const upload=multer({storage});

const storage1=multer.diskStorage({

  destination:(req,file,cb)=>{
      cb(null,'C:/Users/somgo/Downloads/plastic_frontend_project/user_frontend/plastic/public/images2');
  },
  filename:(req,file,cb)=>{
      cb(null,'testImage' + path.extname(file.originalname))
  }

})
const upload1=multer({storage:storage1});

//

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/somgo/Downloads/plastic_frontend_project/user_frontend/plastic/public/img');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload2 = multer({ storage: storage2 });

const storage3 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Users/somgo/Downloads/plastic_frontend_project/user_frontend/plastic/public/img');
  },
  filename: (req, file, cb) => {
    cb(null, 'Report'+path.extname(file.originalname));
  }
});

const upload3 = multer({ storage: storage3 });

app.use(bodyParser.json());

app.use(cors({
  origin:'http://localhost:3000',
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {        
    user: 'somgorai726@gmail.com',
    pass: 'edxt wzxt zbdx tjne',
  },
});

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"plastic",
}); 


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({ 
    
    key:"userId",
    secret: "someswar@20000001111", // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires:1000*60*60*24,
    },
  }));

  app.post('/RegisterRider', upload2.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'adharcard', maxCount: 1 },
  ]), (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const pincode = req.body.pincode;
    const profile = req.files['profile'][0].filename;
    const adharcard = req.files['adharcard'][0].filename;
    const password = req.body.password;
    const age = req.body.age;
    const phn = req.body.phone;
  
    const sql1=`select * from riderreg where email='${email}'`;

    db.query(sql1,(err1,result1)=>{
      if(result1.length===0){
      const sql = `INSERT INTO riderreq (name, email, address, pincode, adharcard, picture, password, age, phn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
      db.query(sql, [name, email, address, pincode, adharcard, profile, password, age, phn], (err, result) => {
        if (!err) {
          console.log(result);
          res.send('Successfully registered');
        } else {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      });
      }else{
        res.send('Invalid Credentials');
      }
    })
  
  });
app.post("/LoginRider",(req,res)=>{

  const email=req.body.email;
  const password=req.body.password;
  console.log(email);
  console.log(password);
  var sql=`SELECT * FROM riderreg WHERE email='${email}' AND password='${password}'`;
  db.query(sql,(err,results)=>
  {if(!err){
    if(results.length>0)
    {
      req.session.rider=results[0].id; 
      console.log("login success");
      res.json("Successfully Logged In");  
    }else{
      console.log("Invalid Username or Password")
      res.json("Invalid Username or Password")
    }
  }
  else{
    console.log(err);
    res.status(400).send("Error in Sending data to the database");
  }
  })
})
app.post('/api/coins',(req,res)=>{

  if(req.session.user){
      var sql=`select * from member where member_id='${req.session.user}'`;
      
      db.query(sql,(err,result)=>{
      
      var sql2=`update member set total_coins='${result[0].total_coins+5}' where member_id= ${req.session.user}`;
      db.query(sql2,(err1,result2)=>{
        res.send('success');
      })
      })
    }else{
      res.send('you have to login in first');
    }
})
app.get('/member',(req,res)=>{
  if(req.session.user){
  var sql=`select * from member where member_id = ${req.session.user}`;
  db.query(sql,(err,result)=>{
    res.send(result);
  })
}else{ 
  res.send('you have to login')
}
})
app.post('/taskAssign',(req,res)=>{

  if(req.session.rider){
  var sql=`select *from taskassign where user_id='${req.session.rider}'`
  console.log(req.session.rider);
  db.query(sql,(err,result)=>{
    console.log(result);
    res.send(result);
  })
}else{
  res.send('you have to login first')
}
})

app.post('/taskAssign1',(req,res)=>{

  var sql=`select *from riderverify`
  console.log(req.session.rider);
  db.query(sql,(err,result)=>{
    console.log(result);
    res.send(result);
  })
})

app.post('/Accept',(req,res)=>{

  const picId=req.body.picId;
  var sql=`update pictures set verify='VERIFIED' where picture_id=${picId}`;
 
  db.query(sql,(err,result)=>{

    var sql2=`insert into riderverify(picture_id,verify,rider_id) values('${picId}','VERIFIED','${req.session.rider}')`;
    db.query(sql2,(err1,result1)=>{})
    var sql3=`update taskassign set verify='VERIFIED' where picture_id=${picId}`;
    db.query(sql3,(err,result)=>{});
  })
})
app.post('/verifiedPics',(req,res)=>{
 if (req.session.admin && req.session.admin.length > 0) {
   
    const lowerLimit = req.session.admin[0].pincode - 4;
    const upperLimit = req.session.admin[0].pincode + 4;
   
    var sql = `SELECT * FROM riderverify WHERE pincode BETWEEN ${lowerLimit} AND ${upperLimit} AND  verify='VERIFIED'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        
        res.send(result);
      }
    });
  } else {
    res.status(400).send("Invalid session data");
  }
})

app.post('/Riderupload',upload2.single('profile'), (req, res) => {

  const longitude=req.body.longitude;
  const latitude=req.body.latitude;
  const address=req.body.Rider_Address;
  const profile=req.file.filename;
  const picture_id=req.body.picture_id;
  
  var sql=`select * from pictures where picture_id='${picture_id}'`;
  db.query(sql,(err,result)=>{
   
    var sql2=`select * from riderreg where id='${req.session.rider}'`;
    db.query(sql2,(err1,result1)=>{
      var sql1=`update riderverify set  image_file='${profile}',address='${result[0].address}',garbage_picture='${result[0].image_file}',garbage_latitude='${result[0].latitude}',garbage_longitude='${result[0].longitude}',rider_longitude='${longitude}',rider_latitude='${latitude}',rider_name='${result1[0].name}',rider_picture='${result1[0].picture}',rider_phn='${result1[0].phn}',rider_adhar_card='${result1[0].adharcard}',rider_address='${address}',pincode='${result[0].pincode}' where rider_id='${req.session.rider}'`;

      db.query(sql1,(err2,result2)=>{
        if(!err2)
        console.log('successfully inserted');
        else{
          console.error(err2);
        }
      })
    })
   

  })
  
})
app.post('/Decline',(req,res)=>{

  const picId=req.body.picId;
  var sql=`update pictures set verify='Declined' where picture_id=${picId}`;
  db.query(sql,(err,result)=>{})
  var sql1=`delete from riderverify where picture_id=${picId}`;
  db.query(sql1,(err,result)=>{})
  var sql2=`update taskassign set verify='Declined' where picture_id=${picId}`;
  db.query(sql2,(err,result)=>{});
})
app.post('/taskAssignOne',(req,res)=>{

  if(req.session.rider){
  const picture_id=req.body.picture_id;

  var sql=`select *from taskassign where picture_id='${picture_id}'`
 
  db.query(sql,(err,result)=>{
    console.log(result);
    res.send(result);
  })
}else{
  res.send("you have to login first");
}
})
 app.post("/api/sendMail",(req,res)=>{
   
  const name=req.body.name;
  const email=req.body.email;
  const comment=req.body.comment;

  const mailOptions = {
    from: 'somgorai726@gmail.com',
    to: 'sukanyasett2018@gmail.com',
    subject:`${name}`,
    text: `${email}`,
    html: `${comment}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})


app.post("/api/login", (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    const sql = `SELECT * FROM member WHERE email = '${email}' AND password ='${password}'`;
    db.query(sql, (err, result) => {
       
        if (err) {
            return res.status(500).json({ message: "Error in the database query" });
        }

        if (result.length > 0) { 
          
     
          req.session.user=result[0].member_id;
          return res.json({ message: "successfull",res:req.session.user });    
        } else {
            return res.json({ message: "You are not a registered member.First register yourself" });
        }
    });
});
app.post("/api/assign", (req, res) => {
  if (req.session.admin && req.session.admin.length > 0) {
    console.log(req.session.admin[0].pincode);

    const lowerLimit = req.session.admin[0].pincode - 4;
    const upperLimit = req.session.admin[0].pincode + 4;
    console.log(lowerLimit+" "+upperLimit);
    var sql = `SELECT * FROM riderreg WHERE pincode BETWEEN ${lowerLimit} AND ${upperLimit}`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        
        res.send(result);
      }
    });
  } else {
    res.send("Invalid session data");
  }
});
app.post("/assignRider", (req, res) => {
  const picture_id = req.body.picture_id;
  const rider_id = req.body.rider_id;
  
  console.log(picture_id);
  console.log(rider_id);
  // Update picture status to 'investigating'
  const updateStatusQuery = `UPDATE pictures SET status='investigating' WHERE picture_id=${picture_id}`;
  db.query(updateStatusQuery, (err, updateResult) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }

    // Fetch picture details
    const selectPictureQuery = `SELECT * FROM pictures WHERE picture_id=${picture_id}`;
    db.query(selectPictureQuery, (err, pictureResult) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      // Fetch member details
      const selectMemberQuery = `SELECT * FROM member WHERE member_id='${pictureResult[0].member_id}'`;
      db.query(selectMemberQuery, (err, memberResult) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }

        // Insert task assignment
        const insertTaskQuery = `
          INSERT INTO taskassign (
            user_id, picture_id, longitude, latitude, image_file, type, address, pincode,
            status, verify, reported_by, phone_no
          ) VALUES (
            '${rider_id}', '${picture_id}', '${pictureResult[0].longitude}', '${pictureResult[0].latitude}',
            '${pictureResult[0].image_file}', '${pictureResult[0].type}', '${pictureResult[0].address}',
            '${pictureResult[0].pincode}', 'investigating', '${pictureResult[0].verify}',
            '${memberResult[0].name}', '${memberResult[0].phone}'
          )`;

        db.query(insertTaskQuery, (err, insertResult) => {
          if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
          }

          console.log("Task assigned successfully");
          res.status(200).send('Task assigned successfully');
        });
      });
    });
  });
});

app.post("/api/getLocations", (req, res) => {  
  if (req.session.admin && req.session.admin.length > 0) {
    console.log(req.session.admin[0].pincode);

    const lowerLimit = req.session.admin[0].pincode - 4;
    const upperLimit = req.session.admin[0].pincode + 4;
    
    var sql = `SELECT * FROM pictures WHERE pincode BETWEEN ${lowerLimit} AND ${upperLimit} AND status='pending' AND type='Plastic'`;

    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      } else {
        
        res.send(result);
      }
    });
  } else {
    res.status(400).send("Invalid session data");
  }
});

app.post("/api/adminLogin", (req, res) => {
    
  const email = req.body.email;
  const password = req.body.password;
  
  const sql = `SELECT * FROM admin WHERE adminemail = '${email}' AND password ='${password}'`;
  db.query(sql, (err, result) => {
     
      if (err) {
          return res.status(500).json({ message: "Error in the database query" });
      }

      if (result.length > 0) {
            
        req.session.admin=result;
        return res.json({ message: "Admin Logged In" });
      } else {
          return res.json({ message: "Your credentials are incorrect" });
      }
  });
});
app.post('/api/read_dry_waste_location', (req,res)=> {
	

  var ret_val = {};
  try
  {
      
      var sql = `Select * from dry_waste_location`;

      db.query(sql, function (err, result, fields) {
          if (err) throw err;
          console.log("Records fetched");
          return res.status(200).send(result);
      });
  
  }
  catch ( error )
  {
          console.log(error);
          ret_val.code="0";
          ret_val.message="ERROR. No records fetched";
          return res.status(500).send(ret_val);
  }	

});
app.post("/api/insert",(req,res)=>{
   
    const email=req.body.email
    const password=req.body.password
    const name=req.body.name;
    const phone=req.body.phone;

    const sql=`SELECT member_id From member where email='${email}'`;
    
    db.query(sql,(err,result)=>{

      if(result.length>0)
      {
        return res.send("Already registered member");
      }else{
        
        const sql9=`INSERT INTO member (email,password,name,phone) VALUES('${email}','${password}','${name}','${phone}')`;
        
        db.query(sql9,(err,result)=>{
       
        if(err)
        {
          return res.send({message:"error"});
        }else{
          return res.send("successfull")
        }

        })
      }
    })
    
})
app.post("/api/saveImage", upload.single('image'), (req, res) => {
  if(req.session.user){
  const image = req.file;  // Use req.file instead of req.body.image
  var sql = `INSERT INTO pictures (image_file) VALUES ('${image.filename}')`;
  
  db.query(sql, (error, result) => {
    if (error) {
      console.error('Error inserting record:', error);
      res.status(500).json({ message: "Error saving image" });
    } else {
      const insertedId = result.insertId;
      console.log('Record inserted successfully. Inserted ID:', insertedId);
      res.status(200).json({ message: "Image saved successfully", insertedId });
    }
  });
}else{
  res.send('you have to login first');
}
});


app.post('/updateStatus',(req,res)=>{

  let id=req.body.id;
  var status=req.body.status;
  var sql=`update pictures set status='${status}' where picture_id='${id}'`;
  db.query(sql,(err,result)=>{
    res.send('success');
  })
})
app.post('/api/adminDelete',(req,res)=>{
  const id=req.body.id;
  var sql=`select role from admin where id='${req.session.admin[0].id}'`
  db.query(sql,(err,result)=>{
    console.log(result);
    if(result[0].role ==='super'){
      var sql1=`delete from admin where id='${id}'`;
      db.query(sql1,(err,result1)=>{
       res.send('successfully deleted');
      })
    }else{
    res.send('You are not a super admin.');
  }
  })
})
app.get('/api/admin',(req,res)=>{

  var sql=`select * from admin`;

  db.query(sql,(err,result)=>{
    res.send(result);
  })
})
app.get('/api/admin_details',(req,res)=>{

  var sql=`select role from admin where id='${req.session.admin[0].id}'`;

  db.query(sql,(err,result)=>{
    res.send(result);
  })
})
app.post('/AdminCreate',(req,res)=>{

  const email=req.body.email;
  const password=req.body.password;
  const pincode=req.body.pincode;
  const text=req.body.text;

  console.log(email,password,pincode,text);

  console.log(req.session.admin);
  var sql=`select role from admin where id='${req.session.admin[0].id}'`
  db.query(sql,(err,result)=>{
    console.log(result);
    if(result[0].role ==='super'){
      var sql1=`insert into admin(adminemail,password,role,pincode) values('${email}','${password}','${text}','${pincode}')`;
      db.query(sql1,(err,result1)=>{
       res.send('successfully created');
      })
      const mailOptions = {
        from: `plastic Waste management System`,
        to: `${email}`,
        subject: 'You  are added as an Admin by Admin ',
        html: `
        <p>You are selected as an Admin and here are your credentials for login.</p><br/>
        Email : ${email}<br/>
        Password : ${password}<br/>
        Role:${text}<br/>
        Your Pin Code is : ${pincode}.<br/>
        This will be used to verify you while logging in.<br/><br/>
        
        Notee:If your Role is super then you can add other admin as well but if your Role is support you cannot add other admin.<br/>

        After login don't forget to change your password for security reasons.
        `, 
        
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }else{
      res.send('You are not a super admin');
    }
  })


})
app.post('/confirmPassword',(req,res)=>{
  const password=req.body.password;
  const confirmPassword=req.body.newPassword;
  
  console.log(req.session.admin_id);
  if(password===confirmPassword){
    var sql=`update admin set password='${password}' where adminemail='${req.session.admin_id}'`;
    db.query(sql,(err,result)=>{
      res.send('Hurreyy!! Successfully updated your new Password')
    })
  }else{
    res.send('Password and Confirm Password doesnot match')
  }
})
app.post('/logout',(req,res)=>{

  req.session.destroy();// destroying the session data of user after logout
})
app.post('/match',(req,res)=>{
  
  const email=req.body.email;
  const otp=req.body.otp;
  console.log(email);
  console.log(otp);
  var sql=`select *from adminotp where otp='${otp}' and admin_id='${email}'`;

  db.query(sql,(err,result)=>{
    if(result.length===1)
    {
      var sql1=`delete from adminotp where admin_id='${email}'`;
      db.query(sql1,(err2,result2)=>{
        req.session.admin_id=email;
        res.send('verified');
      })
     
    }else{
      res.send('login');
    }
  })

 

})
app.post('/OTP',(req,res)=>{
  
  const email=req.body.email;
  let otp=Math.floor(1000+ Math.random() * 9000);
  console.log(email);
  var sql=`SELECT * FROM member WHERE email='${email}'`;
  db.query(sql,(err,result)=>{

    if(result.length===1)
    {

      const mailOptions = {
        from: `plastic Waste management System`,
        to: `${email}`,
        subject: 'Recover OTP',
        html: `
        <p>Your otp is:</p>
        Otp : ${otp}<br/>
        `, 
        
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      var sql2=`insert into adminotp(otp,admin_id) values('${otp}','${email}')`;
      db.query(sql2,(err3,result3)=>{
       res.send('Otp is sent to your email');
      })
      
    }else{
      res.send('Invalid email');
    }
  })
})
app.post('/changePassword',(req,res)=>{

  if(req.session.admin)
  {
    const email=req.body.email;
    const password=req.body.password;
    const newPassword=req.body.newPassword;
    console.log(req.session.admin);
    const sql=`select * from admin where adminemail='${email}' and password='${password}'`;

    db.query(sql,(err,result)=>{
 
     if(result.length===1)
     {
      const sql1=`update admin set password='${newPassword}' where id='${req.session.admin[0].id}'`;

      db.query(sql1,(err1,result1)=>{
        res.send('Successfully changed the password');
      })
     }else{
      res.send('Wrong Password or Email');
     }
    })

  }else{
       res.send('login');

  }


})
app.post('/api/plastic_insert', upload1.single('image'),async (req, res) => {
  if(req.session.user){
  try {
    const image = req.file;
    const id=req.body.id;
    console.log(id);
    var address;
    // const member_id = 7;
    const { longitude, latitude } = req.query;
    console.log(req.file); 
    const apiKey = 'AIzaSyDtw6e7tKbFD0xJaruqQuqObP0XOtXX5kE';
  
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
      var pincode1;
      Axios.get(apiUrl)
      .then(response => {
          address = response.data.results[0].formatted_address;
          
            var pincodeArray =address.split(" ");
            for (let i = 0; i < pincodeArray.length; i++) {
              // Check if the element is a numeric value
              const pincode = parseInt(pincodeArray[i], 10);
              if (!isNaN(pincode) && pincode.toString().length === 6) {
                 pincode1=pincode;
                break;
              }
            }
          }
      )
      .catch(error => {
          console.error('Error:', error);
      });
      const array=["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
      var date= array[new Date().getMonth()+1]+" "+new Date().getDate()+","+new Date().getFullYear();

    const pythonScript = 'C:/Users/somgo/Desktop/Ai/Test.py';
    const pythonExecutable = 'C:/Users/somgo/AppData/Local/Programs/Python/Python39/python.exe';
    const { stdout, stderr } = await execAsync(`${pythonExecutable} ${pythonScript}`);
    
    // Process the output and determine the type
    console.log(stdout);
    let type = "Others";
    if (stdout.includes("It's plastic")) {
      type = "Plastic";
    }
    console.log(type); 
    // res.json({ type: type });
    
    var sql1=`update pictures set type='${type}',member_id='${req.session.user}',longitude='${longitude}',latitude='${latitude}',address='${address}',status='Pending',date='${date}',pincode='${pincode1}',verify='Not verified' where picture_id='${id}'`
    db.query(sql1, (err, result) => {
      if (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        // res.send('Uploaded successfully');
        console.log('Data inserted successfully:', result);
        
      }
      var sql2=`select *from pictures where picture_id='${id}'`;
      db.query(sql2,(err,result2)=>{
        console.log(result2);
        res.send(result2);
        
      })
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.send('This image is already exist');
  }
}else{
  res.send('you have to login first');
}
});
app.post('/api/read_one_pictures', (req,res)=> {
  var ret_val = {};
	try
		{ 
	
			var id = req.body.picture_id;
      console.log(id);
			var sql = `Select * from pictures where picture_id='${id}'`;
  
			 db.query(sql,  function (err, result, fields) {
				
				
				var ret_val = {};	
				if (err) throw err;
				console.log("Records fetched");
				var i=0;
					
				// ret_val.picture_id= result[i].picture_id;
				ret_val.image_file= result[i].image_file;
				// ret_val.location_id= result[i].location_id;
				ret_val.type= result[i].type;
				console.log(ret_val);				
				
				return res.status(200).send(ret_val);   
				
				
				 
			});

		}
		catch ( error )
		{
				console.log(error);
				ret_val.code="0";
				ret_val.message="ERROR. No records fetched";
				return res.status(500).send(ret_val);
		}

});
app.post('/api/RiderReq',(req,res)=>{
  var ret_val={};
  try{
    if (req.session.admin && req.session.admin.length > 0) {
      console.log(req.session.admin[0].pincode);
  
      const lowerLimit = req.session.admin[0].pincode - 4;
      const upperLimit = req.session.admin[0].pincode + 4;
      var sql=`SELECT *from riderreq where pincode  between ${lowerLimit} and ${upperLimit}`;
      db.query(sql,(err,result)=>{
        res.send(result);
      })
  }}catch ( error )
			{
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records Deleted";
					return res.status(500).send(ret_val);
			}
})
app.post('/api/successs', (req, res) => {
  var ret_val = {};
  const id = req.body.id;
  try {
    
    var sql = `select * from riderreq where id='${id}'`;

    db.query(sql, (err, result) => {
      if (result[0]) {
      var name=result[0].name;
      var email=result[0].email;
      
        var sql2 = `insert into riderreg(name,adharcard,picture,address,phn,email,password,pincode,age) values('${result[0].name}','${result[0].adharcard}','${result[0].picture}','${result[0].address}','${result[0].phn}','${result[0].email}','${result[0].password}','${result[0].pincode}','${result[0].age}')`;

        console.log(result[0].name);

        db.query(sql2, (err2, result2) => {
          if (err2) {
            console.log("Error inserting:", err2);
          } else {
            console.log("Successfully inserted:", result2);
          }
        });

        var sql1 = `delete from riderreq where id='${id}'`;

        db.query(sql1, (err1, result1) => {
          console.log(result1);
          ret_val.code = "1";
          ret_val.message = "SUCCESS. Record deleted Successfully.";
          
        });
      }
      
    
      const mailOptions = {
        from: 'somgorai726@gmail.com',
        to: `${email}`,
        subject: 'Your request has been successfully processed!',
        html: `
          <p>Dear ${name}, <br/> Congratulations!!</p>
          <p>We have received your request for this job and we are very pleased to inform you that your request for a Rider has been successfully processed from our side!! Welcome aboard!</p>
          <p>Instruction For Work: You are now a verified member. Please follow the instructions given below in order to proceed with your work. You will receive an update on the status of your request soon.</p>
          <p>Thanks & Regards, <br/> Team Go Ride.</p>
          <p>If you want to contact us for further details, please contact us via email at PlasticWasteManagement@email.com or by phone at +(91) 23456-7890.</p>
          <img src="cid:rider.jpg" alt="Introduction Image" />
        `,
        attachments: [{
          filename: 'rider.jpg',
          path: 'C:/Users/somgo/Downloads/plastic_frontend_project/user_frontend/plastic/public/img/rider.jpg', // Replace this with the path to your image file
          cid: 'rider.jpg' // This is the Content-ID used in the HTML
        }]
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    });
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records Deleted";
    return res.status(500).send(ret_val);
  }
});

app.post('/api/remove',(req,res)=>{
   var ret_val={}
   const id=req.body.id;
  try{
    var sql1=`delete from riderreq where id='${id}'`
      
      db.query(sql1 ,(err,result1)=> {
       console.log(result1);
         ret_val.code ="1" ;
         ret_val.message ="SUCCESS. Record deleted Successfully.";

    })
  }catch ( error )
  {
      console.log(error);
      ret_val.code="0";
      ret_val.message="ERROR. No records Deleted";
      return res.status(500).send(ret_val);
  }
})
app.post('/api/delete_pictures', (req,res)=> {
	var ret_val = {};
			try
			{
        
				var id = req.body.id;
				var sql = `delete from pictures where picture_id='${id}'`;
	  
				db.query(sql, function (err, result) {
					if (err) throw err;
					console.log("Number of records deleted: " + result.affectedRows);
					ret_val.code="1";
				ret_val.message="Success. Picture Deleted";
				return res.status(200).send(ret_val);
				});
				
			
			}
			catch ( error )
			{
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records Deleted";
					return res.status(500).send(ret_val);
			}
});
	
//read version2 pictures
app.get('/api/read_plastic_v2', (req,res)=> {
  var ret_val = {};
  try
  {
    if (req.session.admin && req.session.admin.length > 0) {
      console.log(req.session.admin[0].pincode);
  
      const lowerLimit = req.session.admin[0].pincode - 4;
      const upperLimit = req.session.admin[0].pincode + 4;
        
				var sql = `Select * from pictures where type='plastic' and pincode between ${lowerLimit} and ${upperLimit}`;
				 db.query(sql,  function (err, result, fields) {
					res.send(result);
			 })
      }}
			catch ( error )
			{ 
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records fetched";
					return res.status(500).send(ret_val);
			}
	
});
app.post('/api/sendReport',upload3.single('file'),(req,res)=>{
  const ret_val={};
  const email=req.body.email;
  const file=req.file;
  const picture_id=req.body.picture_id;
  try{
    const mailOptions = {
      from: `${email}`,
      to: `somgorai726@gmail.com`,
      subject: 'Urgent: Request for Garbage Cleaning and Recycling!',
      html: `
      <p>Dear Team at West Bengal Recycle Hub,</p>
      <p>We are pleased to share the successful detection and verification of plastic garbage through our website, an initiative aimed at creating a cleaner and more sustainable environment in West Bengal.</p>
      <p>Upon thorough verification by our dedicated riders, we have confirmed the presence of recyclable plastic waste in specific locations. Your prompt attention to these areas is crucial in ensuring the proper recycling and disposal of the identified garbage.</p>
      <p>Details of the verified request:</p>
      
      <p>Instructions for Work: We appreciate your commitment to environmental sustainability. Please initiate the necessary steps to clean and recycle the identified plastic waste in the specified locations.</p>
      <p>If you require any additional information or assistance, please do not hesitate to contact us via email at PlasticWasteManagement@email.com or by phone at +(91) 23456-7890.</p>
      <p>Sincerely,<br/>Plastic Waste Management System.</p>
      <a href="cid:${file.filename}" download="YourFileName.pdf">Download PDF</a>
      `, 
      attachments: [
      {
        filename: file.filename,
        path:'C:/Users/somgo/Downloads/plastic_frontend_project/user_frontend/plastic/public/img/Report.pdf',
        content: file.buffer,
        encoding: 'base64',
      },
    ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    var sql=`update pictures set status='Done' where picture_id='${picture_id}'`;
    db.query(sql,(err,result)=>{

    })
    var sql1=`delete from riderverify where picture_id='${picture_id}'`;
    db.query(sql1,(err,result)=>{
      
    })
  } catch (error) {
    console.log(error);
    ret_val.code = "0";
    ret_val.message = "ERROR. No records Deleted";
    return res.status(500).send(ret_val);
  }
})
app.post('/getDate',(req,res)=>{

  var sql=`select * from pictures where picture_id='${req.body.picture_id}'`;
  db.query(sql,(err,result)=>{
    res.send(result);
  })

})

app.post('/getReportDetails',(req,res)=>{

  var sql=`select * from riderverify where picture_id='${req.body.picture_id}'`;
  db.query(sql,(err,result)=>{
    res.send(result);
  })

})
app.get('/api/read_plastic_all',(req,res)=>{
  var ret_val = {};
  try
  {
				var sql = `Select * from pictures where type='plastic'`;
				 db.query(sql,  function (err, result, fields) {
					res.send(result);
			 })
      }
			catch ( error )
			{ 
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records fetched";
					return res.status(500).send(ret_val);
			}
	

})

app.get('/api/read_paper_all',(req,res)=>{
  var ret_val = {};
  try
  {
				var sql = `Select * from pictures where type='Others'`;
				 db.query(sql,  function (err, result, fields) {
					res.send(result);
			 })
      }
			catch ( error )
			{ 
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records fetched";
					return res.status(500).send(ret_val);
			}
	

})

app.get('/api/read_plastic_v2', (req,res)=> {
  var ret_val = {};
  try
  {
    if (req.session.admin && req.session.admin.length > 0) {
      console.log(req.session.admin[0].pincode);
  
      const lowerLimit = req.session.admin[0].pincode - 4;
      const upperLimit = req.session.admin[0].pincode + 4;
        
				var sql = `Select * from pictures where type='Plastic' and pincode between ${lowerLimit} and ${upperLimit}`;
				 db.query(sql,  function (err, result, fields) {
					res.send(result);
			 })
      }}
			catch ( error )
			{ 
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records fetched";
					return res.status(500).send(ret_val);
			}
	
});
app.post('/api/updateOthersType',(req,res)=>{
 
  const id = req.body.id;

  var sql=`update pictures set type='Others' where picture_id='${id}'`;
  db.query(sql, function (err, result) {
    if (err) throw err;
  
    });
    return res.status(200).send('Successful');

})

app.post('/api/updateType',(req,res)=>{
 
  const id = req.body.id;

  var sql=`update pictures set type='Plastic' where picture_id='${id}'`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    // console.log("Number of records updated " + result.affectedRows);
    });
    return res.status(200).send('Successful');

})

app.get('/api/read_paper_v2', (req,res)=> {
  var ret_val = {};
  try
  {
    if (req.session.admin && req.session.admin.length > 0) {
      console.log(req.session.admin[0].pincode);
  
      const lowerLimit = req.session.admin[0].pincode - 4;
      const upperLimit = req.session.admin[0].pincode + 4;
        
				var sql = `Select * from pictures where type='Others' and pincode between ${lowerLimit} and ${upperLimit}`;
				 db.query(sql,  function (err, result, fields) {
				 res.send(result);
			 })
      }}
			catch ( error )
			{ 
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records fetched";
					return res.status(500).send(ret_val);
			}
	
});
app.get('/api/read_pictures_v3', (req,res)=> {
  var ret_val = {};
		try
			{
        if (req.session.admin && req.session.admin.length > 0) {
          console.log(req.session.admin[0].pincode);
      
          const lowerLimit = req.session.admin[0].pincode - 4;
          const upperLimit = req.session.admin[0].pincode + 4;
			   	var sql = `Select * from pictures where pincode between  ${lowerLimit} and ${upperLimit}`;
				 db.query(sql,  function (err, result, fields) {
          console.log(result)
					res.send(result);
			 })
      }
      }
			catch ( error )
			{ 
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records fetched";
					return res.status(500).send(ret_val);
			}
	
});

app.get('/api/read_pictures_v2', (req,res)=> {
  var ret_val = {};
		try
			{
				var sql = `Select * from pictures`;
				 db.query(sql,  function (err, result, fields) {
          console.log(result)
					res.send(result);
			 })
      }
			catch ( error )
			{ 
					console.log(error);
					ret_val.code="0";
					ret_val.message="ERROR. No records fetched";
					return res.status(500).send(ret_val);
			}
	
});
	
//update pictures

app.post('/api/update_pictures', (req,res)=> {

	var ret_val = {};
		try
		{
		
			var image_file = req.body.image_file;
			var location_id = req.body.location_id;
			var type = req.body.type;
			var picture_id = req.body.picture_id;					
			
	
			var sql = `update pictures set image_file='${image_file}', location_id='${location_id}', type='${type}' where picture_id='${picture_id}' `;
  
			db.query(sql, function (err, result) {
				if (err) throw err;
				console.log("Number of records updated " + result.affectedRows);
			});
	        
		
		    
				ret_val.code="1";
			ret_val.message="Success. Pictures Updated";
			return res.status(200).send(ret_val);
	
		}
		catch ( error )
		{
				console.log(error);
				ret_val.code="0";
				ret_val.message="ERROR. Pictures not Updated";
				return res.status(500).send(ret_val);
		}	

});

  app.post("/api/details", (req, res) => {
  
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
   
    const sql = `UPDATE member SET name='${name}', phone='${phone}', email='${email}' WHERE member_id='${req.session.user}'`;
   
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error updating member details:", err);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Member details updated successfully");
        res.status(200).send("Successful");
      }
    });
  });   
app.post("/api/getResult",(req,res)=>{

  // const member_id = 7;
  if(req.session.user){
  const sql=`SELECT * from pictures where member_id='${req.session.user}'`;
   
  db.query(sql,(err,result)=>{
    return res.send(result);
  });
 }else{
  res.send('you have to login in first');
 } 
})
app.listen(3001);