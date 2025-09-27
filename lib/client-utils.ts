// Client-side utility functions
export const apiClient = {
  async createFeedback(data: {
    interviewId: string;
    userId: string;
    transcript: Array<{ role: string; content: string }>;
    feedbackId?: string;
  }) {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create feedback');
    }

    return response.json();
  },
};