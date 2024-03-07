import { ChatCompletionMessageParam } from 'openai/resources';

export interface MessageResponse {
  assistantMessageUuid: string;
  assistanCurrentMessageUuid: string;
  convertedMessages: ChatCompletionMessageParam[];
}
