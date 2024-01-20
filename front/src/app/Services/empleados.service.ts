import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iempleados } from '../Interfaces/iempleados';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
private urlBase: string = 'http://localhost/Crud-Examen-Angular/proyecto/Controllers/Empleados.Controller.php?op=';
  constructor(private clientePhp: HttpClient) { }

  todos(): Observable<Iempleados[]> {
    return this.clientePhp.get<Iempleados[]>(this.urlBase + 'todos');
  }
  uno(id: number): Observable<Iempleados> {
    var emp = new FormData();
    emp.append('ID_empleado', id.toString());
    return this.clientePhp.post<Iempleados>(this.urlBase + 'uno', emp);
  }
  insertar(empleado: Iempleados): Observable<any> {
    var emp = new FormData();
    emp.append('Nombre', empleado.Nombre);
    emp.append('Cargo', empleado.Cargo);
    emp.append('Salario', empleado.Salario.toString());
    emp.append('Fecha_contratacion', empleado.Fecha_contratacion.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', emp);
  }
  actualizar(empleado: Iempleados, id: number): Observable<any> {
    var emp = new FormData();
    emp.append('ID_empleado', id.toString());
    emp.append('Nombre', empleado.Nombre);
    emp.append('Cargo', empleado.Cargo);
    emp.append('Salario', empleado.Salario.toString());
    emp.append('Fecha_contratacion', empleado.Fecha_contratacion.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', emp);
  }
  eliminar(id: number): Observable<any> {
    var emp = new FormData();
    emp.append('ID_empleado', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', emp);
  }

}
