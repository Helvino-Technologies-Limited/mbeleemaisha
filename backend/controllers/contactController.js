const prisma      = require('../config/db')
const transporter = require('../config/mailer')

exports.submit = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body
    const contact = await prisma.contact.create({ data: { name, email, phone, message } })

    await transporter.sendMail({
      from:    `"Mbelee Maisha Website" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_TO,
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:#1a1f5e;padding:24px;border-radius:12px 12px 0 0;">
            <h2 style="color:white;margin:0;">New Contact Message</h2>
            <p style="color:#0ea5e9;margin:4px 0 0;">Mbelee Maisha Website</p>
          </div>
          <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#64748b;width:120px;">Name</td><td style="padding:8px 0;font-weight:bold;color:#1a1f5e;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;color:#1a1f5e;">${email || 'Not provided'}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Phone</td><td style="padding:8px 0;color:#1a1f5e;">${phone || 'Not provided'}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:white;border-radius:8px;border:1px solid #e2e8f0;">
              <p style="color:#64748b;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <p style="color:#1a1f5e;margin:0;line-height:1.6;">${message}</p>
            </div>
            <p style="color:#94a3b8;font-size:12px;margin-top:16px;">Received: ${new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' })}</p>
          </div>
        </div>
      `,
    })

    if (email) {
      await transporter.sendMail({
        from:    `"Mbelee Maisha" <${process.env.EMAIL_USER}>`,
        to:      email,
        subject: 'We received your message — Mbelee Maisha',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#1a1f5e;padding:24px;border-radius:12px 12px 0 0;">
              <h2 style="color:white;margin:0;">Thank you, ${name}!</h2>
              <p style="color:#0ea5e9;margin:4px 0 0;">Mbelee Maisha Welfare Organization</p>
            </div>
            <div style="background:#f8fafc;padding:24px;border-radius:0 0 12px 12px;border:1px solid #e2e8f0;">
              <p style="color:#1a1f5e;line-height:1.6;">We have received your message and will get back to you as soon as possible.</p>
              <p style="color:#1a1f5e;line-height:1.6;">For urgent matters, please call us directly at <strong>0140-166773</strong>.</p>
              <div style="margin-top:24px;padding:16px;background:#1a1f5e;border-radius:8px;text-align:center;">
                <p style="color:#0ea5e9;margin:0;font-size:12px;">MPESA Paybill: <strong style="color:white;">247247</strong> | Account: <strong style="color:#22c55e;">529152</strong></p>
              </div>
              <p style="color:#94a3b8;font-size:12px;margin-top:16px;">Mbelee Maisha Welfare Organization · P.O Box 68 Siaya · info@mbeleemaisha.com</p>
            </div>
          </div>
        `,
      })
    }

    res.status(201).json({ message: 'Message sent successfully' })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(400).json({ message: err.message })
  }
}

exports.getAll = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
