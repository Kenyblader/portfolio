import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext } from "./globalStateContext";
import GlobalMessaging from "../components/globalMessaging";
import { messagingService } from "../services/messaging.service";


export type MessageType = 'info' | 'error' | 'success';

export interface MessagePayload {
  message: string;
  type: MessageType;
}


export interface MessageContextType {
  payloads: MessagePayload[] ;
  addMessage: (payload: MessagePayload) => void;
  removeMessage: (index: number) => void;
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const loadingContext = useContext(LoadingContext);
  const [payloads, setPayloads] = useState<MessagePayload[]>([]);

  const addMessage = (payload: MessagePayload) => {

    if (loadingContext && loadingContext.loadingState) {
        loadingContext.setLoading(false);
    }
    console.log('Adding message:', payload);
    setPayloads((prev) => [...prev, payload]);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPayloads([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [payloads]);
    const removeMessage = (index: number) => {
    setPayloads((prev) => prev.filter((_, i) => i !== index));
  };

  messagingService.init(removeMessage, addMessage);
  return (
    <MessageContext.Provider value={{ payloads, addMessage, removeMessage }}>
      {children}
      <GlobalMessaging />
    </MessageContext.Provider>
  );
};


export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  
  return context;
};
