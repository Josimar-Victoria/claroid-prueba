<script>
  import { navigate } from "svelte-routing";
  import { Container, Row } from "sveltestrap";
  import Modal from "../../modal/Modal.svelte";

  let contraseña = "";
  let confirmarContraseña = "";

  let isModalOpen = false;
  export let isOpen = false;

  let contraseñaError = false;
  let confirContraseñaError = false;
  let contraseñasIgualesError = false;

  let tieneMayuscula = false;
  let tieneMinuscula = false;
  let tieneNumero = false;
  let tieneMinimoCaracteres = false;

  function validateInput() {
    contraseñaError = contraseña !== "";
    confirContraseñaError = confirmarContraseña !== "";
    contraseñasIgualesError = contraseña !== confirmarContraseña;
  }

  function handleInputContraseña() {
    contraseñaError = contraseña === "" ? true : false;

    // Validar si la contraseña tiene al menos una letra mayúscula
    tieneMayuscula = /[A-Z]/.test(contraseña);

    // Validar si la contraseña tiene al menos una letra minúscula
    tieneMinuscula = /[a-z]/.test(contraseña);

    // Validar si la contraseña tiene al menos un número
    tieneNumero = /^(?=.*\d)/.test(contraseña);

    // Validar si la contraseña tiene al menos 8 caracteres
    tieneMinimoCaracteres = contraseña.length >= 8;
  }

  function handleInputConfirCont() {
    confirContraseñaError = confirmarContraseña === "" ? true : false;
    contraseñasIgualesError = contraseña !== confirmarContraseña;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      type: "4",
      identification: localStorage.getItem("identification"),
      expeditionDate: localStorage.getItem("expeditionDate"),
      newPassword: contraseña,
    };

    validateInput();

    if (
      contraseñaError &&
      confirContraseñaError &&
      tieneMayuscula &&
      tieneMinuscula &&
      tieneNumero &&
      tieneMinimoCaracteres &&
      !contraseñasIgualesError
    ) {
      try {
        const response = await fetch("http://localhost:3000/resetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          // Petición exitosa
          const result = await response.json();
          console.log(result);

          // Realizar acciones adicionales después de la recuperación de contraseña exitosa

          // Mostrar el modal o mensaje de éxito
          isModalOpen = true;
        } else {
          // Error en la petición
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else {
      contraseñaError = true;
      confirContraseñaError = true;
    }
  }

  function handleClose() {
    isOpen = false;
    navigate("/");
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
          <h2 class="f-gray mt-4">Recuperar contraseña</h2>
          <p class="f-gray">Ingresa tu nueva contraseña.</p>
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
                        type="password"
                        placeholder="Contraseña"
                        bind:value={contraseña}
                        class:invalid={contraseñaError}
                        class:valid={!contraseñaError && contraseña != ""}
                        on:input={handleInputContraseña}
                        on:blur={handleInputContraseña}
                      />
											<span class="span-icon">
												{#if contraseñaError && contraseña == ""}
												<i class="fas fa-times">
													<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
												</i>
												{:else if !contraseñaError && contraseña != ""}
													<i class="fas fa-check">
														<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
													</i>
												{/if}
											</span>
                    </div>
                    {#if contraseñaError && contraseña == ""}
                      <span class="error-message">Campo obligatorio.</span>
                    {/if}
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="col-md-4">
                    <div class="input-icon">
                      <input
                        class="form-control border-none"
                        type="password"
                        placeholder="Confirmar contraseña"
                        bind:value={confirmarContraseña}
                        class:invalid={confirContraseñaError || contraseñasIgualesError}
                        class:valid={!confirContraseñaError && confirmarContraseña != "" && !contraseñasIgualesError}
                        on:input={handleInputConfirCont}
                        on:blur={handleInputConfirCont}
                      />
											<span class="span-icon">
												{#if confirContraseñaError && confirmarContraseña == ""}
												<i class="fas fa-times">
													<img src="https://claroidecuador.s3.amazonaws.com/PNG/GroupErrorInput_Icono+(1).png" alt="">
												</i>
												{:else if !confirContraseñaError && !contraseñasIgualesError && confirmarContraseña != ""}
													<i class="fas fa-check">
														<img src="https://claroidecuador.s3.amazonaws.com/PNG/FrameCorrectoInput_Icono.png" alt="">
													</i>
												{/if}
											</span>
                    </div>
                    {#if confirContraseñaError && confirmarContraseña == ""}
                      <span class="error-message">Campo obligatorio.</span>
                    {/if}
                    {#if contraseñasIgualesError}
                      <span class="error-message">Las contraseñas no coinciden.</span>
                    {/if}
                  </div>
                </div>

                <div class="validations-container d-flex">
                  <div class="validation-circle text-center">
                    <span>La contraseña debe tener:</span>
                  </div>
                  <div class="validation-circle text-center">
                    <i
                      class="circle uppercase-letter"
                      class:valid={tieneMayuscula}
                      class:invalid={tieneMayuscula}
                    />
                    <span>Una letra mayúscula</span>
                  </div>
                  <div class="validation-circle text-center">
                    <i
                      class="circle lowercase-letter"
                      class:valid={tieneMinuscula}
                      class:invalid={tieneMinuscula}
                    />
                    <span>Una letra minúscula</span>
                  </div>
                  <div class="validation-circle text-center">
                    <i
                      class="circle number"
                      class:valid={tieneNumero}
                      class:invalid={tieneNumero}
                    />
                    <span>Un número</span>
                  </div>
                  <div class="validation-circle text-center">
                    <i
                      class="circle min-length"
                      class:valid={tieneMinimoCaracteres}
                      class:invalid={tieneMinimoCaracteres}
                    />
                    <span>8 caracteres como mínimo</span>
                  </div>
                </div>

                <button type="submit" class="btn-red mt-4">Recuperar contraseña</button>
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

<Modal isOpen={isModalOpen}>
  <p class="modal-title">Actualización exitosa. <br /> Ingresa nuevamente</p>
  <button class="btn-red" on:click={handleClose}>Iniciar sesión</button>
</Modal>


<!-- 

 -->

<style>
	.validation-circle {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
		margin-left: 19px;
	}

	.circle {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		border: solid 1px #a7a7a7;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}

	.validation-circle span {
		font-size: 14px;
		color: #a7a7a7;
		line-height: 20px;
		font-family: "Roboto", sans-serif;
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

	.title p {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
	}

	button {
		font-family: "Roboto", sans-serif;
		font-weight: bold;
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
	.modal-title {
		font-family: "Roboto Regular", sans-serif;
		color: #444444;
		text-align: center;
		margin: 0 auto;
		margin-bottom: 20px;
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
	.bg-footer span {
		font-family: "Roboto Regular", sans-serif;
		color: #a7a7a7;
	}

	.bg-footer {
		margin-top: 50px;
	}
</style>
