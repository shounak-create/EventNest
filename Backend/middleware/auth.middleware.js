import { verifyAccessToken } from "../utils/token.js";

export const requireAuth = (req, res, next) => {

    try {

        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Please login to continue."
            });
        }

        const decoded = verifyAccessToken(accessToken);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired access token."
        });

    }

};