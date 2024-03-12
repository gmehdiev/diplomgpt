export interface ChatInterface {
    uuid: string;
    name: string;
    temperature: number;
    topT: number;
    frequencyPenalty: number;
    presencePenalty: number;
    createdAt: Date;
    updatedAt: Date;
    profileUuid: string;
}