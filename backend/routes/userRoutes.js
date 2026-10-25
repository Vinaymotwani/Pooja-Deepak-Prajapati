const express = require("express");
const rateLimit = require("express-rate-limit");
const { body } = require("express-validator");

const {
  registerUser,
  loginUser,
  getProfile,
  adminDashboard
} = require("../controllers/userController");

const {
  authMiddleware,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message: "Too many authentication attempts. Please try again later."
  }
});

const validateRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name cannot exceed 100 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .isString()
    .isLength({ min: 8, max: 72 })
    .withMessage("Password must contain between 8 and 72 characters")
];

const validateLogin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .isString()
    .notEmpty()
    .withMessage("Password is required")
];

router.post(
  "/register",
  authLimiter,
  validateRegistration,
  registerUser
);

router.post(
  "/login",
  authLimiter,
  validateLogin,
  loginUser
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.get(
  "/admin",
  authMiddleware,
  authorizeRoles("admin"),
  adminDashboard
);

module.exports = router;
