import { CurrentMessage } from '@prisma/client';
import { ChatCompletionMessageParam } from 'openai/resources';

export interface MessageResponse {
  userMessage: CurrentMessage;
  assistantMessageUuid: string;
  assistanCurrentMessageUuid: string;
  convertedMessages: ChatCompletionMessageParam[];
}
