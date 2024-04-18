import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import { UploadService } from '../services/upload.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers: [UsuarioService, UploadService]
})
export class CrearUsuarioComponent implements OnInit {
  public tipousuario;
  public user: Usuario;
  public filesToUpload: Array<File>;
  public status: String;
  public users: any[]=[];
  public ban=0;
  constructor(
    private _usuarioService: UsuarioService,
    private _uploadService: UploadService,
    private router:Router) {
    this.user=new Usuario('','','','','','','','','','','','','','','');
    this.status = 'failed';
    this.filesToUpload = [];

  }

  ngOnInit(): void {
    this.tipousuario=localStorage.getItem("tipousuario");
    this.getProductos();
  }
  onSubmit(form){
    this.ban=0;
    for(let item of this.users){
      if(item.usuario===this.user.usuario){
        window.alert("el nombre de usuario ya existe");
        this.ban=1;
        break;
      }
      if(item.correo===this.user.correo){
window.alert("el correo ya existe");
        this.ban=1;
        break;

      }
    }
    if (this.ban==0){
      //window.alert("entro a crearlo"); 
        if (this.tipousuario==null || this.tipousuario=="empleado"){
          this.user.rfc="0000000000000";
          this.user.tipoUsuario="cliente"
        }
        this._usuarioService.addUsuario(this.user).subscribe(
          response => {
            if(response.usuario){
              // Subir la imagen
              if(this.filesToUpload.length !== 0){
                this._uploadService.makeFileRequest(Global.url+"upload-image/usuario/"+response.usuario._id, [], this.filesToUpload, 'imagen')
                .then((result:any) => {
                  this.user = result.usuario;
                  this.status = 'success';
                  form.reset();
                  this.router.navigate(['login']).then(() => {window.location.reload();});
                });
              }else{
                this.user = response.usuario;
                this.status = 'success';
                form.reset();
                this.router.navigate(['login']).then(() => {window.location.reload();});
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

  getProductos(){
    this._usuarioService.getUsuarios().subscribe(
      response => {
        if(response.usuarios){
          this.users=response.usuarios;
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
