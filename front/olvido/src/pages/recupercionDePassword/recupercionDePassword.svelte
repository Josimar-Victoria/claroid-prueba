<script>
	import { Button, Col, Container, Row } from "sveltestrap";
	// import LogoClaro from "images/logo-claroid.svg";
	import { Link, navigate } from "svelte-routing";
</script>

<main>
	<div class="container">
		<Container class="justify-content-center align-items-center text-center">
			<Row class="align-item-center">
				<div class="">
					<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/VectorClaroID_Logo.png"
								alt="Icon-logo-claro"
							/>
				</div>

				<div class="title">
					<h2 class="mt-4">Recuperar contraseña</h2>
					<p>Escoge una opción para verificar tu identidad.</p>
				</div>

				<div class="align-items-center">
					<div class="card-container">
						<button
							class="card"
							on:click={() => navigate("/olvido/ingresar/codigo")}
						>
							<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/Correo_Icono.png"
								alt="Icon-de-email"
							/>

							<div class="description">
								<h3 class="">Correo electrónico.</h3>
								<p>xxxxx309@hotmail.com</p>
							</div>
						</button>

						<button
							class="card"
							on:click={() => navigate("/olvido/ingresar/codigo")}
						>
							<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/Celular_Icono.png"
								alt="Icon-de-celular"
							/>

							<div class="description">
								<h3 class="">Numero de celular.</h3>
								<p>xxxxxx1423</p>
							</div>
						</button>

						<button
							class="card"
							on:click={() => navigate("/olvido/recupercion/password/preguntas/segurida")}
						>
							<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/PreguntasSeguridad_Icono.png"
								alt="Icon-de-key"
							/>
							<div class="description">
								<h3 class="">Pregunta de Seguridad.</h3>
								<p>xxxxxxxx</p>
							</div>
						</button>
					</div>

					<Col>
						<Row class="d-flex align-items-center">
							<Col>
								<span class="foote-enviar">¿No tienes acceso a ninguno?</span>
								<button
									class="mt-4 btn-simple btn-haz-click"
									on:click={() => navigate("/olvido/formulario/soporte")}
								>
									<span class="color-azul fw-bold">Haz click aquí.</span>
								</button>
							</Col>
						</Row>
					</Col>
				</div>
				<footer class="mt-5 bg-footer">
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
		margin-bottom: 35px;
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

	.description h3 {
		margin-top: 10px;
		font-family: "AMX", sans-serif;
		color: #444444;
		font-weight: 700;
		text-decoration: none;
	}

	.description p {
		margin-top: 10px;
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}

	.btn-haz-click {
		border: none;
		cursor: pointer;
	}

	.foote-enviar {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
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
