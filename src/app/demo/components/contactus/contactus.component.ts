import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-contactus',
    templateUrl: './contactus.component.html',
    styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent {

    constructor(public layoutService: LayoutService, public router: Router) { }

    teachers:any = [1,2,3,4,5,6];

    scrollToElement(elementId: string): void {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    
}
