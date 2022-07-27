
const route = require("express").Router();
const AuthController = require("../controllers/auth.controllers");
const  auth  = require("../middleware/auth.middleware");
const { LoginValidation, forgotValidation, changeValidation, resetValidation } = require("../validation/user.validation");

route.get("/login", LoginValidation(), AuthController.UserLogin);
route.get("/profile", AuthController.UserProfile);
route.patch("/update/:id", auth, AuthController.UpdateProfile);
route.post("/forgotpassword", forgotValidation(), AuthController.forgotPassword);
route.delete("/logout/:id", auth, AuthController.logoutUser);
route.patch("/password-change/:id", changeValidation(), AuthController.changePassword);
route.post("/resetpassword", resetValidation(), AuthController.resetPassword);

module.exports = route;

