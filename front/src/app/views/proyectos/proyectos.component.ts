import { Component } from '@angular/core';
import { Iproyectos } from '../../Interfaces/iproyectos';
import { ProyectosService } from '../../Services/proyectos.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.css'
})
export class ProyectosComponent {
  title = 'Proyectos';
  proyectos: Iproyectos[];
  constructor(private proyectosService: ProyectosService) {}
    ngOnInit() {
    this.cargaTabla();
    }
    cargaTabla() {
      this.proyectosService.todos().subscribe((listaproyectos) => {
      this.proyectos = listaproyectos;
      console.log(listaproyectos);
    });
  }
  alerta(){
    Swal.fire('Proyectos', 'Mensaje en Proyectos', 'success');
  }
  eliminar(ID_proyecto: number) {
    Swal.fire({
      title: 'Proyectos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.proyectosService.eliminar(ID_proyecto).subscribe((data) => {
          this.cargaTabla();
          Swal.fire({
          title: 'Proyectos',
          text: 'Se eliminó con éxito el registro',
          icon: 'success',
        });
      });
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
