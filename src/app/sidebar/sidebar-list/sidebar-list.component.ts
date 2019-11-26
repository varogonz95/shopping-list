import { Component, OnInit, Input } from '@angular/core';
import { ShoppingList } from '../../shared/ShoppingList';

interface ShoppingListEditable extends ShoppingList {
	isEditable?: boolean
}

@Component({
	selector: 'sidebar-list',
	templateUrl: './sidebar-list.component.html',
	styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {

	@Input()
	lists: ShoppingListEditable[]

	constructor() { }

	ngOnInit() {
		this.lists.map(list => list.isEditable = false)
	}

	public toggleMain(list: ShoppingList) {
		if (this.lists.length > 1) {
			this.lists.map(list => list.isMain = false)
			list.isMain = true
		}
	}

	public toggleEditable(list: ShoppingListEditable) {
		this.lists.map(list => list.isEditable = false)
		list.isEditable = true
	}

	public saveChanges(list: ShoppingListEditable, name: string) {
		list.name = name
		list.isEditable = false
	}

	public delete(index: number/* , list: ShoppingList */) {
		if (confirm(`Do you really want to delete this list (${this.lists[index].name})?`))
		this.lists.splice(index, 1)
	}

	public onClear() {
		this.lists.map(list => list.isEditable = false)
	}
}
