import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/demo/api/subject';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SubjectService } from 'src/app/demo/service/subject.service';

@Component({
    templateUrl: './subjects.component.html',
    providers: [MessageService]
})
export class SubjectsComponent implements OnInit {

    subjectDialog: boolean = false;

    deleteSubjectDialog: boolean = false;

    deleteDialog: boolean = false;

    subjects: Subject[] = [];

    subject: Subject = {};

    selectedSubjects: Subject[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private subjectService: SubjectService, private messageService: MessageService) { }

    ngOnInit() {
        this.subjectService.getSubjects().then(data => this.subjects = data);

        this.cols = [
            { field: 'subject', header: 'Materia' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.subject = {};
        this.submitted = false;
        this.subjectDialog = true;
    }

    deleteSelected() {
        this.deleteDialog = true;
    }

    editSubject(subject: Subject) {
        this.subject = { ...subject };
        this.subjectDialog = true;
    }

    deleteSubject(subject: Subject) {
        this.deleteSubjectDialog = true;
        this.subject = { ...subject };
    }

    confirmDeleteSelected() {
        this.deleteDialog = false;
        this.subjects = this.subjects.filter(val => !this.selectedSubjects.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Materia eliminada', life: 3000 });
        this.selectedSubjects = [];
    }

    confirmDelete() {
        this.deleteSubjectDialog = false;
        this.subjects = this.subjects.filter(val => val.id !== this.subject.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Materia eliminada', life: 3000 });
        this.subject = {};
    }

    hideDialog() {
        this.subjectDialog = false;
        this.submitted = false;
    }

    saveSubject() {
        this.submitted = true;

        if (this.subject.name?.trim()) {
            if (this.subject.id) {
                // @ts-ignore
                this.subject.inventoryStatus = this.subject.inventoryStatus.value ? this.subject.inventoryStatus.value : this.subject.inventoryStatus;
                this.subjects[this.findIndexById(this.subject.id)] = this.subject;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Materia actualizada', life: 3000 });
            } else {
                this.subject.id = this.createId();
                this.subject.code = this.createId();
                this.subject.image = 'subject-placeholder.svg';
                // @ts-ignore
                this.subject.inventoryStatus = this.subject.inventoryStatus ? this.subject.inventoryStatus.value : 'INSTOCK';
                this.subjects.push(this.subject);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Materia creada', life: 3000 });
            }

            this.subjects = [...this.subjects];
            this.subjectDialog = false;
            this.subject = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.subjects.length; i++) {
            if (this.subjects[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
