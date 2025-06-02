import { registerUser, loginUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const {token, user} = registerUser(name, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({message : "Register Success"});
})

export const login_user = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await loginUser(email, password);
        req.user = user;
        res.cookie("accessToken", token, cookieOptions);
        res.status(200).json({ user: user, message: "Login Successful" });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(error.statusCode || 401).json({ message: error.message || "Invalid credentials" });
    }
})

export const logout_user = wrapAsync(async (req, res) => {
    res.clearCookie("accessToken", cookieOptions);
    res.status(200).json({ message: "Logout Successful" });
})

export const get_current_user = wrapAsync(async (req, res) => {
    res.status(200).json({ user: req.user });
})