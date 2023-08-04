// import React, { Component } from "react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Form, InputGroup, Tab, Tabs } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LogoClaro from "./../../assets/logo-claroid.svg";
import LogoFooter from "./../../assets/logo-footer.svg";
import IconFlecha from "./../../assets/icon-flecha.svg";
import IconFlechaIzq from "./../../assets/icon-flecha-izq.svg";
import BgRegister from "./../../assets/img-register.png";
import IconHelp from "./../../assets/icon-help.svg";
import IconVerPassword from "./../../assets/Frame.png";
import IconOcultarPassword from "./../../assets/OcultarClave_Icono.svg";
import IconArrowDown from "./../../assets/arrow-down.svg";
import IconError from "./../../assets/icon-error.svg";
import IconSucces from "./../../assets/icon-succes.svg";
import "./Register.css";
import ImagenConTooltip from "../../components/ImagenConTooltip";
import { validationSchemaPrimaryForm, validationSchemaSecondForm } from "../../util/validacionesDeInputText";
import {
	inputStyles,
	errorInputStyles,
	successInputStyles,
	iconStyles,
	disabledInputStyles,
} from "../../util/ValidacionStylesInput";

import AlertSuccesModal from "../../components/modal/AlertSuccesModal";
import { useNavigate } from "react-router-dom";
import AlerErrorModal from "../../components/modal/AlertErrorModal";

const reqRegister = {
	claroID: "",
	securityPIN: "",
	digitalEcosystem: "ClaroID",
	channel: {
		id: "ClaroID",
		description: "Portal ClaroID"
	},
	identificationCard: {
		type: "CED",
		identification: "",
		expeditionDate: ""
	},
	firstName: "",
	lastName: "",
	country: "Ecuador",
	birthDate: "",
	serviceNumber: "",
	password: "",
	challengeQuestions: [
		{
			question: "¿Color favorito?",
			answer: ""
		},
		{
			question: "¿Cuál es tu festividad favorita?",
			answer: ""
		}
	],
	contactMedium: [
		{
			enable: true,
			type: "email",
			value: ""
		}
	],
	username: "",
	securityImage: {
		id: "1",
		url: "default.jpg"
}
};

