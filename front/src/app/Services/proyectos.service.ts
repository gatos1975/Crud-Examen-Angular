import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iproyectos } from '../Interfaces/iproyectos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  private urlBase: string = 'http://localhost/Crud-Examen-Angular/proyecto/Controllers/proyectos.Controller.php?op=';
  constructor(private clientePhp:HttpClient) { }
  todos(): Observable<Iproyectos[]> {
    return this.clientePhp.get<Iproyectos[]>(this.urlBase + 'todos');
  }
  uno(id: number): Observable<Iproyectos> {
    var emp = new FormData();
    emp.append('ID_proyecto', id.toString());
    return this.clientePhp.post<Iproyectos>(this.urlBase + 'uno', emp);
  }
  insertar(proyecto: Iproyectos): Observable<any> {
    var emp = new FormData();
    emp.append('ID_empleado', proyecto.ID_empleado.toString());
    emp.append('Nombre', proyecto.Nombre);
    emp.append('Fecha_inicio', proyecto.Fecha_inicio.toString());
    emp.append('Fecha_fin', proyecto.Fecha_fin.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', emp);
  }
  actualizar(proyecto:Iproyectos, id:number): Observable<any> {
    var emp = new FormData();
    emp.append('ID_proyecto', id.toString());
    emp.append('ID_empleado', proyecto.ID_empleado.toString());
    emp.append('Nombre', proyecto.Nombre);
    emp.append('Fecha_inicio', proyecto.Fecha_inicio.toString());
    emp.append('Fecha_fin', proyecto.Fecha_fin.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', emp);
  }
  eliminar(id: number): Observable<any> {
    var emp = new FormData();
    emp.append('ID_proyecto', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', emp);
  }
}
