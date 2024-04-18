import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  public items: Producto[]=[];
  //prod=[_id,#peticion]
  public prod: [String,number]=['',0] ;
  //array=[prod,prod,...]
  public array2: Array<any>[]=[];
  public array;
  private ban=0;
  constructor(private http: HttpClient) { }

  addToCart(product: Producto) {
    this.array= sessionStorage.getItem("carrito");
    if (this.array!==null){
      this.array= JSON.parse(this.array);
      for (let item of this.array) {
        if (item[0]===product._id){
          item[1]=item[1]+1;
          window.alert('Se ha añadido con exito al carrito');
          this.ban=1;
          break;
        }
      }
      if (this.ban==0){
        this.prod=[product._id,1];
        this.array.push(this.prod);
        window.alert('Se ha añadido con exito al carrito');
      }else{this.ban=0;}
    }else{
      this.array=[];
      this.prod=[product._id,1];
      this.array.push(this.prod);
      window.alert('Se ha añadido con exito al carrito');
    }
    sessionStorage.removeItem("carrito");
    sessionStorage.setItem("carrito",JSON.stringify(this.array));
  }






  getItems() {
    //return this.items;
    return this.array;
  }

  clearCart() {
    /*this.items = [];
    return this.items;*/
    this.array=[];
    return this.array;
  }
  getShippingPrices() {
    return this.http.get<{tipo: string, precio: number}[]>('../assets/shipping.json');
  }

}
