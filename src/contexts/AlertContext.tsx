import { createContext, useState } from 'react';

interface AlertMessage {
  type: "success" | "info" | "warning" | "error" | undefined
  message: string;
}

interface AlertContextInterface {
  message: AlertMessage | null;
  setMessage: (newMessage: AlertMessage | null) => void;
  handleClose: () => void;
}

export const AlertContext = createContext<AlertContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

export function AlertProvider({ children }: Props) {
  const [message, setMessage] = useState<AlertMessage | null>(null);

  function handleClose() {
    setMessage(null);
  }
  return (

    <AlertContext.Provider value={{ message, setMessage, handleClose }}>
      {children}
    </AlertContext.Provider>
  );
}
