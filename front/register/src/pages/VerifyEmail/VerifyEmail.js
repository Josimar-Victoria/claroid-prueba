import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LogoClaro from "./../../assets/logo-claroid.svg";
import LogoFooter from "./../../assets/logo-footer.svg";
import "./VerifyEmail.css";
import { useFormik } from "formik";
import { useState } from "react";
import { validationSchemaCode } from "../../util/validacionesDeInputText";
import IconError from "./../../assets/icon-error.svg";
import IconSucces from "./../../assets/icon-succes.svg";
import {
	errorInputStyles,
	inputStyles,
	successInputStyles,
} from "../../util/ValidacionStylesInput";
import AlertSuccesModal from "../../components/modal/AlertSuccesModal";
import AlerErrorModal from "../../components/modal/AlertErrorModal";

const validationSchema = validationSchemaCode;

function VerifyEmail() {
	const [showModal, setShowModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [storedEmail, setStoredEmail] = useState("");
	const [message, setmessage] = useState("");
	const navigate = useNavigate();


	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const handleModalNext = () => {
		setShowErrorModal(false);
	}

	// Crear un objeto useFormik con las opciones necesarias
	const formik = useFormik({
		initialValues: {
			code: "",
		},
		validationSchema, // Esquema de validación
		onSubmit: async (values, { setSubmitting }) => {
			setSubmitting(true);
			verifyOTP();
			setSubmitting(false);
		},
	});

	const { errors, touched, values } = formik;

	async function verifyOTP(){
		let lsEmail = localStorage.getItem("verifyEmail") ? localStorage.getItem("verifyEmail") : "";
		try {
			const response = await fetch("http://localhost:3000/verifyOtp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					receiver: lsEmail,
					code: values.code,
				}),
			});

			if (response.ok) {
				const dataResponse = await response.json();
				let status = dataResponse.response.status;
				switch (status) {
					case "verified":
						navigate(`/registro/formulario`);
					break;
					case "unVerified":
						formik.setFieldError('code', dataResponse.response.message)
					break;
					default:
						setmessage(dataResponse.response.message);
						setShowErrorModal(true);
					break;
				}
			} else {
				setmessage(response.statusText);
				setShowErrorModal(true);
			}
		} catch (error) {
			setmessage(error.message ? error.message : "Temporalmente no está disponible, por favor intenta más tarde.");
			setShowErrorModal(true);
		}
	};

	async function sendPin() {
		const resverifyOtp = await fetch("http://localhost:3000/sendOtp", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				receiver: storedEmail,
				via: "email",
			}),
		});
		if (resverifyOtp.ok) {
			handleShowModal();
		} else {
			console.error("Error al enviar los datos:", resverifyOtp.statusText);
		}
	}



	function renderFieldLabel(name, label, minLength) {
		const hasContent = values[name].length >= minLength;
		return hasContent ? (
			<Form.Label htmlFor={name} className="input-label">
				{label}
			</Form.Label>
		) : null;
	}

	return (
		<div className="container-register">
			<Container className="justify-content-center align-items-center text-center">
				<Row>
					<div>
						<img className="logo-claro" src={LogoClaro} alt="logo claro" />
					</div>
					<h3 className="f-gray mt-4">Verificación de correo electrónico</h3>
					<p className="f-gray">
						Para verificar tu identidad, ingresa el código que <br></br> te
						llegó a tu correo ejemplo@dominio.com
					</p>
					<Form className="mt-4" onSubmit={formik.handleSubmit}>
						<Form.Group>
							<div className="input-icon">
								{renderFieldLabel('code', 'Código', 1)}
								<Form.Control
									className={values.code != "" ? "pt-3" : ""}
									type="text"
									placeholder="Escribe el código"
									aria-describedby="inputGroupPrepend"
									id="code"
									name="code"
									style={
										touched.code
											? errors.code
												? { ...inputStyles, ...errorInputStyles }
												: { ...inputStyles, ...successInputStyles }
											: inputStyles
									}
									{...formik.getFieldProps("code")}
								/>
								{touched.code && errors.code ? (
									<img
										src={IconError}
										className="invalid-icon-email"
										alt="Icon de Alerta de Error"
									/>
								) : (
									touched.code && (
										<img
											className="valid-icon-email"
											src={IconSucces}
											alt="Icon de Alerta de to bien"
										/>
									)
								)}
							</div>
							<div className="validate-form-color">
								{touched.code && errors.code ? (
									<div>{errors.code}</div>
								) : null}
							</div>
						</Form.Group>
						<Button className="btn-red mt-4" type="submit">
							Continuar
						</Button>

						<p className="mt-4">
							¿Aún no te llega el código?{" "}
							<span
								className="color-azul fw-bold underline pointer"
								onClick={handleShowModal}
							>
								Reenviar código
							</span>
						</p>
					</Form>
					<div className="mt-4">
						<img className="logo-footer" src={LogoFooter} alt="logo-claro" />
						<span className="f-gray">
							Todos los derechos reservados. Claro 2023
						</span>
					</div>
				</Row>
				<AlertSuccesModal
					show={showModal}
					handleClose={handleCloseModal}
					body="Hemos enviado un código de seguridad a tu correo electrónico para verificar tu identidad."
				/>
				<AlerErrorModal
					show={showErrorModal}
					handleNext={handleModalNext}
					body={message}
				/>
			</Container>
		</div>
	);
}

export default VerifyEmail;
