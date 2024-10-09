import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private router: Router) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Menu',
                items: [
                    { label: 'Materias', icon: 'pi pi-fw pi-book', routerLink: ['/dashboard/subjects'] },
                    { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/dashboard/users'] },
                ]
            },

      
            {
                label: 'Otros',
                items: [
                    { label: 'Cerrar Sesión', icon: 'pi pi-fw pi-sign-out', command: () => this.logout() }
                ]
            },
        ];
    }

    logout() {
        localStorage.removeItem('userSession');
        this.router.navigate(['auth/login']);
    }
}
