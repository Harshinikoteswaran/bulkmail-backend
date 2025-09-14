const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://harshini:harshini%40123@cluster0.vhlyb9n.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log("Connected to MongoDB");
}).catch((err)=>{
  console.log("Error connecting to MongoDB",err);
});
app.use(cors());
app.use(express.json());

//install nodemailer
const nodemailer = require("nodemailer");

const credential = mongoose.model('credential',{},'bulkmail');




app.post('/sendmail',(req,res)=>{
 let msg=req.body.msg;
 let emailList=req.body.emailList;
 console.log(msg);
// Create a test account or replace with real credentials.
credential.find().then((data)=>{
const transporter = nodemailer.createTransport({
   service: 'gmail',
  auth: {
    user: data[0].toJSON().user,
    pass: data[0].toJSON().password,
  },
});

new Promise(async(resolve,reject)=>{
  try{
  for(let i=0;i<emailList.length;i++){
   await transporter.sendMail({
    from:"harshinitk.21@gmail.com",
    to:emailList[i],
    subject:"My bulk mail message",
    text:msg
})
}
resolve("success");
}
catch(err){
  reject("Failed");
}
}).then(()=>{
  res.send(true);
}).catch(()=>{
  res.send(false);
})
}).catch((err)=>{
  console.log(err);
});


})


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});