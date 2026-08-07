import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {

        openapi: "3.0.0",

        info: {

            title: "EventNest API",

            version: "1.0.0",

            description:
                "Production-ready Event Management & Ticketing API built with Node.js, Express.js, MongoDB, Redis, Razorpay and SendGrid.",

        },

        servers: [

            {

                url: "http://localhost:5000",

                description: "Local Development Server",

            },

        ],

        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT",

                },

            },

            schemas: {

                RegisterRequest: {

                    type: "object",

                    required: [
                        "fullName",
                        "email",
                        "password",
                    ],

                    properties: {

                        fullName: {
                            type: "string",
                            example: "Shounak Pandit",
                        },

                        email: {
                            type: "string",
                            example: "shounak@gmail.com",
                        },

                        password: {
                            type: "string",
                            example: "Password@123",
                        },

                    },

                },

                LoginRequest: {

                    type: "object",

                    required: [
                        "email",
                        "password",
                    ],

                    properties: {

                        email: {
                            type: "string",
                            example: "shounak@gmail.com",
                        },

                        password: {
                            type: "string",
                            example: "Password@123",
                        },

                    },

                },

                CreateEventRequest: {

                    type: "object",

                    required: [

                        "title",
                        "description",
                        "venue",
                        "startDate",
                        "endDate",
                        "totalSeats",
                        "price",

                    ],

                    properties: {

                        title: {
                            type: "string",
                            example: "Tech Conference 2026",
                        },

                        description: {
                            type: "string",
                            example: "Annual technology conference.",
                        },

                        venue: {
                            type: "string",
                            example: "Mumbai",
                        },

                        startDate: {
                            type: "string",
                            format: "date-time",
                        },

                        endDate: {
                            type: "string",
                            format: "date-time",
                        },

                        totalSeats: {
                            type: "integer",
                            example: 300,
                        },

                        price: {
                            type: "number",
                            example: 499,
                        },

                    },

                },

                CreateBookingRequest: {

                    type: "object",

                    required: [

                        "eventId",
                        "quantity",

                    ],

                    properties: {

                        eventId: {

                            type: "string",

                            example: "688ef6c5eb92451f52f8f47c",

                        },

                        quantity: {

                            type: "integer",

                            example: 2,

                        },

                    },

                },

                VerifyPaymentRequest: {

                    type: "object",

                    required: [

                        "razorpay_order_id",
                        "razorpay_payment_id",
                        "razorpay_signature",

                    ],

                    properties: {

                        razorpay_order_id: {
                            type: "string",
                        },

                        razorpay_payment_id: {
                            type: "string",
                        },

                        razorpay_signature: {
                            type: "string",
                        },

                    },

                },

                CheckInRequest: {

                    type: "object",

                    required: [

                        "ticketReference",

                    ],

                    properties: {

                        ticketReference: {

                            type: "string",

                            example: "EVN-7A8F4B2C",

                        },

                    },

                },

            },

        },

        security: [

            {

                bearerAuth: [],

            },

        ],

    },

    apis: [

        "./routes/*.js",

    ],

};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;