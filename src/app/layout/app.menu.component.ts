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
                label: 'Plataforma',
                items: [
                    { label: 'Materias', icon: 'pi pi-fw pi-book'},
                    { label: 'Tareas', icon: 'pi pi-fw pi-check-square'},
                    { label: 'Perfil', icon: 'pi pi-fw pi-user'},
                    { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out'}
                ]
            },
        ];
    }
}
