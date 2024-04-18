import { Component, OnInit } from '@angular/core';
import { Global } from '../services/global';
import { Mascota } from '../models/mascota';
import { MascotaService } from '../services/mascota.service';
import { UploadService } from '../services/upload.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css'],
  providers: [MascotaService, UploadService]
})
export class CrearMascotaComponent implements OnInit {
  public status: String;
  public tipousuario;
  public pet: Mascota;
  public filesToUpload: Array<File>;
  constructor(
    private _mascotaService: MascotaService,
    private _uploadService: UploadService,
    private router:Router) {
    this.pet = new Mascota('','',0,'','','',new Date());
    this.status = 'failed';
    this.filesToUpload = [];
  }

  ngOnInit(): void {
    this.tipousuario=localStorage.getItem("tipousuario");
  }
  onSubmit(form){
    if (this.pet.edad>0){this.pet.estado='Disponible'}else{this.pet.estado='No Disponible'}
    this.pet.fechaCreacion=new Date();
    this._mascotaService.addMascota(this.pet).subscribe(
      response => {
        if(response.mascota){
          // Subir la imagen
          if(this.filesToUpload.length !== 0){
            this._uploadService.makeFileRequest(Global.url+"upload-image/mascota/"+response.mascota._id, [], this.filesToUpload, 'imagen')
            .then((result:any) => {
              this.pet = result.mascota;
              this.status = 'success';
              form.reset();
              this.router.navigate(['mascotas']).then(() => {window.location.reload();window.alert('Se ha creado con exito la mascota');});
            });
          }else{
            this.pet = response.mascota;
            this.status = 'success';
            form.reset();
            this.router.navigate(['mascotas']).then(() => {window.location.reload();window.alert('Se ha creado con exito la mascota');});
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
