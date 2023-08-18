import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';
import { RecetaService } from '../../receta/service/receta.service';
import { Menu } from 'src/app/interfaces/menu';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-insert-menu',
  templateUrl: './insert-menu.component.html',
  styleUrls: ['./insert-menu.component.css']
})
export class InsertMenuComponent {
  constructor(public menu: MenuService, private router: Router, private receta: RecetaService) { }

  recetas: any = [];

  regMenu: Menu = {
    id: 0,
    recetaId: 0,
    foto: '',
    costo: 0,
    baja: 0,
    fecha_creacion: new Date(),
    fecha_modificacion: new Date(),
    usuario_modificacion: 1,
  }

  ngOnInit(): void {

    this.receta.showRecipes().subscribe({

      next: (res) => {

        this.recetas = res;
      }

    });

    const inputFile = document.getElementById('inputFile') as HTMLInputElement;

    if (inputFile) {
      inputFile.addEventListener('change', async (event) => {
        const selectedFile = (event.target as HTMLInputElement).files?.[0]; // Usamos el operador de opción nula (?.) para acceder a la propiedad
        if (selectedFile) {
          try {
            const base64Image = this.imageToBase64(selectedFile);

            this.regMenu.foto = await base64Image.then((data) => 'data:image/jpeg;base64,' + data);

          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error de conversion de imagen: ${error}`,
            });
          }
        }
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: 'No se encontró el elemento inputFile.',
      });
      
    }

  }

  agregarMenu() {
    this.menu.agregarMenu(this.regMenu).subscribe({

      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Insercion',
          text: 'Registro Registrado con Exito',
        });
        window.location.reload()
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.router.navigate(['/menu']);
  }

  imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64Data = reader.result.split(',')[1]; // Eliminamos "data:image/jpeg;base64,"
          resolve(base64Data);
        } else {
          reject(new Error('Error al leer el archivo.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al cargar el archivo.'));
      };

      reader.readAsDataURL(file);
    });
  }
}
