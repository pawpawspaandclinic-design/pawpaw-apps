// Email-related functions
function sendVaccinationReminder(petName, ownerEmail, vaccine, dueDate) {
  const template = `<!DOCTYPE html>
  <html>
  <body>
    <h1>Vaccination Reminder for ${petName}</h1>
    <p>Vaccine: ${vaccine} is due on ${dueDate}</p>
  </body>
  </html>`;
  
  MailApp.sendEmail({
    to: ownerEmail,
    subject: '💉 Vaccination Reminder for ${petName}',
    htmlBody: template
  });
}
