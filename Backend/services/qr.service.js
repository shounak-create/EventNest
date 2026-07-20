import { generateTicketReference } from "../utils/ticketReference.js";
import { generateQRCode } from "../utils/qr.js";

export const generateTicket = async () => {

    const ticketReference =
        generateTicketReference();

    const qrCode =
        await generateQRCode({
            ticketReference,
        });

    return {

        ticketReference,

        qrCode,

    };

};