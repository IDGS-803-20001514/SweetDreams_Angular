import { Component } from '@angular/core';
import { CompraData, topClientes, topProductos, utilidad } from 'src/app/interfaces/dash-board';
import { DashboardService } from './dashboard.service';
// import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  chartData: CompraData[] = [];
  secondChartData:topClientes[] = [];
  Datos: topProductos[]=[];
  Utilidad: utilidad[]=[];
  chartType: string = 'bar';

  // chartOptions: ChartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  // };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(){

    this.dashboardService.getChartData().subscribe((data)=>{
      this.chartData = data
    });

    this.dashboardService.getDatosClientes().subscribe((data)=>{
      this.secondChartData = data
    });

    this.dashboardService.getProductos().subscribe((data)=>{
      this.Datos = data
    });

    this.dashboardService.getUtilidad().subscribe((data)=>{
      this.Utilidad = data
    })
  }


  getChartDataTotal() {
    return this.chartData.map(item => item.total);
  }

  getChartDataLabels() {
    return this.chartData.map(item => item.nombreProveedor);
  }

  getChartDataCliente(){
    return this.secondChartData.map(item => item.total)
  }

  getChartDataCLabels(){
    return this.secondChartData.map(item => item.nombreCliente)
  }

  getChartDataProducto(){
    return this.Datos.map(item => item.nombreProducto)
  }

  getChartTotalProducto(){
    return this.Datos.map(item => item.totalVendido)
  }

  utilidadLabel(){
    return this.Utilidad.map(item => item.estatus)
  }

  utilidadDatos(){
    return this.Utilidad.map(item => item.total)
  }

}
