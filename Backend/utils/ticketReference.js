import crypto from "crypto";

const PREFIX = "EVN";
const RANDOM_BYTES = 3;

export const generateTicketReference = () => {

    const randomCode = crypto
        .randomBytes(RANDOM_BYTES)
        .toString("hex")
        .toUpperCase();

    return `${PREFIX}-${randomCode}`;

};