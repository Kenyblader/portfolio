// src/components/ConfirmModal.tsx
import { Info, AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import Modal from "./modal";
import '../style/confirmPopup.css';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => any;
  onConfirm: () => any;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "info" | "warning" | "error" | "success";
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  type = "info",
}) => {
  const icons = {
    info: <Info size={48} className="icon-info" />,
    warning: <AlertTriangle size={48} className="icon-warning" />,
    error: <AlertCircle size={48} className="icon-error" />,
    success: <CheckCircle size={48} className="icon-success" />,
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const confirmFooter = (
    <div className="confirm-footer">
      <button onClick={onClose} className="confirm-btn-cancel">
        {cancelText}
      </button>
      <button onClick={handleConfirm} className="confirm-btn-confirm">
        {confirmText}
      </button>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      footer={confirmFooter} 
      size="sm" 
      showCloseButton={false}
    >
      <div className="confirm-content">
        <div className="confirm-icon-container">
          {icons[type]}
        </div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmModal;