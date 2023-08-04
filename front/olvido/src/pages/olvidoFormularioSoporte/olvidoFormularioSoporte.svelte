<script>
	import { Link, navigate } from "svelte-routing";
	import { Col, Container, Row } from "sveltestrap";
	import Modal from "../../modal/Modal.svelte";

	// const LogoClaroId = "/frontend/olvido/src/assets/logo-claroid.svg";

	let selectedOption = "";
	let numeroDocumento = "";
	let nombreCompleto = "";
	let numeroCelular = "";
	let correoElectronico = "";
	let selectedTipoDeSolic = "";
	let observaciones = "";

	let isModalOpen = false;
	export let isOpen = false;

	// Variables de Errro
	let numeroDocumentoErr = false;
	let nombreCompletoErr = false;
	let numeroCelularErr = false;
	let correoElectronicoErr = false;
	let observacionesErr = false;
	let selectedTipoDeSolicErr = false;
	let selectedOptionError = false;

	$: allInputsEmpty =
		!numeroDocumento ||
		!nombreCompleto ||
		!numeroCelular ||
		!correoElectronico ||
		!selectedTipoDeSolic ||
		!selectedOption ||
		!observaciones;

	function validateInput() {
		selectedOptionError = selectedOption !== "";
		selectedTipoDeSolicErr = selectedTipoDeSolic !== "";
		numeroDocumentoErr = numeroDocumento !== "";
		nombreCompletoErr = nombreCompleto !== "";
		numeroCelularErr = numeroCelular !== "";
		correoElectronicoErr = correoElectronico !== "";
		observacionesErr = observaciones !== "";
	}

	function handleInputNDoc() {
		numeroDocumentoErr = numeroDocumento === "" ? true : false;
	}

	function handleInputNameComp() {
		nombreCompletoErr = nombreCompleto === "" ? true : false;
	}

	function handleInputCelular() {
		numeroCelularErr = numeroCelular === "" ? true : false;
	}

	function handleInputEmail() {
		correoElectronicoErr = correoElectronico === "" ? true : false;
	}

	function handleInputobserver() {
		observacionesErr = observaciones === "" ? true : false;
	}

	function handleSelectChange() {
		selectedOptionError = selectedOption === "" ? true : false;
	}

	function handleSelectTipeSolic() {
		selectedTipoDeSolicErr = selectedTipoDeSolic === "" ? true : false;
	}

	// function validateName() {
	// 	nameValid = nombreCompleto.trim() !== "";
	// }

	// function validateEmail() {
	// 	emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoElectronico.trim());
	// }

	function handleSubmit(e) {
		validateInput();
		const data = {
			selected_option: selectedOption,
			nombre_completo: nombreCompleto,
			numero_documento: numeroDocumento,
			numero_celular: numeroCelular,
			correo_electronico: correoElectronico,
			selected_Tipo_De_Solic: selectedTipoDeSolic,
			observaciones: observaciones,
		};

		console.log(data);
		if (
			selectedOption !== "" &&
			selectedTipoDeSolic !== "" &&
			numeroDocumentoErr &&
			nombreCompletoErr &&
			numeroCelularErr &&
			correoElectronicoErr &&
			observacionesErr &&
			selectedOptionError &&
			selectedTipoDeSolicErr
		) {
			// Aquí se enviarían los datos

			isModalOpen = true;
		} else {
			numeroDocumentoErr = true;
			nombreCompletoErr = true;
			numeroCelularErr = true;
			correoElectronicoErr = true;
			observacionesErr = true;
			selectedTipoDeSolicErr = true;
			selectedOptionError = true;
		}
		// fetch("procesar.php", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(data),
		// })
		// 	.then((response) => {
		// 		console.log(response);
		// 		// Aquí puedes hacer algo con la respuesta
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
	}

	function handleClose() {
		isOpen = false;
		navigate("/olvido");
	}
</script>

