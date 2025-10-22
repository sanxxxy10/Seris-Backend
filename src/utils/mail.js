import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config(); // load .env variables

if (!process.env.RESEND_API_KEY) {
  throw new Error("❌ Resend API key is missing in .env");
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Send email utility
export const sendMail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: "Seris <onboarding@seris.site>", // verified email in Resend
      to,
      subject,
      html,
    });
    console.log("✅ Email sent to:", to);
    return response;
  } catch (error) {
    console.error("❌ Error sending email to:", to, error);
    throw error;
  }
};

// Admin Email Template
export const getAdminEmailTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Order Received - Seris Admin</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  
  <!-- Preheader Text -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    🚨 New Order Alert! ${data.name} from ${data.companyName} just submitted a project. Order #${data.serviceId}
  </div>

  <!-- Main Container -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center" style="padding: 0 10px;">
        
        <!-- Email Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header with Logo and Alert Status -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 30px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="30%" align="left" valign="middle">
                    <img src="https://res.cloudinary.com/dvatkduf0/image/upload/v1761121684/seris_vw91k1.png" alt="Seris" width="60" style="display: block; border: 0; outline: none; height: auto;">
                  </td>
                  <td width="70%" align="right" valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right" style="background-color: rgba(255,255,255,0.2); border-radius: 50px; backdrop-filter: blur(10px);">
                      <tr>
                        <td style="padding: 8px 20px;">
                          <span style="color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">🚨 NEW ORDER</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Alert Message -->
          <tr>
            <td style="padding: 40px 30px 30px; text-align: center; background-color: #ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td width="70" height="70" align="center" valign="middle" style="width: 70px; height: 70px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%; font-size: 36px; color: #ffffff; line-height: 70px; text-align: center;">
                          🔔
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 28px; font-weight: 700; line-height: 1.3;">New Project Submission!</h1>
                    <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">A new order has been placed. Review and contact the client within 24 hours.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Number Badge -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 12px; border: 2px solid #f59e0b;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #92400e; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Order ID</p>
                    <p style="margin: 0; color: #b45309; font-size: 24px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 1px;">#${data.serviceId}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Actions -->
          <tr>
            <td style="padding: 0 30px 35px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 20px; font-weight: 700;">Action Required</h2>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <!-- Action 1 -->
                <tr>
                  <td style="padding-bottom: 15px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50" valign="top" style="padding-right: 15px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="44" height="44" align="center" valign="middle" style="width: 44px; height: 44px; background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); border-radius: 50%; font-size: 18px; color: #ffffff; font-weight: 700; line-height: 44px; text-align: center;">
                                1
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top">
                          <h3 style="margin: 0 0 6px 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Review Project Details</h3>
                          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">Check all submitted information and requirements carefully.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Action 2 -->
                <tr>
                  <td style="padding-bottom: 15px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50" valign="top" style="padding-right: 15px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="44" height="44" align="center" valign="middle" style="width: 44px; height: 44px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-radius: 50%; font-size: 18px; color: #ffffff; font-weight: 700; line-height: 44px; text-align: center;">
                                2
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top">
                          <h3 style="margin: 0 0 6px 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Contact Client</h3>
                          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">Reach out to discuss requirements, timeline, and hosting preferences.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Action 3 -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50" valign="top" style="padding-right: 15px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="44" height="44" align="center" valign="middle" style="width: 44px; height: 44px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; font-size: 18px; color: #ffffff; font-weight: 700; line-height: 44px; text-align: center;">
                                3
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top">
                          <h3 style="margin: 0 0 6px 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Confirm & Start</h3>
                          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">Send project confirmation and begin work once details are finalized.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Client Information -->
          <tr>
            <td style="padding: 0 30px 35px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 20px; font-weight: 700;">Client Information</h2>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">
                <tr>
                  <td style="padding: 25px;">
                    
                    <!-- Client Details -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Client Name</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Company</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.companyName}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Email</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #2563eb; font-size: 14px; font-weight: 600;">
                                  <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Phone</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #2563eb; font-size: 14px; font-weight: 600;">
                                  <a href="tel:${data.mobile}" style="color: #2563eb; text-decoration: none;">${data.mobile}</a>
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Project Details -->
          <tr>
            <td style="padding: 0 30px 35px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 20px; font-weight: 700;">Project Details</h2>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">
                <tr>
                  <td style="padding: 25px;">
                    
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Project Name</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.projectName}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Service Type</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.serviceName}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Quoted Price</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">₹${data.servicePrice}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Project Value -->
                      <tr>
                        <td style="padding-top: 15px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Project Value</p>
                              </td>
                              <td align="right">
                                <p style="margin: 0; color: #10b981; font-size: 22px; font-weight: 700;">₹${data.servicePrice}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Hosting Note -->
                      <tr>
                        <td style="padding-top: 15px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fef3c7; border-radius: 8px; border-left: 3px solid #f59e0b;">
                            <tr>
                              <td style="padding: 12px 15px;">
                                <p style="margin: 0 0 6px 0; color: #92400e; font-size: 13px; font-weight: 700;">⚠️ Discuss Hosting Options</p>
                                <p style="margin: 0; color: #78350f; font-size: 12px; line-height: 1.5;">
                                  Confirm if client wants free hosting (subdomain under seris.site) or custom domain with additional charges.
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Additional Details (if any) -->
          <tr>
            <td style="padding: 0 30px 35px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 12px; border-left: 4px solid #3b82f6;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 15px; font-weight: 700;">📋 Additional Notes</p>
                    <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">
                      ${data.additionalNotes || 'No additional notes provided by the client.'}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Contact CTA -->
          <tr>
            <td style="padding: 0 30px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1a1a1a; border-radius: 12px;">
                <tr>
                  <td style="padding: 35px 25px; text-align: center;">
                    <h3 style="margin: 0 0 15px 0; color: #ffffff; font-size: 18px; font-weight: 700;">Ready to Contact Client?</h3>
                    
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 20px;">
                      <tr>
                        <td style="padding: 0 8px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" style="border-radius: 6px; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                                <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;">📧 Email Client</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td style="padding: 0 8px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" style="border-radius: 6px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);">
                                <a href="tel:${data.phone}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;">📞 Call Client</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 0; color: #a0a0a0; font-size: 13px; line-height: 1.5;">Response Target: Within 24 hours</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 14px; font-weight: 700;">Seris Admin Dashboard</p>
                    <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                      This is an automated notification for new project submissions.
                    </p>
                    <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                      Received on ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })} IST
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>
`;

// User Email Template
export const getUserEmailTemplate = (data) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Order Confirmation - Seris</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  
  <!-- Preheader Text -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Order confirmed! Your submission #${data.serviceId} has been received. We'll review it within 24 hours.
  </div>

  <!-- Main Container -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center" style="padding: 0 10px;">
        
        <!-- Email Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; margin: 0 auto; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header with Logo and Status -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="30%" align="left" valign="middle">
                    <img src="https://res.cloudinary.com/dvatkduf0/image/upload/v1761121684/seris_vw91k1.png" alt="Seris" width="60" style="display: block; border: 0; outline: none; height: auto;">
                  </td>
                  <td width="70%" align="right" valign="middle">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right" style="background-color: rgba(255,255,255,0.2); border-radius: 50px; backdrop-filter: blur(10px);">
                      <tr>
                        <td style="padding: 8px 20px;">
                          <span style="color: #ffffff; font-size: 13px; font-weight: 600; letter-spacing: 0.5px;">✓ ORDER CONFIRMED</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 40px 30px 30px; text-align: center; background-color: #ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td width="70" height="70" align="center" valign="middle" style="width: 70px; height: 70px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; font-size: 36px; color: #ffffff; line-height: 70px; text-align: center;">
                          ✓
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <h1 style="margin: 0 0 12px 0; color: #1a1a1a; font-size: 28px; font-weight: 700; line-height: 1.3;">Thank You, ${data.name}!</h1>
                    <p style="margin: 0; color: #666666; font-size: 16px; line-height: 1.6;">We've received your project submission and are excited to work with you.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Number Badge -->
          <tr>
            <td style="padding: 0 30px 30px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 12px; border: 2px solid #10b981;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #065f46; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">Order Number</p>
                    <p style="margin: 0; color: #047857; font-size: 24px; font-weight: 700; font-family: 'Courier New', monospace; letter-spacing: 1px;">#${data.serviceId}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Timeline -->
          <tr>
            <td style="padding: 0 30px 35px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 20px; font-weight: 700;">What's Next?</h2>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <!-- Step 1 -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50" valign="top" style="padding-right: 15px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="44" height="44" align="center" valign="middle" style="width: 44px; height: 44px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 50%; font-size: 18px; color: #ffffff; font-weight: 700; line-height: 44px; text-align: center;">
                                1
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top">
                          <h3 style="margin: 0 0 6px 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Review & Verification</h3>
                          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">Our team will review your submission within 24 hours and verify all project details.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Step 2 -->
                <tr>
                  <td style="padding-bottom: 20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50" valign="top" style="padding-right: 15px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="44" height="44" align="center" valign="middle" style="width: 44px; height: 44px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 50%; font-size: 18px; color: #ffffff; font-weight: 700; line-height: 44px; text-align: center;">
                                2
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top">
                          <h3 style="margin: 0 0 6px 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Personal Consultation</h3>
                          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">We'll contact you to discuss requirements, timeline, and answer any questions.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Step 3 -->
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50" valign="top" style="padding-right: 15px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="44" height="44" align="center" valign="middle" style="width: 44px; height: 44px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 50%; font-size: 18px; color: #ffffff; font-weight: 700; line-height: 44px; text-align: center;">
                                3
                              </td>
                            </tr>
                          </table>
                        </td>
                        <td valign="top">
                          <h3 style="margin: 0 0 6px 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Project Kickoff</h3>
                          <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">Once approved, we'll begin working on your project immediately with full dedication.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 30px 35px;">
              <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 20px; font-weight: 700;">Order Summary</h2>
              
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb; overflow: hidden;">
                <tr>
                  <td style="padding: 25px;">
                    
                    <!-- Project Details -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Project Name</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.projectName}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Service Type</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.serviceName}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 8px 0;">
                                <p style="margin: 0; color: #6b7280; font-size: 13px; font-weight: 500;">Company</p>
                              </td>
                              <td align="right" style="padding: 8px 0;">
                                <p style="margin: 0; color: #1a1a1a; font-size: 14px; font-weight: 600;">${data.companyName}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Total -->
                      <tr>
                        <td style="padding-top: 15px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td>
                                <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">Project Total</p>
                              </td>
                              <td align="right">
                                <p style="margin: 0; color: #10b981; font-size: 22px; font-weight: 700;">₹${data.servicePrice}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      
                      <!-- Additional Info -->
                      <tr>
                        <td style="padding-top: 15px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fef3c7; border-radius: 8px; border-left: 3px solid #f59e0b;">
                            <tr>
                              <td style="padding: 12px 15px;">
                                <p style="margin: 0 0 6px 0; color: #92400e; font-size: 13px; font-weight: 700;">💡 Domain & Hosting Options</p>
                                <p style="margin: 0; color: #78350f; font-size: 12px; line-height: 1.5;">
                                  <strong>Free Option:</strong> Get a subdomain under seris.site at no cost<br>
                                  <strong>Custom Domain:</strong> Domain registration & hosting charges applicable based on your requirements (discussed during consultation)
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Important Notice -->
          <tr>
            <td style="padding: 0 30px 35px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 12px; border-left: 4px solid #3b82f6;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 15px; font-weight: 700;">📧 Important: Save This Email</p>
                    <p style="margin: 0; color: #1e3a8a; font-size: 14px; line-height: 1.6;">Keep this confirmation for your records. Reference your order number when contacting our support team.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Section -->
          <tr>
            <td style="padding: 0 30px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 12px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 35px 25px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0; color: #1a1a1a; font-size: 18px; font-weight: 700;">Need Assistance?</h3>
                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">Our dedicated team is available to help you with any questions or concerns.</p>
                    
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td align="center" style="border-radius: 6px; background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);">
                          <a href="mailto:serisdeveloper@gmail.com" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: 0.3px;">Contact Support</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 35px 30px; text-align: center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <img src="https://res.cloudinary.com/dvatkduf0/image/upload/v1761121684/seris_vw91k1.png" alt="Seris" width="40" style="display: block; margin: 0 auto; border: 0; outline: none; height: auto; opacity: 0.8;">
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 15px 0; color: #ffffff; font-size: 16px; font-weight: 700; line-height: 1.4;">Seris Development</p>
                    <p style="margin: 0 0 15px 0; color: #a0a0a0; font-size: 14px; line-height: 1.6;">
                      Crafting Digital Excellence
                    </p>
                    <p style="margin: 0 0 20px 0; color: #a0a0a0; font-size: 13px; line-height: 1.8;">
                      <a href="tel:+917395910172" style="color: #10b981; text-decoration: none;">+91 73959 10172</a><br>
                      <a href="mailto:serisdeveloper@gmail.com" style="color: #10b981; text-decoration: none;">serisdeveloper@gmail.com</a><br>
                      <a href="https://seris.site" style="color: #10b981; text-decoration: none;">www.seris.site</a>
                    </p>
                    
                    <!-- Social Links (Optional) -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 20px;">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="#" style="color: #a0a0a0; text-decoration: none; font-size: 20px;">📱</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" style="color: #a0a0a0; text-decoration: none; font-size: 20px;">💼</a>
                        </td>
                        <td style="padding: 0 8px;">
                          <a href="#" style="color: #a0a0a0; text-decoration: none; font-size: 20px;">🐦</a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 0; color: #666666; font-size: 12px; line-height: 1.5;">
                      © ${new Date().getFullYear()} Seris Development. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
        
        <!-- Spacer -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 20px auto 0;">
          <tr>
            <td align="center" style="padding: 20px;">
              <p style="margin: 0; color: #999999; font-size: 11px; line-height: 1.5;">
                You're receiving this email because you submitted a project request at Seris.<br>
                <a href="#" style="color: #999999; text-decoration: underline;">View in browser</a> | 
                <a href="#" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
        
      </td>
    </tr>
  </table>
  
</body>
</html>`;

