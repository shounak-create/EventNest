import User from "../models/User.models.js";

export const createUser = async (userData) => {
    return await User.create(userData);
};

export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const findUserById = async (id) => {
    return await User.findById(id);
};

// export const updateUser = async (id, updateData) => {
//     return await User.findByIdAndUpdate(id, updateData, {
//         new: true,
//         runValidators: true,
//     });
// };

export const findUserByEmailWithPassword = async (email) => {

    return await User.findOne({ email })
        .select("+password +refreshToken");

};

// export const updateRefreshToken = async (userId, refreshToken) => {
//     return await User.findByIdAndUpdate(
//         userId,
//         {
//             refreshToken,
//         },
//         {
//             new: true,
//         }
//     );
// };

export const saveRefreshToken = async (userId, refreshToken) => {

    return await User.findByIdAndUpdate(
        userId,
        {
            refreshToken,
        },
        {
            new: true,
            runValidators: true,
        }
    );

};

// export const deleteRefreshToken = async (userId) => {
//     return await RefreshToken.findOneAndDelete({
//         user: userId,
//     });
// };

// Google signin


export const findUserByGoogleId = async (googleId) => {
    return await User.findOne({ googleId });
};

export const updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(
        userId,
        updateData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

// export const findUserByGoogleId = async (googleId) => {
//     return await User.findOne({ googleId });
// };