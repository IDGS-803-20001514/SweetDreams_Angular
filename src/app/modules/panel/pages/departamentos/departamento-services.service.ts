import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Departamento } from 'src/app/interfaces/departamentos';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoServicesService {

  constructor(public http: HttpClient) { }

  showDepartments() {
    return this.http.get('http://192.168.100.51:7220/api/Departamentoes');
  }

  searchDepartment(id: number) {
    return this.http.get(`http://192.168.100.51:7220/api/Departamentoes/${id}`);
  }

  insertDepartment(department: Departamento) {
    return this.http.post('http://192.168.100.51:7220/api/Departamentoes', department);
  }

  updateDepartment(department: Departamento) {
    return this.http.put(`http://192.168.100.51:7220/api/Departamentoes/${department.id}`, department);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`http://192.168.100.51:7220/api/Departamentoes/${id}`);
  }
}
