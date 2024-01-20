import { Component } from '@angular/core';
import { Iempleados } from '../../Interfaces/iempleados';
import { EmpleadosService } from '../../Services/empleados.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  title = 'Empleados';
  empleados: Iempleados[];

  constructor(private empleadosServicio: EmpleadosService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.empleadosServicio.todos().subscribe((listaeempleados) => {
      this.empleados = listaeempleados;
      console.log(listaeempleados);
    });
  }
  alerta() {
    Swal.fire('Empleados', 'Mensaje en empleados', 'success');
  }
  eliminar(ID_empleado: number) {
    Swal.fire({
      title: 'Empleados',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadosServicio.eliminar(ID_empleado).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'Empleados',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'Empleados',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
