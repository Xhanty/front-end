import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';


@NgModule({
    imports: [
        CommonModule,
        RegisterRoutingModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        CalendarModule,
        DropdownModule,
        ToastModule, 
        ButtonModule, 
        RippleModule,
        ReactiveFormsModule
    ],
    declarations: [RegisterComponent]
})
export class RegisterModule { }
