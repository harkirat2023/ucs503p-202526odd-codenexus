import React, {useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FiX} from "react-icons/fi";

const Modal = ({isOpen, onClose, title, children, size = "medium"}) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    small: "modal-small",
    medium: "modal-medium",
    large: "modal-large",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
          />
          <motion.div
            className={`modal-container ${sizeClasses[size]}`}
            initial={{opacity: 0, scale: 0.9, y: 20}}
            animate={{opacity: 1, scale: 1, y: 0}}
            exit={{opacity: 0, scale: 0.9, y: 20}}
            transition={{type: "spring", duration: 0.3}}>
            <div className="modal-header">
              <h3>{title}</h3>
              <button className="modal-close-btn" onClick={onClose}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </motion.div>

          <style jsx>{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: 1000;
              backdrop-filter: blur(4px);
            }
            .modal-container {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background: white;
              border-radius: 12px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
              z-index: 1001;
              max-height: 90vh;
              overflow-y: auto;
            }
            .modal-small {
              width: 90%;
              max-width: 400px;
            }
            .modal-medium {
              width: 90%;
              max-width: 600px;
            }
            .modal-large {
              width: 90%;
              max-width: 900px;
            }
            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1.5rem;
              border-bottom: 1px solid #e5e7eb;
            }
            .modal-header h3 {
              margin: 0;
              color: #1f2937;
              font-size: 1.25rem;
            }
            .modal-close-btn {
              background: none;
              border: none;
              font-size: 1.5rem;
              cursor: pointer;
              color: #6b7280;
              transition: color 0.2s;
            }
            .modal-close-btn:hover {
              color: #ef4444;
            }
            .modal-body {
              padding: 1.5rem;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
