import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/demo/api/user';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    constructor(public layoutService: LayoutService, public router: Router, private fb: FormBuilder, private messageService: MessageService,
        private authService: AuthService
    ) { }

    valCheck: string[] = ['remember'];

    submitted = false;
    btnSubmit = false;
    password!: string;

    registerForm: FormGroup;

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: [{ value: '', disabled: false }, [Validators.required]],
            password: [{ value: '', disabled: false }, [Validators.required]],
        });
    }

    submitForm() {

        this.submitted = true;
        this.btnSubmit = true;
        if (this.registerForm.invalid) {
            this.btnSubmit = false;
            this.toastError('Debe completar el formulario');
            return;
        }

        try {
            const auth = this.authService.login(this.registerForm.value.username, this.registerForm.value.password);
            
            if (!auth) {
                this.toastError('Usuario o contraseña incorrectos');
                this.btnSubmit = false;
                return
            }

            this.toastSuccess('Usuario logueado correctamente');

            setTimeout(() => {
                this.router.navigate(['dashboard']);
            }, 2000);


        } catch (error) {
            this.btnSubmit = false;
            if (error instanceof Error) {
                this.toastError(`Error al loguear el usuario: ${error.message}`);
            } else {
                this.toastError('Ocurrió un error inesperado al loguear el usuario');
            }
        }
    }

    toastSuccess(msg) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    toastError(msg) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
    }


}
