import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_MIME = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const ALLOWED_EXT  = ['.pdf', '.doc', '.docx']

function adminEmailTemplate({ name, email, phone, subject, message, jobTitle, resumeUrl, dateTime }) {
  const rows = [
    ['Name',        name],
    ['Email',       email],
    ['Phone',       phone || '—'],
    ['Applied For', jobTitle],
    ['Subject',     subject || '—'],
    ['Cover Letter', message || '—'],
    ['Resume',      resumeUrl ? `<a href="${resumeUrl}">${resumeUrl}</a>` : '—'],
    ['Date & Time', dateTime],
    ['Source',      'Website Career Form'],
  ]
  const rowsHtml = rows.map(([field, value], i) => `
    <tr style="background-color:${i % 2 === 0 ? '#ffffff' : '#f9f9f9'};">
      <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#555;font-size:14px;font-weight:600;">${field}</td>
      <td style="padding:14px 20px;border-top:1px solid #e0e0e0;color:#222;font-size:14px;">${value}</td>
    </tr>`).join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color:#000419;padding:28px 40px;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;letter-spacing:0.5px;">Hindustan Drone Services</h1>
              <p style="margin:6px 0 0;color:#148F3F;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">New Career Application</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;color:#444;font-size:15px;line-height:1.6;">A new career application has been submitted via the website. Details are listed below.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e0e0e0;border-radius:6px;overflow:hidden;">
                <thead>
                  <tr style="background-color:#000419;">
                    <th style="padding:12px 20px;text-align:left;color:#ffffff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;width:35%;">Field</th>
                    <th style="padding:12px 20px;text-align:left;color:#ffffff;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Value</th>
                  </tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#f4f4f7;padding:20px 40px;border-top:1px solid #e8e8e8;">
              <p style="margin:0;color:#999;font-size:12px;text-align:center;line-height:1.6;">
                This is an automated notification from <strong>Hindustan Drone Services</strong>.<br/>Please do not reply to this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function userEmailTemplate({ name, email, jobTitle }) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f4f4f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;padding:0 20px;">
    <div style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
      <div style="background-color:#000419;padding:32px 40px;text-align:center;">
        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;letter-spacing:0.5px;">Hindustan Drone Services</h1>
        <p style="margin:8px 0 0;color:#148F3F;font-size:13px;font-weight:500;text-transform:uppercase;letter-spacing:1px;">Application Received</p>
      </div>
      <div style="padding:40px 40px 32px;">
        <h2 style="margin:0 0 16px;color:#000419;font-size:20px;font-weight:600;">Thank you, ${name}!</h2>
        <p style="margin:0 0 16px;color:#444;font-size:15px;line-height:1.7;">We have received your application for <strong>${jobTitle}</strong>. Our HR team will review your profile and get back to you shortly.</p>
        <div style="background-color:#f0faf4;border-left:4px solid #148F3F;border-radius:4px;padding:16px 20px;margin-bottom:24px;">
          <p style="margin:0;color:#148F3F;font-size:14px;font-weight:600;">Confirmation sent to: ${email}</p>
        </div>
        <p style="margin:0;color:#444;font-size:15px;line-height:1.7;">
          In the meantime, feel free to explore our drone solutions or call us at <strong>+91 9154749191</strong>.<br/>
          <span style="color:#148F3F;font-weight:600;">— The Hindustan Drones Team</span>
        </p>
      </div>
      <div style="height:1px;background-color:#e8e8e8;margin:0 40px;"></div>
      <div style="padding:24px 40px;background-color:#f9f9f9;">
        <p style="margin:0 0 8px;color:#999;font-size:12px;text-align:center;line-height:1.6;">
          Hindustan Drone Services Private Limited<br/>
          Unit No.1011A, Level 1, Sky One (Wing A), Prestige SkyTech,<br/>
          Financial District, Nanakramguda, Hyderabad - 500 032.
        </p>
        <p style="margin:8px 0 0;color:#bbb;font-size:11px;text-align:center;">
          You received this email because you submitted a job application at hindustandrones.io
        </p>
      </div>
    </div>
  </div>
</body>
</html>`
}

export async function POST(request) {
  try {
    const formData = await request.formData()

    const name     = formData.get('name')?.toString().trim()
    const email    = formData.get('email')?.toString().trim()
    const phone    = formData.get('phone')?.toString().trim() || null
    const subject  = formData.get('subject')?.toString().trim() || null
    const message  = formData.get('message')?.toString().trim() || null
    const jobTitle = formData.get('jobTitle')?.toString().trim()
    const file     = formData.get('resume')

    // Validate required fields
    if (!name || !email || !jobTitle) {
      return NextResponse.json({ error: 'Name, email, and job title are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    // Handle file upload
    let resumePath = null
    if (file && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Resume file must be 5 MB or smaller.' }, { status: 400 })
      }

      const ext = path.extname(file.name).toLowerCase()
      if (!ALLOWED_EXT.includes(ext) || !ALLOWED_MIME.includes(file.type)) {
        return NextResponse.json({ error: 'Only PDF, DOC, and DOCX files are accepted.' }, { status: 400 })
      }

      const timestamp = Date.now()
      const safeName  = `${timestamp}-${name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')}${ext}`
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes')

      await mkdir(uploadDir, { recursive: true })

      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(path.join(uploadDir, safeName), buffer)

      resumePath = `/uploads/resumes/${safeName}`
    }

    // Save to database
    await prisma.careerEnquiry.create({
      data: { name, email, phone, subject, message, jobTitle, resumePath },
    })

    // Send emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.ADMIN_MAIL,
        pass: process.env.MAIL_APP_PASSWORD,
      },
    })

    const dateTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'long',
      timeStyle: 'medium',
    })

    const resumeUrl = resumePath
      ? `${process.env.NEXT_PUBLIC_SITE_URL || 'https://hindustandrones.io'}${resumePath}`
      : null

    await transporter.sendMail({
      from:    `"Hindustan Drones" <${process.env.ADMIN_MAIL}>`,
      to:      process.env.ADMIN_MAIL,
      subject: `New Career Application — ${jobTitle} — ${name} (${email})`,
      html:    adminEmailTemplate({ name, email, phone, subject, message, jobTitle, resumeUrl, dateTime }),
    })

    await transporter.sendMail({
      from:    `"Hindustan Drone Services" <${process.env.ADMIN_MAIL}>`,
      to:      email,
      subject: `Application Received — ${jobTitle} | Hindustan Drone Services`,
      html:    userEmailTemplate({ name, email, jobTitle }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Career Apply] Submission failed:', error)
    return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 500 })
  }
}
