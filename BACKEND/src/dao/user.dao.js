import user from "../models/user.model.js";
import urlSchema from "../models/short_url.model.js";

export const findUserByEmail = async (email) => {
    return await user.findOne({email});
}

export const findUserByEmailAndPassword = async (email) => {
    return await user.findOne({email}).select('+password')
}

export const findUserById = async (id) => {
    return await user.findById(id);
}

export const createUser = async (name, email, password) => {
    const newUser = new user({
        name,
        email,
        password
    });
    await newUser.save();
    return newUser;
}

export const getAllUserUrlsDao = async (id) => {
    return await urlSchema.find({user : id});
}