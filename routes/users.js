var express = require('express');
var router = express.Router();
const { add_user, login, forgate_password, compair_otp, create_new_password, /*make_appointment,*/ } = require('../controller/user_controller');


// Add User ------------------------------------------------------------
router.post('/add_user', add_user);

// Login ---------------------------------------------------------------
router.get('/login', login);

// click to get otp for Forgate password -------------------------------
router.post('/forgate_password', forgate_password);

// Compair OTP ---------------------------------------------------------
router.post('/compair_otp', compair_otp);

// Create new Password -------------------------------------------------
router.post('/create_new_password', create_new_password);

// // Make an Appointment -------------------------------------------------
// router.post('/make_appointment', make_appointment);



module.exports = router;
