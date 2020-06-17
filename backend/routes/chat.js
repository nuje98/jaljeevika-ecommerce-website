const Vendor = require('../models/Vendor');
const User = require('../models/user.model')
const Message = require('../models/messages')
var myPromise = require('promise')
const express = require('express');
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

const getmessages = (receiver, sender)=>{
    $query =[receiver, sender]
    return new myPromise((resolve, reject) => {
        Message.find({sender : { $in: $query }, receiver: { $in: $query }}).sort({date :1}).then(async (data)=>{
           
            setTimeout(() => {
                resolve(data)
                receivername = data[0].name
                return data
            }, 10);

            
                    })
            })
        }
var receivername;
//getvendorname("5edde91d9d392718b4d727b7").then((data)=>{console.log(data[0])})
//console.log(getvendorname("5edde91d9d392718b4d727b7").then((data)=>{return data}))

router.get('/',(req,res,next)=>{
    res.render('a')
})
router.get('/id',(req, res, next)=>{
    let errors = []
    if(req.query.q){

        
        var receiver = req.query.q;
        var sender = req.session.user._id;
        //var sender = "5ede707f04269403e4848520"
    $query =[receiver, sender]
   var receivername
    getvendorname(receiver).then((data)=>{
        receivername = data[0].name
    })
    $query =[receiver, sender]
    setTimeout(() => {
        
    
    Message.find({sender : { $in: $query }, receiver: { $in: $query }}).sort({date :1}).exec( (err,data)=>{
            
            var i;
            var out = "<ul>";
            console.log("working")
        
        //console.log(data)
        
        
        data.forEach(elem => {
            
            if (elem.sender == sender){
                
                classname = "sent"
                //sendername = req.session.user.name;
                var sendername = "You"
                out = out + "<li class="+classname+"  >"+ sendername +" :  "+ elem.message +"</li>";
            }
            else {
                classname = "received"
                out = out + "<li class="+classname+"  >"+elem.message +" : "+ receivername +"</li>";
                }
               
                
            })
            out = out + "</ul>"
          
            res.send(out)
            
              
            })
        }, 3000);


    }
})
router.post('/send', (req, res, next)=>{
    let errors=[]
    console.log('send running')
    if(req.query.q){
        if (req.session){

            var receiver = req.query.q;
            var sender = req.session.user._id;
        var receivername;
    getvendorname(receiver).then((data)=>{
        return data
    })
        
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
        receiver,
        message
                })
    console.log("done")
    
    newmessage.save()
    $query =[receiver, sender]
   
    $query =[receiver, sender]
    Message.find({sender : { $in: $query }, receiver: { $in: $query }}).sort({date :1}).exec( (err,data)=>{
            
            var i;
            var out = "<ul>";
            console.log("working")
        
        //console.log(data)
        
            
        data.forEach(elem => {
            
            if (elem.sender == sender){
                
                classname = '"send"'
                sendername = "You"
                out = out + "<li class="+classname+"  >"+ sendername +" : "+ elem.message +"</li>";
            }
            else {
                classname = '"received"'
                out = out + "<li class="+classname+"  >"+elem.message +" : "+ receivername +"</li>";
                }
                
            })
          out = out + "</ul>"
          
          res.send(out)
          
          
        })
        }
    }

    })




    module.exports = router;
