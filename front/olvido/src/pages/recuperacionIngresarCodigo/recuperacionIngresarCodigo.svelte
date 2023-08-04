<script>
	import { Link, navigate } from "svelte-routing";
	import { Col, Container, Row } from "sveltestrap";
	import Modal from "../../modal/Modal.svelte";

	// const LogoClaroId = "/frontend/olvido/src/assets/logo-claroid.svg";

	let codigo = "";

	let codigoError = false;

	let isModalOpen = false;

	function validateInput() {
		codigoError = codigo !== "";
	}

	function handleInputCodigo() {
		codigoError = codigo === "" ? true : false;
	}

	function handleSubmit(e) {
		const data = {
			codigo: codigo,
		};

		console.log(data);
		validateInput();

		if (codigoError) {
			// Aquí se enviarían los datos

			navigate("/olvido/ingresar/password");
		} else {
			codigoError = true;
		}
	}

	function handleEnviarCodigo() {
		isModalOpen = true;
	}
	function handleClose() {
		isModalOpen = false;
	}
</script>

<main>
	<div class="container">
		<Container class="justify-content-center align-items-center text-center">
			<Row class="align-items-center">
				<div>
					<div>
						<img
						src="https://claroidecuador.s3.amazonaws.com/PNG/VectorClaroID_Logo.png"
						alt="Icon-logo-claro"
					/>
				</div>

				<div class="title">
					<h2 class="f-gray mt-4">Recuperar contraseña</h2>
					<p class="f-gray">
						Ingresa el código que te llegó al celular/correo XXXXXXX.
					</p>
				</div>
				<div class="align-items-center">
					<form class="mt-4" on:submit|preventDefault={handleSubmit}>
						<div class="row">
							<div class="col-md-4">
								<div class="col-md-4">
									<div class="col-md-4">
										<div class="input-icon">
											<input
												class="form-control border-none"
												type="text"
												placeholder="Escribe el código"
												bind:value={codigo}
												class:invalid={codigoError}
												class:valid={!codigoError && codigo != ""}
												on:input={handleInputCodigo}
												on:blur={handleInputCodigo}
											/>
										</div>
										{#if codigoError && codigo == ""}
											<span class="error-message">Campo obligatorio.</span>
										{/if}
									</div>
								</div>

								<button type="submit" class="btn-red mt-4">Validar</button>
							</div>
						</div>
					</form>

					<Col>
						<Row class="d-flex align-items-center">
							<Col>
								<span class="foote-enviar">¿Tienes problemas?</span>
								<button
									class="mt-4 btn-simple btn-haz-click"
									on:click={handleEnviarCodigo}
								>
									<span class="color-azul fw-bold">Reenviar código</span>
								</button>
							</Col>
						</Row>
					</Col>
				</div>
				<div class="mt-5 bg-footer">
					<img
						class="logo-footer"
						src="https://claroidecuador.s3.amazonaws.com/PNG/FrameClaro_LogoFooter.png"
						alt="logo-claro"
					/>
					<span class="f-gray">Todos los derechos reservados. Claro 2023</span>
				</div>
			</Row>
		</Container>
	</div>
</main>

<Modal isOpen={isModalOpen}>
	<p class="modal-title">
		Hemos reenviado un nuevo código de <br /> seguridad al medio de tu elección.
	</p>

	<button class="btn-red" on:click={handleClose}>Continuar</button>
</Modal>

<!-- 

 -->

<style>
	.border-none {
		border: none;
	}
	.invalid {
		border: 2px solid #da291c;
	}

	.valid {
		border: 2px solid #0097a9;
	}

	.error-message {
		color: #da291c;
		font-size: 0.8rem;
		font-family: "Roboto", sans-serif;
		/* margin-bottom: 8px; */
		/* margin-top: 0.25rem; */
	}
	.title {
		margin-bottom: 50px;
	}

	.title h2 {
		font-family: "AMX", sans-serif;
		color: #444444;
		font-weight: 700;
		margin-bottom: 18px;
	}

	.title p {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
	}

	main .align-items-center button {
		font-family: "Roboto", sans-serif;
		font-weight: bold;
		cursor: pointer;
	}

	input::placeholder {
		font-family: "Roboto Regular", sans-serif;
		color: #b4b4b4;
		box-shadow: #d9d9d9;
	}

	main .form-control {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
		background: #ffffff;
		border-radius: 133px;
		height: 50px;
		margin: 0 auto;
		padding-left: 20px;
		width: 320px;
		margin-bottom: 20px;
		appearance: none;
		outline: none;
		box-shadow: none;
		padding-right: 30px;
		box-shadow: 0px 4px 50px rgba(217, 217, 217, 0.25);
	}

	main .btn-simple {
		background: none;
		border: none;
		margin-top: 24px;
		cursor: pointer;
	}
	.foote-enviar {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
	}

	.modal-title {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 20px;
	}

	button {
		font-family: "Roboto", sans-serif;
		font-weight: bold;
	}

	.bg-footer span {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}

	.bg-footer {
		margin-top: 50px;
	}
</style>
