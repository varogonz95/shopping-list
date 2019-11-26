import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
	selector: 'switch-toggle',
	templateUrl: './switch-toggle.component.html',
	styleUrls: ['./switch-toggle.component.css'],
	providers: [
		ReactiveFormsModule,
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => SwitchToggleComponent)
		}
	]
})
export class SwitchToggleComponent implements ControlValueAccessor {

	@Input()
	value

	@Input()
	name = ''

	@Input()
	label: string

	@Input()
	position: 'start' | 'end' = 'start'

	@ViewChild('ref', { static: true })
	ref: HTMLInputElement

	private propagateChange: Function

	constructor() { }

	writeValue(value: any): void {}

	registerOnChange(fn) {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any): void {
		// this.propagateChange
	}

	onModelChanges() {
		this.propagateChange(this.value)
	}
}
