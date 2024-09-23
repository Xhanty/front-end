import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router'

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class RegisterComponent {

    valCheck: string[] = ['remember'];

    password!: string;
    Confirmationpassword!: string;
    date!: string;
    documents_type: any[] = [
        { name: 'Registro Civil', code: 'RC' },
        { name: 'Cédula de Identidad', code: 'CI' },
        { name: 'Pasaporte', code: 'PP' },
        { name: 'Licencia de Conducir', code: 'LC' },
        { name: 'Tarjeta de Identidad', code: 'TI' },
        { name: 'Certificado de Nacimiento', code: 'CN' },
        { name: 'Certificado de Matrimonio', code: 'CM' },
        { name: 'Documentación de Extranjería', code: 'DE' },
        { name: 'Registro de Propiedad', code: 'RP' },
        { name: 'Documentos Legales', code: 'DL' }
    ];
    document_type: number;
    users_type: any[] = [
        { name: 'Profesor', code: '1' },
        { name: 'Estudiante', code: '2' },
        { name: 'Acudiente', code: '3' },
        
    ];
    user_type: number;

    constructor(public layoutService: LayoutService, public router: Router) {

    }
}
