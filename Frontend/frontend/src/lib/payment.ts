import api from "./api";

export interface CreateOrderResponse {
orderId: string;
amount: number;
currency: string;
key: string;
}

export interface VerifyPaymentData {
razorpay_order_id: string;
razorpay_payment_id: string;
razorpay_signature: string;
}

export const createPaymentOrder = async (
eventId: string,
quantity: number
) => {
const response = await api.post("/payments/create-order", {
eventId,
quantity,
});


return response.data.data as CreateOrderResponse;


};

export const verifyPayment = async (
paymentData: VerifyPaymentData
) => {
const response = await api.post(
"/payments/verify",
paymentData
);


return response.data.data;


};
