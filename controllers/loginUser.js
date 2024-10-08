const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = (req, res) => {
    const { username, password } = req.body;

    //find user by username
    User.findOne({ username: username })
    .then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) { 
                    // if passwords match store user session
                    res.redirect('/');
                    console.log("User logged in successfully");
                }
                else {
                    console.log(error);
                    res.redirect('/auth/login');
                }
            });
        }
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/auth/login');
    });
};