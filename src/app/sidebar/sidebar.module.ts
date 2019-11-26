import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

const components = [
	SidebarComponent,
	SidebarListComponent,
	// SidebarListFormComponent
] 

@NgModule({
	declarations: components,
	imports: [
		AngularFirestoreModule,
		CommonModule, 
		FormsModule,
		RouterModule
	],
	exports: [SidebarComponent],
})
export class SidebarModule { }
