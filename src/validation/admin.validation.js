const { body } = require("express-validator");

exports.AdminLoginValidation = () => {
  return [
    body("email").isEmail().withMessage("please enter valid email"),
    body("password")
      .isString()
      .isLength({ min: 6 })
      .withMessage("password length is too short."),
  ];
};
