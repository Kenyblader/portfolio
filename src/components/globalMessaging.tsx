import { useMessage } from "../utils/messageContext";
import { Info, CheckCircle, AlertTriangle, X } from "lucide-react";
import '../style/globalMessaging.css';

const icons = {
  info: <Info className="icon" />,
  success: <CheckCircle className="icon" />,
  error: <AlertTriangle className="icon" />,
};

const GlobalMessaging = () => {
  const { payloads, removeMessage } = useMessage();

  if (payloads.length === 0) return null;

  const current = payloads[0];

  return (
    <div className="message-container">
      <div className={`message-box ${current.type}`}>
        {icons[current.type]}
        <p>{current.message}</p>

        <button
          className="close-button"
          onClick={() => removeMessage(0)}
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default GlobalMessaging;
