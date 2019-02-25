let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the db schema

let contactModel = require('../models/contact');

/*Get Contact List page*/
router.get('/', (req, res, next) => {
    contactModel.find((err, contactList) => {
        if (err) {
            return console.error(err);
        }
        else {
            console.log(contactList);



            res.render('contacts/index', {
                title: 'Favourite List',
                contactList: contactList
            });

        }
    });
});

/* Get router for the add page*/
router.get('/add', (req, res, next) => {
    res.render('contacts/add', {
        title: 'Add new contact'
    });

});

/* Post route for the add page */
router.post('/add', (req, res, next) => {

    let newContact = contactModel({
        "name": req.body.name,
        "desc": req.body.desc

    });

    contactModel.create(newContact, (err, contactModel) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refresh the contact list
            res.redirect('/contact-list');
        }

    });
});

/*GET request - display the edit page */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    contactModel.findById(id, (err, contactObject) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit page
            res.render('contacts/edit', {
                title: 'edit contact',
                contact: contactObject
            });
        }
    });
    //console.log(id);
});

/* POST request to update the data from the edit page */
router.post('/edit/:id', (req,res,next)=>{
    let id= req.params.id;
    let updatedContact=contactModel({
        "_id":id,
        "name":req.body.name,
        "desc":req.body.desc
    });
    contactModel.update({_id:id}, updatedContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/contact-list');
        }
    })
});


/* GET request to perform the delete action */

router.get('/delete/:id',(req, res, next) => {
    let id = req.params.id;

    contactModel.remove({_id:id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
            //refresh the contact list
            res.redirect('/contact-list');
        }
    })
})
module.exports = router;

