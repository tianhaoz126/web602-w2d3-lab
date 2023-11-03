const path = require('path');
const auth = require('http-auth');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Registration = mongoose.model('Registration');
const { check, validationResults} = require("express-validator");


router.get('/registrations', basic.check((req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('index', { title: 'Listing registrations', registrations });
        })
        .catch(() => {
            res.send('Sorry! Something went wrong.');
        });
}));


router.post('/', 
[
    check('name')
        .isLength({ min: 1 })
        .withMessage('Please enter a name'),
    check('email')
        .isLength({ min: 1 })
        .withMessage('Please enter an email'),
],
function(req, res) {
    if (errors.isEmpty()) {
        const registration = new Registration(req.body);
        registration.save()
            .then(() => res.send('Thank you for your registration!'))
            .catch(err => {
                console.log(err);
                res.send('Sorry! Something went wrong.');
            });
    } else {
    
    res.render('form', { title: 'Registration form', errors:errors.arry(),data:req.body, });
    }
});


module.exports = router;
