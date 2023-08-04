<script>
	import { Link, navigate } from "svelte-routing";
	import { Col, Container, Row } from "sveltestrap";

	// const LogoClaroId = "/frontend/olvido/src/assets/logo-claroid.svg";

	let selectedOption = "";
	let fechDeExpedic = "";
	let NuDeDocumento = "";

	let numeroDeDocError = false;
	let dateError = false;
	let selectedOptionError = false;


	function validateInput() {
		numeroDeDocError = NuDeDocumento !== "";
		dateError = fechDeExpedic !== "";
		selectedOptionError = selectedOption !== "";
	}

	function handleInput() {
		numeroDeDocError = NuDeDocumento === "" ? true : false;
	}

	function handleDateInput() {
		dateError = fechDeExpedic === "" ? true : false;
	}

	function handleSelectChange() {
		selectedOptionError = selectedOption === "" ? true : false;
	}

	async function handleSubmit() {
  const url = 'http://localhost:3000/validateIdentity';
  validateInput();

  const requestData = {
    type: "CED",
    expeditionDate: formatDate(fechDeExpedic),
    identification: NuDeDocumento,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });

		const dataResponse = await response.json();
    if (dataResponse.response.status === 0) {
      // El usuario está registrado, puedes realizar las acciones necesarias aquí

			 // Guardar los datos en el localStorage
        localStorage.setItem('expeditionDate', formatDate(fechDeExpedic));
        localStorage.setItem('identification', NuDeDocumento);

      navigate("/olvido/recupercion/password");
    } else {
      // El usuario no está registrado, puedes manejarlo aquí
      numeroDeDocError = true;
      dateError = true;
      selectedOptionError = true;
      // Opcionalmente, puedes mostrar un mensaje de error o realizar otras acciones necesarias
      console.log("El usuario no se encuentra registrado");
    }
  } catch (error) {
    // Ocurrió un error al realizar la solicitud, puedes manejarlo aquí
		console.log("Ocurrió un error al realizar la solicitud: " + error);
  }
}

  function formatDate(dateString) {
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${day}/${month}/${year}`;
}
</script>

<main>
	<div class="container">
		<Container class="justify-content-center align-items-center text-center">
			<Row class="align-items-center">
				<div>
					<!-- <img class="logo-claro-Id" src={LogoClaroId} alt="logo claro" /> -->
					<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/VectorClaroID_Logo.png"
								alt="Icon-logo-claro"
							/>
				</div>
				<div class="title">
					<h2 class="f-gray mt-4">Olvidé mi contraseña</h2>
					<p class="f-gray">
						Ingresa los datos de tu documento para validar tu identidad.
					</p>
				</div>
				<div class="align-items-center">
					<form class="mt-4" on:submit|preventDefault={handleSubmit}>
						<div class="row">
							<div class="col-md-4">
								<div class="col-md-4">
									<div class="input-icon">
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
											<option value="CED">Cédula de Identidad</option>
											<option value="PPT">Pasaporte</option>
											
										</select>
										<span class="span-icon">
											{#if selectedOptionError && selectedOption == ""}
												<i class="fas fa-times">1</i>
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
								</div>
								<div class="col-md-4">
									<div class="col-md-4">
										<div class="input-icon">
											<input
												class="form-control border-none"
												type="text"
												placeholder="Número de documento"
												bind:value={NuDeDocumento}
												class:invalid={numeroDeDocError}
												class:valid={!numeroDeDocError && NuDeDocumento != ""}
												on:input={handleInput}
												on:blur={handleInput}
											/>
											<span class="span-icon">
												{#if numeroDeDocError && NuDeDocumento == ""}
													<i class="fas fa-times">
														<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono(1).png" alt="">
													</i>
												{:else if !numeroDeDocError && NuDeDocumento != ""}
													<i class="fas fa-check">
														<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
													</i>
												{/if}
											</span>
										</div>
										{#if numeroDeDocError && NuDeDocumento == ""}
											<span class="error-message">Campo obligatorio.</span>
										{/if}
									</div>
									<div class="col-md-4">
										<div class="input-icon">
											<input
												class="form-control border-none"
												type="date"
												placeholder="Fecha de expedición"
												aria-describedby="inputGroupPrepend"
												bind:value={fechDeExpedic}
												class:invalid={dateError}
												class:valid={!dateError && fechDeExpedic != ""}
												on:input={handleDateInput}
												on:blur={handleDateInput}
											/>
										</div>
										{#if dateError && fechDeExpedic == ""}
											<span class="error-message">Campo obligatorio.</span>
										{/if}
									</div>
								</div>
								<button type="submit" class="btn-red mt-4">Validar</button>
							</div>
						</div>
					</form>

					<Col>
						<Row class="">
							<Col>
								<div class="container-flech">
									<button
									class="btn-simple"
									on:click={() => navigate("/olvido")}
								>
								<img
								src="https://claroidecuador.s3.amazonaws.com/PNG/flecha_izquierda.png"
								alt="flecha izq"
							/>
									<span class="color-azul fw-bold">Regresar</span>
								</button>
								</div>
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

<!-- 

 -->

 <style>
  select {
    width: 100%;
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

  input[type="date"]::before {
    font-family: "Roboto Regular", sans-serif;
    content: attr(placeholder);
    color: #b4b4b4;
    box-shadow: #d9d9d9;
    margin-right: 6px;
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

  .container-flech {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main .bg-footer span {
    font-family: "Roboto Regular", sans-serif;
    color: #a7a7a7;
  }

  main .bg-footer {
    margin-top: 24px;
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

</style>
