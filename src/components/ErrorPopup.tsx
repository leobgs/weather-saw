interface ErrorPopupProps {
  message: string;
  onClose: () => void;
}

export default function ErrorPopup({ message, onClose }: ErrorPopupProps) {
  return (
    <div className="error-popup-overlay">
      <div className="error-popup-content fade-in">
        <h3>Error</h3>
        <p>{message}</p>
        <button onClick={onClose} className="error-close-btn">
          Close
        </button>
      </div>
    </div>
  );
}
