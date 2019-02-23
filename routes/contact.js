let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the db schema

let contactModel = require('../models/contact');

/*Get Contact List page*/
router.get('/',(req,res,next)=>{
    contactModel.find((err, contactList) => {
         if(err){
             return console.error(err);
         } 
         else{
             console.log(contactList);


            
             res.render('contacts/index', {
                 title: 'Favourite List',
                 contactList: contactList
             });
             
         }   
    });
});

/* Get router for the add page*/
router.get('/add',(req,res,next) => {
     res.render('contacts/add',{
        title: 'Add new contact'
});

});

/* Post route for the add page */
router.post('/add',(req,res,next) => {
 
    let newContact = contactModel({
        "name":req.body.name,
        "desc":req.body.desc
  
 });

 contactModel.create(newContact, (err, contactModel)=>{
     if(err){
         console.log(err);
         res.end(err);
     }
     else {
         //refresh the contact list
         res.redirect('/contact-list');
     }

 });
});

module.exports = router;

