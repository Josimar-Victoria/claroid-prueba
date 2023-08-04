import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import LogoClaro from "./../../assets/logo-claroid.svg";
import LogoFooter from "./../../assets/logo-footer.svg";
import IconFlechaIzq from "./../../assets/icon-flecha-izq.svg";
import { useFormik } from "formik";
import { validationSchemaEmail } from "../../util/validacionesDeInputText";
import IconError from "./../../assets/icon-error.svg";
import IconSucces from "./../../assets/icon-succes.svg";
import "./ValidateEmail.css";
import {
	errorInputStyles,
	inputStyles,
	successInputStyles,
} from "../../util/ValidacionStylesInput";

import AlertSuccesModal from "../../components/modal/AlertSuccesModal";
import AlerErrorModal from "../../components/modal/AlertErrorModal";

const validationSchema = validationSchemaEmail;
function ValidateEmail() {
	const [submitting, setSubmitting] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [statusValidate, setStatusValidate] = useState("");
	const [message, setmessage] = useState("");

	const handleModal = () => setShowModal(false);
	const handleModalNext = () => {
		switch (statusValidate) {
			case "check":
				navigate("/registro/formulario");
				setStatusValidate("");
				break;
			case "created":
				setShowModal(false);
				setStatusValidate("");
				break;
			case "toCheck":
				setShowModal(false);
				setStatusValidate("");
				sendOTP();
				break;
			case "toCreate":
				setShowModal(false);
				setStatusValidate("");
				sendOTP();
				break;
			default:
				setShowModal(false);
				setStatusValidate("");
				break;
		}
		
	};

	const navigate = useNavigate();

	function goTologin() {
		navigate(`/`);
	}

	async function sendOTP() {
		const resverifyOtp = await fetch("http://localhost:3000/sendOtp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				receiver: values.email,
				via: "email",
			}),
		});
		if (resverifyOtp.ok) {
			const dataResponse = await resverifyOtp.json();
			if(dataResponse.error == 0){
				localStorage.setItem("verifyEmail", values.email)
				navigate(`/registro/verificar`);			
			}else{
				setmessage(dataResponse.response.message);
				setShowModal(true);
			}	
		} else {
			console.error("Error al enviar los datos:", resverifyOtp.statusText);
		}
	}

	// Crear un objeto useFormik con las opciones necesarias
	const formik = useFormik({
		initialValues: {
			email: "",
			confirmEmail: ''
		},
		validationSchema, // Esquema de validación
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			setSubmitting(false);
			await verifyEmail(values.email)
		},
	});

	const { errors, touched, values } = formik;

	function renderFieldLabel(name, label, minLength) {
		const hasContent = values[name].length >= minLength;
		return hasContent ? (
			<Form.Label htmlFor={name} className="input-labell">
				{label}
			</Form.Label>
		) : null;
	}

	async function verifyEmail(email) {
		let data = {
			email: email
		}
		try {
			const response = await fetch("http://localhost:3000/verifyEmail", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				const dataResponse = await response.json();

				if(dataResponse.error == 0){
					let statusValidate = dataResponse.response.status;
					setStatusValidate(statusValidate);
					setmessage(dataResponse.response.message);
					setShowModal(true);				
				}else{
					setmessage(dataResponse.response.message);
					setShowModal(true);
				}
			} else {
				setmessage("Error al enviar los datos: " + response.statusText);
				setShowModal(true);
			}
		} catch (error) {
			setmessage("Error al enviar los datos: " + error);
			setShowModal(true);
		}
	};

	return (
		<div className="container-register">
			<Container className="justify-content-center align-items-center text-center">
				<Row className="align-items-center">
					<div>
						<img className="logo-claro" src={LogoClaro} alt="logo claro" />
					</div>
					<h3 className="f-gray mt-4">¡Bienvenido a Claro ID!</h3>
					<p className="f-gray">
						Ingresa tu correo electrónico para iniciar con tu registro.
					</p>
					<div className="align-items-center">
						<Form className="mt-4" onSubmit={formik.handleSubmit}>
							<Form.Group >
								<div className="input-icon">
									{renderFieldLabel('email', 'Correo electrónico', 1)}
									<Form.Control
										className={ values.email != "" ? "pt-3" : "" }
										type="email"
										placeholder="Correo electrónico"
										aria-describedby="inputGroupPrepend"
										id="email"
										name="email"
										style={
											touched.email
												? errors.email
													? { ...inputStyles, ...errorInputStyles }
													: { ...inputStyles, ...successInputStyles }
												: inputStyles
										}
										{...formik.getFieldProps("email")}
									/>

									{touched.email && errors.email ? (
										<img
											src={IconError}
											className="invalid-icon-email"
											alt="Icon de Alerta de Error"
										/>
									) : (
										touched.email && (
											<img
												className="valid-icon-email"
												src={IconSucces}
												alt="Icon de Alerta de to bien"
											/>
										)
									)}
								</div>
								<div className="validate-form-color">
									{touched.email && errors.email ? (
										<div>{errors.email}</div>
									) : null}
								</div>
							</Form.Group>
							{!errors.email && values.email != "" ?
								<Form.Group className="mt-4">
									<div className="input-icon">
										{renderFieldLabel('confirmEmail', 'Confirmar Correo electrónico', 1)}
										<Form.Control
											className={ values.confirmEmail != "" ? "pt-3" : "" }
											type="confirmEmail"
											placeholder="Confirmar Correo electrónico"
											aria-describedby="inputGroupPrepend"
											id="confirmEmail"
											name="confirmEmail"
											style={
												touched.confirmEmail
													? errors.confirmEmail
														? { ...inputStyles, ...errorInputStyles }
														: { ...inputStyles, ...successInputStyles }
													: inputStyles
											}
											{...formik.getFieldProps("confirmEmail")}
										/>

										{touched.confirmEmail && errors.confirmEmail ? (
											<img
												src={IconError}
												className="invalid-icon-email"
												alt="Icon de Alerta de Error"
											/>
										) : (
											touched.confirmEmail && (
												<img
													className="valid-icon-email"
													src={IconSucces}
													alt="Icon de Alerta de to bien"
												/>
											)
										)}
									</div>
									<div className="validate-form-color">
										{touched.confirmEmail && errors.confirmEmail ? (
											<div>{errors.confirmEmail}</div>
										) : null}
									</div>
								</Form.Group> : ""
							}

							<Button className="btn-red mt-4" type="submit">
								Continuar
							</Button>
						</Form>
						<Col>
							<Row className="d-flex align-items-center">
								<Col>
									<button
										className="mt-4 btn-simple"
										onClick={() => goTologin()}
									>
										<img src={IconFlechaIzq} alt="flecha izq" />
										<span className="color-azul fw-bold">
											{" "}
											Regresar al inicio
										</span>
									</button>
								</Col>
							</Row>
						</Col>
					</div>
					<div className="mt-5 foote-container">
						<img className="logo-footer" src={LogoFooter} alt="logo-claro" />
						<span className="f-gray">
							Todos los derechos reservados. Claro 2023
						</span>
					</div>
				</Row>
				<AlerErrorModal
					show={showModal}
					handleNext={handleModalNext}
					body={message}
				/>
			</Container>
		</div>
	);
}

export default ValidateEmail;
