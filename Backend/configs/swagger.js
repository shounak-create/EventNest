import swaggerJSDoc from "swagger-jsdoc";

const options = {

    definition: {

        openapi: "3.0.0",

        info: {

            title: "EventNest API",

            version: "1.0.0",

            description:
                "Production-ready Event Management & Ticketing API built with Node.js, Express.js, MongoDB, Redis and Razorpay.",

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

const swaggerSpec =
    swaggerJSDoc(options);

export default swaggerSpec;