import "dotenv/config";
console.log(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_FROM_EMAIL);

import app from "./app.js";
import connectDB from "./configs/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

startServer();