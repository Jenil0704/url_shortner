import jsonwebToken from "jsonwebtoken";
import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";

export const generateNanoId = (length) => {
    return nanoid(length)
}

export const signToken = (payload) => {
    return jsonwebToken.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
}

export const verifyToken = (token) => {
    const decoded = jsonwebToken.verify(token, process.env.JWT_SECRET);
    return decoded.id;
}