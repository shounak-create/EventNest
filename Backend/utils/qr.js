import QRCode from "qrcode";

export const generateQRCode = async (payload) => {

    const qrPayload = JSON.stringify({
        version: 1,
        ...payload,
    });

    return await QRCode.toDataURL(
        qrPayload,
        {
            errorCorrectionLevel: "H",
            type: "image/png",
            margin: 2,
            width: 300,
        }
    );

};