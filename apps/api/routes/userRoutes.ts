import { Router } from "express";
import { registerUser } from "../controllers/registerController"; // Updated import
import { loginUser } from "../controllers/loginController"; // Updated import
import { body } from "express-validator";
import { authenticateToken } from "../middleware/authMiddleware"; // Import the middleware

const router = Router();

// User registration route
router.post(
  "/register",
  [
    body("first_name").notEmpty().withMessage("First Name is required"),
    body("last_name").notEmpty().withMessage("Last Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

// User login route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

// Example of a protected route
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

export default router;
