import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'sidebar-list-form',
	templateUrl: './sidebar-list-form.component.html',
	styleUrls: ['./sidebar-list-form.component.css']
})
export class SidebarListFormComponent implements OnInit {

	@Output()
	submit = new EventEmitter<string>()

	@Output()
	clear = new EventEmitter<void>()

	@Input()
	model = ''

	@ViewChild('listName', {static: true})
	listName: ElementRef

	constructor() { }

	ngOnInit() {
		this.listName.nativeElement.focus()
	}

	public onClear() {
		this.model = ''
		this.listName.nativeElement.focus()
		this.clear.emit()
	}

	public onKeyUp(event: KeyboardEvent) {
		if (event.code === 'Escape')
		this.clear.emit()
	}

	public onSubmit() {
		console.log('SidebarListFormComponent.onSubmit')
		this.submit.emit(this.model)
	}
}
