import { Component, OnInit } from '@angular/core';
import { Mascota } from '../models/mascota';
import { Global } from '../services/global';
import { MascotaService } from '../services/mascota.service';
@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.css'],
  providers: [MascotaService]
})
export class MascotasComponent implements OnInit {
public tipousuario: any;
public mascotas_nuevas: any[]=[];
public mascotas: any[]=[];
public url: any;
  constructor(private _mascotaService: MascotaService) { }

  ngOnInit(): void {
    this.url=Global.url;
    this.tipousuario=localStorage.getItem("tipousuario");
    this.getPets();
  }

  getPets(){
    this._mascotaService.getMascotas().subscribe(
      response => {
        if(response.mascotas){
          console.log(response.mascotas);
          this.mascotas_nuevas=response.mascotas.sort((a,b) =>{
            return <any>new Date(b.fechaCreacion) - <any>new Date(a.fechaCreacion);
          }) as any;
          this.mascotas=response.mascotas as any;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
