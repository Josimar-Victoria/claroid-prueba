<script>
	import { Link, navigate } from "svelte-routing";
	import { Col, Container, Row } from "sveltestrap";
	import Modal from "../../modal/Modal.svelte";

	// const LogoClaroId = "/frontend/olvido/src/assets/logo-claroid.svg";
	let isModalOpen = false;

	function handleEnviarEmail() {
		isModalOpen = true;
	}
	function handleClose() {
		navigate("/olvido/recupercion/user");
		isModalOpen = false;
	}
</script>

<main>
	<div class="container">
		<Container class="justify-content-center align-items-center text-center">
			<Row class="align-items-center">
				<div>
					<img
					src="https://claroidecuador.s3.amazonaws.com/PNG/VectorClaroID_Logo.png"
					alt="Icon-logo-claro"
				/>
				</div>

				<div class="title">
					<h2 class="f-gray mt-4">Olvidé mi usuario</h2>
				</div>
				<img src="https://claroidecuador.s3.amazonaws.com/PNG/AlertaCorreoAlerta_Icono.png" alt="img">
				<p>
					Se enviará un mensaje de texto con las instrucciones para recuperar tu
					nombre de usuario.
				</p>

				<Col>
					<Row class="d-flex align-items-center">
						<Col>
							<span class="foote-enviar">¿No has recibido el mensaje?</span>
							<button class="mt-4 btn-simple" on:click={handleEnviarEmail}>
								<span class="color-azul fw-bold">Enviar de nuevo</span>
							</button>
						</Col>
					</Row>
				</Col>

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
	.title {
		margin-bottom: 50px;
	}

	.title h2 {
		font-family: "AMX", sans-serif;
		color: #444444;
		font-weight: 700;
		margin-bottom: 18px;
	}

	p {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
	}

	main .align-items-center button {
		font-family: "Roboto", sans-serif;
		font-weight: bold;
		cursor: pointer;
	}

	main .btn-simple {
		background: none;
		border: none;
		margin-top: 24px;
		cursor: pointer;
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

	.foote-enviar {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
	}

	.bg-footer span {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}

	.bg-footer {
		margin-top: 50px;
	}
</style>
