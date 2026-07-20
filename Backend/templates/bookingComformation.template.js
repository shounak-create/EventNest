const COLORS = {
    primary: "#2563EB",
    success: "#16A34A",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#1F2937",
    muted: "#6B7280",
    border: "#E5E7EB",
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};

export const bookingConfirmationTemplate = ({
    fullName,
    eventTitle,
    venue,
    eventDate,
    quantity,
    ticketReference,
    qrCode,
}) => {
    return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />
<title>Booking Confirmed</title>
</head>

<body style="
margin:0;
padding:40px 0;
background:${COLORS.background};
font-family:Arial,Helvetica,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
width="600"
cellpadding="0"
cellspacing="0"
style="
background:${COLORS.card};
border-radius:12px;
overflow:hidden;
border:1px solid ${COLORS.border};
">

<!-- HEADER -->

<tr>
<td
style="
background:${COLORS.primary};
padding:30px;
text-align:center;
color:white;
">

<h1 style="margin:0;font-size:32px;">
🎟 EventNest
</h1>

<p
style="
margin-top:10px;
font-size:18px;
">
Booking Confirmed
</p>

</td>
</tr>

<!-- GREETING -->

<tr>
<td
style="
padding:30px;
color:${COLORS.text};
">

<h2
style="
margin-top:0;
">
Hello ${fullName},
</h2>

<p
style="
font-size:16px;
line-height:26px;
">

Your booking has been successfully confirmed.

We're excited to see you at the event!

</p>

</td>
</tr>

<!-- EVENT DETAILS -->

<tr>
<td style="padding:0 30px 30px;">

<table
width="100%"
cellpadding="12"
cellspacing="0"
style="
border:1px solid ${COLORS.border};
border-radius:10px;
">

<tr>
<td colspan="2"
style="
background:${COLORS.background};
font-weight:bold;
font-size:18px;
">

📍 Event Details

</td>
</tr>

<tr>

<td><strong>Event</strong></td>

<td>${eventTitle}</td>

</tr>

<tr>

<td><strong>Venue</strong></td>

<td>${venue}</td>

</tr>

<tr>

<td><strong>Date</strong></td>

<td>${formatDate(eventDate)}</td>

</tr>

<tr>

<td><strong>Quantity</strong></td>

<td>${quantity}</td>

</tr>

<tr>

<td><strong>Ticket</strong></td>

<td>

<span
style="
color:${COLORS.success};
font-weight:bold;
">

${ticketReference}

</span>

</td>

</tr>

</table>

</td>
</tr>

<!-- QR -->

<tr>

<td align="center">

<h3
style="
color:${COLORS.text};
margin-bottom:5px;
">

Scan this QR at the entrance

</h3>

<img
src="${qrCode}"
alt="QR Code"
width="220"
height="220"
/>

</td>

</tr>

<!-- INFO -->

<tr>

<td
style="
padding:30px;
text-align:center;
color:${COLORS.muted};
font-size:15px;
line-height:24px;
">

Please keep this email safe.

You'll need this QR code during check-in.

</td>

</tr>

<!-- FUTURE ACTIONS -->

<tr>

<td
style="
padding:0 30px 30px;
">

<table
width="100%"
cellpadding="10"
cellspacing="0"
style="
border:1px dashed ${COLORS.border};
border-radius:10px;
">

<tr>

<td
style="
font-weight:bold;
">

🚀 Coming Soon

</td>

</tr>

<tr>

<td>

• Download PDF Ticket

</td>

</tr>

<tr>

<td>

• Add to Google Calendar

</td>

</tr>

<tr>

<td>

• View Booking Online

</td>

</tr>

<tr>

<td>

• Contact Organizer

</td>

</tr>

<tr>

<td>

• Event Reminders

</td>

</tr>

</table>

</td>

</tr>

<!-- FOOTER -->

<tr>

<td
style="
background:${COLORS.background};
padding:25px;
text-align:center;
font-size:13px;
color:${COLORS.muted};
">

Need help?

<br><br>

<strong>support@eventnest.com</strong>

<br><br>

© ${new Date().getFullYear()} EventNest

</td>

</tr>

</table>

</td>
</tr>
</table>

</body>

</html>
`;
};