<main>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="row">
			<div class="col-6">
				<div class="column-form">
					<div class="logo">
						<img src="https://claroidecuador.s3.amazonaws.com/PNG/VectorClaroID_Logo.png" alt="Icon-de-Logo" />
					</div>
					<h2 class="mt-3">Formulario de soporte</h2>
					<p class="p-h3">
						¿Necesitas ayuda? Completa el formulario y nuestro equipo se
						comunicará contigo.
					</p>

					<div class="form-row">
						<div class="form-group col-4">
							<select
								class=""
								id="options"
								bind:value={selectedOption}
								class:invalid={selectedOptionError}
								class:valid={!selectedOptionError && selectedOption != ""}
								on:change={handleSelectChange}
								on:blur={handleSelectChange}
							>
								<option value="" disabled selected
									>Seleccione tipo de documento
								</option>
								<option value="option1"> Cedula 1</option>
								<option value="option2">Cedula 2</option>
								<option value="option3">Cedula 3</option>
							</select>
							<span class="span-icon">
								{#if selectedOptionError && selectedOption == ""}
								<i class="fas fa-times">
									<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
								</i>
								{:else if !selectedOptionError && selectedOption != ""}
									<i class="fas fa-check">
										<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
									</i>
								{/if}
							</span>
							{#if selectedOptionError && selectedOption == ""}
								<span class="error-message">Campo obligatorio.</span>
							{/if}
						</div>
						<div class="form-group col-4">
							<input
								type="text"
								class="form-control border-none"
								id="input2"
								placeholder="Número de documento"
								bind:value={numeroDocumento}
								class:invalid={numeroDocumentoErr}
								class:valid={!numeroDocumentoErr && numeroDocumento != ""}
								on:input={handleInputNDoc}
								on:blur={handleInputNDoc}
							/>
							<span class="span-icon">
								{#if numeroDocumentoErr && numeroDocumento == ""}
								<i class="fas fa-times">
									<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
								</i>
								{:else if !numeroDocumentoErr && numeroDocumento != ""}
									<i class="fas fa-check">
										<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
									</i>
								{/if}
							</span>
							{#if numeroDocumentoErr && numeroDocumento == ""}
								<span class="error-message">Campo obligatorio.</span>
							{/if}
						</div>
						<div class="form-group col-md-4">
							<input
								type="text"
								class="form-control border-none"
								id="input3"
								placeholder="Nombre completo"
								bind:value={nombreCompleto}
								class:invalid={nombreCompletoErr}
								class:valid={!nombreCompletoErr && nombreCompleto != ""}
								on:input={handleInputNameComp}
								on:blur={handleInputNameComp}
							/>
							<span class="span-icon">
								{#if nombreCompletoErr && nombreCompleto == ""}
								<i class="fas fa-times">
									<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
								</i>
								{:else if !nombreCompletoErr && nombreCompleto != ""}
									<i class="fas fa-check">
										<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
									</i>
								{/if}
							</span>
							{#if nombreCompletoErr && nombreCompleto == ""}
								<span class="error-message">Campo obligatorio.</span>
							{/if}
						</div>
						<div class="form-group col-4">
							<input
								type="text"
								class="form-control border-none"
								id="input4"
								placeholder="Número de celular"
								bind:value={numeroCelular}
								class:invalid={numeroCelularErr}
								class:valid={!numeroCelularErr && numeroCelular != ""}
								on:input={handleInputCelular}
								on:blur={handleInputCelular}
							/>
							<span class="span-icon">
								{#if numeroCelularErr && numeroCelular == ""}
								<i class="fas fa-times">
									<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
								</i>
								{:else if !numeroCelularErr && numeroCelular != ""}
									<i class="fas fa-check">
										<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
									</i>
								{/if}
							</span>
							{#if numeroCelularErr && numeroCelular == ""}
								<span class="error-message">Campo obligatorio.</span>
							{/if}
						</div>
						<div class="form-group">
							<input
								type="text"
								class="form-control border-none"
								id="input5"
								placeholder="Correo electronico"
								bind:value={correoElectronico}
								class:invalid={correoElectronicoErr}
								class:valid={!correoElectronicoErr && correoElectronico != ""}
								on:input={handleInputEmail}
								on:blur={handleInputEmail}
							/>
							<span class="span-icon">
								{#if correoElectronicoErr && correoElectronico == ""}
								<i class="fas fa-times">
									<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
								</i>
								{:else if !correoElectronicoErr && correoElectronico != ""}
									<i class="fas fa-check">
										<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
									</i>
								{/if}
							</span>
							{#if correoElectronicoErr && correoElectronico == ""}
								<span class="error-message">Campo obligatorio.</span>
							{/if}
						</div>
						<div class="form-group col-4">
							<select
								class=""
								id="options"
								bind:value={selectedTipoDeSolic}
								class:invalid={selectedTipoDeSolicErr}
								class:valid={!selectedTipoDeSolicErr &&
									selectedTipoDeSolic != ""}
								on:change={handleSelectTipeSolic}
								on:blur={handleSelectTipeSolic}
							>
								<option value="" disabled selected
									>Seleccione tipo de solicitud
								</option>
								<option value="option1"> Solicitud 1</option>
								<option value="option2">Solicitud 2</option>
								<option value="option3">Solicitud 3</option>
							</select>
							<span class="span-icon">
								{#if selectedTipoDeSolicErr && selectedTipoDeSolic == ""}
								<i class="fas fa-times">
									<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
								</i>
								{:else if !selectedTipoDeSolicErr && selectedTipoDeSolic != ""}
									<i class="fas fa-check">
										<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
									</i>
								{/if}
							</span>
							{#if selectedTipoDeSolicErr && selectedTipoDeSolic == ""}
								<span class="error-message">Campo obligatorio.</span>
							{/if}
						</div>
						<div class="form-group col-12">
							<input
								type="text"
								class="form-control-lg border-none"
								id="input7"
								placeholder="Observaciones"
								bind:value={observaciones}
								class:invalid={observacionesErr}
								class:valid={!observacionesErr && observaciones != ""}
								on:input={handleInputobserver}
								on:blur={handleInputobserver}
							/>
							{#if observacionesErr && observaciones == ""}
								<span class="error-message">Campo obligatorio.</span>
							{/if}
						</div>
					</div>
					<div class="container-btn">
						<span>Todos los campos son obligatorios.</span>
						<button type="submit" disabled={allInputsEmpty} class="btn"
							>Enviar</button
						>
					</div>
				</div>
			</div>

			<div class="col-6">
				<img
					class="img-register"
					src="https://claroidecuador.s3.amazonaws.com/PNG/Mask+group.png"
					alt="Mi imagen"
				/>
			</div>
		</div>
	</form>

	<footer class="bg-footer">
		<img
		class="logo-footer"
		src="https://claroidecuador.s3.amazonaws.com/PNG/FrameClaro_LogoFooter.png"
		alt="logo-claro"
	/>
		<span> Todos los derechos reservados. Claro 2023</span>
	</footer>
</main>

<Modal isOpen={isModalOpen}>
	<p class="modal-title">
		Pronto nuestro equipo se <br /> comunicará contigo para ayudarte
	</p>

	<button class="btn-red" on:click={handleClose}>Aceptar</button>
</Modal>

<style>
	button[disabled] {
		background-color: #d3d3d3;
	}
	select {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
		background: #ffffff;
		border-radius: 133px;
		height: 50px;
		padding-left: 20px;
		width: 94%;
		appearance: none;
		border: none;
		margin-top: 10px;
		box-shadow: 0px 4px 50px rgba(217, 217, 217, 0.25);
	}

	select:focus {
		outline: none;
		box-shadow: none;
	}

	input:focus {
		outline: none;
		box-shadow: none;
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
		margin-left: 17px;
		/* margin-bottom: 8px; */
		/* margin-top: 0.25rem; */
	}
	.row h2 {
		font-family: "AMX", sans-serif;
		color: #444444;
		font-weight: 700;
	}

	.row p {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
	}

	.container-btn {
		display: flex;
		justify-content: space-between;
		text-align: center;
		margin-bottom: 30px;
	}

	.container-btn span {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}

	.btn {
		background-color: #da291c;
		border: none;
		border-radius: 133px;
		color: #fff;
		height: 50px;
		width: 200px;
		cursor: pointer;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}

	.col-6 {
		width: 60%;
		padding: 0 10px;
	}

	.column-form {
		margin: 0 auto;
		padding-left: 60px;
		padding-top: 20px;
		padding-right: 30px;
	}

	.logo img {
		max-width: 100%;
	}

	.img-register {
		height: 100vh;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 1;
	}
	.logo img {
		max-width: 100%;
	}

	.form-row {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40px;
	}

	.form-group {
		width: 50%;
		margin-bottom: 20px;
	}

	.form-control {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
		background: #ffffff;
		border-radius: 133px;
		height: 50px;
		padding-left: 20px;
		width: 90%;
		appearance: none;
		margin-top: 10px;
		box-shadow: 0px 4px 50px rgba(217, 217, 217, 0.25);
	}

	.form-control-lg {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
		width: 784px;
		height: 128px;
		appearance: none;
		padding-left: 20px;
		left: 185px;
		top: 701px;
		background: #ffffff;
		box-shadow: 0px 4px 50px rgba(217, 217, 217, 0.25);
		border-radius: 34px;
	}

	.span-icon {
    position: relative;
  }

  .span-icon i {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #da291c;
  }

	.span-icon i.fa-check img {
		width: 20px;
		margin-right: 20px;
		margin-top: 4px;
  }
	.span-icon i.fa-times img{
		width: 20px;
		margin-right: 20px;
		margin-top: 4px;
	}

	.bg-footer {
		background-color: #d9d9d9;
		padding: 15px 350px 15px 15px;
		text-align: center;
		vertical-align: middle;
		font-size: 14px;
		color: #a7a7a7;
		margin-top: 79px;
		margin-right: 17%;
	}

	.bg-footer span {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}

	.logo-footer {
		width: 70px !important;
		margin-right: 10px;
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
</style>
