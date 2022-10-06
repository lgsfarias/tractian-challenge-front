import { Alert } from "antd";
import useAlert from "../hooks/useAlert";

export default function AlertComponent() {
  const { message, handleClose } = useAlert();

  setTimeout(() => {
    handleClose();
  }, 5000);

  return (
    message && (
      <Alert
        message={message.type?.toUpperCase()}
        type={message.type}
        description={message.message}
        showIcon
        closable
        onClose={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 9999,
        }}
      />
    )
  );
}