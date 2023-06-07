const admin_register_model = require("../model/admin_model");
const blog_model = require("../model/blog_model");
const department_model = require("../model/department_model");
const doctor_profile_model = require("../model/doctor_profile_model");
const patient_profile_model = require("../model/patients_model");
const user_register_model = require("../model/user_register_model")
var nodemailer = require('nodemailer');


// Declair globle admin variable ----------------------------------------
var globle_login_admin = "globle_login_admin is blank";


// Add Admin ------------------------------------------------------------
var add_admin = async (req, res) => {
    var data = await admin_register_model.create(req.body);

    res.status(200).json({
        status: "Success",
        data
    })
}


// Login ----------------------------------------------------------------
var login = async (req, res) => {

    var data = await admin_register_model.find({ email: req.body.email });

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
        });

        // asign to globle variable
        globle_login_admin = data;
        console.log("Globle login admin : ", globle_login_admin);
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

    var add_otp = await admin_register_model.findByIdAndUpdate({ _id: globle_login_admin[0]._id }, { otp: generate_otp });

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
        var data = await admin_register_model.find({ _id: globle_login_admin[0]._id });
        console.log("cmpr otp : ", data);

        if (data[0].otp == req.body.otp) {
            var data = await admin_register_model.findByIdAndUpdate({ _id: globle_login_admin[0]._id }, { otp_status: 1 });
            res.status(200).json({
                status: "OTP is match now you can create new password."
            });

            var delete_otp = await admin_register_model.findByIdAndUpdate({ _id: globle_login_admin[0]._id }, { otp: 0 });
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

    var check_otp_status = await admin_register_model.find({ $and: [{ _id: globle_login_admin[0]._id }, { otp_status: 1 }] });

    if (check_otp_status == 0) {
        res.status(200).json({
            status: "data not found from globle varible."
        })
    } else {
        var data = await admin_register_model.findByIdAndUpdate(check_otp_status[0]._id, { password: req.body.password });
        res.status(200).json({
            status: "Password succesfully resate..!"
        })

        var change_otp_status = await admin_register_model.findByIdAndUpdate(check_otp_status[0]._id, { otp_status: 0 });
    }
}


// Make an Appointment -------------------------------------------------
var make_appointment = async (req, res) => {
    var data = await make_appointment_model.create(req.body);

    res.status(200).json({
        status: "Success",
        data
    })
}


// Add doctor ----------------------------------------------------------
var add_doctor = async (req, res) => {
    var data = await doctor_profile_model.create(req.body);

    res.status(200).json({
        status: "Success",
        data
    })
}


// View doctor ---------------------------------------------------------
var view_all_doctor = async (req, res) => {
    var data = await doctor_profile_model.find();
    var total = await doctor_profile_model.find().count();

    res.status(200).json({
        status: "Success",
        total,
        data
    })
}


// Add Patient ----------------------------------------------------------
var add_patient = async (req, res) => {
    var data = await patient_profile_model.create(req.body);
    var total = await patient_profile_model.find().count();

    res.status(200).json({
        status: "Success",
        total,
        data
    })
}


// View Patient ---------------------------------------------------------
var view_all_patient = async (req, res) => {
    var data = await patient_profile_model.find();
    var total = await patient_profile_model.find().count();

    res.status(200).json({
        status: "Success",
        total,
        data
    })
}


// Add Department -------------------------------------------------------
var add_department = async (req, res) => {
    var data = await department_model.create(req.body);
    var total = await department_model.find().count();

    res.status(200).json({
        status: "Success",
        total,
        data
    })
}


// View Department ------------------------------------------------------
var view_all_department = async (req, res) => {
    var data = await department_model.find();
    var total = await department_model.find().count();

    res.status(200).json({
        status: "Success",
        total,
        data
    })
}


// add blog -------------------------------------------------------------
var add_blog = async (req, res) => {

    var data_find = await user_register_model.find({ _id: req.params.user_id });
    var obj = {
        author_name: data_find[0].author_name,
        author_id: data_find[0]._id,
        title: req.body.title,
        blog_category: req.body.blog_category,
        iteam_details: req.body.iteam_details,
        likes: 0
    }

    var data = await blog_model.create(obj);


    res.status(200).json({
        status: "Success",
        data
    });
};


// view all blog --------------------------------------------------------
var view_all_blog = async (req, res) => {

    var data = await blog_model.find();
    var total = await blog_model.find().count();

    res.status(200).json({
        status: "Success",
        total,
        data
    })
};


// likes ----------------------------------------------------------------
var like = async (req, res) => {

    var data = await blog_model.find({ _id: req.params.blog_id })
    console.log(data);
    var k = data[0].likes;
    var cnt = k;
    cnt++
    console.log(cnt);

    var data = await blog_model.findByIdAndUpdate({ _id: req.params.blog_id }, { likes: cnt })

    res.status(200).json({
        status: "Success",
        data
    })
}


// Comment --------------------------------------------------------------
var comment = async (req, res) => {

    var data = await blog_model.findByIdAndUpdate({ _id: req.params.blog_id }, { $push: { comment: { commentor_name: req.body.commentor_name, comment: req.body.comment } } })
    res.status(200).json({
        status: "Success",
        data
    });
};





// export all moduls in --> routes/users.js
module.exports = {
    add_admin,
    login,
    forgate_password,
    compair_otp,
    create_new_password,
    make_appointment,
    add_doctor,
    view_all_doctor,
    add_patient,
    view_all_patient,
    add_department,
    view_all_department,
    add_blog,
    view_all_blog,
    like,
    comment
}