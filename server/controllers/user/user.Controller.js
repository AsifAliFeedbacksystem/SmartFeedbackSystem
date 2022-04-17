import { response } from "express";
import userModel from "../../models/user/user.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt_secrete_key } from "../../config/jwt.js"


// route:  POST /api/user/
// desc:   creating a user
// access: NOT-PROTECTED
const createUser = async (req, res, next) => {
    try {

        // checking if email already exist
        if (await userModel.findOne({ email: req.body.email })) {
            res.status(400).json({ errorMsg: "E-mail already exist" });
        }

        const user = new userModel(req.body);

        //hashing password
        user.hashPassword = await bcrypt.hash(req.body.password, 10);

        user.role = "user";
        user.pointsGenerated = 0;
        user.nextFeedback = Date.now();

        //  saving user data in DB
        await user.save();
        res.status(201).json({ successMsg: "User created successfully" });
    }
    catch (err) {
        next(err);
    }
};


// route:  GET /api/user/
// desc:   get all users
// access: PROTECTED
const readAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find();
        if (!users) {
            return res.status(500).json({ errorMsg: "server error" });
        }
        return res.status(200).send(users);
    }
    catch (err) {
        next(err);
    }
};


// route:  GET /api/user/:id
// desc:   get a single user by id
// access: PROTECTED
const getAsingleUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(500).json({ errorMsg: "server error" });
        }
        return res.status(200).send(user);
    }
    catch (err) {
        next(err);
    }
};


// route:  PATCH /api/user/
// desc:   update authenticated user
// access: PROTECTED
const updateUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        // const userId = "6234de111d234428f638f588";

        const updateduser = {};
        
        if (req.body.email !== undefined || req.body.email !== null ) {
            updateduser.email = req.body.email;
        }
        
        // check if email already exist
        if (await userModel.findOne({ email: req.body.email })) {
            res.status(400).json({ errorMsg: "E-mail already exist" });// 400 for bad request
        }

        if (req.body.userName !== undefined) {
            updateduser.userName = req.body.userName;

        }
        if (req.body.phone1 !== undefined) {
            updateduser.phone1 = req.body.phone1;

        }

        //hashing password
        let hashPassword;
        if (req.body.password !== undefined) {
            hashPassword = await bcrypt.hash(req.body.password, 10);
            updateduser.hashPassword =  hashPassword;
        }

        const response = await userModel.updateOne({ _id: userId }, { $set: updateduser });

        // checking if document is updated in DB
        if (response.modifiedCount !== 1) {
            return res.status(500).json({ errorMsg: "server error" })
        }

        return res.status(200).json({ successMsg: "Updated successfully" })
    }
    catch (err) {
        next(err);
        console.log(err);
    }
};


// route:  DELETE /api/user/
// desc:   delete authenticated user.
// access: PROTECTED
const deleteUser = async (req, res, next) => {
    try {
        const userId = req.userId;
        // const userId = "6234ddaf1d234428f638f584";
        const response = await userModel.deleteOne({ _id: userId });

        // checking if document is deleted in DB
        if (response.deletedCount !== 1) {
            return res.status(500).send({ errorMsg: "server error" });
        }

        return res.status(200).send({ successMsg: "User deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};


// route:  POST /api/user/login
// desc:   login/authenticate user.
// access: NOT-PROTECTED
const login = async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });

        // checking if email does not exist
        if (!user || !await bcrypt.compare(req.body.password, user.hashPassword)) {
            return res.status(400).json({ errorMsg: "E-mail or Password is incorrect" })
        }

        // generating json web token
        const token = await jwt.sign({ id: user._id, role: user.role }, jwt_secrete_key, { expiresIn: "1h" });

        res.cookie("AuthToken", token, { expire: Date.now() + 3600000, sameSite: 'none', secure: true }); //3600000ms is 1hour
        return res.status(200).send(user);
    }
    catch (err) {
        next(err);
        console.log(err)
    }
};


// route:  POST /api/user/logout
// desc:   logout user.
// access: NOT-PROTECTED
const logout = async (req, res, next) => {
    try {
        res
            .clearCookie("AuthToken")
            .status(200)
            .send("user logged out successfully");
    }
    catch (err) {
        next(err);
        console.log(err)
    }
};

export {
    createUser,
    readAllUsers,
    updateUser,
    deleteUser,
    login,
    logout,
    getAsingleUser
};