import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { User } from 'src/app/demo/api/user'
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/user.service';

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
    `],
    providers: [MessageService]
})
export class RegisterComponent {

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private fb: FormBuilder,
        private userService: UserService
    ) {

    }

    submitted = false;
    btnSubmit = false;
    documents_type: any[] = [
        { name: 'Registro Civil', code: 'RC' },
        { name: 'Cédula de Ciudadania', code: 'CI' },
        { name: 'Pasaporte', code: 'PP' },
        { name: 'Licencia de Conducir', code: 'LC' },
        { name: 'Tarjeta de Identidad', code: 'TI' },
        { name: 'Certificado de Nacimiento', code: 'CN' },
        { name: 'Certificado de Matrimonio', code: 'CM' },
        { name: 'Documentación de Extranjerí<a', code: 'DE' },
        { name: 'Registro de Propiedad', code: 'RP' },
        { name: 'Documentos Legales', code: 'DL' }
    ];
    users_type: any[] = [
        { name: 'Profesor', code: '1' },
        { name: 'Estudiante', code: '2' },
        { name: 'Acudiente', code: '3' },

    ];

    registerForm: FormGroup;

    username: string;

    ngOnInit() {
        this.registerForm = this.fb.group({
            name: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            lastname: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            date: [{ value: '', disabled: false }, [Validators.required]],
            email: [{ value: '', disabled: false }, [Validators.required, Validators.email]],
            document_type: [{ value: '', disabled: false }, [Validators.required]],
            document: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
            user_type: [{ value: '', disabled: false }, [Validators.required]],
            password: [{ value: '', disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
            confirmationPassword: [{ value: '', disabled: false }, [Validators.required, this.matchPasswordValidator.bind(this)]]
        });
    }

    generateUsername(name: string, lastname: string): string {
        const namePart = name.substring(0, 3).toLowerCase();
        const lastnamePart = lastname.substring(0, 3).toLowerCase();

        const randomPart = Math.floor(100 + Math.random() * 900);

        const username = `${namePart}${lastnamePart}${randomPart}`;

        return username;
    }

    // VALIDACIONES
    matchPasswordValidator(control): { [key: string]: boolean } | null {
        if (this.registerForm) {
            const password = this.registerForm.get('password')?.value;
            if (password !== control.value) {
                return { passwordMismatch: true };
            }
        }
        return null;
    }

    toastSuccess(msg) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    toastError(msg) {
        this.messageService.add({ severity: 'error', summary: 'Formulario incompleto', detail: msg });
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
            const id = this.generateId();
            const name = this.registerForm.value.name;
            const lastname = this.registerForm.value.lastname;
            const username = this.generateUsername(name, lastname);

            const document_type = this.registerForm.value.document_type.code;
            const document = this.registerForm.value.document.code;

            if (this.isUserDuplicate(document_type, document)) {
                this.toastError('Ya existe un usuario con el mismo tipo de documento y documento');
                this.btnSubmit = false;
                return;
            }

            const user: User = {
                id: id,
                name: this.registerForm.value.name,
                lastname: this.registerForm.value.lastname,
                email: this.registerForm.value.email,
                date: this.registerForm.value.date,
                document_type: document_type,
                document: document,
                user_type: this.registerForm.value.user_type.code,
                username: username,
                password: this.registerForm.value.password,
            };


            this.userService.createUser(user);

            this.toastSuccess('Usuario registrado correctamente');
            this.loginUser(user);


            setTimeout(() => {
                this.router.navigate(['dashboard']);
            }, 2000);
        } catch (error) {
            this.btnSubmit = false;
            if (error instanceof Error) {
                this.toastError(`Error al registrar el usuario: ${error.message}`);
            } else {
                this.toastError('Ocurrió un error inesperado al registrar el usuario');
            }
        }
    }

    isUserDuplicate(document_type: string, document: string, excludeId?: string): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]') as User[];

        return users.some(user =>
            user.document_type === document_type &&
            user.document === document &&
            user.id !== excludeId
        );
    }

    loginUser(user: User) {
        const userInfo = {
            id: user.id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            username: user.username,
        };

        localStorage.setItem('userSession', JSON.stringify(userInfo));
    }

    private generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
}
