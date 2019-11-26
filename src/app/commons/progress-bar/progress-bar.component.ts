import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';

enum ProgressBarType {
	primary = 'primary',
	link = 'link',
	info = 'info',
	success = 'success',
	warning = 'warning',
	danger = 'danger'
}

enum ProgressBarSize {
	small = 'small',
	medium = 'medium',
	large = 'large',
}

@Component({
	selector: 'progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnChanges {

	@Input()
	public max = 100

	@Input()
	public value = 0

	@Input()
	public type: ProgressBarType.primary

	@Input()
	public size: ProgressBarSize.medium

	@Input()
	public indeterminate = false

	@Input()
	public name = 'primary'

	@ViewChild('elementRef', {static: true})
	public element: ElementRef

	constructor() { }
	
	ngOnInit() { }
	
	ngOnChanges(changes: SimpleChanges) {
		if (this.element.nativeElement)
			for (const prop in changes) {
				switch (prop) {
					case 'type':
						this.typeChangeHandler(changes[prop].currentValue)
						break

					case 'size':
						this.sizeChangeHandler(changes[prop].currentValue)
						break
				
					case 'indeterminate':
						this.indeterminateChangeHandler(changes[prop].currentValue)
						break
				}
			}
	}

	private indeterminateChangeHandler(value: boolean) {
		if (value) {
			(this.element.nativeElement as HTMLElement).removeAttribute('value')
		}
		else {
			this.element.nativeElement.setAttribute('value', this.value.toString())
		}
	}
	
	private sizeChangeHandler(value: ProgressBarSize) {
		for (const enumeration in ProgressBarSize) {
			this.element.nativeElement.classList.remove(`is-${ProgressBarSize[enumeration]}`)
		}
		this.element.nativeElement.classList.add(`is-${value}`)
	}

	private typeChangeHandler(value: ProgressBarType) {
		for (const enumeration in ProgressBarType) {
			this.element.nativeElement.classList.remove(`is-${ProgressBarType[enumeration]}`)
		}
		this.element.nativeElement.classList.add(`is-${value}`)
	}
}
