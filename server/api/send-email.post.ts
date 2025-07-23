import { Resend } from "resend";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { to, subject, name, email, message } = await readBody(event);

  // Validate required environment variables
  if (!runtimeConfig.resendApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "Resend API key not configured",
    });
  }

  const resend = new Resend(runtimeConfig.resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from:
        runtimeConfig.resendFromEmail || "Portfolio <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0891b2;">Contact Form - New Message</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${message.replace(/\n/g, "<br>")}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Failed to send email via Resend",
      });
    }

    console.log("Email sent successfully:", data?.id);
    return { success: true, message: "Email sent properly", emailId: data?.id };
  } catch (error) {
    console.error("Email sending error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send email",
    });
  }
});
