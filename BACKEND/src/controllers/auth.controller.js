import { registerUser, loginUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { cookieOptions } from "../config/config.js";

export const register_user = wrapAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const token = registerUser(name, email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({message : "Login Successfull"});
})

export const login_user = wrapAsync(async (req, res) => {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({message : "Login Successfull"});
})