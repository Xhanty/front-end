import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubjectsComponent } from './subjects.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: SubjectsComponent }
	])],
	exports: [RouterModule]
})
export class SubjectsRoutingModule { }
