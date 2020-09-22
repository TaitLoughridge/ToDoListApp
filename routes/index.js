const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const UsersModel = require('../models/usersModel');


router.get('/', (req, res) => {
    res.redirect("/index");
});

router.get('/index', (req, res) => {
    res.render ('template', {
        locals: {
            title: 'Login or SignUp'
            
        },
        partials: {
            partial: "partial-index"
        },
    });
});


router.post('/index', (req, res) => {
    const { user_name, user_email, password } = req.body;
    
    // SALT AND HASH OUR PASSWORD!
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new UsersModel(null, user_name, user_email, hash);

    userInstance.save().then(response => {
        if (response.id !== undefined) {
            res.redirect('index');
        } else {
            res.redirect('/index');
        }
    })
})

router.post('/index', (req, res) => {
    const { user_email, password } = req.body;
    const userInstance = new UsersModel(null, null, user_email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            const { user_name, user_id } = response;
            req.session.user_name = user_name;
            req.session.user_id = user_id;
            res.redirect('/users/task')
        } else {
            res.sendStatus(401);
        }
    })
    
})

module.exports = router;