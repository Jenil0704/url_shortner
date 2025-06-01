import { findUserByEmail, createUser, findUserByEmailAndPassword } from "../dao/user.dao.js";
import { ConflictError } from "../utils/errorHandler.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async(name, email, password) => {
    const user = await findUserByEmail(email);
    if(user) throw new ConflictError("User already exists");

    const newUser = await createUser(name, email, password);
    const token = await signToken({id : newUser._id});
    return {token, user : newUser};
}

export const loginUser = async(email, password) => {
    const user = await findUserByEmailAndPassword(email)
    if(!user) {
        console.log("User not found with email:", email);
        throw new Error("Invalid email or password");
    }

    try {
        const isPasswordValid = await user.comparePassword(password);
        console.log("Password validation result:", isPasswordValid);
        
        if(!isPasswordValid) {
            throw new Error("Invalid email or password");
        }
        
        const token = signToken({id: user._id});
        return {token, user};
    } catch (error) {
        console.error("Password comparison error:", error);
        throw new Error("Invalid email or password");
    }
}