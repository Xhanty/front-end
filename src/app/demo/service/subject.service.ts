import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../api/subject';

@Injectable()
export class SubjectService {

    constructor(private http: HttpClient) { }

    getSubjectsSmall() {
        return this.http.get<any>('assets/demo/data/subjects-small.json')
            .toPromise()
            .then(res => res.data as Subject[])
            .then(data => data);
    }

    getSubjects() {
        return this.http.get<any>('assets/demo/data/subjects.json')
            .toPromise()
            .then(res => res.data as Subject[])
            .then(data => data);
    }

    getSubjectsMixed() {
        return this.http.get<any>('assets/demo/data/subjects-mixed.json')
            .toPromise()
            .then(res => res.data as Subject[])
            .then(data => data);
    }

    getSubjectsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/subjects-orders-small.json')
            .toPromise()
            .then(res => res.data as Subject[])
            .then(data => data);
    }
}
