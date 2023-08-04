import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import IconAlertSucces from "./../../assets/icon-Alerta-succes.svg";
import IconAlertError from "../../assets/icon-error.svg"
import "./modal.css";

function AlerErrorModal(props) {
  const { show, handleClose, handleNext, body,title, shouldShowButton } = props;
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
	<Modal show={show} onHide={handleClose} next={handleNext} size="sm" centered>
      <i className="icon-alerta-succes">
        <img src={IconAlertError} alt="" />
      </i>
      <div className="modal-text">
			<Modal.Body>{title} {body}</Modal.Body>
      </div>
      <div>
        <button className="btn-red-moda" onClick={handleNext}>
            Aceptar
        </button>
      </div>
    </Modal>
	</div>
 </div>
  );
}

export default AlerErrorModal;
