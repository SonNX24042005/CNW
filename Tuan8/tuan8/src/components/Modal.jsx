import React from "react";
import "../styles.css";

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            ✖
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
