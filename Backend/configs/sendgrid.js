import sgMail from "@sendgrid/mail";
console.log("SENDGRID KEY EXISTS:", !!process.env.SENDGRID_API_KEY);
console.log(
  "SENDGRID KEY PREFIX:",
  process.env.SENDGRID_API_KEY?.slice(0, 3)
);
console.log(process.env.SENDGRID_API_KEY);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default sgMail;