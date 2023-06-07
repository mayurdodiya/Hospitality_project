var express = require('express');
const { add_admin, login, make_appointment, add_doctor, view_all_doctor, add_patient, view_all_patient, add_department, view_all_department, forgate_password, compair_otp, create_new_password, add_blog, view_all_blog, like, comment } = require('../controller/admin_controller');
var router = express.Router();


// Add Admin -----------------------------------------------------------
router.post('/add_admin', add_admin);

// Login ---------------------------------------------------------------
router.get('/login', login);

// click to get otp for Forgate password -------------------------------
router.post('/forgate_password', forgate_password);

// Compair OTP ---------------------------------------------------------
router.post('/compair_otp', compair_otp);

// Create new Password -------------------------------------------------
router.post('/create_new_password', create_new_password);

// Make an Appointment -------------------------------------------------
router.post('/make_appointment', make_appointment);

// Add Doctor ----------------------------------------------------------
router.post('/add_doctor', add_doctor);

// View Doctor ---------------------------------------------------------
router.get('/view_all_doctor', view_all_doctor);

// Add Patient ---------------------------------------------------------
router.post('/add_patient', add_patient);

// View Patient --------------------------------------------------------
router.get('/view_all_patient', view_all_patient);

// Add Department ------------------------------------------------------
router.post('/add_department', add_department);

// View Department -----------------------------------------------------
router.get('/view_all_department', view_all_department);

// add blog ------------------------------------------------------------
router.post('/add_blog/:user_id', add_blog);

// view all blog -------------------------------------------------------
router.get('/view_all_blog', view_all_blog);

// likes ---------------------------------------------------------------
router.post('/like/:blog_id', like);

// Comment -------------------------------------------------------------
router.post('/comment/:blog_id', comment);


module.exports = router;
