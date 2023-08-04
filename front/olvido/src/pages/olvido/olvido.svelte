<script>
	import { Button, Col, Container, Row } from "sveltestrap";
	// import LogoClaro from "images/logo-claroid.svg";

	//import LogoClaroId from "../../../public/assets/VectorClaroID_Logo.png";
	// import LogoClaro from "../../../public/assets/FrameClaro_LogoFooter.svg";

	import { navigate } from "svelte-routing";
</script>

<main>
	<div class="container">
		<Container class="justify-content-center align-items-center text-center">
			<Row class="align-item-center">
				<div class="">
					<img src="https://claroidecuador.s3.amazonaws.com/PNG/VectorClaroID_Logo.png" alt="Icon-de-Logo" />
				</div>

				<div class="title">
					<h2 class="mt-4">¿En qué podemos ayudarte?</h2>
					<p>Elige una opción para continuar.</p>
				</div>

				<div class="align-items-center">
					<div class="card-container">
						<button on:click={() => navigate("/olvido/user")} class="card">
							<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/OlvideUsuario_Icono.png"
								alt="Icon-de-Usuario"
							/>

							<p class="description">Olvidé mi usuario.</p>
						</button>

						<button on:click={() => navigate("/olvido/password")} class="card">
							<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/OlvideContrasena_Icono.png"
								alt="Icon-de-password"
							/>

							<p class="description">Olvidé mi contraseña.</p>
						</button>
					</div>

					<Col>
						<Row class="d-flex align-items-center">
							<Col>
								<button class="mt-4 btn-simple" on:click={() => navigate("/")}>
									<img
										src="https://claroidecuador.s3.amazonaws.com/PNG/flecha_izquierda.png"
										alt="flecha izq"
									/>
									<span class="color-azul fw-bold">Regresar al inicio</span>
								</button>
							</Col>
						</Row>
					</Col>
				</div>
				<footer class="mt-5 bg-footer">
					<!-- <img class="logo-footer" src={LogoClaro} alt="logo-claro" /> -->
					<img
						class="logo-footer"
						src="https://claroidecuador.s3.amazonaws.com/PNG/FrameClaro_LogoFooter.png"
						alt="logo-claro"
					/>
					<span class="f-gray">
						Todos los derechos reservados. Claro 2023
					</span>
				</footer>
			</Row>
		</Container>
	</div>
</main>

<style>
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

	.card-container {
		display: flex;
		justify-content: center;
		margin-top: 59px;
		gap: 40px;
		text-decoration: none;
	}

	.card {
		position: relative;
		width: 303px;
		height: 242.12px;
		background: #ffffff;
		box-shadow: 0px 4px 50px rgba(217, 217, 217, 0.25);
		border-radius: 30px;
		text-align: center;
		cursor: pointer;
		border: none;
	}

	.description {
		margin-top: 10px;
		font-family: "AMX", sans-serif;
		color: #444444;
		font-weight: 700;
		text-decoration: none;
	}
	main .btn-simple {
		background: none;
		border: none;
		margin-top: 30px;
		cursor: pointer;
	}
	footer {
		text-align: center;
		margin-top: 80px;
	}

	footer span {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}
</style>
