import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProyectosService } from '../../../Services/proyectos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Iempleados } from '../../../Interfaces/iempleados';
import { EmpleadosService } from '../../../Services/empleados.service';

@Component({
  selector: 'app-nuevo-proyecto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-proyecto.component.html',
  styleUrl: './nuevo-proyecto.component.css'
})
export class NuevoProyectoComponent {
  title ='Nuevo Empleado';
  id!: number;
  ListaEmpleados: Iempleados[];
  proyecto: FormGroup = new FormGroup({

    ID_empleado: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Fecha_inicio: new FormControl('', Validators.required),
    Fecha_fin: new FormControl('', Validators.required),

});
  constructor(
    private proyectosServicio: ProyectosService,
    private rutas: Router,
    private parametros: ActivatedRoute,
    private empleadosServicio: EmpleadosService
    ){}
    async ngOnInit(){
      this.id = this.parametros.snapshot.params['id'];
      await this.cargarEmpleados();

      console.log(this.id);
      if (this.id == 0 || this.id == undefined) {
        this.title = 'Nuevo Proyecto';
      }else{
        this.title = 'Actualizar Proyecto';
        this.proyectosServicio.uno(this.id).subscribe((res) => {
          console.log(res);
          this.proyecto.patchValue({
            ID_empleado: res.ID_empleado,
            Nombre: res.Nombre,
            Fecha_inicio: res.Fecha_inicio,
            Fecha_fin: res.Fecha_fin,
          });
        });
      }
    }
    get f(){
      return this.proyecto.controls;
    }
    cargarEmpleados(){
      this.empleadosServicio.todos().subscribe((res) => {
        this.ListaEmpleados = res;
      });
    }
    grabar(){
      Swal.fire({
        title: 'Proyectos',
        text: 'Esta seguro que desea guardar el registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.id == 0 || this.id == undefined) {
            this.proyectosServicio
              .insertar(this.proyecto.value)
              .subscribe((res) => {
                Swal.fire({
                  title: 'Proyectos',
                  text: 'Se insertó con éxito el registro',
                  icon: 'success',
                });
                this.rutas.navigate(['/proyectos']);
              });
          } else {
            this.proyectosServicio
              .actualizar(this.proyecto.value, this.id)
              .subscribe((res) => {
                Swal.fire({
                  title: 'Proyectos',
                  text: 'Se actualizó con éxito el registro',
                  icon: 'success',
                });
                this.rutas.navigate(['/proyectos']);
              });
          }
        } else {
          Swal.fire({
            title: 'Proyectos',
            text: 'El usuario canceló la acción',
            icon: 'info',
          });
        }
      });
    }
}
