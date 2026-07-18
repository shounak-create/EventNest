import { body, validationResult } from "express-validator";

export const createEventValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters."),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required.")
        .isLength({ min: 10, max: 5000 })
        .withMessage("Description must be between 10 and 5000 characters."),

    body("category")
        .notEmpty()
        .withMessage("Category is required.")
        .isIn([
            "Music",
            "Sports",
            "Technology",
            "Business",
            "Education",
            "Food",
            "Comedy",
            "Workshop",
            "Festival",
            "Other",
        ])
        .withMessage("Invalid category."),

    body("venue")
        .trim()
        .notEmpty()
        .withMessage("Venue is required."),

    body("city")
        .trim()
        .notEmpty()
        .withMessage("City is required."),

    body("state")
        .trim()
        .notEmpty()
        .withMessage("State is required."),

    body("country")
        .trim()
        .notEmpty()
        .withMessage("Country is required."),

    body("startDate")
        .isISO8601()
        .withMessage("Invalid start date."),

    body("endDate")
        .isISO8601()
        .withMessage("Invalid end date."),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than or equal to 0."),

    body("capacity")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1."),

    validate,
];

export const updateEventValidation = [

    body("title")
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 }),

    body("description")
        .optional()
        .trim()
        .isLength({ min: 10, max: 5000 }),

    body("category")
        .optional()
        .isIn([
            "Music",
            "Sports",
            "Technology",
            "Business",
            "Education",
            "Food",
            "Comedy",
            "Workshop",
            "Festival",
            "Other",
        ]),

    body("venue")
        .optional()
        .trim(),

    body("city")
        .optional()
        .trim(),

    body("state")
        .optional()
        .trim(),

    body("country")
        .optional()
        .trim(),

    body("startDate")
        .optional()
        .isISO8601(),

    body("endDate")
        .optional()
        .isISO8601(),

    body("price")
        .optional()
        .isFloat({ min: 0 }),

    body("capacity")
        .optional()
        .isInt({ min: 1 }),

    validate,
];

function validate(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });

    }

    next();

}