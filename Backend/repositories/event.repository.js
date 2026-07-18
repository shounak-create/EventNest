import Event from "../models/Event.models.js";

export const createEvent = async (eventData) => {
    return await Event.create(eventData);
};

export const findEventById = async (eventId) => {
    return await Event.findById(eventId)
        .populate("organizer", "fullName email avatar");
};

// export const findAllEvents = async () => {
//     return await Event.find({
//         isPublished: true,
//     })
//         .populate("organizer", "fullName email avatar")
//         .sort({
//             startDate: 1,
//         });
// };

export const findAllEvents = async () => {
    return await Event.find()
        .populate("organizer", "fullName email avatar")
        .sort({ startDate: 1 });
};

export const findEventsByOrganizer = async (organizerId) => {
    return await Event.find({
        organizer: organizerId,
    }).sort({
        createdAt: -1,
    });
};

export const updateEvent = async (
    eventId,
    updateData
) => {
    return await Event.findByIdAndUpdate(
        eventId,
        updateData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

export const deleteEvent = async (eventId) => {
    return await Event.findByIdAndDelete(eventId);
};