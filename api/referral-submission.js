export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      propertyAddress,
      contactName,
      contactPhone,
      contactEmail,
      propertyType,
      ownerContact,
      additionalNotes
    } = req.body;

    // Validate required fields
    if (!propertyAddress || !contactName || !contactPhone || !contactEmail || !propertyType) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate UK phone number format (basic validation)
    const phoneRegex = /^(?:(?:\+44)|(?:0))(?:\d{10}|\d{11})$/;
    const cleanPhone = contactPhone.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ error: 'Invalid UK phone number format' });
    }

    // Create referral data object
    const referralData = {
      propertyAddress: propertyAddress.trim(),
      contactName: contactName.trim(),
      contactPhone: cleanPhone,
      contactEmail: contactEmail.trim().toLowerCase(),
      propertyType,
      ownerContact: ownerContact?.trim() || '',
      additionalNotes: additionalNotes?.trim() || '',
      submittedAt: new Date().toISOString(),
      status: 'pending',
      id: generateReferralId()
    };

    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send notification emails
    // 3. Trigger workflow processes
    
    // For now, we'll simulate the process and log the data
    console.log('New referral submission:', referralData);
    
    // Simulate database save
    await simulateDatabaseSave(referralData);
    
    // Simulate email notifications
    await simulateEmailNotifications(referralData);

    // Return success response
    res.status(200).json({ 
      success: true, 
      referralId: referralData.id,
      message: 'Referral submitted successfully. We will analyze it within 2 hours.'
    });

  } catch (error) {
    console.error('Referral submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper function to generate a unique referral ID
function generateReferralId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `REF-${timestamp}-${random}`.toUpperCase();
}

// Simulate database save operation
async function simulateDatabaseSave(referralData) {
  // In a real implementation, this would save to your database
  // For example, using MongoDB, PostgreSQL, or another database
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Referral saved to database:', referralData.id);
      resolve();
    }, 100);
  });
}

// Simulate email notifications
async function simulateEmailNotifications(referralData) {
  // In a real implementation, this would send emails using a service like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Nodemailer with SMTP
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate notification email to team
      console.log('Team notification email sent for referral:', referralData.id);
      
      // Simulate confirmation email to referrer
      console.log('Confirmation email sent to:', referralData.contactEmail);
      
      resolve();
    }, 200);
  });
}

// Example implementation for real email sending (commented out)
/*
async function sendNotificationEmail(referralData) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'referrals@samedayhomebuyer.co.uk',
    from: 'noreply@samedayhomebuyer.co.uk',
    subject: 'New Property Referral Submitted',
    html: `
      <h2>New Property Referral</h2>
      <p><strong>Referral ID:</strong> ${referralData.id}</p>
      <p><strong>Property Address:</strong> ${referralData.propertyAddress}</p>
      <p><strong>Contact Name:</strong> ${referralData.contactName}</p>
      <p><strong>Contact Phone:</strong> ${referralData.contactPhone}</p>
      <p><strong>Contact Email:</strong> ${referralData.contactEmail}</p>
      <p><strong>Property Type:</strong> ${referralData.propertyType}</p>
      <p><strong>Owner Contact:</strong> ${referralData.ownerContact}</p>
      <p><strong>Additional Notes:</strong> ${referralData.additionalNotes}</p>
      <p><strong>Submitted At:</strong> ${new Date(referralData.submittedAt).toLocaleString()}</p>
    `
  };

  await sgMail.send(msg);
}

async function sendConfirmationEmail(referralData) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: referralData.contactEmail,
    from: 'noreply@samedayhomebuyer.co.uk',
    subject: 'Referral Confirmation - Same Day Home Buyer',
    html: `
      <h2>Thank you for your property referral!</h2>
      <p>Dear ${referralData.contactName},</p>
      <p>We have received your property referral for <strong>${referralData.propertyAddress}</strong>.</p>
      <p><strong>Referral ID:</strong> ${referralData.id}</p>
      <p>Our team will analyze this lead within 2 hours and contact the property owner. If the lead meets our criteria and results in a successful purchase, you will receive your £500 Amazon voucher within 24 hours of verification.</p>
      <p>We'll keep you updated on the progress of your referral.</p>
      <p>Best regards,<br>Same Day Home Buyer Team</p>
    `
  };

  await sgMail.send(msg);
}
*/