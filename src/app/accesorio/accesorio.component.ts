import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
import { Global } from '../services/global';
import { Producto } from '../models/producto';
import { ProductService } from '../services/product.service';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-accesorio',
  templateUrl: './accesorio.component.html',
  styleUrls: ['./accesorio.component.css'],
  providers: [UploadService,ProductService]
})
export class AccesorioComponent implements OnInit {
public status: String;
  public tipousuario;
  public producto: Producto;
  public filesToUpload: Array<File>;
  public url=Global.url;
  public id: any;
  constructor(private location: Location,
    private route: ActivatedRoute,
    private _productoService: ProductService,
    private _uploadService: UploadService,
    private router:Router,
    private _carritoservicio: CarritoService
    ) {
    this.producto = new Producto('','','',0,'',0,'',new Date());
    this.status = 'failed';
    this.filesToUpload = [];
     }

  ngOnInit(): void {
    this.tipousuario=localStorage.getItem("tipousuario");
    this.getProducto();

  }


  addToCart(product: Producto){
    this._carritoservicio.addToCart(product);
  }


getProducto(){
    this.id = this.route.snapshot.paramMap.get('id');
    this._productoService.getProduct(this.id).subscribe(
      response => {
        this.producto=response.producto;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  onSubmit(form){
    //if(this.filesToUpload.length === 0){console.log("array vacio");}
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
      this._productoService.updateProduct(this.producto,this.id).subscribe(
        response => {
          if(response.producto){
            // Subir la imagen
            if(this.filesToUpload.length !== 0){
              //console.log("entro a imagen");
              this._uploadService.makeFileRequest(Global.url+"upload-image/producto/"+response.producto._id, [], this.filesToUpload, 'imagen')
              .then((result:any) => {
                this.producto = result.producto;
                this.status = 'success';
                window.location.reload();
                window.alert('Se ha actualizado con exito');
              });
            }else{
              //console.log("entro a sin imagen");
              this.producto = response.producto;
              this.status = 'success';
              window.location.reload();
              window.alert('Se ha actualizado con exito');
            }
          }else{
            this.status = 'failed';
          }
        },
        error => {
          console.log(<any>error);
        }
        );
    }
  }
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  delimgProducto(){
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
        this.producto.imagen='';
        this._productoService.updateProduct(this.producto,this.id).subscribe(
          response => {
            if(response.producto){
              this.producto = response.producto;
              this.status = 'success';
              window.location.reload();
              window.alert('Se ha actualizado con exito');
          }else{
            this.status = 'failed';
          }
        },
        error => {
          console.log(<any>error);
        }
        );
    }
  }
  delProducto(){
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
        this._productoService.deleteProduct(this.id).subscribe(
          response => {
            if(response.producto){
              this.producto = response.producto;
              this.status = 'success';
              this.router.navigate(['productos']).then(() => {window.location.reload();window.alert('Se ha eliminado con exito');});
          }else{
            this.status = 'failed';
          }
        },
        error => {
          console.log(<any>error);
        }
        );
    }
  }
}
