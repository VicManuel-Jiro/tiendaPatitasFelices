import { Component, OnInit } from '@angular/core';
import { Mascota } from '../models/mascota';
import { Global } from '../services/global';
import { MascotaService } from '../services/mascota.service';
import { UploadService } from '../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router} from '@angular/router';
@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css'],
  providers: [MascotaService, UploadService]
})
export class MascotaComponent implements OnInit{
  public status: String;
  public tipousuario;
  public pet: Mascota;
  public filesToUpload: Array<File>;
  public url=Global.url;
  public id: any;
  constructor(private location: Location,
    private route: ActivatedRoute,
    private _mascotaService: MascotaService,
    private _uploadService: UploadService,
    private router:Router) {
    this.pet = new Mascota('','',0,'','','',new Date());
    this.status = 'failed';
    this.filesToUpload = [];
   }

  ngOnInit(){
    this.tipousuario=localStorage.getItem("tipousuario");
    this.getMascota();
  }
  getMascota(){
    this.id = this.route.snapshot.paramMap.get('id');
    this._mascotaService.getMascota(this.id).subscribe(
      response => {
        this.pet=response.mascota;
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
      if (this.pet.edad>0){this.pet.estado='Disponible'}else{this.pet.estado='No Disponible'}
      this._mascotaService.updateMascota(this.pet,this.id).subscribe(
        response => {
          if(response.mascota){
            // Subir la imagen
            if(this.filesToUpload.length !== 0){
              //console.log("entro a imagen");
              this._uploadService.makeFileRequest(Global.url+"upload-image/mascota/"+response.mascota._id, [], this.filesToUpload, 'imagen')
              .then((result:any) => {
                this.pet = result.mascota;
                this.status = 'success';
                window.location.reload();
                window.alert('Se ha actualizado con exito');
              });
            }else{
              //console.log("entro a sin imagen");
              this.pet = response.mascota;
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
  delimgMascota(){
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
        this.pet.imagen='';
        this._mascotaService.updateMascota(this.pet,this.id).subscribe(
          response => {
            if(response.mascota){
              this.pet = response.mascota;
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
  delMascota(){
    var confirmacion=confirm("Esta seguro de realizar esta accion? \n no se puede deshacer");
    if (confirmacion){
        this._mascotaService.deleteMascota(this.id).subscribe(
          response => {
            if(response.mascota){
              this.pet = response.mascota;
              this.status = 'success';
              this.router.navigate(['mascotas']).then(() => {window.location.reload();window.alert('Se ha eliminado con exito');});
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
