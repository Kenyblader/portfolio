import { MessagePayload, MessageType } from "../utils/messageContext";

export class MessagingService {
  private removeMessageCallback: ((index: number) => void) | null = null;
  private addMessageCallback: ((payload: MessagePayload) => void) | null = null;

  public init(rmCalback: (index: number) => void, addCallback: (payload: MessagePayload) => void) {
    this.removeMessageCallback = rmCalback;
    this.addMessageCallback = addCallback;
  }

  public addMessage(message: string, type: MessageType) {
    if (this.addMessageCallback) {
      this.addMessageCallback({ message, type });
    }
    
  }

  public removeMessage(index: number) {
    if (this.removeMessageCallback) {
      this.removeMessageCallback(index);
    }
  }

}
export const messagingService = new MessagingService();