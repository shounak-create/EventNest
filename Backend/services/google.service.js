import {
    exchangeCodeForToken,
    getGoogleUser,
} from "../configs/google.config.js";

import {
    createUser,
    findUserByEmail,
    findUserByGoogleId,
    updateUser,
} from "../repositories/auth.repository.js";

import {
    updateRefreshToken_refreshtoken,
} from "../repositories/refreshToken.repository.js";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} from "../utils/token.js";

import {
    hashPassword,
} from "../utils/encryption.js";

export const handleGoogleCallback = async (code) => {

    // Exchange authorization code for Google access token
    const tokenData = await exchangeCodeForToken(code);

    // Fetch Google profile
    const googleUser = await getGoogleUser(tokenData.access_token);

    const {
        sub,
        email,
        name,
        picture,
        email_verified,
    } = googleUser;

    if (!email_verified) {
        throw new Error("Google email is not verified.");
    }

    // Check if Google account already exists
    let user = await findUserByGoogleId(sub);

    // If not, check by email
    if (!user) {

        user = await findUserByEmail(email);

        if (user) {

            // Link Google account
            user = await updateUser(user._id, {
                googleId: sub,
                avatar: user.avatar || picture,
                isVerified: true,
            });

        } else {

            // Register new Google user
            user = await createUser({
                fullName: name,
                email,
                googleId: sub,
                avatar: picture,
                password: null,
                isVerified: true,
            });

        }

    }

    // Generate JWTs
    const accessToken = generateAccessToken(user);

    const refreshToken = generateRefreshToken(user);

    // Hash refresh token
    const hashedRefreshToken = await hashPassword(refreshToken);

    // Decode refresh token expiry
    const decodedRefreshToken = verifyRefreshToken(refreshToken);

    // Store hashed refresh token
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