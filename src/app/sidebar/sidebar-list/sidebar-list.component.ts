import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

interface ListViewModel {
	id: string
	name: string
}

@Component({
	selector: 'sidebar-list',
	templateUrl: './sidebar-list.component.html',
	styleUrls: ['./sidebar-list.component.css']
})
export class SidebarListComponent implements OnInit {

	@Input()
	public lists: Observable<any[]>

	constructor() { }

	ngOnInit() { }

	public delete(index: number/* , list: ShoppingList */) {
		// if (confirm(`Do you really want to delete this list (${this.lists[index].name})?`))
		// this.lists.splice(index, 1)
	}

	public onClear() {
		// this.lists.map(list => list.isEditable = false)
	}
}
