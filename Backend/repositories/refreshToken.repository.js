import RefreshToken from "../models/RefreshToken.models.js";

export const createRefreshToken = async (tokenData) => {
    return await RefreshToken.create(tokenData);
};

export const findRefreshTokenByUserId = async (userId) => {
    return await RefreshToken.findOne({ user: userId })
        .select("+token");
};

export const deleteRefreshToken = async (userId) => {
    return await RefreshToken.findOneAndDelete({
        user: userId,
    });
};

export const updateRefreshToken_refreshtoken = async (
    userId,
    token,
    expiresAt
) => {

    return await RefreshToken.findOneAndUpdate(
        { user: userId },
        {
            token,
            expiresAt,
        },
        {
            new: true,
            upsert: true,
            runValidators: true,
        }
    );

};