import bcrypt from "bcrypt";
import AuthModel from "../models/dbModel.js";
import jwt from "jsonwebtoken";
import transpoter from "../config/emailConfig.js";

const authRegister = async (req, res) => {
  const { fullName, email, birthDate, gender, phone, password, tc } = req.body;

  const authEmail = await AuthModel.findOne({ email: email });

  if (authEmail) {
    res.send({
      success: false,
      message: "User already registered",
    });
  } else {
    if (fullName && email && birthDate && gender && phone && password && tc) {
      try {
        const salt = await bcrypt.genSalt(10);
        const cryptPass = await bcrypt.hash(password, salt);
        const authRegisterDoc = await AuthModel({
          fullName: fullName,
          email: email,
          birthDate: birthDate,
          gender: gender,
          phone: phone,
          password: cryptPass,
          tc: tc,
        });

        const responseDoc = await authRegisterDoc.save();
        // console.log(responseDoc);
        const saved_user = await AuthModel.findOne({ email: email });

        const token = jwt.sign(
          { userID: saved_user._id },
          process.env.JWT_KEY,
          { expiresIn: "1d" }
        );

        if (responseDoc) {
          res.status(201).send({
            success: true,
            message: "Registered Successfully",
            token: token,
          });
        }
      } catch (error) {
        res.send({
          success: false,
          message: "Something gone wrong",
        });
      }
    } else {
      res.send({
        success: false,
        message: "Some fields are missing",
      });
    }
  }
};

const authLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const user = await AuthModel.findOne({ email: email });
    if (user !== null) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (user.email === email && isMatch) {
        const token = jwt.sign({ userID: user._id }, process.env.JWT_KEY, {
          expiresIn: "1d",
        });
        res.send({
          success: true,
          message: "Login Successfully",
          token: token,
        });
      } else {
        res.send({
          success: false,
          message: "Email & Password doesn't match",
        });
      }
    } else {
      res.send({
        success: false,
        message: "User doesn't exist",
      });
    }
  } else {
    res.send({
      success: false,
      message: "Some fields are missing",
    });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (currentPassword && newPassword) {
    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    if (isMatch) {
      const salt = await bcrypt.genSalt(10);
      const newHashPass = await bcrypt.hash(newPassword, salt);

      const newPassRes = await AuthModel.findByIdAndUpdate(req.user._id, {
        $set: { password: newHashPass },
      });

      if (newPassRes) {
        res.send({
          success: true,
          message: "Password changed",
        });
      } else {
        res.send({
          success: true,
          message: "Something went wrong!",
        });
      }
    } else {
      res.send({
        success: false,
        message: "Current Password does't match",
      });
    }
  } else {
    res.send({
      success: false,
      message: "Password is required",
    });
  }
};

const isLoggedIn = async (req, res) => {
  if (req.user) {
    res.send({
      success: true,
      user: req.loggedIn,
    });
  } else {
    res.send({
      success: false,
      message: "You are not login",
    });
  }
};

const forgotPassAndResetPassWithEmail = async (req, res) => {
  const { email } = req.body;
  if (email) {
    const user = await AuthModel.findOne({ email: email });
    if (user) {
      const secret = user._id + process.env.JWT_KEY;
      const emailToken = jwt.sign({ userID: user._id }, secret, {
        expiresIn: "15m",
      });

      const resetLink = `http://localhost:3000/api/user/reset/${user._id}/${emailToken}`;

      console.log(resetLink);

      let info = await transpoter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Reset Password",
        html: `
        <!doctype html>
        <html lang="en-US">
        
        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password</title>
            <meta name="description" content="Reset Password.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>
        
        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                        <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                            align="center" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td>
                                    <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                        style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="padding:0 35px;">
                                                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                    requested to reset your password</h1>
                                                <span
                                                    style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                    We cannot simply send you your old password. A unique link to reset your
                                                    password has been generated for you. To reset your password, click the
                                                    following link and follow the instructions.
                                                </p>
                                                <a href=${resetLink}
                                                    style="background:#e27e20;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                                    Password</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:40px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            <tr>
                                <td style="height:20px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="height:80px;">&nbsp;</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        
        </html>`,
      });

      res.send({
        success: true,
        message: "Reset link sent successfully",
        info: info,
      });
    } else {
      res.send({
        success: false,
        message: "User Does't Exist",
      });
    }
  } else {
    res.send({
      success: false,
      message: "Email is required",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { id, resetLink } = req.params;
  
  const user = await AuthModel.findById(id);

  if (user) {
    const new_secret = user._id + process.env.JWT_KEY;
    try {
      jwt.verify(resetLink, new_secret);
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const newHashPass = await bcrypt.hash(password, salt);
        const passwordRes = await AuthModel.findByIdAndUpdate(user._id, {
          $set: { password: newHashPass },
        });
        if (passwordRes) {
          res.send({
            success: true,
            message: "Password reset successfully",
          });
        } else {
          res.send({
            success: false,
            message: "Something went wrong",
          });
        }
      } else {
        res.send({
          success: false,
          message: "Password is required",
        });
      }
    } catch (error) {
      res.send({
        success: false,
        message: "Invalid reset link",
      });
    }
  } else {
    res.send({
      success: false,
      message: "User Does't Exist",
    });
  }
};

export {
  authRegister,
  authLogin,
  changePassword,
  isLoggedIn,
  forgotPassAndResetPassWithEmail,
  resetPassword,
};
