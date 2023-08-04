<script>
	import { Link, navigate } from "svelte-routing";
	import { Col, Container, Row } from "sveltestrap";

	// const LogoClaroId = "/frontend/olvido/src/assets/logo-claroid.svg";

	let selectedOption1 = "";
	let selectedOption2 = "";
	let selectedOption3 = "";

	let respuesta1 = "";
	let respuesta2 = "";
	let respuesta3 = "";

	let selectedOptionError1 = false;
	let selectedOptionError2 = false;
	let selectedOptionError3 = false;

	let respuesta1Error = false;
	let respuesta2Error = false;
	let respuesta3Error = false;

	function validateInput() {
		respuesta1Error = respuesta1 !== "";
		respuesta2Error = respuesta2 !== "";
		respuesta3Error = respuesta3 !== "";
		selectedOptionError1 = selectedOption1 !== "";
		selectedOptionError2 = selectedOption2 !== "";
		selectedOptionError3 = selectedOption3 !== "";
	}

	function handleInputRespusta1() {
		respuesta1Error = respuesta1 === "" ? true : false;
	}

	function handleInputRespusta2() {
		respuesta2Error = respuesta2 === "" ? true : false;
	}

	function handleInputRespusta3() {
		respuesta3Error = respuesta3 === "" ? true : false;
	}

	function handleSelectChange1() {
		selectedOptionError1 = selectedOption1 === "" ? true : false;
	}

	function handleSelectChange2() {
		selectedOptionError2 = selectedOption2 === "" ? true : false;
	}

	function handleSelectChange3() {
		selectedOptionError3 = selectedOption3 === "" ? true : false;
	}

	// function handleSelectChange(event) {
	// 	selectedOptionError = !event.target.value;
	// }

	function handleSubmit(e) {
		validateInput();
		const data = {
			respuesta_1: respuesta1,
			respuesta_2: respuesta2,
			respuesta_3: respuesta3,
		};

		console.log(data);

		if (
			selectedOption1 !== "" &&
			selectedOption2 !== "" &&
			selectedOption3 !== "" &&
			respuesta1Error &&
			respuesta2Error &&
			respuesta3Error
		) {
			// Aquí se enviarían los datos

			navigate("/olvido/ingresar/password");
		} else {
			respuesta1Error = true;
			respuesta2Error = true;
			respuesta3Error = true;
			selectedOptionError1 = true;
			selectedOptionError2 = true;
			selectedOptionError3 = true;
		}
	}
</script>

