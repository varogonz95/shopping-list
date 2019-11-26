import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'dump',
	template: '<pre *ngIf="enable">{{value | json}}</pre>',
	styleUrls: ['./dump.component.css']
})
export class DumpComponent implements OnInit {

	@Input()
	value: any

	public enable = environment.enableDumps

	constructor() { }

	ngOnInit() {
		if (typeof this.value === 'undefined')
		throw new Error('[value] is a required property');
		
	}

}
