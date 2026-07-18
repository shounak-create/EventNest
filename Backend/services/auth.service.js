import { hashPassword,comparePassword  } from "../utils/encryption.js";

import {
    createUser,
    findUserByEmail,
    findUserByEmailWithPassword,
    findUserById,
} from "../repositories/auth.repository.js";

import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/token.js";

import { verifyRefreshToken } from "../utils/token.js";

import {
    deleteRefreshToken,
    findRefreshTokenByUserId,
    updateRefreshToken_refreshtoken,
} from "../repositories/refreshToken.repository.js";


export const registerUser = async ({ fullName, email, password }) => {
        // throw new Error("SERVICE IS RUNNING");


    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("User already exists.");
    }

    const hashedPassword = await hashPassword(password);

    // console.log("Original Password:", password);
    // console.log("Hashed Password:", hashedPassword);

    const user = await createUser({
        fullName,
        email,
        password: hashedPassword,
    });

    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

export const loginUser = async ({ email, password }) => {

    const user = await findUserByEmailWithPassword(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const isPasswordCorrect = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password.");
    }

    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    const hashedRefreshToken = await hashPassword(refreshToken);

    const decodedRefreshToken = verifyRefreshToken(refreshToken);

    await updateRefreshToken_refreshtoken(
    user._id,
    hashedRefreshToken,
    new Date(decodedRefreshToken.exp * 1000)
);

    const userObject = user.toObject();

    delete userObject.password;

    return {
        user: userObject,
        accessToken,
        refreshToken,
    };

};

export const getCurrentUser = async (userId) => {

    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    return user;

};
export const refreshUserToken = async (refreshToken) => {

    const decoded = verifyRefreshToken(refreshToken);

    const storedToken = await findRefreshTokenByUserId(decoded.id);

    if (!storedToken) {
        throw new Error("Invalid session.");
    }

    const isTokenValid = await comparePassword(
        refreshToken,
        storedToken.token
    );

    if (!isTokenValid) {
        throw new Error("Invalid session.");
    }

    const user = await findUserById(decoded.id);

    if (!user) {
        throw new Error("User not found.");
    }

    const newAccessToken = generateAccessToken(user);

    const newRefreshToken = generateRefreshToken(user);

    const hashedRefreshToken = await hashPassword(newRefreshToken);

    const decodedRefreshToken = verifyRefreshToken(newRefreshToken);

    await updateRefreshToken_refreshtoken(
        user._id,
        hashedRefreshToken,
        new Date(decodedRefreshToken.exp * 1000)
    );

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };

};

export const logoutUser = async (userId) => {

    await deleteRefreshToken(userId);

};