import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Use Resend for real emails or fallback to a dummy if no key is provided
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(req: Request) {
  try {
    const { email, message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // The real environment email address to receive feedback
    const targetEmail = process.env.FEEDBACK_EMAIL;

    if (!targetEmail || !process.env.RESEND_API_KEY) {
      console.warn(
        'FEEDBACK_EMAIL or RESEND_API_KEY not set in environment variables.'
      );
      // Fallback response when missing credentials
      return NextResponse.json({
        success: true,
        warning: 'Credentials missing, simulated feedback',
      });
    }

    // Send actual email via Resend
    const data = await resend.emails.send({
      from: 'Feedback App <onboarding@resend.dev>', // Allowed free domain for testing
      to: targetEmail,
      subject: `New Feedback from ${email || 'Anonymous'}`,
      text: `You received new feedback:\n\nEmail: ${email || 'Not provided'}\n\nMessage:\n${message}`,
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
