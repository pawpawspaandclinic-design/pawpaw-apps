import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // TODO: Add your booking logic here (e.g., save to database, send email)
    console.log('Booking data:', data);

    // Simulate a successful booking
    return NextResponse.json({ status: 200, message: 'Booking successful!' });
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ status: 500, message: errorMessage }, { status: 500 });
  }
}
