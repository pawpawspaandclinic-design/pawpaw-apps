// Booking-specific functions
function getServices() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('SERVICES');
  const data = sheet.getDataRange().getValues();
  
  const services = [];
  for (let i = 1; i < data.length; i++) {
    services.push({
      id: data[i][0],
      name: data[i][1],
      duration: data[i][2],
      price: data[i][3],
      description: data[i][4]
    });
  }
  
  return services;
}

function getAppointments(email) {
  // Implementation to fetch user appointments
}
