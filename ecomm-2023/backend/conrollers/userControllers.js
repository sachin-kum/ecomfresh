const catchAsyncError = require("../middleware/catchAsync");
const ErrorHander = require("../utils/errorHandler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");
// const getResetPassworrdToken = require("../models/userModel");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");
const fs = require("fs");


exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let url;
  if (req.file) {
    url = await cloudinary.uploader.upload(req.file.path, {
      transformation: {
        width: 500,
        crop: "scale",
        format: "auto",
      },
      folder: "profile_photo",
    });
  }

  const haspwrd = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: haspwrd,
    avatar: {
      public_id: url?.public_id,
      url: url?.secure_url,
    },
  });

  req.file &&
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("deleted");
    });
  // console.log(user, password);
  // const token = user.getJWTToken();
  // if (user) {
  //   res
  //     .status(201)
  //     .json({ msg: "Profile Successfully created", sucess: true, token });
  // }
  sendToken(user, 201, res);
});

//login
// exports.Login = catchAsyncError(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHander(" Please enter email or password", 404));
//   }
//   const user = await User.findOne({ email }).select("+password");

//   if (!user) {
//     return next(new ErrorHander(" Invalid email or password", 404));
//   }
//   // const token = user.getJWTToken();

//   const comparePassword = await bcrypt.compare(password, user.password);

//   if (!comparePassword) {
//     return next(new ErrorHander(" Invalid email or password", 404));
//   }

//   sendToken(user, 201, res);
// });

// Login
exports.Login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander(" Please enter email or password", 404));
  }

  // Find the user by email
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Compare the entered password with the hashed password in the database
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return next(new ErrorHander("Incorrect password", 401));
  }

  // Password is correct, generate a token and send it
  sendToken(user, 200, res);
});

//logout user

exports.Logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ msg: "Logout sucessfully", sucess: true });
});

//get all users -->admin
exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const { role } = req.body;

  if (role === "admin") {
    const users = await User.find();

    if (users) {
      res.status(200).json({
        msg: "Found successfully",
        sucess: true,
        // users: {
        //   name: users.name,
        //   email: users.email,
        //   avatar: users.avatar,
        //   id: users._id,
        // },
        users,
        total_user: users.length,
      });
    } else {
      return next(new ErrorHander(" users not found", 400));
    }
  } else if (role === "user") {
    return next(new ErrorHander(" user can not access all users", 400));
  } else {
    return next(new ErrorHander(" users not found", 400));
  }
});

//Forgot password

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "587",
  secure: false,
  auth: {
    user: "sachinswaminbt@gmail.com",
    pass: "bduqvjiychsuxqqd",
  },
});

const sendmail = async (email, message) => {
  let info = await transporter.sendMail({
    from: "sachinswaminbt@gmail.com", // sender address
    to: "sachinswaminbt@gmail.com", // list of receivers
    subject: "Email verification", // Subject line
    text: "your link", // plain text body
    html: `<b>${message}</b>`, // html body
  });
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email });

  // if (!user) {
  //   return next(new ErrorHander(" users not found", 404));
  // }
  let message = "sachin";

  sendmail(req.body.email, message);

  // const resetToken = user.getResetPassworrdToken();
});

exports.forgotPasswords = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const haspwrd = await bcrypt.hash(password, 12);
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $set: { password: haspwrd } }
    );
    return res.status(200).send({
      status: true,
      msg: "password changed sucessfully",
    });
  }
  res.status(200).send({
    status: false,
    msg: "user not found",
  });
};

//get user details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findById({ _id: id });

  if (!user) {
    return next(new ErrorHander(" users does not exist", 400));
  }
  res
    .status(201)
    .json({ msg: "User Found sucessfully", sucess: true, data: user });
});

//update paasowrd

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const userId = req.user.id; // Assuming you have user information in req.user

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHander("Please enter all required fields", 400));
  }
  const user = await User.findById(userId).select("+password");

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Check if the old password matches the current password
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    return next(new ErrorHander("Old password is incorrect", 401));
  }

  // Check if the new password and confirm password match
  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHander("New password and confirm password do not match", 400)
    );
  }

  // Hash the new password
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);

  // Update the user's password in the database
  user.password = hashedNewPassword;

  await user.save();

  // Respond with a success message
  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
    data: user,
  });
});

//Update profile

exports.userProfileUpdate = catchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.id;

    let url;
    if (req.file) {
      url = await cloudinary.uploader.upload(req.file.path, {
        transformation: {
          width: 500,
          crop: "scale",
          format: "auto",
        },
        folder: "profile_photo",
      });
    }
    const find_user = await User.findOne({ _id: userId });

    console.log(req.file);

    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (req.file) {
      newUserData.avatar = {
        public_id: url?.public_id,
        url: url?.secure_url,
      };
    }
    console.log("newUserData", newUserData);

    if (find_user) {
      const user = await User.findByIdAndUpdate(userId, newUserData, {
        new: true,
        runValdators: true,
        useFindAndModify: false,
      });

      req.file && cloudinary.uploader.destroy(find_user?.avatar?.public_id);

      res
        .status(201)
        .json({ msg: "Profile update  sucessfully", sucess: true, data: user });
    } else {
      res.status(201).json({ msg: "Profile update  not", sucess: false });
    }
  } catch (error) {
    console.log(error);
  }
});

//update role--admin

exports.userRoleUpdate = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(userId, newUserData, {
    new: true,
    runValdators: true,
    useFindAndModify: false,
  });

  res
    .status(201)
    .json({ msg: "Profile update  sucessfully", sucess: true, data: user });
});

//delete user--admin

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  } else {
    if (user) {
      const data = await User.deleteOne({ _id: id });
      if (data) {
        res.status(201).json({ msg: "user deleted", sucess: true, data: data });
      }
    }
  }
});
