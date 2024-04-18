export class PedidoProducto{
	constructor(
		public _id: String,
		public pedidoId: String,
		public productoId: String,
		public cantidad: number
		){}
}