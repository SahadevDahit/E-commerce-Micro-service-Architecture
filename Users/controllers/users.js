import users from "../models/users.js";
import business from '../models/business.js'
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcryptjs";

export const signup = asyncHandler(async (req, res) => {
    let {
        email
    } = req.body;
    // Check user exists
    const userExists = await users.findOne({
        email
    });
    if (userExists) {
        // throw
        throw new Error("User already exists");
    }
    const new_User = new users({
        name: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        dob: req.body.dob,
        gender: req.body.gender,
        role: req.body.role,
        phoneNumber: req.body.phoneNo,
        profileImage: req.body.profileImage,
    })

    if (req.body.role === "seller") {
        new_User.authenticated = false
    }
    await users.create(new_User)
    if (req.file) {
        let businesslogo = await cloudinary.uploader.upload(req.file.path, {
            folder: 'businessLogo'
        });
        if(!businesslogo){
            throw new Error("Error uploading business logo");
        }
        const newBusiness = new business({
            name: req.body.name,
            contact: req.body.contact,
            businessEmail: req.body.businessEmail,
            address: req.body.address,
            description: req.body.description,
            panNumber: req.body.pan,
            website: req.body.website,
            logoUrl: businesslogo?.secure_url,
            logoId: businesslogo?.public_id,
            userId: new_User.id
        })
        await newBusiness.save();
        await users.findOneAndUpdate({
            _id: new_User._id
        }, {
            business: newBusiness._id
        }, {
            new: true
        });
    }
    return res.status(200).json({
        mesage: "Sucessfully signup",
    })
});
export const login = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    //Find the user in db by email only
    const userFound = await users.findOne({
        email
    });
    if (!userFound) {
        throw new Error('Not registered.....');

    }
    if (!userFound.authenticated) {
        throw new Error('User is not authenticated/verified');
    }
    if (userFound && (await bcrypt.compare(password, userFound?.password))) {
        res.json({
            status: "success",
            message: "User logged in successfully",
            userFound,
            token: generateToken(userFound?._id, userFound?.role),
        });
    } else {
        throw new Error("Invalid login credentials");
    }
});

export const getUserRole = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    //find the user
    const user = await users.findById(userAuthId,"role");
    if (!user) {
        throw new Error('user not found')
    }
    const role=user.role;
    res.json({
        status: "success",
        message: "user role fetched successfully",
        role
    });
});

export const getUserProfile = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    //find the user
    const user = await users.findById(userAuthId).populate('shippingAddress').populate('business');;
    if (!user) {
        throw new Error('user not found')
    }
    res.json({
        status: "success",
        message: "user profile fetched successfully",
        user,
    });
});

export const getAllUsers = asyncHandler(async (req, res) => {
    //find the user
    const user = await users.find().populate('shippingAddress').populate('business');;
    if (!user) {
        throw new Error('user not found')
    }
    res.json({
        status: "success",
        message: "user profile fetched successfully",
        user,
    });
});

export const getUserProfileOfSeller = asyncHandler(async (req, res) => {
    //find the user
    const user = await users.findById(req.params.id).populate('shippingAddress').populate('business');;
    if (!user) {
        throw new Error('user not found')
    }
    res.json({
        status: "success",
        message: "user profile fetched successfully",
        user,
    });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    let user = await users.findOneAndUpdate({
        _id: userAuthId
    }, req.body, {
        new: true
    });
    res.json({
        status: "success",
        message: "user profile updated successfully",
    });
});
export const updateProfileById = asyncHandler(async (req, res) => {
    let user = await users.findOneAndUpdate(
      { _id: req.params.id },
      { authenticated: req.body.authenticated },
      { new: true }
    );
    
    res.json({
      status: "success",
      message: "User profile updated successfully",
    });
  });
  
export const updatePassword = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    const userFound = await users.findOne({
        _id: userAuthId
    })
    if (!userFound) {
        throw new Error('User Not Found')
    }

    if (userFound && (await bcrypt.compare(req.body.oldPassword, userFound?.password))) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

        const updatePass = await users.findOneAndUpdate({
            _id: userAuthId
        }, {
            password: hashedPassword
        }, {
            new: true
        });
        if (!updatePass) {
            throw new Error("Error in updating Password");
        }
        res.json({
            status: "success",
            message: "Password Changed sucessfully",
        });
    } else {
        throw new Error("Invalid Old Password");
    }
});

export const changePassword = asyncHandler(async (req, res) => {
    const userFound = await users.findOne({
        email: req.body.email
    })
    if (!userFound) {
        throw new Error('User is not registered');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    const updatePass = await users.findOneAndUpdate({
        _id: userFound._id
    }, {
        password: hashedPassword
    }, {
        new: true
    });
    if (!updatePass) {
        throw new Error("Error in updating Password");
    }
    res.json({
        status: "success",
        message: "Password Changed sucessfully",
    });
});
export const getBusinessInfo = asyncHandler(async (req, res) => {
    const businessFound = await business.findOne({
        userId: req.params.id
    });
    res.json({
        status: "success",
        message: "Business information fetched successfully",
        businessFound
    });
})
export const updateBusiness = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    const businessFound = await business.findOne({
        userId: userAuthId
    });
    if (!businessFound) {
        throw new Error('Business record not found')
    }
    const updateBusiness = await business.findOneAndUpdate({
            userId: userAuthId
        },
        req.body, {
            new: true
        })

    if (!updateBusiness) {
        throw new Error('Unable to update')
    }
    res.json({
        status: "success",
        message: "Business information updated successfully",
    });
});

export const getUserProfileById = asyncHandler(async (req, res) => {
    const userAuthId = req.get('user-auth-id')
    //find the user
    const id=req.params.id;
    const user = await users.findOne({_id:id}).select("name profileImage");
    if (!user) {
        throw new Error('user not found')
    }
    res.json({
        status: "success",
        message: "user profile fetched successfully",
        user,
    });
});