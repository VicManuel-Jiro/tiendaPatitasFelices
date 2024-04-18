export class Producto{
constructor(
public _id: string,
public codigoBarras: String,
public nombre: String,
public precio: number,
public descripcion: String, 
public existencia:  number,
public imagen:  String, 
public fechaCreacion: Date
){}
}