<main>
	<div class="container">
		<Container class="justify-content-center align-items-center text-center">
			<Row class="align-items-center">
				<div class="logo">
					<img src="https://claroidecuador.s3.amazonaws.com/PNG/VectorClaroID_Logo.png" alt="Icon-de-Logo" />
				</div>

				<div class="title">
					<h2 class="f-gray mt-4">Recuperar contraseña</h2>
					<p class="subtitle">
						Responde las siguientes preguntas de seguridad para validar tu
						identidad.
					</p>

					<p>
						Recuerda que la respuesta debe ser exacta a la que ingresaste en tu
						registro. (Uso de mayúsculas y minúsculas).
					</p>
				</div>
				<div class="align-items-center">
					<form class="mt-4" on:submit|preventDefault={handleSubmit}>
						<div class="row">
							<div class="col-md-4">
								<div class="col-md-4">
									<h3 class="pregunta">Pregunta #1</h3>
									<div class="input-icon">
										<select
											class=""
											id="options"
											bind:value={selectedOption1}
											class:invalid={selectedOptionError1}
											class:valid={!selectedOptionError1 &&
												selectedOption1 != ""}
											on:change={handleSelectChange1}
											on:blur={handleSelectChange1}
										>
											<option value="" disabled selected
												>Escoge la pregunta de seguridad
											</option>
											<option value="option1">Color favorito 1</option>
											<option value="option2">Color favorito 2</option>
											<option value="option3">Color favorito 3</option>
										</select>
									</div>
									{#if selectedOptionError1 && selectedOption1 == ""}
										<span class="error-message">Campo obligatorio.</span>
									{/if}
								</div>
								<div class="col-md-4">
									<div class="col-md-4">
										<div class="input-icon">
											<input
												class="form-control border-none"
												type="text"
												placeholder="Escribe tu respuesta"
												bind:value={respuesta1}
												class:invalid={respuesta1Error}
												class:valid={!respuesta1Error && respuesta1 != ""}
												on:input={handleInputRespusta1}
												on:blur={handleInputRespusta1}
											/>
										</div>
										{#if respuesta1Error && respuesta1 == ""}
											<span class="error-message">Campo obligatorio.</span>
										{/if}
									</div>
								</div>
								<div class="col-md-4">
									<h3 class="pregunta">Pregunta #2</h3>
									<div class="input-icon">
										<select
											class=""
											id="options"
											bind:value={selectedOption2}
											class:invalid={selectedOptionError2}
											class:valid={!selectedOptionError2 &&
												selectedOption2 != ""}
											on:change={handleSelectChange2}
											on:blur={handleSelectChange2}
										>
											<option value="" disabled selected
												>Escoge la pregunta de seguridad
											</option>
											<option value="option1">Color favorito 1</option>
											<option value="option2">Color favorito 2</option>
											<option value="option3">Color favorito 3</option>
										</select>
									</div>
									{#if selectedOptionError2 && selectedOption2 == ""}
										<span class="error-message">Campo obligatorio.</span>
									{/if}
								</div>
								<div class="col-md-4">
									<div class="col-md-4">
										<div class="input-icon">
											<input
												class="form-control border-none"
												type="text"
												placeholder="Escribe tu respuesta"
												bind:value={respuesta2}
												class:invalid={respuesta2Error}
												class:valid={!respuesta2Error && respuesta2 != ""}
												on:input={handleInputRespusta2}
												on:blur={handleInputRespusta2}
											/>
										</div>
										{#if respuesta2Error && respuesta2 == ""}
											<span class="error-message">Campo obligatorio.</span>
										{/if}
									</div>
								</div>
								<div class="col-md-4">
									<h3 class="pregunta">Pregunta #3</h3>
									<div class="input-icon">
										<select
											class=""
											id="options"
											bind:value={selectedOption3}
											class:invalid={selectedOptionError3}
											class:valid={!selectedOptionError3 &&
												selectedOption3 != ""}
											on:change={handleSelectChange3}
											on:blur={handleSelectChange3}
										>
											<option value="" disabled selected
												>Escoge la pregunta de seguridad
											</option>
											<option value="option1">Color favorito 1</option>
											<option value="option2">Color favorito 2</option>
											<option value="option3">Color favorito 3</option>
										</select>
									</div>
									{#if selectedOptionError3 && selectedOption3 == ""}
										<span class="error-message">Campo obligatorio.</span>
									{/if}
								</div>
								<div class="col-md-4">
									<div class="col-md-4">
										<div class="input-icon">
											<input
												class="form-control border-none"
												type="text"
												placeholder="Escribe tu respuesta"
												bind:value={respuesta3}
												class:invalid={respuesta3Error}
												class:valid={!respuesta3Error && respuesta3 != ""}
												on:input={handleInputRespusta3}
												on:blur={handleInputRespusta3}
											/>
										</div>
										{#if respuesta3Error && respuesta3 == ""}
											<span class="error-message">Campo obligatorio.</span>
										{/if}
									</div>
								</div>

								<button type="submit" class="btn-red-w mt-4">Validar</button>
							</div>
						</div>
					</form>
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

<!-- 

 -->

<style>
	.logo {
		margin-top: 179px;
	}

	select {
		width: 53%;
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
		background: #ffffff;
		border-radius: 133px;
		height: 50px;
		margin: 0 auto;
		padding-left: 20px;
		margin-bottom: 20px;
		appearance: none;
		outline: none;
		border: none;
		box-shadow: none;
		padding-right: 30px;
		box-shadow: 0px 4px 50px rgba(217, 217, 217, 0.25);
	}

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

	.title .subtitle {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
	}

	.title p {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}

	.pregunta {
		font-family: "Roboto Regular", sans-serif;
		font-style: normal;
		font-weight: 700;
		text-align: center;
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
		width: 46%;
		margin-bottom: 20px;
		appearance: none;
		outline: none;
		box-shadow: none;
		padding-right: 30px;
		box-shadow: 0px 4px 50px rgba(217, 217, 217, 0.25);
	}

	.btn-red-w {
		background-color: #da291c;
		border: none;
		border-radius: 133px;
		color: #fff;
		height: 50px;
		width: 52%;
		bottom: 20rem;
	}

	.bg-footer {
		margin: 20px;
	}

	.bg-footer span {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}
</style>
