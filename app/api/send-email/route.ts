import { sendEmail } from '@/utils/email/send';
import { NextResponse } from 'next/server'; // Use NextResponse instead of res
import type { NextRequest } from 'next/server'; // Use NextRequest instead of NextApiRequest

// Define POST handler for the route
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { to, subject, html } = body;

    await sendEmail({ to, subject, html });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
}
