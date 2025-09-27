import { NextRequest, NextResponse } from 'next/server';
import { createFeedback } from '@/lib/action/general.action';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { interviewId, userId, transcript, feedbackId } = body;

    const result = await createFeedback({
      interviewId,
      userId,
      transcript,
      feedbackId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}