// Password Reset Email Template
export const getResetPasswordTemplate = (name, resetLink) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 40px 20px !important; }
      .lock-icon { width: 70px !important; height: 70px !important; font-size: 36px !important; }
      .main-title { font-size: 26px !important; }
      .button-cell { padding: 14px 30px !important; font-size: 15px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 20px 10px;">
    <tr>
      <td align="center">
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 45px 30px; text-align: center;">
              <table cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 20px;">
                <tr>
                  <td class="lock-icon" width="80" height="80" align="center" valign="middle" style="background-color: rgba(255,255,255,0.2); border-radius: 40px; font-size: 40px; color: #ffffff;">🔒</td>
                </tr>
              </table>
              <h1 class="main-title" style="margin: 0; color: #ffffff; font-size: 30px; font-weight: 700; letter-spacing: -0.5px;">Password Reset Request</h1>
              <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 15px;">Secure your account with a new password</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content" style="padding: 40px 35px;">
              <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 17px; line-height: 1.6;">
                Hi <strong style="color: #0ea5e9;">${name}</strong>,
              </p>
              <p style="margin: 0 0 25px 0; color: #475569; font-size: 15px; line-height: 1.7;">
                We received a request to reset the password for your Seris account. Click the button below to create a new password:
              </p>
              
              <!-- Reset Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="button-cell" align="center" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); border-radius: 50px; box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);">
                          <a href="${resetLink}" style="display: block; color: #ffffff; text-decoration: none; padding: 16px 40px; font-size: 16px; font-weight: 600;">Reset My Password</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Security Notice -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); border-radius: 10px; border-left: 4px solid #f97316; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #9a3412; font-size: 15px; font-weight: 600;">⚠️ Security Notice</p>
                    <p style="margin: 0; color: #9a3412; font-size: 14px; line-height: 1.6;">
                      This link will expire in <strong>1 hour</strong> for security reasons. If you didn't request this password reset, please ignore this email or contact us immediately.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Alternative Link -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 18px;">
                    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Button not working? Copy and paste this link:</p>
                    <p style="margin: 0; word-break: break-all;">
                      <a href="${resetLink}" style="color: #0ea5e9; font-size: 13px; text-decoration: none;">${resetLink}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; text-align: center;">
                Need help? Contact us at <a href="mailto:serisdeveloper@gmail.com" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">serisdeveloper@gmail.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 30px; text-align: center;">
              <h3 style="margin: 0 0 15px 0; color: #0ea5e9; font-size: 24px; font-weight: 700; letter-spacing: 2px;">SERIS</h3>
              <p style="margin: 0 0 6px 0; color: #cbd5e1; font-size: 15px; font-weight: 600;">Sanjay Ram</p>
              <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 14px; line-height: 1.9;">
                <a href="tel:+917395910172" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">📱 +91 73959 10172</a>
                <a href="mailto:serisdeveloper@gmail.com" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">📧 serisdeveloper@gmail.com</a>
                <a href="https://seris.site" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">🌐 seris.site</a>
              </p>
              <p style="margin: 0; color: #64748b; font-size: 12px; padding-top: 20px; border-top: 1px solid #334155;">
                © ${new Date().getFullYear()} Seris. All rights reserved.<br>
                This is an automated security email.
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