function Register() {
	const [key, setKey] = useState(1);
	const [submitting, setSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPin, setShowPin] = useState(false);
	const [validationSuccesfully, setValidationSuccesfully] = useState(false);

	const [isUppercaseCharacter, setIsUppercaseCharacter] = useState("check-empty");
	const [isLowercaseCharacter, setIsLowercaseCharacter] = useState("check-empty");
	const [isNumber, setIsNumber] = useState("check-empty");
	const [isMinimumCharacter, setIsMinimumCharacter] = useState("check-empty");

	const [primaryFormValid, setPrimaryFormValid] = useState(true);
	const [message, setmessage] = useState("");
	const [showErrorModal, setShowErrorModal] = useState(false);

	const [showModal, setShowModal] = useState(false);

	const handleCloseModal = () => { setShowModal(false); navigate('/')};
	const handleShowModal = () => setShowModal(true);

	const [securityQuestions, setSecurityQuestions] = useState([]);
	const [securityImages, setSecurityImages] = useState([]);
	const navigate = useNavigate();

	console.log({ securityQuestions })
	console.log({ securityImages })
	const inputType = showPassword ? "text" : "password";
	const inputPinType = showPin ? "text" : "password";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const responseQuestions = await fetch('http://localhost:3000/getSecurityQuestions');
				const dataQuestions = await responseQuestions.json();
				setSecurityQuestions(dataQuestions.response);

				const responseImages = await fetch('http://localhost:3000/getSecurityImages');
				const dataImages = await responseImages.json();
				setSecurityImages(dataImages.response);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);


	const handleModalNext = () => {
		setShowErrorModal(false);
	}

	// Crear un objeto useFormik con las opciones necesarias
	const formik = useFormik({
		initialValues: {
			respustaDeSeguridad1: "",
			respustaDeSeguridad2: "",
			respustaDeSeguridad3: "",
			respustaDeSeguridad4: "",
			selectTipDoc: "",
			nombre: "",
			apellido: "",
			fechaNacimiento: "",
			fechaDExpiracion: "",
			numeroDeDoc: "",
			nCelular: "",
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
			pin: "",
		},
		validationSchema: validationSchemaPrimaryForm, // Esquema de validación
		onSubmit: (values) => {
			setSubmitting(true);
			console.log(values);
			setPrimaryFormValid(true);
			handleNext(2);
			setSubmitting(false);
		},
	});

	const formik2 = useFormik({
		initialValues: {
			preguntaDeSeguridad1: "",
			preguntaDeSeguridad2: "",
			preguntaDeSeguridad3: "",
			preguntaDeSeguridad4: "",
			respustaDeSeguridad1: "",
			respustaDeSeguridad2: "",
			respustaDeSeguridad3: "",
			respustaDeSeguridad4: "",
			pin: "",
			tyc: ""
		},
		validationSchema: validationSchemaSecondForm, // Esquema de validación
		onSubmit: (values) => {
			setSubmitting(true);
			console.log(values);
			sendRegister();
			setSubmitting(false);
		},
	});

	const { errors, touched, values } = formik;
	const { errors: errors2, touched: touched2, values: values2, dirty } = formik2;

	const isValid = !dirty ? false : Object.keys(errors2).length > 0 ? false : true;

	function renderFieldLabel(name, label, minLength) {
		const hasContent = values[name].length >= minLength;
		return hasContent ? (
			<Form.Label htmlFor={name} className="input-label-register">
				{label}
			</Form.Label>
		) : null;
	}

	async function sendRegister(){
		reqRegister.claroID = values.email;
		reqRegister.securityPIN = values2.pin;
		reqRegister.identificationCard.identification = values.numeroDeDoc;
		reqRegister.identificationCard.expeditionDate = values.fechaDExpiracion;
		reqRegister.firstName = values.nombre;
		reqRegister.lastName = values.apellido;
		reqRegister.birthDate = values.fechaNacimiento;
		reqRegister.serviceNumber = values.nCelular;
		reqRegister.password = values.password;
		reqRegister.username = values.username;
		reqRegister.challengeQuestions = [
			{
				question: values2.preguntaDeSeguridad1,
				answer: values2.respustaDeSeguridad1
			},
			{
				question: values2.preguntaDeSeguridad2,
				answer: values2.respustaDeSeguridad2
			},
			{
				question: values2.preguntaDeSeguridad3,
				answer: values2.respustaDeSeguridad3
			},
			{
				question: values2.preguntaDeSeguridad4,
				answer: values2.respustaDeSeguridad4
			}
		];
		reqRegister.contactMedium[0].value = values.email;

		console.log(reqRegister);
		try {
			const response = await fetch("http://localhost:3000/createUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(reqRegister),
			});

			if (response.ok) {
				const dataResponse = await response.json();
				if(dataResponse.error == 0){
					setShowModal(true);
				}else{
					setmessage(dataResponse.response.message);
					setShowErrorModal(true);
				}
			} else {
				setmessage("Error al enviar los datos: " + response.statusText);
				setShowErrorModal(true);
			}
		} catch (error) {
			setmessage(error.message ? error.message : "Temporalmente no está disponible, por favor intenta más tarde.");
			setShowErrorModal(true);
		}
	};

	const handleSelect = (selectedKey) => {
		setKey(selectedKey);
	};

	const handleNext = (ky = 1) => {
		setKey(2);
	};

	const handleBack = () => {
		setKey(key - 1);
	};

	const handleFormValuesChange = (values) => {
		if (values.fechaDExpiracion != "" && values.selectTipDoc != "" && values.numeroDeDoc != "") {
			setValidationSuccesfully(true);
			validatePassword(values.password);
		}
	};

	function validatePassword(password) {

		const uppercaseRegex = /[A-Z]/;
		const lowercaseRegex = /[a-z]/;
		const numberRegex = /\d/;

		if (password == "") {
			setIsMinimumCharacter("check-error");
			setIsUppercaseCharacter("check-error");
			setIsLowercaseCharacter("check-error");
			setIsNumber("check-error");
			return false;
		}

		if (password.length < 8) {
			setIsMinimumCharacter("check-error");
		} else {
			setIsMinimumCharacter("check-active");
		}


		if (!uppercaseRegex.test(password)) {
			setIsUppercaseCharacter("check-error");
		} else {
			setIsUppercaseCharacter("check-active");
		}

		if (!lowercaseRegex.test(password)) {
			setIsLowercaseCharacter("check-error");
		} else {
			setIsLowercaseCharacter("check-active");
		}

		if (!numberRegex.test(password)) {
			setIsNumber("check-error");
		} else {
			setIsNumber("check-active");
		}


	}

	return (
		<Container fluid>
			<Row>
				<Col xs={9}>
					<div className="column-form">
						<div>
							<img
								className="logo-claro-register mt-4"
								src={LogoClaro}
								alt="logo claro"
							/>
						</div>
						<h4 className="mt-3">Registro</h4>
						<p className="p-h3">
							Crea tu identidad digital para nuestros servicios en línea.
						</p>
						<Tabs className="mb-3" fill activeKey={key} onSelect={handleSelect}>
							<Tab eventKey={1} title="Datos básicos">
								<Form className="mt-4" onSubmit={formik.handleSubmit}>
									<Row>
										<Col>
											<div>
												<p className="subtitle">Identificación</p>
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Group className="mb-3">
												<div className="select-container">
													{renderFieldLabel(
														"selectTipDoc",
														"Tipo de documento",
														1
													)}
													<Form.Select
														className={values.selectTipDoc != "" ? "form-control w100 pt-3" : "form-control w100"}
														placeholder="Tipo de documento"
														id="selectTipDoc"
														name="selectTipDoc"
														as="select"
														style={
															touched.selectTipDoc
																? errors.selectTipDoc
																	? { ...inputStyles, ...errorInputStyles }
																	: { ...inputStyles, ...successInputStyles }
																: inputStyles
														}
														{...formik.getFieldProps("selectTipDoc")}

													>
														<option value="" disabled selected>
															Tipo de documento
														</option>
														<option value="cc">CC</option>
														<option value="ti">TI</option>
													</Form.Select>
													<i className="select-icon">
														<img src={IconArrowDown} alt="Icon Arrow Down" />
													</i>
												</div>
												<Form.Label for="my-select"> </Form.Label>
												<div className="validate-form-color">
													{touched.selectTipDoc && errors.selectTipDoc ? (
														<div>{errors.selectTipDoc}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel(
														"numeroDeDoc",
														"Número de documento",
														1
													)}
													<Form.Control
														className="form-control w100"
														type="text"
														placeholder="Número de documento"
														aria-describedby="inputGroupPrepend"
														id="numeroDeDoc"
														name="numeroDeDoc"
														style={
															touched.numeroDeDoc
																? errors.numeroDeDoc
																	? { ...inputStyles, ...errorInputStyles }
																	: { ...inputStyles, ...successInputStyles }
																: inputStyles
														}
														{...formik.getFieldProps("numeroDeDoc")}

													/>
													{touched.numeroDeDoc && errors.numeroDeDoc ? (
														<img
															src={IconError}
															className="invalid-icon"
															alt="Icon de Alerta de Error"
														/>
													) : (
														touched.numeroDeDoc && (
															<img
																className="valid-icon"
																src={IconSucces}
																alt="Icon de Alerta de to bien"
															/>
														)
													)}
												</div>
												<div className="validate-form-color">
													{touched.numeroDeDoc && errors.numeroDeDoc ? (
														<div>{errors.numeroDeDoc}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Group controlId="validationCustomFDeExpedicion">
												{/* {renderFieldLabel('fechaDExpiracion', 'Fecha de expedición', 1)} */}
												<Form.Control
													className="form-control w100"
													type="date"
													id="fechaDExpiracion"
													name="fechaDExpiracion"
													style={
														touched.fechaDExpiracion
															? errors.fechaDExpiracion
																? { ...inputStyles, ...errorInputStyles }
																: { ...inputStyles, ...successInputStyles }
															: inputStyles
													}
													placeholder="Fecha de expedición"
													aria-describedby="inputGroupPrepend"
													{...formik.getFieldProps("fechaDExpiracion")}

												/>
												<div className="validate-form-color">
													{touched.fechaDExpiracion &&
														errors.fechaDExpiracion ? (
														<div>{errors.fechaDExpiracion}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
										<Col></Col>
									</Row>
									<Row>
										<Col>
											<div className="mt-4">
												<p className="subtitle">Datos de contacto</p>
											</div>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel("nombre", "Nombres", 1)}
													<Form.Control
														className="w100"
														type="text"
														placeholder="Nombres"
														id="nombre"
														name="nombre"
														disabled={!validationSuccesfully}
														style={
															!validationSuccesfully
																? { ...inputStyles, ...disabledInputStyles }
																: touched.nombre
																	? errors.nombre
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
														}
														{...formik.getFieldProps("nombre")}
													/>
													{/* <Form.Label>Nmbres</Form.Label> */}
													{touched.nombre && errors.nombre ? (
														<img
															src={IconError}
															className="invalid-icon"
															alt="Icon de Alerta de Error"
														/>
													) : (
														touched.nombre && (
															<img
																className="valid-icon"
																src={IconSucces}
																alt="Icon de Alerta de to bien"
															/>
														)
													)}
												</div>

												<div className="validate-form-color">
													{touched.nombre && errors.nombre ? (
														<div>{errors.nombre}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel("apellido", "Apellidos", 1)}
													<Form.Control
														className="w100"
														type="text"
														placeholder="Apellidos"
														id="apellido"
														name="apellido"
														disabled={!validationSuccesfully}
														style={
															!validationSuccesfully
																? { ...inputStyles, ...disabledInputStyles }
																: touched.apellido
																	? errors.apellido
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
														}
														{...formik.getFieldProps("apellido")}
													/>
													{touched.apellido && errors.apellido ? (
														<img
															src={IconError}
															className="invalid-icon"
															alt="Icon de Alerta de Error"
														/>
													) : (
														touched.apellido && (
															<img
																className="valid-icon"
																src={IconSucces}
																alt="Icon de Alerta de to bien"
															/>
														)
													)}
												</div>
												<div className="validate-form-color">
													{touched.apellido && errors.apellido ? (
														<div>{errors.apellido}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
									</Row>
									<Row className="mt-3">
										<Col>
											<Form.Group>
												<Form.Control
													className="w100"
													type="date"
													placeholder="Fecha de nacimiento"
													id="fechaNacimiento"
													name="fechaNacimiento"
													disabled={!validationSuccesfully}
													style={
														!validationSuccesfully
															? { ...inputStyles, ...disabledInputStyles }
															: touched.fechaNacimiento
																? errors.fechaNacimiento
																	? { ...inputStyles, ...errorInputStyles }
																	: { ...inputStyles, ...successInputStyles }
																: inputStyles
													}
													{...formik.getFieldProps("fechaNacimiento")}
												/>
												<div className="validate-form-color">
													{touched.fechaNacimiento &&
														errors.fechaNacimiento ? (
														<div>{errors.fechaNacimiento}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel(
														"nCelular",
														"Número de celular",
														1
													)}
													<Form.Control
														className="w100"
														type="text"
														placeholder="Número de celular"
														id="nCelular"
														name="nCelular"
														disabled={!validationSuccesfully}
														style={
															!validationSuccesfully
																? { ...inputStyles, ...disabledInputStyles }
																: touched.nCelular
																	? errors.nCelular
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
														}
														{...formik.getFieldProps("nCelular")}
													/>
													{touched.nCelular && errors.nCelular ? (
														<img
															src={IconError}
															className="invalid-icon"
															alt="Icon de Alerta de Error"
														/>
													) : (
														touched.nCelular && (
															<img
																className="valid-icon"
																src={IconSucces}
																alt="Icon de Alerta de to bien"
															/>
														)
													)}
												</div>
												<div className="validate-form-color">
													{touched.nCelular && errors.nCelular ? (
														<div>{errors.nCelular}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
									</Row>

									<Row className="mt-3">
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel("username", "Usuario", 1)}
													<Form.Control
														className="form-control w100"
														type="text"
														placeholder="Usuario"
														id="username"
														name="username"
														disabled={!validationSuccesfully}
														style={
															!validationSuccesfully
																? { ...inputStyles, ...disabledInputStyles }
																: touched.username
																	? errors.username
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
														}
														{...formik.getFieldProps("username")}
													/>
													{touched.username && errors.username ? (
														<img
															src={IconError}
															className="invalid-icon"
															alt="Icon de Alerta de Error"
														/>
													) : (
														touched.username && (
															<img
																className="valid-icon"
																src={IconSucces}
																alt="Icon de Alerta de to bien"
															/>
														)
													)}
												</div>
												<div className="validate-form-color">
													{touched.username && errors.username ? (
														<div>{errors.username}</div>
													) : null}
												</div>
											</Form.Group>

											<div className="mt-2 mb-0">
												<p className="mb-0  fs-12 pl-20 color-gris-claro">
													Este será tu usuario para iniciar sesión en Claro
													ID.
												</p>
											</div>
										</Col>
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel("email", "Correo electrónico", 1)}
													<Form.Control
														className="w100"
														type="email"
														placeholder="Correo electrónico"
														id="email"
														name="email"
														disabled={!validationSuccesfully}
														style={
															!validationSuccesfully
																? { ...inputStyles, ...disabledInputStyles }
																: touched.email
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
															className="invalid-icon"
															alt="Icon de Alerta de Error"
														/>
													) : (
														touched.email && (
															<img
																className="valid-icon"
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
										</Col>
									</Row>
									<Row className="mt-3">
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel("password", "Contraseña", 1)}
													<Form.Control
														className="w100"
														type={inputType}
														placeholder="Contraseña"
														id="password"
														name="password"
														disabled={!validationSuccesfully}
														style={
															!validationSuccesfully
																? { ...inputStyles, ...disabledInputStyles }
																: touched.password
																	? errors.password
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
														}
														{...formik.getFieldProps("password")}
													/>
													<i onClick={() => setShowPassword(!showPassword)}>
														{showPassword ? (
															<img
																src={IconOcultarPassword}
																alt="Ocultar Contraseña"
															/>
														) : (
															<img src={IconVerPassword} alt="ver password" />
														)}
													</i>
												</div>
												<div className="validate-form-color">
													{touched.password && errors.password ? (
														<div>{errors.password}</div>
													) : null}
												</div>
											</Form.Group>

											<div className="mt-3 pl-20 fs-12 color-gris-claro">
												<p className="mb-2">La contraseña debe tener:</p>
												<Row>
													<Col className="d-flex">
														{/* <div className="check-empty"></div> */}
														<div
															className={isLowercaseCharacter}
														></div>
														<span>Un caracter en minúscula</span>
													</Col>
													<Col className="d-flex">
														<div
															className={isUppercaseCharacter}
														></div>
														{/* <div className="check-empty"></div> */}
														<span>Un caracter en mayúscula</span>
													</Col>
												</Row>
												<Row>
													<Col className="d-flex">
														<div
															className={isNumber}
														></div>
														{/* <div className="check-empty"></div> */}
														<span>Un número</span>
													</Col>
													<Col className="d-flex">
														<div
															className={isMinimumCharacter}
														></div>
														{/* <div className="check-empty"></div> */}
														<span>8 caracteres como mínimo</span>
													</Col>
												</Row>
											</div>
										</Col>
										<Col>
											<Form.Group>
												<div className="input-icon">
													{renderFieldLabel(
														"confirmPassword",
														"Confirmar contraseña",
														1
													)}
													<Form.Control
														className="w100"
														type={inputType}
														placeholder="Confirmar contraseña"
														id="confirmPassword"
														name="confirmPassword"
														disabled={!validationSuccesfully}
														style={
															!validationSuccesfully
																? { ...inputStyles, ...disabledInputStyles }
																: touched.confirmPassword
																	? errors.confirmPassword
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
														}
														{...formik.getFieldProps("confirmPassword")}
													/>
													<i onClick={() => setShowPassword(!showPassword)}>
														{showPassword ? (
															<img
																src={IconOcultarPassword}
																alt="Ocultar Contraseña"
															/>
														) : (
															<img src={IconVerPassword} alt="ver password" />
														)}
													</i>
												</div>
												<div className="validate-form-color">
													{touched.confirmPassword &&
														errors.confirmPassword ? (
														<div>{errors.confirmPassword}</div>
													) : null}
												</div>
											</Form.Group>
										</Col>
									</Row>
									<Row className="d-flex align-item-center">
										<Col>
											<p className="mt-4">
												¿Ya tienes una cuenta?
												<a href="/">
													<span className="color-red fw-bold underline pointer">
														{" "}
														Inicia sesión aquí
													</span>
												</a>
											</p>
										</Col>
										<Col className="text-align-end">
											<Button
												// type="submit"
												className="btn-red w270px mt-4"
												type="submit"
												disabled={!validationSuccesfully}
												style={
													!validationSuccesfully
														? { backgroundColor: "#d3d3d3", color: "#FFFFFF" }
														: { backgroundColor: "#DA291C", color: "#FFFFFF" }
												}
											>
												Siguiente <img src={IconFlecha} alt="flecha" />
											</Button>
										</Col>
									</Row>
									{useEffect(() => {
										handleFormValuesChange(values);
									}, [values])}
								</Form>

							</Tab>
							<Tab eventKey={2} title="Seguridad" disabled={primaryFormValid}>
								<div>
									<p className="subtitle">PIN de Seguridad</p>
									<Form className="mt-4" onSubmit={formik2.handleSubmit}>
										<Row>
											<Col>
												<Form.Group>
													<div className="input-icon">
														{renderFieldLabel("pin", "Crea tu PIN", 1)}
														<Form.Control
															className="form-control w100"
															type={inputPinType}
															placeholder="Crea tu PIN"
															id="pin"
															name="pin"
															disabled={!validationSuccesfully}
															style={
																!validationSuccesfully
																	? { ...inputStyles, ...disabledInputStyles }
																	: touched2.pin
																		? errors2.pin
																			? { ...inputStyles, ...errorInputStyles }
																			: { ...inputStyles, ...successInputStyles }
																		: inputStyles
															}
															{...formik2.getFieldProps("pin")}
														/>
														<i onClick={() => setShowPin(!showPin)}>
															{showPin ? (
																<img
																	src={IconOcultarPassword}
																	alt="Ocultar PIN"
																/>
															) : (
																<img src={IconVerPassword} alt="ver password" />
															)}
														</i>
														<div className="validate-form-color">
															{touched2.pin && errors2.pin ? (
																<div>{errors2.pin}</div>
															) : null}
														</div>
													</div>
												</Form.Group>
											</Col>
											<Col className="d-flex align-item-cente justify-content-center">
												<div className="red">
													<ImagenConTooltip
														imagen={IconHelp}
														alt="Ejemplo de imagen"
														texto="El PIN de seguridad debe contener minimo 4 digitos numericos y sera utilizado para transacciones de nuestros servicios digitales Mas adelante podras encontrarlo en tu perfil"
													/>
												</div>
												<p className="m-0 color-gris-claro">
													El PIN de seguridad será utilizado para transacciones
													de nuestros servicios digitales Debe contener.
													<span className="fw-bold"> 4 dígitos numéricos</span>.
												</p>
											</Col>
										</Row>
									</Form>
								</div>
								<div className="mt-3">
									<span className="subtitle">Preguntas de seguridad</span>
									<span className="fs-12 color-gris-claro">
										Para mayor seguridad usa mayúsculas y minúsculas, siempre
										serán tenidas en cuenta.
									</span>
									<Form className="mt-4" onSubmit={formik2.handleSubmit}>
										<Row>
											<Col>
												<Form.Group className="mb-3">
													<div className="select-container">
														<Form.Select
															id="my-select"
															className="form-control w100"
															placeholder="Escoge la pregunta de seguridad"
															style={
																touched2.preguntaDeSeguridad1
																	? errors2.preguntaDeSeguridad1
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("preguntaDeSeguridad1")}>
															<option selected>
																Escoge la pregunta de seguridad
															</option>
															{securityQuestions.map(question => (
																<option key={question.id} value={question.description}>
																	{question.description}
																</option>))}
														</Form.Select>
														<i className="select-icon">
															<img src={IconArrowDown} alt="Icon Arrow Down" />
														</i>
													</div>

													<div className="validate-form-color">
														{touched2.preguntaDeSeguridad1 &&
															errors2.preguntaDeSeguridad1 ? (
															<div>{errors2.preguntaDeSeguridad1}</div>
														) : null}
													</div>
													<Form.Label for="my-select"> </Form.Label>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<div className="input-icon">
														{renderFieldLabel("respustaDeSeguridad1", "Escribe tu respuesta", 1)}
														<Form.Control
															className="form-control w100"
															type="text"
															placeholder="Escribe tu respuesta"
															aria-describedby="inputGroupPrepend"
															id="respustaDeSeguridad1"
															name="respustaDeSeguridad1"
															style={
																touched2.respustaDeSeguridad1
																	? errors2.respustaDeSeguridad1
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("respustaDeSeguridad1")}
															required
														/>
														{touched2.respustaDeSeguridad1 &&
															errors2.respustaDeSeguridad1 ? (
															<img
																src={IconError}
																className="invalid-icon"
																alt="Icon de Alerta de Error"
															/>
														) : (
															touched2.respustaDeSeguridad1 && (
																<img
																	className="valid-icon"
																	src={IconSucces}
																	alt="Icon de Alerta de to bien"
																/>
															)
														)}
													</div>
													<div className="validate-form-color">
														{touched2.respustaDeSeguridad1 &&
															errors2.respustaDeSeguridad1 ? (
															<div>{errors2.respustaDeSeguridad1}</div>
														) : null}
													</div>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group className="mb-3">
													<div className="select-container">
														<Form.Select
															id="my-select"
															className="form-control w100"
															placeholder="Escoge la pregunta de seguridad"
															style={
																touched2.preguntaDeSeguridad2
																	? errors2.preguntaDeSeguridad2
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("preguntaDeSeguridad2")}>
															<option selected>
																Escoge la pregunta de seguridad
															</option>
															{securityQuestions.map(question => (
																<option key={question.id} value={question.description}>
																	{question.description}
																</option>))}
														</Form.Select>
														<i className="select-icon">
															<img src={IconArrowDown} alt="Icon Arrow Down" />
														</i>
													</div>
													<div className="validate-form-color">
														{touched2.preguntaDeSeguridad2 &&
															errors2.preguntaDeSeguridad2 ? (
															<div>{errors2.preguntaDeSeguridad2}</div>
														) : null}
													</div>
													<Form.Label for="my-select"> </Form.Label>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<div className="input-icon">
														{renderFieldLabel("respustaDeSeguridad2", "Escribe tu respuesta", 1)}
														<Form.Control
															className="form-control w100"
															type="text"
															placeholder="Escribe tu respuesta"
															aria-describedby="inputGroupPrepend"
															id="respustaDeSeguridad2"
															name="respustaDeSeguridad2"
															style={
																touched2.respustaDeSeguridad2
																	? errors2.respustaDeSeguridad2
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("respustaDeSeguridad2")}
															required
														/>
														{touched2.respustaDeSeguridad2 &&
															errors2.respustaDeSeguridad2 ? (
															<img
																src={IconError}
																className="invalid-icon"
																alt="Icon de Alerta de Error"
															/>
														) : (
															touched2.respustaDeSeguridad2 && (
																<img
																	className="valid-icon"
																	src={IconSucces}
																	alt="Icon de Alerta de to bien"
																/>
															)
														)}
													</div>
													<div className="validate-form-color">
														{touched2.respustaDeSeguridad2 &&
															errors2.respustaDeSeguridad2 ? (
															<div>{errors2.respustaDeSeguridad2}</div>
														) : null}
													</div>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group className="mb-3">
													<div className="select-container">
														<Form.Select
															id="my-select"
															className="form-control w100"
															placeholder="Escoge la pregunta de seguridad"
															style={
																touched2.preguntaDeSeguridad3
																	? errors2.preguntaDeSeguridad3
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("preguntaDeSeguridad3")}>
															<option selected>
																Escoge la pregunta de seguridad
															</option>
															{securityQuestions.map(question => (
																<option key={question.id} value={question.description}>
																	{question.description}
																</option>))}
														</Form.Select>
														<i className="select-icon">
															<img src={IconArrowDown} alt="Icon Arrow Down" />
														</i>
													</div>
													<div className="validate-form-color">
														{touched2.preguntaDeSeguridad3 &&
															errors2.preguntaDeSeguridad3 ? (
															<div>{errors2.preguntaDeSeguridad3}</div>
														) : null}
													</div>
													<Form.Label for="my-select"> </Form.Label>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<div className="input-icon">
														{renderFieldLabel("respustaDeSeguridad3", "Escribe tu respuesta", 1)}
														<Form.Control
															className="form-control w100"
															type="text"
															placeholder="Escribe tu respuesta"
															aria-describedby="inputGroupPrepend"
															id="respustaDeSeguridad3"
															name="respustaDeSeguridad3"
															style={
																touched2.respustaDeSeguridad3
																	? errors2.respustaDeSeguridad3
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("respustaDeSeguridad3")}
															required
														/>
														{touched2.respustaDeSeguridad3 &&
															errors2.respustaDeSeguridad3 ? (
															<img
																src={IconError}
																className="invalid-icon"
																alt="Icon de Alerta de Error"
															/>
														) : (
															touched2.respustaDeSeguridad3 && (
																<img
																	className="valid-icon"
																	src={IconSucces}
																	alt="Icon de Alerta de to bien"
																/>
															)
														)}
													</div>
													<div className="validate-form-color">
														{touched2.respustaDeSeguridad3 &&
															errors2.respustaDeSeguridad3 ? (
															<div>{errors2.respustaDeSeguridad3}</div>
														) : null}
													</div>
												</Form.Group>
											</Col>
										</Row>
										<Row>
											<Col>
												<Form.Group className="mb-3">
													<div className="select-container">
														<Form.Select
															id="my-select"
															className="form-control w100"
															placeholder="Escoge la pregunta de seguridad"
															style={
																touched2.preguntaDeSeguridad4
																	? errors2.preguntaDeSeguridad4
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("preguntaDeSeguridad4")}>
															<option selected>
																Escoge la pregunta de seguridad
															</option>
															{securityQuestions.map(question => (
																<option key={question.id} value={question.description}>
																	{question.description}
																</option>))}
														</Form.Select>
														<i className="select-icon">
															<img src={IconArrowDown} alt="Icon Arrow Down" />
														</i>
													</div>
													<div className="validate-form-color">
														{touched2.preguntaDeSeguridad4 &&
															errors2.preguntaDeSeguridad4 ? (
															<div>{errors2.preguntaDeSeguridad4}</div>
														) : null}
													</div>
													<Form.Label for="my-select"> </Form.Label>
												</Form.Group>
											</Col>
											<Col>
												<Form.Group>
													<div className="input-icon">
														{renderFieldLabel("respustaDeSeguridad4", "Escribe tu respuesta", 1)}
														<Form.Control
															className="form-control w100"
															type="text"
															placeholder="Escribe tu respuesta"
															aria-describedby="inputGroupPrepend"
															id="respustaDeSeguridad4"
															name="respustaDeSeguridad4"
															style={
																touched2.respustaDeSeguridad4
																	? errors2.respustaDeSeguridad4
																		? { ...inputStyles, ...errorInputStyles }
																		: { ...inputStyles, ...successInputStyles }
																	: inputStyles
															}
															{...formik2.getFieldProps("respustaDeSeguridad4")}
															required
														/>
														{touched2.respustaDeSeguridad4 &&
															errors2.respustaDeSeguridad4 ? (
															<img
																src={IconError}
																className="invalid-icon"
																alt="Icon de Alerta de Error"
															/>
														) : (
															touched2.respustaDeSeguridad4 && (
																<img
																	className="valid-icon"
																	src={IconSucces}
																	alt="Icon de Alerta de to bien"
																/>
															)
														)}
													</div>
													<div className="validate-form-color">
														{touched2.respustaDeSeguridad4 &&
															errors2.respustaDeSeguridad4 ? (
															<div>{errors2.respustaDeSeguridad4}</div>
														) : null}
													</div>
												</Form.Group>
											</Col>
										</Row>								
										<Row>
											<Col className="mt-3 d-flex">
												<Form.Check
													type="checkbox"
													name="tyc"
													id="tyc"
													{...formik2.getFieldProps("tyc")}
												/>
												<span className="mt-0 ms-2">
													He leido y acepto los{" "}
													<span className="color-azul underline pointer fw-bold">
														{" "}
														términos y condiciones
													</span>
												</span>
												<div className="validate-form-color">
														{touched2.tyc &&
															errors2.tyc ? (
															<div>{errors2.tyc}</div>
														) : null}
												</div>
											</Col>
										</Row>
										<Row className="d-flex align-item-center">
											<Col>
												<p className="mt-4">
													¿Ya tienes una cuenta?
													<a href="/">
														<span className="color-red fw-bold underline pointer">
															{" "}
															Inicia sesión aquí
														</span>
													</a>
												</p>
											</Col>
											<Col>
												<Row className="d-flex align-items-center">
													<Col>
														<button
															className="mt-4 btn-simple"
															onClick={handleBack}
														>
															<img src={IconFlechaIzq} alt="flecha izq" />
															<span className="color-azul fw-bold"> Regresar</span>
														</button>
													</Col>
													<Col className="text-align-end">
														<Button
															className="btn-red w270px mt-4"
															disabled={
																!values.numeroDeDoc || !values.fechaDExpiracion
															}
															type="submit"
															style={
																isValid ? { backgroundColor: "#DA291C", color: "#FFFFFF" } : { backgroundColor: "#d3d3d3", color: "#FFFFFF" }
															}
														>
															Crear cuenta {isValid.toString()}
														</Button>
													</Col>
												</Row>
											</Col>
										</Row>
									</Form>
								</div>
							</Tab>
						</Tabs>
					</div>
				</Col>
				<Col xs={3} className="p-0">
					<img className="img-register" src={BgRegister} alt="bg-registro" />
				</Col>
			</Row>
			<Row className="mt-5 bg-footer">
				<Col>
					<img className="logo-footer" src={LogoFooter} alt="logo-claro" />
					<span> Todos los derechos reservados. Claro 2023</span>
				</Col>
			</Row>
			<AlertSuccesModal
				show={showModal}
				handleClose={handleCloseModal}
				shouldShowButton={true}
				title="Tu cuenta ha sido creada exitosamente "
				body="inicia seseión para difsfrutar de todos nuestros serviscios en linea."
			/>
			<AlerErrorModal
				show={showErrorModal}
				handleNext={handleModalNext}
				body={message}
			/>
		</Container>
	);
}

export default Register;
