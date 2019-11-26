import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SidebarListComponent } from './sidebar-list/sidebar-list.component';
import { SidebarListFormComponent } from './sidebar-list-form/sidebar-list-form.component';

const components = [
	SidebarComponent,
	SidebarListComponent,
	SidebarListFormComponent
] 

@NgModule({
	declarations: components,
	imports: [CommonModule, FormsModule],
	exports: [SidebarComponent],
})
export class SidebarModule { }
