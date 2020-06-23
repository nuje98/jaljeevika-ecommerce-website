const Vendor = require('../models/Vendor');
const User = require('../models/user.model')
const Message = require('../models/messages')
var myPromise = require('promise')
const express = require('express');
const { Router } = require('express');
const messages = require('../models/messages');
const router = express.Router();

/** 
router.get('/:receiver',(req, res, next)=>{
    if(req.params.receiver){
        if (req.session.user){
            reciever = req.query.id;
            sender = req.session.user._id;
            const message = req.body.msg;
            }
        console.log(receiver)

    }
})
*/

var receivername;

router.get('/getname', (req, res)=>{
    id = req.query.id
    Vendor.find({_id: id}).exec().then(async (data)=>{
        console.log(data)
        res.send( data[0].vendorname);
                    
            })

})

var receivername;
//var name= getvendorname("5ee3aa5afa154e2298ab7a04")

//console.log(getvendorname("5edde91d9d392718b4d727b7").then((data)=>{console.log(data)}))

router.get('/',(req,res,next)=>{

    Message.find({sender : req.session.user._id}).distinct('receiver',(err, data)=>{
        Message.find({seen:0, receiver: req.session.user._id},(err, unseen)=>{
            console.log(unseen)

        res.render('a',{
            people : data,
            count : unseen
        })
    })
    })
    
})
var id ="5ee3aa5afa154e2298ab7a04"



router.get('/chatusers',(req,res,next)=>{
    id = req.session.user._id
    Message.aggregate([
        { $match: { $or: [
            {sender: id},
            {receiver: id }
        ]    } },
        { $sort: { date: -1 } },
        { $group: { '_id': {"receiver":"$receiver","sender":'$sender'},"message":{$first:"$message"} }},
        
      ]).then((data)=>{
        var out="";
        data.forEach(msg=>{
            
            if(msg._id.sender==id){
              out = out+"<li><a href='/chat?q="+msg._id.receiver+"'"+"><img src='#' alt='user'><div><h2>User</h2><h3>You: "+msg.message+"</h3></div></a></li>"
            }
            else {
              out = out+"<li><a href='/chat?q="+msg._id.sender+"'"+"><img src='#' alt='user'><div><h2>User</h2><h3>User: "+msg.message+"</h3></div></a></li>"
         
    
            }
            
        })
    console.log(out)
            res.send(out)
      })
})
router.get('/id',(req, res, next)=>{
    let errors = []
    if(req.query.q){

        
        var receiver = req.query.q;
        var sender = req.session.user._id;
        
        //var sender = "5ede707f04269403e4848520"
    $query =[receiver, sender]
   var receivername
    //getvendorname(receiver).then((data)=>{
     //   receivername = data[0].name
    //})
    $query =[receiver, sender]
    setTimeout(() => {
        
    
    Message.find({sender : { $in: $query }, receiver: { $in: $query }}).sort({date :1}).exec( (err,data)=>{
            
            var i;
            var out = "";
            console.log("working")
        
        //console.log(data)
        
        
        data.forEach(elem => {
            var date = new Date(elem.date)
                displaydate = date.getDay() + "/" + date.getMonth() 
                + "/" + date.getFullYear() + " @ " 
                + date.getHours() + ":" 
                + date.getMinutes() + ":" + date.getSeconds();
            
              
            if (elem.sender == sender){
                
                classname = "me"
                //sendername = req.session.user.name;
                sendername = "You"
                
                out = out + "<li class="+classname+"  >"+"<div class='entete'><h2>"+ sendername +"</h2><h3>"+displaydate+"</h3></div><div class='triangle'></div><div class='message'>"+ elem.message+"</div></li>"
				
            }
            else {
                classname = "you"
                sendername = 'User'
                out = out + "<li class="+classname+"  >"+"<div class='entete'><h2>"+ sendername +"</h2><h3>"+displaydate+"</h3></div><div class='triangle'></div><div class='message'>"+ elem.message+"</div></li>"
            }
                 
            })
            
          
            res.send(out)
            
              
            })
        }, 3000);

        updateunseen(sender, receiver)
    }

   
})
function updateunseen(sender, receiver)
{let conditions = {seen:0, receiver: sender, sender: receiver};
let options = { multi: true};
let update = {
    $set : {
        seen: 1,
  }
};
Message.updateMany(conditions , update,options,(err, data)=>{
    //console.log(data)
} );
Message.find({seen:0, receiver: sender},(err, data)=>{
    //console.log(data)
})

}



router.get('/checknewmessage',(req, res, next)=>{
    Message.find( {seen:0},(err, data)=>{
        //console.log(data.length)
    })

})


router.post('/send', (req, res, next)=>{
    let errors=[]
    console.log('send running')
    if(req.query.q){
        if (req.session){

            var receiver = req.query.q;
            var sender = req.session.user._id;
        var receivername;
    //getvendorname(receiver).then((data)=>{
     //   return data
    //})
        var seen = 0;
        var message = req.body.message;
        }
    if (!sender || !receiver || !message){
        errors.push({ msg: 'Please type something'});
                    }
                    console.log(errors)
    if(errors.length >0)
                {
        res.send('not inserted')
                    }
    else{
    const newmessage = new Message({
        sender,
        seen,
        receiver,
        message
                })
    console.log("done")
    
    newmessage.save()
    $query =[receiver, sender]
   
    $query =[receiver, sender]
    Message.find({sender : { $in: $query }, receiver: { $in: $query }}).sort({date :1}).exec( (err,data)=>{
            
            var i;
            var out = "";
            console.log("working")
        
        //console.log(data)
        
            
        data.forEach(elem => {
            var date = new Date(elem.date)
                displaydate = date.getDay() + "/" + date.getMonth() 
                + "/" + date.getFullYear()
                + date.getHours() + ":" 
                + date.getMinutes() + ":" + date.getSeconds();
            if (elem.sender == sender){
                
                classname = "me"
                //sendername = req.session.user.name;
                sendername = "You"
                out = out + "<li class="+classname+"  >"+"<div class='entete'><h2>"+ sendername +"</h2><h3>"+displaydate+"</h3></div><div class='triangle'></div><div class='message'>"+ elem.message+"</div></li>"
				
            }
            else {
                classname = "you"
                sendername = 'User'
                out = out + "<li class="+classname+"  >"+"<div class='entete'><h2>"+ sendername +"</h2><h3>"+displaydate+"</h3></div><div class='triangle'></div><div class='message'>"+ elem.message+"</div></li>"
            }
               
                
            })

          
          res.send(out)
          
          
        })
        }
    }

    })




    module.exports = router;
