import express from "express";
import {
    createUser,
    readAllUsers,
    updateUser,
    deleteUser,
    login,
    logout,
    getAsingleUser
} from "../../controllers/user/user.Controller.js"
import authentication from "../../middlewares/authentication.js"

const router = express.Router();

// route:  POST /api/user/
// desc:   creating a user
// access: NOT-PROTECTED
router.post("/", createUser);


// route:  GET /api/user/
// desc:   get all users
// access: PROTECTED
router.get("/", authentication, readAllUsers);


// route:  GET /api/user/:id
// desc:   get single user by id
// access: PROTECTED
router.get("/:id", getAsingleUser);


// route:  PATCH /api/user/
// desc:   update authenticated user
// access: PROTECTED
router.patch("/",authentication, updateUser);



// route:  DELETE /api/user/
// desc:   delete authenticated user.
// access: PROTECTED
router.delete("/",authentication, deleteUser);



// route:  POST /api/user/login
// desc:   login/authenticate user.
// access: NOT-PROTECTED
router.post("/login", login);



// route:  POST /api/user/logout
// desc:   logout user.
// access: NOT-PROTECTED
router.post("/logout", logout);

export default router;