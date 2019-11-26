import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchToggleComponent } from './switch-toggle.component';

@NgModule({
	declarations: [SwitchToggleComponent],
	imports: [
		CommonModule
	],
	exports: [SwitchToggleComponent]
})
export class SwitchToggleModule { }
