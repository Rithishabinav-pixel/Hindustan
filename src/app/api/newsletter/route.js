import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function adminEmailTemplate(email, dateTime) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#000419;padding:28px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;letter-spacing:0.5px;">
                Hindustan Drone Services
              </h1>
              <p style="margin:6px 0 0;color:#148F3F;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">
                Newsletter Subscription Alert
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.6;">
                A new user has subscribed to the Hindustan Drones newsletter. Details are listed below.
              </p>

              <!-- Details Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;">
                <thead>
                  <tr style="background-color:#000419;">
                    <th style="padding:12px 20px;text-align:left;color:#ffffff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:40%;">Field</th>
                    <th style="padding:12px 20px;text-align:left;color:#ffffff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="background-color:#ffffff;">
                    <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#555;font-size:14px;font-weight:600;">Email Address</td>
                    <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#222;font-size:14px;">${email}</td>
                  </tr>
                  <tr style="background-color:#f9f9f9;">
                    <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#555;font-size:14px;font-weight:600;">Date &amp; Time</td>
                    <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#222;font-size:14px;">${dateTime}</td>
                  </tr>
                  <tr style="background-color:#ffffff;">
                    <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#555;font-size:14px;font-weight:600;">Source</td>
                    <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#222;font-size:14px;">Website Footer Newsletter Form</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f4f4f7;padding:20px 40px;border-top:1px solid #e8e8e8;">
              <p style="margin:0;color:#999;font-size:12px;text-align:center;line-height:1.6;">
                This is an automated notification from <strong>Hindustan Drone Services</strong>.<br/>
                Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

function userEmailTemplate(email) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:0 20px;">

    <!-- Card -->
    <div style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background-color:#000419;padding:32px 40px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;letter-spacing:0.5px;">
          Hindustan Drone Services
        </h1>
        <p style="margin:8px 0 0;color:#148F3F;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">
          You're on the list
        </p>
      </div>

      <!-- Body -->
      <div style="padding:40px 40px 32px;">
        <h2 style="margin:0 0 16px;color:#000419;font-size:20px;font-weight:600;">
          Welcome aboard!
        </h2>
        <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.7;">
          Hi there,
        </p>
        <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.7;">
          Thank you for subscribing to the <strong>Hindustan Drones Newsletter</strong>. We're excited to have you with us.
        </p>
        <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.7;">
          You'll be among the first to receive the latest updates on drone technology, industry insights, product launches, and exclusive stories from the world of intelligent aerial solutions.
        </p>

        <!-- Confirmation box -->
        <div style="background-color:#f0faf4;border-left:4px solid #148F3F;border-radius:4px;padding:16px 20px;margin-bottom:24px;">
          <p style="margin:0;color:#148F3F;font-size:14px;font-weight:600;">
            Subscription confirmed for: ${email}
          </p>
        </div>

        <p style="margin:0;color:#444;font-size:15px;line-height:1.7;">
          Stay tuned — great content is on its way.<br/>
          <span style="color:#148F3F;font-weight:600;">— The Hindustan Drones Team</span>
        </p>
      </div>

      <!-- Divider -->
      <div style="height:1px;background-color:#e8e8e8;margin:0 40px;"></div>

      <!-- Footer -->
      <div style="padding:24px 40px;background-color:#f9f9f9;">
        <p style="margin:0 0 8px;color:#999;font-size:12px;text-align:center;line-height:1.6;">
          Hindustan Drone Services Private Limited<br/>
          Unit No.1011A, Level 1, Sky One (Wing A), Prestige SkyTech,<br/>
          Financial District, Nanakramguda, Hyderabad - 500 032.
        </p>
        <p style="margin:8px 0 0;color:#bbb;font-size:11px;text-align:center;">
          You received this email because you subscribed at hindustandrones.io
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    });

    const dateTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'long',
      timeStyle: 'medium',
    });

    // Send admin notification email
    await transporter.sendMail({
      from: `"Hindustan Drones" <${process.env.ADMIN_MAIL}>`,
      to: process.env.ADMIN_MAIL,
      subject: `New Newsletter Subscription — ${email}`,
      html: adminEmailTemplate(email, dateTime),
    });

    // Send user confirmation email
    await transporter.sendMail({
      from: `"Hindustan Drone Services" <${process.env.ADMIN_MAIL}>`,
      to: email,
      subject: 'Welcome to the Hindustan Drones Newsletter!',
      html: userEmailTemplate(email),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Newsletter] Email send failed:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}