// Forgot Password Email Template (Alternative version with data object)
export const getForgotPasswordTemplate = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 40px 20px !important; }
      .lock-icon { width: 70px !important; height: 70px !important; font-size: 36px !important; }
      .main-title { font-size: 26px !important; }
      .button-cell { padding: 14px 30px !important; font-size: 15px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 20px 10px;">
    <tr>
      <td align="center">
        <table class="container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td class="header" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 45px 30px; text-align: center;">
              <table cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto 20px;">
                <tr>
                  <td class="lock-icon" width="80" height="80" align="center" valign="middle" style="background-color: rgba(255,255,255,0.2); border-radius: 40px; font-size: 40px; color: #ffffff;">🔒</td>
                </tr>
              </table>
              <h1 class="main-title" style="margin: 0; color: #ffffff; font-size: 30px; font-weight: 700; letter-spacing: -0.5px;">Password Reset Request</h1>
              <p style="margin: 10px 0 0 0; color: #e0f2fe; font-size: 15px;">Secure your account with a new password</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td class="content" style="padding: 40px 35px;">
              <p style="margin: 0 0 20px 0; color: #1e293b; font-size: 17px; line-height: 1.6;">
                Hi <strong style="color: #0ea5e9;">${data.name || 'User'}</strong>,
              </p>
              <p style="margin: 0 0 25px 0; color: #475569; font-size: 15px; line-height: 1.7;">
                We received a request to reset the password for your Seris account. Click the button below to create a new password:
              </p>
              
              <!-- Reset Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td class="button-cell" align="center" style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); border-radius: 50px; box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);">
                          <a href="${data.resetLink}" style="display: block; color: #ffffff; text-decoration: none; padding: 16px 40px; font-size: 16px; font-weight: 600;">Reset My Password</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Security Notice -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%); border-radius: 10px; border-left: 4px solid #f97316; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #9a3412; font-size: 15px; font-weight: 600;">⚠️ Security Notice</p>
                    <p style="margin: 0; color: #9a3412; font-size: 14px; line-height: 1.6;">
                      This link will expire in <strong>1 hour</strong> for security reasons. If you didn't request this password reset, please ignore this email or contact us immediately.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Alternative Link -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 18px;">
                    <p style="margin: 0 0 8px 0; color: #64748b; font-size: 13px; font-weight: 600;">Button not working? Copy and paste this link:</p>
                    <p style="margin: 0; word-break: break-all;">
                      <a href="${data.resetLink}" style="color: #0ea5e9; font-size: 13px; text-decoration: none;">${data.resetLink}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; text-align: center;">
                Need help? Contact us at <a href="mailto:serisdeveloper@gmail.com" style="color: #0ea5e9; text-decoration: none; font-weight: 600;">serisdeveloper@gmail.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 35px 30px; text-align: center;">
              <h3 style="margin: 0 0 15px 0; color: #0ea5e9; font-size: 24px; font-weight: 700; letter-spacing: 2px;">SERIS</h3>
              <p style="margin: 0 0 6px 0; color: #cbd5e1; font-size: 15px; font-weight: 600;">Sanjay Ram</p>
              <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 14px; line-height: 1.9;">
                <a href="tel:+917395910172" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">📱 +91 73959 10172</a>
                <a href="mailto:serisdeveloper@gmail.com" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">📧 serisdeveloper@gmail.com</a>
                <a href="https://seris.site" style="color: #0ea5e9; text-decoration: none; display: block; margin: 4px 0;">🌐 seris.site</a>
              </p>
              <p style="margin: 0; color: #64748b; font-size: 12px; padding-top: 20px; border-top: 1px solid #334155;">
                © ${new Date().getFullYear()} Seris. All rights reserved.<br>
                This is an automated security email.
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
