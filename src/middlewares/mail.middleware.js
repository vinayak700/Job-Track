import nodemailer from 'nodemailer';

export const sendConfirmationEmail = (applicantEmail, jobTitle, company) => {
    // Constructing mail transport carrier
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vinayakt890@gmail.com',
            pass: 'oajhgpouyejhmmrw',
        },
    });

    // Creating payload to be sent
    const mailOptions = {
        from: 'vinayakt890@gmail.com',
        to: applicantEmail,
        subject: 'Job Application Confirmation',
        text: `Dear Applicant,
    
    Thank you for applying to the position of ${jobTitle}. Your application has been received, and we are currently in the process of reviewing it. We appreciate your interest in joining our team!
    
    If your qualifications align with our requirements, you can expect to hear from us for the next steps of the selection process. Your dedication and enthusiasm have not gone unnoticed.
    
    Once again, thank you for choosing to be a part of our journey. We look forward to the possibility of having you as a valuable member of our team.
    
    Best regards,
    
    [${company}]`
    };


    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('Error sending mail' + err);
        }
    });
};