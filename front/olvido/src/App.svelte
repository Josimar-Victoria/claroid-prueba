
<script>
	import { Router, Route } from "svelte-routing";

	import Olvido from "./pages/olvido/olvido.svelte";
	import OlvidoUsers from "./pages/olvidoUsers/olvidoUsers.svelte";
	import OlvidoPassword from "./pages/olvidoPassword/olvidoPassword.svelte";
	import olvidoFormularioSoporte from "./pages/olvidoFormularioSoporte/olvidoFormularioSoporte.svelte"
	import OlvidoVeryfyUsers from "./pages/olvidoVeryfyUsers/olvidoVeryfyUsers.svelte";
	import RecupercionDePassword from "./pages/recupercionDePassword/recupercionDePassword.svelte";
	import RecupercionDeUsers from "./pages/recupercionDeUsers/recupercionDeUsers.svelte";
  import RecuperacionIngresarPassw from "./pages/recuperacionIngresarPassw/recuperacionIngresarPassw.svelte";
  import RecuperacionIngresarCodigo from "./pages/recuperacionIngresarCodigo/recuperacionIngresarCodigo.svelte";
  import OlvidoVeryfyUsersEmail from "./pages/olvidoVeryfyUsersEmail/olvidoVeryfyUsersEmail.svelte";
  import OlvidoVeryfyUsersTell from "./pages/olvidoVeryfyUsersTell/olvidoVeryfyUsersTell.svelte";
  import RecuperarcionPregPassw from "./pages/recuperarcionPregPassw/recuperarcionPregPassw.svelte";
</script>

<Router>
	<Route path="/olvido" component={Olvido} />
	<Route path="/olvido/user" component={OlvidoUsers} />
	<Route path="/olvido/password" component={OlvidoPassword} />
	<Route path="/olvido/formulario/soporte" component={olvidoFormularioSoporte} />
	<Route path="/olvido/veryfy/user" component={OlvidoVeryfyUsers} />
	<Route path="/olvido/veryfy/user/email" component={OlvidoVeryfyUsersEmail}/>
	<Route path="/olvido/veryfy/user/celular" component={OlvidoVeryfyUsersTell}/>
	<Route path="/olvido/recupercion/password" component={RecupercionDePassword} />
	<Route path="/olvido/recupercion/user" component={RecupercionDeUsers}/>
	<Route path="/olvido/recupercion/password/preguntas/segurida"  component={RecuperarcionPregPassw} />
	<Route path="/olvido/ingresar/password" component={RecuperacionIngresarPassw}/>
</Router>

<style>
	:global(body) {
		background-color: #f5f5f5;
		font-family: "Roboto";
		font-size: 14px;
		margin: 0px;
		padding: 0px;
		width: 100%;
	}

	:global(.f-gray) {
		color: #444444;
	}

	:global(.btn-red, .btn-red:hover) {
		background-color: #da291c;
		border: none;
		border-radius: 133px;
		color: #fff;
		height: 50px;
		width: 100%;
		cursor: pointer;
	}

	:global(.center) {
		display: flex;
		justify-content: center;
	}
	:global(.btn-red:disabled) {
		opacity: 0.9;
	}

	:global(.color-azul) {
		color: #0097a9;
	}

	:global(.underline) {
		text-decoration: underline;
	}

	:global(.fs-14) {
		font-size: 14px;
	}

	:global(.pointer) {
		cursor: pointer;
	}

	:global(.fw-bold) {
		font-weight: bold;
	}

	:global(.logo-claro) {
		width: 250px !important;
	}

	:global(.logo-footer) {
		width: 70px !important;
		margin-right: 10px;
	}

	:global(.container) {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100vh;
		text-align: center;
		width: 100%;
	}

	:global(.color-red) {
		color: #da291c;
	}

	:global(.fs-12) {
		font-size: 12px;
	}

	:global(.color-gris-claro) {
		color: #b4b4b4;
	}
</style>


<!-- <script>
	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style> -->