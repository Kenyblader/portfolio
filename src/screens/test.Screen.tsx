import React, { useState, useEffect, ReactNode } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

// ============================================
// TYPES
// ============================================

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  footer?: ReactNode;
}

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'error' | 'success';
}

// ============================================
// MODAL DE BASE (Réutilisable)
// ============================================

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnClickOutside = true,
  closeOnEscape = true,
  footer,
}) => {
  // Gérer la fermeture avec la touche Escape
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Bloquer le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnClickOutside && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl ${sizeClasses[size]} w-full animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Fermer"
              >
                <X size={24} className="text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// ============================================
// MODAL DE CONFIRMATION
// ============================================

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'info',
}) => {
  const icons = {
    info: <Info size={48} className="text-blue-500" />,
    warning: <AlertTriangle size={48} className="text-yellow-500" />,
    error: <AlertCircle size={48} className="text-red-500" />,
    success: <CheckCircle size={48} className="text-green-500" />,
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showCloseButton={false}>
      <div className="text-center space-y-4">
        <div className="flex justify-center">{icons[type]}</div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ============================================
// EXEMPLE D'UTILISATION
// ============================================

const ModalDemo = () => {
  const [isBasicOpen, setIsBasicOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [notifications, setNotifications] = useState<string[]>([]);

  const addNotification = (message: string) => {
    setNotifications((prev) => [...prev, message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 3000);
  };

  const handleFormSubmit = () => {
    if (formData.name && formData.email) {
      addNotification(`Formulaire soumis : ${formData.name}`);
      setIsFormOpen(false);
      setFormData({ name: '', email: '' });
    }
  };

  const handleDelete = () => {
    addNotification('Élément supprimé avec succès !');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Système de Modal React TypeScript
        </h1>

        {/* Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notif, i) => (
            <div
              key={i}
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slideUp"
            >
              {notif}
            </div>
          ))}
        </div>

        {/* Boutons de démonstration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setIsBasicOpen(true)}
            className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 px-6 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            Modal Basique
          </button>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            Modal avec Formulaire
          </button>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all hover:scale-105"
          >
            Modal de Confirmation
          </button>
        </div>

        {/* Code exemple */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-4">Guide d'utilisation :</h2>
          <ul className="space-y-2 text-sm">
            <li>✅ Fermeture avec Échap</li>
            <li>✅ Fermeture en cliquant en dehors</li>
            <li>✅ Gestion du scroll du body</li>
            <li>✅ Animations fluides</li>
            <li>✅ TypeScript complet</li>
            <li>✅ Tailles personnalisables</li>
            <li>✅ Footer personnalisable</li>
          </ul>
        </div>

        {/* Modal Basique */}
        <Modal
          isOpen={isBasicOpen}
          onClose={() => setIsBasicOpen(false)}
          title="Modal Basique"
          size="md"
          footer={
            <button
              onClick={() => setIsBasicOpen(false)}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-medium"
            >
              Fermer
            </button>
          }
        >
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Ceci est une modal basique avec toutes les fonctionnalités :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
            <li>Fermeture avec la touche Échap</li>
            <li>Fermeture en cliquant en dehors</li>
            <li>Bouton de fermeture en haut à droite</li>
            <li>Footer personnalisable</li>
          </ul>
        </Modal>

        {/* Modal avec Formulaire */}
        <Modal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          title="Formulaire de Contact"
          size="lg"
          closeOnClickOutside={false}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsFormOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium text-gray-700 dark:text-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleFormSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
              >
                Soumettre
              </button>
            </div>
          </div>
        </Modal>

        {/* Modal de Confirmation */}
        <ConfirmModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleDelete}
          title="Confirmer la suppression"
          message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
          confirmText="Supprimer"
          cancelText="Annuler"
          type="warning"
        />
      </div>
    </div>
  );
};

export default ModalDemo;