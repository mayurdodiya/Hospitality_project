const make_appointment_model = require('../model/make_appointment_model');
var user_register_model = require('../model/user_register_model');
var nodemailer = require('nodemailer');


// Declair globle admin variable ---------------------------------------
var globle_login_user = "globle_login_user is blank";


// Add User ------------------------------------------------------------
var add_user = async (req, res) => {
    var data = await user_register_model.create(req.body);

    res.status(200).json({
        status: "Success",
        data
    })
}


// Login ---------------------------------------------------------------
var login = async (req, res) => {

    var data = await user_register_model.find({ email: req.body.email });

    // asign to globle variable
    globle_login_user = data;
    console.log("Globle login admin : ", globle_login_user);

    // login condition
    if (data == 0) {
        res.status(200).json({
            status: "Email is invalid..",
        })
    } else if (data[0].password == req.body.password) {

        res.status(200).json({
            status: "Login Success..",
            data
        })
    } else {
        res.status(200).json({
            status: "Password is invalid..",
        })
    }

}


// Forgate password ----------------------------------------------------
var forgate_password = async (req, res) => {

    // res.render('index', { title: 'Express' });
    res.status(200).json({
        status: "Success",
        msg: "mail sent.."
    });


    // for OTP send in mail
    var generate_otp = Math.ceil(Math.random() * 10000);
    console.log("Generate OTP : ", generate_otp);

    var add_otp = await user_register_model.findByIdAndUpdate({ _id: globle_login_user[0]._id }, { otp: generate_otp });

    // Sending Email.
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mayurdodiya1234@gmail.com',
            // pass: 'tavlnpikztikyrks'
            pass: 'yubhpbdhoqbtcbsg'

        }
    });

    var mailOptions = {
        from: 'mayurdodiya1234@gmail.com',
        to: 'mayurdodiya1234@gmail.com',
        // to: req.body.email,
        subject: 'Sending Email using Node.js',
        // text: 'Thank you for connecting with Us Mrs.Mira dodiya..! (auto generated email sent by your fionce..)'
        text: `Thank you for connecting with Us Mrs.Mira dodiya..! (auto generated email sent by your fionce..)
            your password is : ${generate_otp}.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}


// Compair OTP ---------------------------------------------------------
var compair_otp = async (req, res) => {

    try {
        var data = await user_register_model.find({ _id: globle_login_user[0]._id });
        console.log("cmpr otp : ", data);

        if (data[0].otp == req.body.otp) {
            var data = await user_register_model.findByIdAndUpdate({ _id: globle_login_user[0]._id }, { otp_status: 1 });
            res.status(200).json({
                status: "OTP is match now you can create new password."
            });

            var delete_otp = await user_register_model.findByIdAndUpdate({ _id: globle_login_user[0]._id }, { otp: 0 });
            console.log("delete otp : ", delete_otp);

        } else {
            res.status(200).json({
                status: "OTP is not match enter valid OTP."
            });
        }
    } catch (error) {
        res.status(200).json({
            status: "error..!",
            error
        });
    }

}


// Create new Password -------------------------------------------------
var create_new_password = async (req, res) => {

    var check_otp_status = await user_register_model.find({ $and: [{ _id: globle_login_user[0]._id }, { otp_status: 1 }] });

    if (check_otp_status == 0) {
        res.status(200).json({
            status: "data not found from globle varible."
        })
    } else {
        var data = await user_register_model.findByIdAndUpdate(check_otp_status[0]._id, { password: req.body.password });
        res.status(200).json({
            status: "Password succesfully resate..!"
        })

        var change_otp_status = await user_register_model.findByIdAndUpdate(check_otp_status[0]._id, { otp_status: 0 });
    }
}

// Make an Appointment -------------------------------------------------
// var make_appointment = async (req, res) => {
//     var data = await make_appointment_model.create(req.body);

//     res.status(200).json({
//         status: "Success",
//         data
//     })
// }

// export all moduls in --> routes/users.js
module.exports = {
    add_user,
    login,
    forgate_password,
    compair_otp,
    create_new_password,
    // make_appointment
}