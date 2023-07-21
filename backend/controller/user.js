const express = require("express");
const ErrorHandler = require("../utils/ErrorHandler");
const sendMail = require("../utils/sendMail");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwToken");
const { isAuthenticated } = require("../middleware/auth");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const createActivationToken = (user) => {
    console.log(process.env.ACTIVATION_SECRET);

    const jwtKey = jwt.sign(user, process.env.ACTIVATION_SECRET, {
      expiresIn: "5m",
    });

    const encodedJwtKey = jwtKey.replace(/\./g, "!");

    return encodedJwtKey;
  };

  const { name, email, password } = req.body;

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    const filename = req.file.filename;
    const filePath = `uploads/${filename}`;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "err deleting file" });
      }
    });

    return next(new ErrorHandler("User already exists", 400));
  }

  const fileName = req.file.filename;
  const fileUrl = path.join(fileName);


  const user = {
    name: name,
    email: email,
    password: password,
    avatar: fileUrl,
  };

  const activationToken = createActivationToken(user);
  
  const activationUrl = `https://new-egg-ecomerce-y9so.vercel.app/user/activation/${activationToken}`;

  try {
    await sendMail({
      email: user.email,
      subject: "Activate your account",
      message: `Hello  ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    });
    res.status(201).json({
      success: true,
      message: `please check your email:- ${user.email} to activate your account!`,
    });
  } catch (error) {
    return next(fileUrl);
  }
});

//activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("In valid token", 400));
      }

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//Login User

router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Missing credentials", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User dosen't exists"), 400);
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

//Load User

router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://new-egg-ecomerce-y9so.vercel.app');
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        user: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//logout
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out Successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user profile

router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update pfp

router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("image"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const existsUser = await User.findById(req.user.id);

      //   const existAvatarPath = `uploads/${existsUser.avatar}`;

      //   fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const user = await User.findByIdAndUpdate(req.user.id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//update address

router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );

      if (sameTypeAddress) {
        return next(
          new ErrorHandler(`${req.body.addressType} address already exists`)
        );
      }

      const existAddress = user.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password

router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("password");

      const isPasswordMatched = await user.comparePassword(req.body.oldPassword)

      if(!isPasswordMatched) {
        return (next(new ErrorHandler("Old password is incorrect", 400)))
      }

      if(req.body.newPassword !== req.body.confirmPassword) {
        return (next(new ErrorHandler("Passwords dosen't match with each other", 400)))
      }

      user.password = req.body.newPassword;

      await user.save();

      res.status(200).json({
        success: "true",
        message: "Password saved successfully"
      })

    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
