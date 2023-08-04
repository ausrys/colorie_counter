const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");
// Register new user
router.post("/register", authController.post_register);
// Login
router.post("/login", authController.post_login);
router.get("/getcookie", authController.get_cookie);
router.post("/logout", authController.logOut);
module.exports = router;
