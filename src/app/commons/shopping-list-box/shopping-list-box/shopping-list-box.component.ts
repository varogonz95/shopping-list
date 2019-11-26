import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'shopping-list-box',
	templateUrl: './shopping-list-box.component.html',
	styleUrls: ['./shopping-list-box.component.css']
})
export class ShoppingListBoxComponent implements OnInit {

	@Input()
	public list: any

	public readonly MAX_PRODUCTS = 10

	constructor() { }

	ngOnInit() {
	}

}
