import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {

  constructor(private router: Router){}
  dataSource: any = [];
  
  Entradas()
  {
    this.router.navigate(['/Entradas']);
  }
}
