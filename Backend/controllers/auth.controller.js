import { generateGoogleAuthUrl } from "../configs/google.config.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshUserToken,
  logoutUser,
} from "../services/auth.service.js";

import { setAuthCookies } from "../utils/cookies.js";

import { handleGoogleCallback } from "../services/google.service.js";
// import { setAuthCookies } from "../utils/cookies.js";

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await registerUser({
      fullName,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await loginUser({
      email,
      password,
    });

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Please login again.",
      });
    }

    const tokens = await refreshUserToken(refreshToken);

    setAuthCookies(res, tokens.accessToken, tokens.refreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await logoutUser(req.user.id);

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const googleLogin = (req, res) => {
  const url = generateGoogleAuthUrl();

  res.redirect(url);
};

export const googleCallback = async (req, res, next) => {
    try {

        const { code } = req.query;

        const {
            user,
            accessToken,
            refreshToken,
        } = await handleGoogleCallback(code);

        setAuthCookies(
            res,
            accessToken,
            refreshToken
        );

        return res.redirect("http://localhost:5173");

    } catch (error) {
        next(error);
    }
};