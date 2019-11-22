import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

const declarations = []

const routes: Route[] = []

@NgModule({
	declarations,
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class PagesModule { }
