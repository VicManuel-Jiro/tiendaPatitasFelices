import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { UploadService } from '../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router} from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService, UploadService]
})
export class UsuarioComponent implements OnInit {
public tipousuario;
public status: String;
public filesToUpload: Array<File>;
public url=Global.url;
public id: any;
public usuario: Usuario;
  constructor(private location: Location,
    private route: ActivatedRoute,
    private _usuarioService: UsuarioService,
    private _uploadService: UploadService,
    private router:Router) {
    this.usuario = new Usuario('','','','','','','','','','','','','','','');
    this.status = 'failed';
    this.filesToUpload = []; }

  ngOnInit(): void {
    this.tipousuario=localStorage.getItem("tipousuario");
    this.getUsuario();
  }
  onSubmit(form){
    //if(this.filesToUpload.length === 0){console.log("array vacio");}
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
      this._usuarioService.updateUsuario(this.usuario,this.id).subscribe(
        response => {
          if(response.usuario){
            // Subir la imagen
            if(this.filesToUpload.length !== 0){
              //console.log("entro a imagen");
              this._uploadService.makeFileRequest(Global.url+"upload-image/usuario/"+response.usuario._id, [], this.filesToUpload, 'imagen')
              .then((result:any) => {
                this.usuario = result.usuario;
                this.status = 'success';
                window.location.reload();
                window.alert('Se ha actualizado con exito');
              });
            }else{
              //console.log("entro a sin imagen");
              this.usuario = response.usuario;
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
  getUsuario(){
    this.id = this.route.snapshot.paramMap.get('id');
    this._usuarioService.getUsuario(this.id).subscribe(
      response => {
        this.usuario=response.usuario;
      },
      error => {
        console.log(<any>error);
      }
    );
  }
fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  delimgUsuario(){
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
        this.usuario.imagen='';
        this._usuarioService.updateUsuario(this.usuario,this.id).subscribe(
          response => {
            if(response.usuario){
              this.usuario = response.usuario;
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
  delUsuario(){
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
        this._usuarioService.deleteUsuario(this.id).subscribe(
          response => {
            if(response.usuario){
              this.usuario = response.usuario;
              this.status = 'success';
              this.router.navigate(['home']).then(() => {window.location.reload();window.alert('Se ha eliminado con exito');});
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
