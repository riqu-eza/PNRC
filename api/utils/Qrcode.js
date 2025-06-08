import QRCode from "qrcode";

export const generateQRCode = async (bookingUrl) => {
  try {
    const qrCodeUrl = await QRCode.toDataURL(bookingUrl);
    // console.log("QR Code successfully generated:", qrCodeUrl);
    return qrCodeUrl;
  } catch (error) {
    console.error("QR Code generation failed:", error);
    return null; // Return null if QR code generation fails
  }
};
