import redis from "../configs/redis.js";

const getSeatLockKey = (eventId, attendeeId) => {
    return `seat-lock:${eventId}:${attendeeId}`;
};

export const lockSeats = async (
    eventId,
    attendeeId,
    quantity,
    ttl = 600
) => {

    const key = getSeatLockKey(
        eventId,
        attendeeId
    );

    const exists = await redis.exists(key);

    if (exists) {
        throw new Error(
            "You already have seats reserved."
        );
    }

    await redis.set(
        key,
        JSON.stringify({
            eventId,
            attendeeId,
            quantity,
        }),
        {
            EX: ttl,
        }
    );

    return key;

};

export const getSeatLock = async (
    eventId,
    attendeeId
) => {

    const key = getSeatLockKey(
        eventId,
        attendeeId
    );

    const data = await redis.get(key);

    if (!data) {
        return null;
    }

    return JSON.parse(data);

};

export const releaseSeatLock = async (
    eventId,
    attendeeId
) => {

    const key = getSeatLockKey(
        eventId,
        attendeeId
    );

    await redis.del(key);

};

export const initializeEventSeats = async (
    eventId,
    seats
) => {

    const key = `event-seats:${eventId}`;

    const exists = await redis.exists(key);

    if (!exists) {

        await redis.set(
            key,
            seats
        );

    }

};

export const reserveSeats = async (
    eventId,
    quantity
) => {

    const key = `event-seats:${eventId}`;

    const availableSeats =
        Number(await redis.get(key));

    if (availableSeats < quantity) {

        throw new Error(
            "Not enough seats available."
        );

    }

    await redis.decrBy(
        key,
        quantity
    );

};

export const releaseReservedSeats = async (
    eventId,
    quantity
) => {

    const key = `event-seats:${eventId}`;

    await redis.incrBy(
        key,
        quantity
    );

};