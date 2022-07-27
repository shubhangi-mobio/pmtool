const route = require("express").Router();
const AdminController = require("../controllers/admin.controllers");

const { AdminLoginValidation } = require("../validation/admin.validation");

route.post("/login", AdminLoginValidation(), AdminController.AdminLogin);

module.exports = route;
