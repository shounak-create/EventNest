import sgMail from "../configs/sendgrid.js";

export const sendEmail = async ({
    to,
    subject,
    html,
}) => {

    const message = {

        to,

        from: {

            email: process.env.SENDGRID_FROM_EMAIL,

            name: process.env.SENDGRID_FROM_NAME,

        },

        subject,

        html,

    };

    await sgMail.send(message);

};