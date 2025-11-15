import { z } from "zod";
import { User } from "../../helpers/User";

export const schema = z.object({
  email: z.string().email("Email is required"),
  debugMode: z.boolean().optional()
});

export type OutputType = {
  message: string;
  testingOtp?: string;
  error?: string
};

export const getForgotPasswordOtp = async (
  body: z.infer<typeof schema>,
  init?: RequestInit
): Promise<OutputType> => {
  const validatedInput = schema.parse(body);
  const result = await fetch(`/_api/auth/forgot_password_otp`, {
    method: "GET",
    body: JSON.stringify(validatedInput),
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    credentials: "include", // Important for cookies to be sent and received
  });

  const data = await result.json();

  if (!result.ok) {
    const errorData = await result.json();
    throw new Error(errorData.message || "Failed to send OTP");
  } else if (data.testingOtp) {
    console.log(`testing OTP: ${data.testingOtp}`);
  }

  return data;
};
