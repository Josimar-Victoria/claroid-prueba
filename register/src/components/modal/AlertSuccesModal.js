import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IconAlertSucces from "../../assets/icon-Alerta-succes.svg";
import "./modal.css";

function AlertSuccesModal(props) {
  const { show, handleClose, body,title, shouldShowButton } = props;
  const navigate = useNavigate();

  const cambiarPagina = () => {
    if (shouldShowButton) {
      navigate('/');
    } else {
      handleClose();
    }
  };

  return (
 <div className="modal">
	<div className="modal-conten">
	<Modal show={show} onHide={handleClose} >
      <i className="icon-alerta-succes">
        <img src={IconAlertSucces} alt="" />
      </i>
      <div className="modal-text">
			<Modal.Body>{title} {body}</Modal.Body>
        <Modal.Body></Modal.Body>
      </div>
      <div>
        {shouldShowButton ? (
          <button className="btn-red-moda mt-4" onClick={cambiarPagina}>
            Continuar
          </button>
        ) : (
          <button className="btn-red-moda mt-4" onClick={handleClose}>
            Continuar
          </button>
        )}
      </div>
    </Modal>
	</div>
 </div>
  );
}

export default AlertSuccesModal;
