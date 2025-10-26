// Google Apps Script Backend for PawPaw PWA
const SHEET_ID = 'YOUR_SHEET_ID';
const SHEET_NAME = 'PawPawDB';

// Main entry point
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    switch(action) {
      case 'bookAppointment':
        return bookAppointment(data);
      case 'getServices':
        return getServices();
      case 'getAppointments':
        return getAppointments(data.email);
      case 'cancelAppointment':
        return cancelAppointment(data.id);
      case 'getInventory':
        return getInventory();
      default:
        return createResponse(400, 'Invalid action');
    }
  } catch (err) {
    return createResponse(500, err.toString());
  }
}

// Book a new appointment
function bookAppointment(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('BOOKINGS');
  const lastRow = sheet.getLastRow() + 1;
  
  sheet.getRange(lastRow, 1).setValue(new Date().toISOString()); // Timestamp
  sheet.getRange(lastRow, 2).setValue(data.date);
  sheet.getRange(lastRow, 3).setValue(data.time);
  sheet.getRange(lastRow, 4).setValue(data.serviceId);
  sheet.getRange(lastRow, 5).setValue(data.petName);
  sheet.getRange(lastRow, 6).setValue(data.ownerName);
  sheet.getRange(lastRow, 7).setValue(data.phone);
  sheet.getRange(lastRow, 8).setValue(data.email);
  sheet.getRange(lastRow, 9).setValue('CONFIRMED');
  
  // Send confirmation email
  MailApp.sendEmail({
    to: data.email,
    subject: '🐾 Appointment Confirmed at PawPaw Spa & Clinic',
    htmlBody: generateEmailTemplate(data)
  });
  
  return createResponse(200, 'Booking successful');
}

// Helper functions...
function createResponse(code, message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: code,
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}

function generateEmailTemplate(data) {
  return `<!DOCTYPE html>
  <html>
  <body>
    <h1>Your appointment is confirmed!</h1>
    <p>Date: ${data.date}</p>
    <p>Time: ${data.time}</p>
    <!-- More template -->
  </body>
  </html>`;
}
