import { Router } from "express";

import {register,login,me,refreshToken, logout} from "../controllers/auth.controller.js";

import {registerValidation,loginValidation,validate} from "../validators/auth.validators.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerValidation, validate, register);

router.post("/login", loginValidation, validate, login);

router.get("/me", requireAuth, me);

router.post("/refresh-token", refreshToken);

router.post("/logout",requireAuth,logout);

export default router;
