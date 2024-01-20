import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmpleadosService } from '../../../Services/empleados.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-empleado',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-empleado.component.html',
  styleUrl: './nuevo-empleado.component.css'
})
export class NuevoEmpleadoComponent {
  title ='';
  id!: number;
  empleado: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Cargo: new FormControl('', Validators.required),
    Salario: new FormControl('', Validators.required),
    Fecha_contratacion: new FormControl('', Validators.required),

});
  constructor(
    private empleadosServicio: EmpleadosService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ){}
  ngOnInit(){
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Empleado';
    }else{
      this.title = 'Actualizar Empleado';
      this.empleadosServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.empleado.patchValue({
          Nombre: res.Nombre,
          Cargo: res.Cargo,
          Salario: res.Salario,
          Fecha_contratacion: res.Fecha_contratacion,
        });
      });
    }
  }
  get f() {
    return this.empleado.controls;
  }
  grabar() {
    Swal.fire({
      title: 'Empleados',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.empleadosServicio
            .insertar(this.empleado.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'Empleados',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/empleados']);
              this.id = 0;
            });
        } else {
          this.empleadosServicio
            .actualizar(this.empleado.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Empleados',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/empleados']);
              this.id = 0;
            });
          }
        }else{
          Swal.fire({
            title: 'Empleados',
            text: 'El usuario canceló la acción',
            icon: 'info',
          });
        }
      });
    }
  }


