import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Administrador',
                items: [
                    { label: 'Materias', icon: 'pi pi-fw pi-book', routerLink: ['/']},
                    { label: 'Roles', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Estudiantes', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Asistencia', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Calificaciones', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                ]
            },
            {
                label: 'Profesor',
                items: [
                    { label: 'Tareas (Proximamente)', icon: 'pi pi-fw pi-check-square', routerLink: ['/']},
                    { label: 'Calificaciones', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Asistencia', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Reportes', icon: 'pi pi-fw pi-sign-out', routerLink: ['/']},
                    { label: 'Estudiantes', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                ]
            },
            {
                label: 'Estudiante',
                items: [
                    { label: 'Tareas (Proximamente)', icon: 'pi pi-fw pi-check-square', routerLink: ['/']},
                    { label: 'Mis calificaciones y asistencia', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                ]
            },
            {
                label: 'Acudientes',
                items: [
                    { label: 'Informe académico', icon: 'pi pi-fw pi-book', routerLink: ['/']},
                ]
            },
            {
                label: 'Otros',
                items: [
                    { label: 'Noticias', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/']},
                    { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out', routerLink: ['/']}
                ]
            },
        ];
    }
}
