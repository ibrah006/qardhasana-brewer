import { schema, OutputType } from "./forgot_password_otp_GET.schema";
import superjson from "superjson";
import { db } from "../../helpers/db";
import {
  generateOTP,
  hashOTP,
  cleanupOTPs,
  storeOTP,
} from "../../helpers/widgetAuthUtils";
import nodemailer from "nodemailer";

const OTP_EXPIRY_MINUTES = 5;

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const mailOptions = {
    from: `"QardHasana" <support@qardhasana.com>`,
    to: email,
    subject: "Password Reset Code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #15803d 0%, #16a34a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .otp-box { background: white; border: 2px solid #15803d; border-radius: 10px; padding: 20px; text-align: center; margin: 20px 0; }
          .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #15803d; font-family: 'Courier New', monospace; }
          .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Verification Code</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>Your reset password code for QardHasana is:</p>
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
            </div>
            <p>This code will expire in ${OTP_EXPIRY_MINUTES} minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
            <div class="footer">
              <p>© ${new Date().getFullYear()} QardHasana. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Your QardHasana verification code is: ${otp}. This code will expire in ${OTP_EXPIRY_MINUTES} minutes.`,
  };

  await transporter.sendMail(mailOptions);
}

export const handle = async (request: Request): Promise<Response> => {
  try {
    const json = await request.json();
    const { email, debugMode } = schema.parse(json);

    // 1. Generate OTP and hash it
    const otp = generateOTP();
    const otpHash = await hashOTP(otp);

    if (!debugMode) await sendOTPEmail(email, otp);

    // 2. Clean up any existing OTPs for this email
    await cleanupOTPs(email, db);

    // 3. Store the new OTP in the database
    await storeOTP(email, otpHash, db);

    // 4. Send success response
    // NOTE: In a production environment without an email service yet,
    // we return the OTP for testing purposes. This should be removed
    // once email sending is implemented.
    const responseBody: OutputType = {
      message: "OTP has been sent to your email.",
      ... debugMode===true? { otpForTesting: otp } : {},
    };

    return new Response(superjson.stringify(responseBody), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Widget login error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(superjson.stringify({ error: errorMessage }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
