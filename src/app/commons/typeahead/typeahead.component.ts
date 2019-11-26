import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
	selector: 'typeahead',
	templateUrl: './typeahead.component.html',
	styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {

	@Input()
	public textField: string = ""

	@Input()
	public selectFirstMatch = false

	@Input()
	public items: any[] = []

	@Output()
	public selectedItem = new EventEmitter<void>()

	constructor() { }

	ngOnInit() {
		if (this.textField.length === 0) {
			throw "textField value cannot be empty"
		}
	}
	
	public onSelectedItem(selectedItem: any) {
		this.selectedItem.emit(selectedItem)
	}
}
