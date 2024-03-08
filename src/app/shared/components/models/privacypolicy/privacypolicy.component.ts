import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent {
  constructor(public dialogRef: MatDialogRef<PrivacypolicyComponent>) { }
  title: string = 'Politica de privacidad';
  subtitle: string = '¡Recuerda que esta aplicación es una simulación ficticia y los datos proporcionados son puramente ficticios!';
  policyList: string [] =[ 'Recopilación de información: Explicar qué tipos de información personal se recopilan de los clientes y visitantes del sitio web, como nombres, direcciones de correo electrónico, números de teléfono, etc.',

  'Uso de la información: Describir cómo se utiliza la información personal recopilada, como para procesar solicitudes de información sobre propiedades, programar visitas a inmuebles, enviar boletines informativos, etc.',

  'Divulgación de la información: Detallar las circunstancias en las que la información personal puede ser compartida con terceros, como agentes de bienes raíces, propietarios de propiedades, proveedores de servicios de correo electrónico',

  'Consentimiento: Explicar cómo los clientes pueden dar su consentimiento para el uso de su información personal y cómo pueden retirar su consentimiento en cualquier momento.',

  'Seguridad de la información: Describir las medidas de seguridad implementadas para proteger la información personal contra accesos no autorizados, uso indebido, divulgación, alteración o destrucción.',

  'Cookies y tecnologías de seguimiento: Informar sobre el uso de cookies y otras tecnologías de seguimiento en el sitio web, incluidas las cookies de análisis, publicidad y redes sociales, y cómo los visitantes pueden administrar sus preferencias de cookies.',

  'Enlaces a sitios de terceros: Aclarar que la política de privacidad no se aplica a sitios web de terceros vinculados desde el sitio web de la inmobiliaria, y alentar a los usuarios a revisar las políticas de privacidad de esos sitios.',

  'Cambios en la política de privacidad: Informar que la política de privacidad puede ser modificada en cualquier momento y cómo se comunicarán los cambios a los clientes y visitantes del sitio web.',];

  close(): void {
    this.dialogRef.close();
  }


}
