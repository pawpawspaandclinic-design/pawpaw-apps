// Google Calendar integration
function addToCalendar(bookingData) {
  const calendar = CalendarApp.getCalendarById('primary');
  
  calendar.createEvent(
    `PawPaw Appointment - ${bookingData.serviceName}`,
    new Date(bookingData.date + 'T' + bookingData.startTime),
    new Date(bookingData.date + 'T' + bookingData.endTime),
    {
      description: `Pet: ${bookingData.petName}\nOwner: ${bookingData.ownerName}`,
      guests: bookingData.email
    }
  );
}
