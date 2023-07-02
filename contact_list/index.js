const express = require("express");
const path = require("path");
const port = 8000;           
 
const db = require("./config/mongoose");
const mongoose = require("mongoose"); 
const Contact = require("./models/contact");
const app = express();   


app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"))
app.use(express.urlencoded());
app.use(express.static("assests"));

var contactList = [
    { 
        name: "Prince",
        phone: "11111111"
    },
    {
        name: "Tony Stark",
        phone: "11111111"
    }
]

app.get("/",async function(req, res){ 

    // res.send("<h1>nice it it running!<h1>") 
    try{
        const contacts = await Contact.find({});
        return res.render("home", {
            title: "My Contacts List",
            contact_list: contacts
        });
    }catch(err){
        console.log("error in fetching data from Database");
        return res.status(500).send("Internal Server Error");
    }
    // console.log(__dirname);  
});      
app.get("/practice", function(req,res){
    return res.render("practice", {title: "playground"});

});

// code to post data like get data from user and show in the same tab 
// app.post("/create-contact", function(req,res){
//     contactList.push(req.body);
//     return res.redirect("back");
    
// });
app.post("/create-contact", async function(req,res){
    try{
        const newContact = await Contact.create({
            name: req.body.name,
            phone: req.body.phone,
        });
        console.log(">>>>", newContact);
        return res.redirect("back");

    }catch (error){
        console.log("error in create contact", error);
        return res.status(500).send("Internal Server Error");
    }
    // contactList.push(req.body);
    // return res.redirect("back");
    
});

// delete contact
// app.get("/delete-contact/", function(req,res){
//     console.log(req.query);
//     let phone =  req.query.phone;
//     let contactIndex = contactList.findIndex(contact => contact.phone === phone);
//     if(contactIndex !=  -1){
//         contactList.splice(contactIndex,1);
//     }
//     return res.redirect("back");
// });
//  delete contact from database 
app.get("/delete-contact/", async function(req,res){
    try{
        //    get the id of contact from database 
     let id = req.query.id;
     console.log(id);
    //  const contactId = mongoose.Types.ObjectId(id);
     await Contact.findByIdAndDelete(id);
     return res.redirect("back");
    }catch(error){
        console.log("error in deleting contact form database : ", error);
        return res.status(500).send("Internal Server Error");
    }
});


//  code for run the server on port 
app.listen(port, function(err){
    if(err){
        console.log("Error in running ther server", err);
    }else{
        console.log("Done! My Express server is running on Port: ", port)
    }
    
});