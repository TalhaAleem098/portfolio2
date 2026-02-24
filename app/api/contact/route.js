import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.error("❌ SMTP credentials missing on server:");
      console.error("   SMTP_EMAIL:", process.env.SMTP_EMAIL ? "✓ Set" : "✗ Missing");
      console.error("   SMTP_PASSWORD:", process.env.SMTP_PASSWORD ? "✓ Set" : "✗ Missing");
      return NextResponse.json(
        { 
          error: "Email service is not configured. Please check with the site owner.",
          details: process.env.NODE_ENV === "development" ? "SMTP credentials missing" : undefined
        },
        { status: 500 }
      );
    }

    // Create transporter using environment variables
    // For Gmail: enable "App Passwords" in Google Account settings
    // Set SMTP_EMAIL and SMTP_PASSWORD in .env.local or Vercel environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email to you (site owner) — notification of new contact
    const ownerMailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: email,
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #5477CC; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FDF94B; margin: 0; font-size: 22px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333; width: 100px;">Name:</td>
                <td style="padding: 10px 0; color: #555;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 10px 0; color: #555;"><a href="mailto:${email}" style="color: #5477CC;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #333;">Subject:</td>
                <td style="padding: 10px 0; color: #555;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border: 1px solid #e0e0e0;">
              <p style="font-weight: bold; color: #333; margin: 0 0 8px 0;">Message:</p>
              <p style="color: #555; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
      `,
    };

    // Confirmation email to the sender
    const senderMailOptions = {
      from: `"Aleem Talha" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #5477CC; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #FDF94B; margin: 0; font-size: 22px;">Thank You for Contacting Me!</h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0; border-top: none;">
            <p style="color: #333; font-size: 15px; line-height: 1.6;">
              Hi <strong>${name}</strong>,
            </p>
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
              Thank you for reaching out! I've received your message regarding <strong>"${subject}"</strong> and will get back to you within 24 hours.
            </p>
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
              For urgent inquiries, feel free to reach me directly on 
              <a href="https://wa.me/923270445135" style="color: #5477CC; text-decoration: none; font-weight: bold;">WhatsApp</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px; margin: 0;">
              — Aleem Talha | UI/UX Designer & Full Stack Developer<br />
              <a href="https://aleemtalha.codes" style="color: #5477CC;">aleemtalha.codes</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(senderMailOptions);

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Contact form error:", {
      code: error?.code,
      message: error?.message,
      command: error?.command,
    });

    // Provide specific error messages for common issues
    let errorMessage = "Failed to send message. Please try again later.";
    
    if (error?.code === "EAUTH") {
      errorMessage = "Email service authentication failed. Please contact the site owner.";
      console.error("   💡 Solution: Check SMTP_EMAIL and SMTP_PASSWORD in Vercel environment variables.");
    } else if (error?.message?.includes("credentials")) {
      errorMessage = "Email credentials not configured. Please contact the site owner.";
      console.error("   💡 Solution: Ensure SMTP_EMAIL and SMTP_PASSWORD are set in environment variables.");
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
