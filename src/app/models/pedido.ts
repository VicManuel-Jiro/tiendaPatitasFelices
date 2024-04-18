export class Pedido{
	constructor(
		public _id: string,
		public usuarioId: String,
		public fechaCreacion: Date,
		public monto: number,
		public ship: String,
		public tipoPago: String,
		public tarjeta: String,
		public cvc: String,
		public mes: String,
		public year: String,
		public nombreTarjeta: String,
		public correo: String,
		public direccion: String,
		public pais: String,
		public estado: String,
		public ciudad: String,
		public cp: String,
		public telefono: String
		){}
}