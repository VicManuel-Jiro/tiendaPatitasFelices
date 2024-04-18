export class Usuario{
	constructor(
		public _id: string,
		public usuario: String,
		public pass: String,
		public nombre: String,
		public apellidos: String,
		public correo: String,
		public pais: String,
		public estado: String,
		public ciudad: String,
		public cp: String,
		public telefono: String,
		public tipoUsuario: String,
		public imagen:  String,
		public direccion: String,
		public rfc: String
		){}
}