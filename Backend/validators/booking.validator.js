import { body, param } from "express-validator";
import { validate } from "../validators/auth.validators.js";

export const createBookingValidation = [

    body("eventId")
        .notEmpty()
        .withMessage("Event ID is required.")
        .isMongoId()
        .withMessage("Invalid Event ID."),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),

    validate,

];

export const cancelBookingValidation = [

    param("id")
        .isMongoId()
        .withMessage("Invalid Booking ID."),

    validate,

];