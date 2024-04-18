import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { Router} from '@angular/router';
import { Producto } from '../models/producto';
import { ProductService } from '../services/product.service';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
  providers: [ProductService, UploadService]
})
export class CrearProductoComponent implements OnInit {
  public status: String;
  public tipousuario;
  public producto: Producto;
  public filesToUpload: Array<File>;
  constructor(
    private _productoService: ProductService,
    private _uploadService: UploadService,
    private router:Router) {
    this.producto = new Producto('','','',0,'',0,'',new Date());
    this.status = 'failed';
    this.filesToUpload = [];
     }

  ngOnInit(): void {
    this.tipousuario=localStorage.getItem("tipousuario");
  }
  onSubmit(form){
    this.producto.fechaCreacion=new Date();
    this._productoService.addProduct(this.producto).subscribe(
      response => {
        if(response.producto){
          // Subir la imagen
          if(this.filesToUpload.length !== 0){
            this._uploadService.makeFileRequest(Global.url+"upload-image/producto/"+response.producto._id, [], this.filesToUpload, 'imagen')
            .then((result:any) => {
              this.producto = result.producto;
              this.status = 'success';
              form.reset();
              this.router.navigate(['productos']).then(() => {window.location.reload();window.alert('Se ha creado con exito el articulo');});
            });
          }else{
            this.producto = response.producto;
            this.status = 'success';
            form.reset();
            this.router.navigate(['productos']).then(() => {window.location.reload();window.alert('Se ha creado con exito el articulo');});
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
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
