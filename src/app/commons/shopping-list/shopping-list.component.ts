import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../../shared/List';

@Component({
	selector: 'shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

	@Output()
	submit: EventEmitter<void>

	public list: List

	constructor() { }

	ngOnInit() {
	}

	public onSubmit() {
		this.submit.emit()
	}

	public onProductItemClick(element: HTMLElement) {}

	public onProductItemOver(element: HTMLElement) {}

	public onProductItemOut(element: HTMLElement) {}
}
