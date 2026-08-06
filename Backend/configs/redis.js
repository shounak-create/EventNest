import { createClient } from "redis";

const redis = createClient({

    url: process.env.REDIS_URL,

});

redis.on("connect", () => {

    console.log("🟡 Connecting to Redis...");

});

redis.on("ready", () => {

    console.log("🟢 Redis Connected");

});

redis.on("error", (error) => {

    console.error("🔴 Redis Error:", error);

});

export default redis;