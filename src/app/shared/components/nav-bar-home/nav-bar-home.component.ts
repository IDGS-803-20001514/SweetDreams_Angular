import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar-home',
  templateUrl: './nav-bar-home.component.html',
  styleUrls: ['./nav-bar-home.component.css']
})
export class NavBarHomeComponent {
  linksMenu:Array<any>=[]
    
  constructor(){}

  ngOnInit(): void {
   
    this.linksMenu = [
      {
        nombre:'Inicio',
        icono:'uil uil-house-user',
        router:['/']
      },
      {
        nombre:'Sobre Nosotros',
        icono:'uil uil-comment-info',
        router:['/','about']
      },
      {
        nombre:'Ubicacion',
        icono:'uil uil-map',
        router:['/','ubicacion']
      },
      {
        nombre:'Iniciar Sesion',
        icono:'uil uil-user-square',
        router:['/','auth']
      }
    ]
  }
}
