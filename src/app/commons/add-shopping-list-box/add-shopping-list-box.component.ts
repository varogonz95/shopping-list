import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'add-shopping-list-box',
	templateUrl: './add-shopping-list-box.component.html',
	styleUrls: ['./add-shopping-list-box.component.css']
})
export class AddShoppingListBoxComponent implements OnInit {
	
	@Input()
	to: string | any[] = ''
	
	@Output()
	click = new EventEmitter<void>()
	
	constructor() { }
	
	ngOnInit(): void {}

	onClick(event: Event) {
		event.preventDefault()
		this.click.emit()
	}
}
