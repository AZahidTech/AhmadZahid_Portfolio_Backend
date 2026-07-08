const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // 1. Save message to Database
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // 2. Send Emails in Background
    try {
      const visitorMailOptions = {
        from: `"Ahmad Zahid" <${process.env.EMAIL_USER}>`,
        to: email, // Email typed by visitor
        subject: `Thank you for contacting me!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #00e6b4;">Hi ${name},</h2>
            <p>Thank you for reaching out to me. I have received your message regarding "<strong>${subject}</strong>".</p>
            <p>I will review your message and get back to you as soon as possible.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">This is an automated confirmation email from Ahmad Zahid's Portfolio.</p>
          </div>
        `,
      };

      const adminMailOptions = {
        from: `"${name} (Portfolio)" <${process.env.EMAIL_USER}>`,
        replyTo: email, // This lets you click "Reply" in your email app to reply directly to the visitor
        to: process.env.EMAIL_USER, // Your own email
        subject: `New Message: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <h2 style="color: #06b6d4;">New Portfolio Message Received</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00e6b4; border-radius: 4px;">
              ${message}
            </div>
          </div>
        `,
      };

      // Send both emails concurrently to optimize serverless performance
      await Promise.all([
        transporter.sendMail(visitorMailOptions),
        transporter.sendMail(adminMailOptions)
      ]);

      return res.status(201).json({
        success: true,
        message: 'Message sent and email confirmations delivered successfully!',
        data: newMessage,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Return success since message is saved to DB even if email fails
      return res.status(201).json({
        success: true,
        message: 'Message saved to database, but email delivery failed.',
        data: newMessage,
      });
    }
  } catch (error) {
    console.error('Database message creation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, could not save message.',
    });
  }
};

// @desc    Get all contact messages (Admin only)
// @route   GET /api/contact/messages
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error, could not fetch messages' });
  }
};

// @desc    Delete a message (Admin only)
// @route   DELETE /api/contact/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await message.deleteOne();

    return res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error, could not delete message' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
};
