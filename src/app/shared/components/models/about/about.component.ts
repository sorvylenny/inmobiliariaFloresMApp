import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public dialogRef: MatDialogRef<AboutComponent>) { }
  author: string = 'Inmobiliaria FloresM';
  skillsBack: string[] = [
    'Entorno de ejecución: Node.js',
    'Framework backend: Express.js',
    'Base de datos: MongoDB (con Mongoose)',
    'bcrypt para el cifrado de contraseñas',
    'JSON Web Tokens para la autenticación',
    'body-parser para el análisis del cuerpo de las solicitudes HTTP',
    'cors para el manejo de solicitudes entre dominios',
  ];
  skillsFront: string[] = [
    'Framework frontend: Angular',
    'Biblioteca de UI: Angular Material',
    'Biblioteca de estilos: Bootstrap',
    'Librería de mapas: mapbox-gl',
    'Programación reactiva: RxJs',
    'Librería de notificaciones: SweetAlert2',
    'Lenguaje de programación: TypeScript'
  ];

  aboutMe: string = `¡Bienvenido a nuestra simulación de aplicación de inmobiliaria!
  Nuestra aplicación ofrece una experiencia virtual para explorar una variedad de inmuebles ficticios. Tenga en cuenta que todos los datos proporcionados son puramente ficticios y se utilizan únicamente con fines de simulación.
  La interfaz pública permite a los usuarios ver los inmuebles disponibles y ficticios. Pueden buscar por departamento, título (casa, apartamento, galpón, habitación), ciudad y precio.
  Hay una interfaz para empleados y administradores. El empleado puede crear, editar y ver los inmuebles, mientras que el administrador tiene acceso completo a la aplicación.
  Recuerda que toda la información proporcionada es ficticia. Autora: Katherine Flores.`;

  close(): void {
    this.dialogRef.close();
  }

}
