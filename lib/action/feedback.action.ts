'use server';

import { createFeedback } from './general.action';

export async function handleCreateFeedback(params: CreateFeedbackParams) {
  return await createFeedback(params);
}