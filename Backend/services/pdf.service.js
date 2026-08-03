import puppeteer from "puppeteer";
import QRCode from "qrcode";

import ticketTemplate from "../templates/ticket.template.js";

export const generateTicketPDF = async (booking) => {

    const qrCode = await QRCode.toDataURL(
        booking.ticketReference,
        {
            width:250,
            margin:2,
            errorCorrectionLevel:"H",
        }
    );

    const html = ticketTemplate({

        attendeeName:
            booking.attendee.fullName,

        eventTitle:
            booking.event.title,

        venue:
            booking.event.venue,

        city:
            booking.event.city,

        startDate:
            booking.event.startDate,

        quantity:
            booking.quantity,

        ticketReference:
            booking.ticketReference,

        qrCode,

    });

    const browser =
        await puppeteer.launch({

            headless:true,

            args:[
                "--no-sandbox",
                "--disable-setuid-sandbox",
            ],

        });

    const page =
        await browser.newPage();

    await page.setContent(
        html,
        {
            waitUntil:"networkidle0",
        }
    );

    const pdf =
        await page.pdf({

            format:"A4",

            printBackground:true,

        });

    await browser.close();

    return pdf;

};