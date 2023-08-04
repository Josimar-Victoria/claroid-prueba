import * as Yup from "yup";

export const validationSchemaGeneral = Yup.object({
	respustaDeSeguridad1: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	respustaDeSeguridad2: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	respustaDeSeguridad3: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	respustaDeSeguridad4: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	NuDeCodigo: Yup.string()
		.matches(/^\d{6}$/, "El Codigo es de 6 dígitos numéricos")
		.required("Campo obligatorio."),

	emailRegistro: Yup.string()
		.email("Debe ser un correo electrónico válido.")
		.required("Campo obligatorio."),

	selectTipDoc: Yup.string().required("Campo obligatorio."),

	numeroDeDoc: Yup.number()
		.typeError("Este campo solo permite números")
		.required("Campo obligatorio."),
	nombre: Yup.string().required("Campo obligatorio."),
	apellido: Yup.string().required("Campo obligatorio."),
	fechaNacimiento: Yup.date().required("Campo obligatorio."),
	fechaDExpiracion: Yup.date().required("Campo obligatorio."),
	nCelular: Yup.number()
		.typeError("Este campo solo permite números")
		.required("Campo obligatorio."),
	username: Yup.string().required("Campo obligatorio."),
	email: Yup.string()
		.email("Debe ser un correo electrónico válido.")
		.required("Campo obligatorio."),
	password: Yup.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres.")
		.max(20, "La contraseña no debe tener más de 20 caracteres.")
		.matches(
			/[a-z]/,
			"La contraseña debe tener al menos un carácter en minúscula"
		)
		.matches(
			/[A-Z]/,
			"La contraseña debe tener al menos un carácter en mayúscula"
		)
		.matches(/\d/, "La contraseña debe tener al menos un número")
		.required("Campo obligatorio."),
	confirmPassword: Yup.string()
		.required("Campo obligatorio.")
		.oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
	pin: Yup.string()
		.matches(/^\d{6}$/, "El PIN debe contener 6 dígitos numéricos")
		.typeError("Este campo solo permite números")
		.required("Campo obligatorio."),
});

export const validationSchemaPrimaryForm = Yup.object({
	selectTipDoc: Yup.string().required("Campo obligatorio."),

	numeroDeDoc: Yup.number()
		.typeError("Este campo solo permite números")
		.required("Campo obligatorio."),
	nombre: Yup.string().required("Campo obligatorio."),
	apellido: Yup.string().required("Campo obligatorio."),
	fechaNacimiento: Yup.date().required("Campo obligatorio."),
	fechaDExpiracion: Yup.date().required("Campo obligatorio."),
	nCelular: Yup.number()
		.typeError("Este campo solo permite números")
		.required("Campo obligatorio."),
	username: Yup.string().required("Campo obligatorio."),
	email: Yup.string()
		.email("Debe ser un correo electrónico válido.")
		.required("Campo obligatorio."),
	password: Yup.string()
		.min(8, "La contraseña debe tener al menos 8 caracteres.")
		.max(20, "La contraseña no debe tener más de 20 caracteres.")
		.matches(
			/[a-z]/,
			"La contraseña debe tener al menos un carácter en minúscula"
		)
		.matches(
			/[A-Z]/,
			"La contraseña debe tener al menos un carácter en mayúscula"
		)
		.matches(/\d/, "La contraseña debe tener al menos un número")
		.required("Campo obligatorio."),
	confirmPassword: Yup.string()
		.required("Campo obligatorio.")
		.oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
});

export const validationSchemaSecondForm = Yup.object({
	preguntaDeSeguridad1: Yup.string()
		.required("Debes definir la pregunta de seguridad."),
	preguntaDeSeguridad2: Yup.string()
		.required("Debes definir la pregunta de seguridad."),
	preguntaDeSeguridad3: Yup.string()
		.required("Debes definir la pregunta de seguridad."),
	preguntaDeSeguridad4: Yup.string()
		.required("Debes definir la pregunta de seguridad."),
	respustaDeSeguridad1: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	respustaDeSeguridad2: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	respustaDeSeguridad3: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	respustaDeSeguridad4: Yup.string()
		.min(10, "La respuesta de seguridad debe tener al menos 10 caracteres.")
		.max(50, " La respuesta de seguridad debe tener al menos 10 caracteres.")
		.required("Campo obligatorio."),
	pin: Yup.string()
		.matches(/^\d{4}$/, "El PIN debe contener 4 dígitos numéricos")
		.typeError("Este campo solo permite números")
		.required("Campo obligatorio."),
	tyc: Yup.boolean()
		.required("Campo obligatorio."),
});

export const validationSchemaEmail = Yup.object({
	email: Yup.string()
		.email("El correo no cumple con la estructura: ejemplo@dominio.com")
		.required("Campo obligatorio."),
	confirmEmail: Yup.string()
		.email("El correo no cumple con la estructura: ejemplo@dominio.com")
		.oneOf([Yup.ref('email'), null], 'Los correos electrónicos deben coincidir')
		.required("Campo obligatorio."),

});

export const validationSchemaCode = Yup.object({
	code: Yup.string()
		.required("Campo obligatorio.")
});
