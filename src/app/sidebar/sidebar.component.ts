import { Component, OnInit, ElementRef } from '@angular/core';
import { ShoppingList } from '../shared/ShoppingList';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

	public isAddingList = false
	public isExpanded = true
	public lists: ShoppingList[] = []
	public listNameModel: string = ''

	private nativeElement: HTMLElement

	constructor(element: ElementRef) {
		this.nativeElement = element.nativeElement
	}

	ngOnInit() {
		this.nativeElement.style.transition = 'width .3s'
		this.nativeElement.classList.add('column', 'is-one-fifth')
	}

	public addList(name: string) {
		if (name.length)
		this.lists.push({name, isMain: this.lists.length === 0})
		this.isAddingList = false
	}

	public onClear() {
		this.isAddingList = false
	}

	public showAddListForm() {
		// this.lists.push({name: '', isMain: false})
		this.isAddingList = true
	}

	public toggleExpand() {
		if (this.isExpanded) {
			this.nativeElement.style.width = '0px'
			this.nativeElement.style.overflowX = 'hidden'
			this.nativeElement.classList.remove()
			this.nativeElement.classList.add('condensed')
			this.isExpanded = false
		}
		else {
			this.nativeElement.style.width = null
			this.nativeElement.classList.add('column', 'is-one-fifth')
			this.isExpanded = true
		}
	}
}
