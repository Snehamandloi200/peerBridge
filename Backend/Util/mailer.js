const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
  
  auth: {
    user: process.env.MAIL, 
    pass: process.env.PASS, 
  },
 
});

async function sendMail(to, subject, text, html) {
  try {
    let info = await transporter.sendMail({
      from: `"Welcome" ${process.env.MAIL}`,
      to,
      subject,
      text,
      html,
    });
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendMail;

if (require.main === module) {
  sendMail(
    "renukakushwah60@gmail.com",      
    "Test Email",
    "Hello from Nodemailer!",
    "<h3>Hello from Nodemailer!</h3>"
  );
}